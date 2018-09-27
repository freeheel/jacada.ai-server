'use strict';

const PubNub = require('pubnub');
const log = require('../util/logging').log('bot-helper');

let myPubnub = new PubNub({
  publishKey: 'pub-c-9ef8635f-8eae-4a07-adb8-515edd926442',
  subscribeKey: 'sub-c-2ebd149c-7e1c-11e5-9e96-02ee2ddab7fe',
  ssl: true,
});

module.exports = function (BotHelper) {

  BotHelper.requestBotAssistant = function (spui, conversationId, reason, reasonDetails, script, cb) {

    myPubnub.publish({
      message: {
        action: 'botAssistant',
        conversationId: conversationId,
        reason: reason,
        reasonDetails: reasonDetails,
        script: script,
      },
      channel: spui,
    }, function (status, response) {
      if (status.error) {
        log.error('Error sending chatbot assistant request', status);
        cb(status.error);
      } else {
        log.debug('requestBotAssistant send');
        cb(null, {
          sendAt: response.timetoken,
        });
      }
    });

  };

  BotHelper.remoteMethod('requestBotAssistant', {
    accepts: [
      {arg: 'spui', type: 'string'},
      {arg: 'conversationId', type: 'string'},
      {arg: 'reason', type: 'string'},
      {arg: 'reasonDetails', type: 'string'},
      {arg: 'script', type: 'string'},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {path: '/requestBotAssistant', verb: 'get'},
  });

  BotHelper.sendBotCommand = function (botCommand, cb) {

    myPubnub.publish({
        channel: botCommand.conversationId,
        message: {
          command: botCommand.command,
          payload: botCommand.payload,
        },
      }, function (status, response) {
        if (status.error) {
          log.error('Error sending sendBotCommand', status);
          cb(status.error);
        } else {
          log.debug('sendBotCommand send');
          cb(null, {
            sendAt: response.timetoken,
          });
        }
      }
    );
  };

  BotHelper.remoteMethod('sendBotCommand', {
    accepts: [
      {arg: 'botCommand', type: 'BotCommand', http: {source: 'body'}},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {path: '/sendBotCommand', verb: 'post'},
  });

  BotHelper.sendChatMessage = function (from, sendTo, message, cb) {

    myPubnub.publish({
      channel: sendTo,
      message: {
        from: from,
        text: message,
      },
    });

    // set facebook listener to get messages.

    const FacebookWebHook = require('../../server/server').models.FacebookWebHook;

    FacebookWebHook.enableAgentChat(sendTo);

    // TODO
    // send message to facebook.


    cb(null, sendTo);

  };

  BotHelper.remoteMethod('sendChatMessage', {
    accepts: [
      {
        arg: 'from',
        type: 'string',
      },{
        arg: 'sendTo',
        type: 'string',
      }, {
        arg: 'message',
        type: 'string',
      },
    ],
    returns: {
      arg: 'result',
      type: 'string',
    },
    http: {
      path: '/sendChatMessage',
      verb: 'post',
    },
  });

};
