'use strict';

const log = require('./logging').log('sentiment');
const Promise = require('bluebird');
const axios = require('axios');

const SENTIMENT_ENDPOINT = 'https://utilities1.gointeract.io/sentiment/analyseSentiment';

function analyze(text) {

  if (log.debug) {
    log.debug('Going to analyze text %s', text);
  }

  let deferred = Promise.defer();

  axios({
    method: 'post',
    url: SENTIMENT_ENDPOINT,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      text: text,
    }),
  }).then((result) => {
    if (log.debug) {
      log.debug('Done analyzing text %s with result %s', text, result.data);
    }

    deferred.resolve(result.data);
  }).catch((err) => {
    if (log.error) {
      log.error('Error analyzing text \n%s', err.message);
    }
    deferred.reject(err);
  });

  return deferred.promise;

}

module.exports = {
  analyze: analyze,
};
