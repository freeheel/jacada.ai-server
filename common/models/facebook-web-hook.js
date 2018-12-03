'use strict';
const FacebookProfileHelper = require('../util/social/facebook/FacebookProfileHelper').default;

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

const _ = require('underscore');

const stringify = require('json-stringify-safe');

require('../util/social/facebook/FacebookProfileHelper');


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


      log.info('receiveMessage with payload %s', stringify(payload));

      const BotHelper = require('../../server/server').models.BotHelper;

      // parse message from facebook
      let messages = parser.parseMessage(payload);

      log.info('Parsing result: %s', messages);

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
          return log.error('We don´t have a configuration for the receiverId %s and sender %s', message.receiverId, message.senderId);
        }

        if (log.info) {
          log.info('Found facebook config for receiver %s and sender %s', message.receiverId, message.senderId);
        }

        // find spui
        // this might not be enough, since the senderId may change.
        // we can map the senderId to the fbUserId, but this does require an additional api call.
        // so let's do it more smartly by checking if we find the senderId mapped already, if not get the userId and see if we have this one, if not
        // create an warning log that for this user we need to call 'config spui'
        let spui;
        if (config.spuiMapping) {
          config.spuiMapping.map((item) => {
            if (item.senderId === message.senderId) {
              spui = item.spui;
              log.info('Found spui config for sender %s. Spui set to %s', message.senderId, spui);
            }
          });
        }


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
              log.info('Last interaction happened before configured session timeout. Keeping id and update last interaction');
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

        ConversationMap[externalId].apiToken = config.apiToken;
        ConversationMap[externalId].recipientId = message.senderId;

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

        // config service path
        if (message.text && message.text.toLowerCase().startsWith('config')) {
          const splits = message.text.toLowerCase().split(' ');

          if (log.info) {
            log.info('Going to send client configuration');
          }

          if (splits.length > 1) {
            log.info('Looking up profile for sender %s to add it to spui %s', message.senderId, splits[1]);
            return new FacebookProfileHelper(config.apiToken).readProfile(message.senderId).then((profile) => {

              let text = 'senderId: ' + message.senderId;
              text += '\nreceiverId: ' + message.receiverId;
              text += '\nfirstname: ' + profile.firstname
              text += '\nlastname: ' + profile.lastname;
              text += '\nid: ' + profile.id;
              text += '\npicUrl: ' + profile.picUrl + '\n\n';

              const configResponse = {
                interact: [
                  new TextModel(text),
                ],
              };

              if (!config.spuiMapping) {
                config.spuiMapping = [];
              } else {
                // check if we already have something for the spui
                let spuiConf;
                config.spuiMapping.map((conf) => {
                  if (conf.spui === splits[1]) {
                    spuiConf = conf;
                  }
                });

                if (spuiConf) {
                  spuiConf.senderId = message.senderId;
                  spuiConf.fbProfile = profile;
                } else {
                  spuiConf = {
                    spui: splits[1],
                    senderId: message.senderId,
                    fbProfile: profile
                  }
                  config.spuiMapping.push(spuiConf);
                }

              }

              config.save((err, updatedConfig) => {
                return responder.respond(configResponse, message, config.apiToken);
              });

            });
          } else {
            let text = 'senderId: ' + message.senderId;
            text += '\nreceiverId: ' + message.receiverId;
            text += '\nconfig: ' + stringify(config);

            const configResponse = {
              interact: [
                new TextModel(text),
              ],
            };

            return responder.respond(configResponse, message, config.apiToken);
          }
        }




        // check if we have agent chat enabled already

        if (ConversationMap[externalId] && ConversationMap[externalId].enableChat) {
          log.info('Agent chat is enabled. We are not going to send the message to interact instead we will push it straight to the client');

          BotHelper.sendChatMessage('customer', ConversationMap[externalId].instanceUniqueId, message.text, function (err, success) {

          });
          return;
        }

        // Check if response should be treated like simple text or if we requested some input
        // if input, we need to send it as formData








        let queuedFormData;
        if (ConversationMap[externalId] && ConversationMap[externalId].formDataQueue) {
          queuedFormData = ConversationMap[externalId].formDataQueue;
        }

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

        if (!spui) {
          log.info('Trying to find spui based on fb user id for sender %s', message.senderId);

          new FacebookProfileHelper(config.apiToken).readProfile(message.senderId).then((fbProfile) => {

            log.info('Received fb profile for senderId %s', message.senderId);

            config.spuiMapping.map((spuiMapping) => {
              if (spuiMapping.fbProfile && spuiMapping.fbProfile.id === fbProfile.id) {
                log.info('Found spui mapping based on fbProfile config. Going to up date senderId from %s to %s', spuiMapping.senderId, message.senderId);
              }
              spuiMapping.senderId = message.senderId;
              spui = spuiMapping.spui;
            });

            if (spui) {
              log.info('Going to save new config');

              config.save((err, updatedConfig) => {

              });

            }

          }).catch((err) => {

            log.error('Error getting fb profile for senderId %s and apiToken %s', message.senderId, config.apiToken);

          }).finally(() => {

            service.sendMessage(externalId, messageToSend, spui).then((data) => {
              // generate interact model
              ConversationMap[externalId].instanceUniqueId = data.instanceUniqueId;

              const mappedResponse = mapper.translate(data.response);

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
        } else {
          service.sendMessage(externalId, messageToSend, spui).then((data) => {
            // generate interact model

            ConversationMap[externalId].instanceUniqueId = data.instanceUniqueId;

            const mappedResponse = mapper.translate(data.response);

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
        }
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

  FacebookWebHook.enableAgentChat = function (uniqueId) {

    // find Conversation
    _.each(ConversationMap, (value, key) => {
      if (value.instanceUniqueId === uniqueId) {
        value.enableChat = true;
        return true;
      }
    });

    return false;

  };

  FacebookWebHook.disabelAgentChat = function (uniqueId) {

    _.each(ConversationMap, (value, key) => {
      if (value.instanceUniqueId === uniqueId) {
        value.enableChat = false;
        return true;
      }
    });

    return false;
  };

  FacebookWebHook.getConfigByUniqueId = function (uniqueId) {
    let config;
    _.each(ConversationMap, (value, key) => {
      if (value.instanceUniqueId === uniqueId) {
        config = value;
      }
    });

    return config;
  }

};
