'use strict';


var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

module.exports = function (WatsonDiscovery) {

  var discovery = new DiscoveryV1({
    version: '2018-12-03',
    username: '13b95494-0632-490d-aa32-1230ad5376e6',
    password: 'l5qrTVbzgcI0',
    url: 'https://gateway.watsonplatform.net/discovery/api'
  });


  WatsonDiscovery.query = function (queryText, cb) {

    return discovery.query({
      environment_id: '8224988f-044f-4817-944f-ca62c3c311cd',
      collection_id: 'fe9ba82e-a30d-4f7e-8706-76235c2f07e5',
      query: queryText,
    }, cb);

  };


  WatsonDiscovery.remoteMethod('query', {
    accepts: [
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
