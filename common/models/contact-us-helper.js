'use strict';

const PubNub = require('pubnub');
const log = require('../util/logging').log('bot-helper');

const stringify = require('json-stringify-safe');

let myPubnub = new PubNub({
  publishKey: 'pub-c-9ef8635f-8eae-4a07-adb8-515edd926442',
  subscribeKey: 'sub-c-2ebd149c-7e1c-11e5-9e96-02ee2ddab7fe',
  ssl: true,
});

module.exports = function (ContactUsHelper) {

  ContactUsHelper.transferToChat = function (contactUsCommand, cb) {

    log.info('transferToChat with command %s', stringify(contactUsCommand));

    myPubnub.publish({
      message: {
        action: 'chatAssistant',
        command: contactUsCommand,
      },
      channel: contactUsCommand.spui,
    }, function (status, response) {
      if (status.error) {
        log.error('Error sending transferToChat \nstatus: %s \nresponse:  %s', stringify(status), stringify(response));
        cb(status.error);
      } else {
        log.debug('transferToChat send');
        cb(null, {
          sendAt: response.timetoken,
        });
      }
    });

  };

  ContactUsHelper.remoteMethod('transferToChat', {
    accepts: [
      {arg: 'contactUsCommand', type: 'ContactUsCommand', http: {source: 'body'}},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {path: '/transferToChat', verb: 'post'},
  });

};
