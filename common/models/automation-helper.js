'use strict';


const PubNub = require('pubnub');
const log = require('../util/logging').log('automation-helper', 'debug');
const uuidv4 = require('uuid/v4');

const EventEmitter = require('events');
const newTransactionResult = new EventEmitter();

const NodeCache = require("node-cache");
const transactionRequestCache = new NodeCache({stdTTL: 600, checkperiod: 120});
const transactionResultCache = new NodeCache({stdTTL: 600, checkperiod: 120});
const triggerIntentCache = new NodeCache({stdTTL: 600, checkperiod: 120});

let myPubnub = new PubNub({
  publishKey: 'pub-c-cab00ba3-c674-4ee0-91ea-3d3d3180e43b',
  subscribeKey: 'sub-c-a37d7066-0992-11e8-b131-0a982f425d04',
  ssl: true,
});

module.exports = function (AutomationHelper) {

  // pub-c-cab00ba3-c674-4ee0-91ea-3d3d3180e43b
  // sub-c-a37d7066-0992-11e8-b131-0a982f425d04




  myPubnub.addListener({
    message: (m) => {
      log.debug('Got transaction result message');

      let transactionId = m.message.transactionId;
      let result = m.message.result;

      if (typeof result === 'string') {
        result = JSON.parse(result);
      }
      result.receivedAt = Date.now();
      newTransactionResult.emit('newResult', {
        result: result,
        transactionId: transactionId,
      });

      transactionResultCache.set(transactionId, result, (err, success) => {
        if (err) {
          log.error('Received transaction result but unable to push into cache');

        } else {
          log.debug('New transaction result available in cache.');
        }
      });

      const BotHelper = require('../../server/server').models.BotHelper;

      let botAutomationCommand = triggerIntentCache.get(transactionId);
      if(botAutomationCommand) {
        log.debug('Bot automation command found %s', botAutomationCommand);
        BotHelper.sendBotCommand(botAutomationCommand, (err, res) => {
          if(err) {
            log.error('Error sending ot command ');
          } else {
            log.debug('Bot command send');
          }
        });
      } else {
        log.debug('No bot automation command found.');
      }

    },
  });

  myPubnub.subscribe({
    channels: ['transactionResults'],
  });

  AutomationHelper.triggerAutomation = function (automationCommand, cb) {

    let transactionId = uuidv4();
    if (automationCommand.transactionId && automationCommand.transactionId.trim().length > 0) {
      transactionId = automationCommand.transactionId;
    }

    automationCommand.triggeredAt = Date.now();

    transactionRequestCache.set(transactionId, automationCommand, (err, success) => {
      if (err) {
        return cb(err);
      }

      automationCommand.transactionId = transactionId;

      myPubnub.publish({
        channel: automationCommand.spui,
        message: automationCommand,
      }, (status, response) => {
        if (status.error) {
          log.error('Unable to send automation command', status.error);
          return cb(status.error);
        }

        log.debug('Automation Command send');

        return cb(null, transactionId);

      });

    });

  };

  AutomationHelper.remoteMethod('triggerAutomation', {
    accepts: [
      {arg: 'automationCommand', type: 'AutomationCommand', http: {source: 'body'}},
    ],
    returns: {
      arg: 'transactionId', type: 'string',
    },
    http: {
      path: '/triggerAutomation',
      verb: 'post',
    },
  });

  // TODO - add some max timeout?
  AutomationHelper.retrieveAutomationResult = function (transactionId, waitUntil, cb) {

    let transactionResult = transactionResultCache.get(transactionId);

    if (!waitUntil) {

      if (transactionResult) {
        return cb(null, transactionResult);
      } else {
        return cb('Result not yet available');
      }
    } else {

      if (transactionResult) {
        return cb(null, transactionResult);
      } else {
        // TODO implement some async mode.

        const callback = (message) => {

          if (message.transactionId === transactionId) {
            newTransactionResult.removeListener('newResult', callback);
            return cb(null, message.result);
          } else {
            log.debug('New result does not match awaiting transactionId');
          }
        };

        newTransactionResult.on('newResult', callback);
      }
    }
  };

  AutomationHelper.remoteMethod('retrieveAutomationResult', {
    accepts: [
      {arg: 'transactionId', type: 'string'},
      {arg: 'waitUntil', type: 'boolean'},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'},
    },
    http: {
      path: '/retrieveAutomationResult',
      verb: 'get',
    },
  });


  AutomationHelper.triggerIntentWhenDone = function(command, cb) {
    triggerIntentCache.set(command.transactionId, command, ()=> {
      cb(null,command);
    });

  };

  AutomationHelper.remoteMethod('triggerIntentWhenDone', {
    accepts: [
      {arg: 'botCommand', type: 'BotCommand', http: {source: 'body'}},
    ],
    returns: {
      arg: 'result', type: 'string',
    },
    http: {
      path: '/triggerIntentWhenDone',
      verb: 'post',
    },
  });


};
