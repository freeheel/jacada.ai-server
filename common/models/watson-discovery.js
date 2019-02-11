'use strict';


var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

module.exports = function (WatsonDiscovery) {


  WatsonDiscovery.query = function (environmentId, collectionId, url, username, password, queryText, cb) {

    var discovery = new DiscoveryV1({
      version: '2018-12-03',
      username: username,
      password: password,
      url: url
    });

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
      {arg: 'queryText', type: 'string'},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {
      verb: 'get',
    },
  });

};
