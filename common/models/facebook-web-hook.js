'use strict';
const TextModel = require('../util/nlp/model/TextModel').default;

const TextInputModel = require('../util/nlp/model/TextInputModel');

const log = require('../util/logging').log('Facebook WebHook');

const InteractService = require('../util/nlp/InteractService').default;

const Parser = require('../util/social/facebook/FacebookMessageParser').default;
let parser = new Parser();

const InteractModelMapper = require('../util/nlp/InteractModelMapper').default;
let mapper = new InteractModelMapper();

const FacebookResponder = require('../util/social/facebook/FacebookResponder').default;
let responder = new FacebookResponder();

const stringify = require('json-stringify-safe');

module.exports = function (FacebookWebHook) {
  FacebookWebHook.afterRemote('verify', function (context, remoteMethodOutput, next) {
    context.res.setHeader('Content-Type', 'text/plain');
    context.res.end(context.result);
  });

  FacebookWebHook.afterRemote('receiveMessage', function (context, remoteMethodOutput, next) {
    context.res.setHeader('Content-Type', 'text/plain');
    context.res.end(context.result);
  });

  FacebookWebHook.verify = function (mode, challenge, verifyToken, cb) {
    if (log.debug) {
      log.debug('go verification message from facebook server with mode: %s, challange: %s and verificationToken: %s', mode, challenge, verifyToken);
    }

    const FacebookConfig = require('../../server/server').models.FacebookConfig;

    FacebookConfig.findOne({
      where: {
        verificationToken: verifyToken,
      },
    }, (err, instance) => {
      if (err || !instance) {
        if (log.error) {
          log.error('Received unknown verification token %s', verifyToken);
        }

        return cb(new Error('Unknown verification token'));
      } else {
        return cb(null, challenge);
      }
    });
  };

  FacebookWebHook.remoteMethod('verify', {

    accepts: [
      {arg: 'hub.mode', type: 'string'},
      {arg: 'hub.challenge', type: 'string'},
      {arg: 'hub.verify_token', type: 'string'},
    ],
    http: {
      path: '/webhook',
      verb: 'get',
    },
    returns: {type: 'string', root: true},

  });

  // InteractServiceMap

  // TODO make both more reliable
  let InteractServiceMap = {};
  let ConversationMap = {};

  FacebookWebHook.receiveMessage = function (payload, cb) {
    // ackn response to facebook
    cb(null, 'EVENT_RECEIVED');

    try {
      // parse message from facebook
      let messages = parser.parseMessage(payload);

      // send messages to interact.
      // for now we only will support the first text message!
      let message = messages[0];

      if (!message) {
        return;
      }

      // retrieve config that matches the recipient
      const FacebookConfig = require('../../server/server').models.FacebookConfig;

      FacebookConfig.findOne({
        where: {
          recipientId: message.receiverId,
        },
      }, (err, config) => {
        if (err || !config) {
          return log.error('We don´t have a configuration for the receiverId %s', message.receiverId);
        }

        if (log.info) {
          log.info('Found facebook config for receiver %s', message.receiverId);
        }

        // find spui
        let spui;
        config.spuiMapping.map((item) => {
          if (item.senderId === message.senderId) {
            spui = item.spui;
          }
        });

        // check if we have a service already
        let service;
        if (InteractServiceMap[config.id]) {
          service = InteractServiceMap[config.id];
        } else {
          // create service
          service = new InteractService(config.tenantId, config.apiKey, config.environment, config.domainName, [{
            key: 'channel',
            value: 'facebook',
          }]);
          InteractServiceMap[config.id] = service;
        }

        // TODO validate the kind of text message before sending?

        let externalId = message.requestId;
        if (ConversationMap[externalId]) {
          // check if it´s to old.

          const lastInteractionTime = ConversationMap[externalId].lastInteractionTime;
          if ((lastInteractionTime + config.sessionTimeout) < Date.now()) {
            if (log.info) {
              log.info('Last interaction happened after configured session timeout. Creating a new id.');
            }

            const now = Date.now();

            ConversationMap[externalId] = {
              id: externalId + '_' + now,
              lastInteractionTime: now,
            };
          } else {
            if (log.info) {
              log.info('Last interaction happended before configured session timeout. Keeping id and update last interaction');
            }
            ConversationMap[externalId].lastInteractionTime = Date.now();
          }

          externalId = ConversationMap[externalId].id;
        } else {
          // we are just creating it, so we can use the message id as external identifier.
          ConversationMap[externalId] = {
            id: externalId,
            lastInteractionTime: Date.now(),
          };
        }

        // Check if response should be treated like simple text or if we requested some input
        // if input, we need to send it as formData

        let messageToSend = {};

        // resetPath
        if (message.text && message.text.toLowerCase() === 'reset') {
          if (log.info) {
            log.info('Going to reset client session.');
          }

          delete ConversationMap[externalId];
          service.resetSession(externalId);

          const resetResponse = {
            interact: [
              new TextModel('Reset done!'),
            ],
          };

          return responder.respond(resetResponse, message, config.apiToken);
        }

        const queuedFormData = ConversationMap[externalId].formDataQueue;
        if (queuedFormData) {
          if (log.info) {
            log.info('Received message as a response %s to queued form data %s.', message.text, JSON.stringify(queuedFormData));
          }

          // Note - We can only get one at a time from the facebook client. We are expecting that interact won´t
          // return a form with more than one input!

          if (queuedFormData.length > 1) {
            return log.error('We received more than one input form request from interact. this is not valid for facebook clients!');
          }

          queuedFormData.map((formData) => {
            messageToSend.formData = [
              {
                key: formData.key,
                value: message.text,
              },
            ];
          });

          // remove queued form data.
          delete ConversationMap[externalId].formDataQueue;
        } else {
          // if quick reply we need to check if we have to continue the flow. Meaning we need to submit form data.

          if (message.payload) {
            messageToSend.formData = [
              {
                key: message.payload.sectionId,
                value: message.payload.choice.parameterId,
              },
            ];
          } else {
            messageToSend.text = message.text;
          }
        }

        service.sendMessage(externalId, messageToSend, spui).then((response) => {
          // generate interact model
          const mappedResponse = mapper.translate(response);

          // check if we have form data. If so, we store it
          mappedResponse.interact.map((item) => {
            if (item.type === TextInputModel.default.name) {
              if (!ConversationMap[externalId].formDataQueue) {
                ConversationMap[externalId].formDataQueue = [];
              }

              ConversationMap[externalId].formDataQueue.push({
                key: item.parameterId,
                value: null,
              });
            }
          });

          // send via facebook responder
          responder.respond(mappedResponse, message, config.apiToken);
        });
      });
    } catch (ex) {
      log.error('Error on facebook message handler,\n %s', stringify(ex));
      log.error('Error on facebook message handler.\n Message:  %s \nStack:', ex.message, ex.stack);
    }

  };

  FacebookWebHook.remoteMethod('receiveMessage', {

    accepts: [
      {arg: 'data', type: 'object', http: {source: 'body'}},
    ],
    http: {
      path: '/webhook',
      verb: 'post',
    },
    returns: {type: 'string', root: true},

  });
};
