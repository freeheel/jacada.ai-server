'use strict';
const log = require('../util/logging').log('Facebook WebHook');

const InteractService = require('../util/nlp/InteractService').default;

const Parser = require('../util/social/facebook/FacebookMessageParser').default;
let parser = new Parser();

const InteractModelMapper = require('../util/nlp/InteractModelMapper').default;
let mapper = new InteractModelMapper();

const FacebookResponder = require('../util/social/facebook/FacebookResponder').default;
let responder = new FacebookResponder();

module.exports = function(FacebookWebHook) {
  FacebookWebHook.afterRemote('verify', function(context, remoteMethodOutput, next) {
    context.res.setHeader('Content-Type', 'text/plain');
    context.res.end(context.result);
  });

  FacebookWebHook.afterRemote('receiveMessage', function(context, remoteMethodOutput, next) {
    context.res.setHeader('Content-Type', 'text/plain');
    context.res.end(context.result);
  });

  FacebookWebHook.verify = function(mode, challenge, verifyToken, cb) {
    if (log.debug) {
      log.debug('go verification message from facebook server with mode: %s, challange: %s and verificationToken: %s', mode, challenge, verifyToken);
    }

    const FacebookConfig = require('../../server/server').models.FacebookConfig;

    FacebookConfig.findOne({
      where: {
        verifyToken: verifyToken,
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

  let InteractServiceMap = {};

  FacebookWebHook.receiveMessage = function(payload, cb) {
    // ackn response to facebook
    cb(null, 'EVENT_RECEIVED');

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
      service.sendMessage(message.requestId, {
        text: message.text,
      }).then((response) => {
        // generate interact model
        const mappedResponse = mapper.translate(response);

        // send via facebook responder
        responder.respond(mappedResponse, message, config.apiToken);
      });
    });
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
