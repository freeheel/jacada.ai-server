'use strict';


var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

const PubNub = require('pubnub');
const log = require('../util/logging').log('watson-discovery');

let myPubnub = new PubNub({
  publishKey: 'pub-c-9ef8635f-8eae-4a07-adb8-515edd926442',
  subscribeKey: 'sub-c-2ebd149c-7e1c-11e5-9e96-02ee2ddab7fe',
  ssl: true,
});

module.exports = function (WatsonDiscovery) {

  WatsonDiscovery.query = function (environmentId, collectionId, url, username, password, apiToken, queryText, cb) {


    let discovery;

    if (apiToken) {
      discovery = new DiscoveryV1({
        version: '2018-12-03',
        iam_apikey: apiToken,
        url: url,
      });
    } else {
      discovery = new DiscoveryV1({
        version: '2018-12-03',
        username: username,
        password: password,
        url: url,
      });
    }

    return discovery.query({
      environment_id: environmentId,
      collection_id: collectionId,
      query: queryText,
    }, cb);

  };

  WatsonDiscovery.remoteMethod('query', {
    accepts: [
      {arg: 'environmentId', type: 'string'},
      {arg: 'collectionId', type: 'string'},
      {arg: 'url', type: 'string'},
      {arg: 'username', type: 'string'},
      {arg: 'password', type: 'string'},
      {arg: 'apiToken', type: 'string'},
      {arg: 'queryText', type: 'string'},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {
      verb: 'get',
    },
  });

  WatsonDiscovery.triggerSearch = function (spui, query, cb) {

    log.info('triggerSearch for spui %s and query %s', spui, query);

    myPubnub.publish({
      channel: 'TriggerSearch - ' + spui,
      message: {
        name: 'KnowledgeSearch',
        query: query,
      },
    }, function (status, response) {
      if (status.error) {
        log.error('Error sending triggerSearch', status);
        cb(status.error);
      } else {
        log.debug('triggerSearch send');
        cb(null, {
          sendAt: response.timetoken,
        });
      }
    });

  };

  WatsonDiscovery.remoteMethod('triggerSearch', {
    accepts: [
      {arg: 'spui', type: 'string'},
      {arg: 'query', type: 'string'},
    ],
    http: {
      verb: 'post',
    },
  });

};
