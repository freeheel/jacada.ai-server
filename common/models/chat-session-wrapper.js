'use strict';

module.exports = function (Chatsessionwrapper) {

  const log = require('../util/logging').log('Chatsessionwrapper');

  Chatsessionwrapper.bySessionId = function (sessionId, cb) {
    if (log.debug) {
      log.debug('Request bySessionId %s', sessionId);
    }

    Chatsessionwrapper.findOne({
      where: {
        sessionId: sessionId,
      },
    }, (err, instance) => {
      if (err || !instance) {
        if (log.error) {
          log.error('Error finding session by external sessionID %s', sessionId);
        }
        return cb(err);
      }

      if (log.debug) {
        log.debug('Found session for %s. Returning id %s', sessionId, instance.id);
      }

      cb(err, instance);
    });
  };

  Chatsessionwrapper.remoteMethod('bySessionId', {
    accepts: [
      {arg: 'sessionId', type: 'string'},
    ],
    returns: {arg: 'result', type: 'object', http: {source: 'body'}, root: true},
    http: {path: '/bySessionId', verb: 'get'},
  });


  Chatsessionwrapper.addData = function (sessionId, data, cb) {

    var key = data.key;
    var value = data.value;

    if (log.debug) {
      log.debug('Request addData %s', sessionId);
    }

    Chatsessionwrapper.findOne({
      where: {
        sessionId: sessionId,
      },
    }, (err, instance) => {
      if (err || !instance) {
        if (log.error) {
          log.error('Error finding session by external sessionID %s', sessionId);
        }
        return cb(err);
      }

      if (log.debug) {
        log.debug('Found session for %s. Returning id %s', sessionId, instance.id);
      }

      instance.chatData.create({
        key: key,
        value: value,
        chatSessionWrapperId: instance.id,
      }, (err, chatDataInstance) => {

        if (!err && chatDataInstance) {
          if (log.debug) {
            log.debug('create chat data instance %s', chatDataInstance.id);
          }

        }

        cb(err, chatDataInstance);
      });

    });

  }

  Chatsessionwrapper.remoteMethod('addData', {
    accepts: [
      {arg: 'sessionId', type: 'string', http: {source: 'query'}},
      {arg: 'data', type: 'ChatData', http: {source: 'body'}},
    ],
    returns: {arg: 'result', type: 'object', http: {source: 'body'}, root: true},
    http: {path: '/addDataBySessionId', verb: 'post'},
  });


};
