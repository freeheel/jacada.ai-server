'use strict';

const log = require('../util/logging').log('IntentHelper');
const axios = require('axios');

const NodeCache = require('node-cache');
const myIntentListCache = new NodeCache({stdTTL: (60), checkperiod: 30});
const myIntentDetailsCache = new NodeCache({stdTTL: (60), checkperiod: 30});

module.exports = function (IntentHelper) {
  // client dev key mapping

  const baseUrl = 'https://api.dialogflow.com/v1/';

  IntentHelper.intents = function (clientAccessKey, cb) {
    if (log.debug) {
      log.debug('intents', clientAccessKey);
    }

    const IntentKeyMapping = require('../../server/server').models.IntentKeyMapping;

    IntentKeyMapping.findOne({
      where: {
        clientAccessKey: clientAccessKey,
      },
    }, (err, mapping) => {
      if (err || !mapping) {
        return cb('Unknown client access key. You have to configure the mapping first.');
      }

      if (myIntentListCache.get(mapping.developerAccessKey)) {

        if(log.debug) {
          log.debug('Found result in cache');
        }


        cb(null, myIntentListCache.get(mapping.developerAccessKey));

      } else {
        if(log.debug) {
          log.debug('Result is not cached, going to do request.');
        }


        axios.get(baseUrl + 'intents', {
          headers: {
            Authorization: 'Bearer ' + mapping.developerAccessKey,
          },
          params: {
            v : '20170910',
            lang: 'en',
          },
        }).then((response) => {

          myIntentListCache.set(mapping.developerAccessKey, response.data, (cacheResult) => {
            if(log.debug) {
              log.debug('added to cache');
            }
          });

          cb(null, response.data);

        }).catch((err) => {
          cb(err);
        });
      }
    });

  };

  IntentHelper.remoteMethod('intents', {
    accepts: [
      {arg: 'clientAccessKey', type: 'string'},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {
      path: '/intents',
      verb: 'get',
    },
  });

  IntentHelper.intentDetails = function (clientAccessKey, intentId, cb) {
    if (log.debug) {
      log.debug('intents', clientAccessKey);
    }

    const IntentKeyMapping = require('../../server/server').models.IntentKeyMapping;

    IntentKeyMapping.findOne({
      where: {
        clientAccessKey: clientAccessKey,
      },
    }, (err, mapping) => {
      if (err || !mapping) {
        return cb('Unknown client access key. You have to configure the mapping first.');
      }

      if(myIntentDetailsCache.get(intentId)) {
        cb(null, myIntentDetailsCache.get(intentId));
      } else {
        axios.get(baseUrl + 'intents/' + intentId, {
          headers: {
            Authorization: 'Bearer ' + mapping.developerAccessKey,
          },
          params: {
            v : '20170910',
            lang: 'en',
          },
        }).then((response) => {

          myIntentDetailsCache.set(intentId,response.data, (cached) => {
            if(log.debug) {
              log.debug('added to cache');
            }
          });

          cb(null, response.data);

        }).catch((err) => {
          cb(err.message);
        });
      }
    });

  };

  IntentHelper.remoteMethod('intentDetails', {
    accepts: [
      {arg: 'clientAccessKey', type: 'string'},
      {arg: 'intentId', type: 'string'},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {
      path: '/intentDetails',
      verb: 'get',
    },
  });



};
