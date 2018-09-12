const PubNub = require('pubnub');
const Promise = require('bluebird');
const log = require('../util/logging').log('bot-communication');

let chatbotPubNub = new PubNub({
  publishKey: 'pub-c-7119ab56-ade7-484a-a600-2fc0b356766c',
  subscribeKey: 'sub-c-6e57d142-b262-11e7-af03-56d0cae65fed',
});

let humanAssistantPubNub = new PubNub({
  publishKey: 'pub-c-9ef8635f-8eae-4a07-adb8-515edd926442',
  subscribeKey: 'sub-c-2ebd149c-7e1c-11e5-9e96-02ee2ddab7fe',
  ssl: true,
});

function sendSimpleTextMessage(internalBotSessionId, message) {

  let deferred = Promise.defer();

  chatbotPubNub.publish({
    message: message,
    channel: message.chatBotInternalSessionId,
  }, function (status, response) {
    if (status.error) {
      // handle error
      if (log.error) {
        log.error('Error sending chatbot async message', status);
      }
      deferred.reject('Error sending chatbot async message');
    } else {
      if (log.debug) {
        log.debug('sendAsyncBotMessage published for session %s at %s', message.chatBotInternalSessionId, response.timetoken);
      }
      deferred.resolve(response.timetoken);
    }
  });

  return deferred.promise;

}

module.exports = {
  sendSimpleTextMessage: sendSimpleTextMessage
};
