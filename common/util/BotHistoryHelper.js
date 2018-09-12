'use strict';

let redis = require('redis');
let bluebird = require('bluebird');
let log = require('../util/logging').log('se - redis-bot history - ');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let defaultHost = '172.30.1.194';
if (process.env.REDIS_HOST) {
  defaultHost = process.env.REDIS_HOST;
}

let client = redis.createClient({
  host: defaultHost
});

client.on('error', function (err) {
  log.error('Redis error ' + err);
});
client.on('ready', function () {
  log.info('Redis connection ready ');
});

module.exports = {

  /**
   * Set a value into the redis store
   * @param key
   * @param value
   */
  setValue(key, value) {
    return client.setAsync(key, value);
  },

  /**
   * Get a value from the redis store.
   * The return object is a promise
   * @param key
   * @return Promise
   */
  getValue(key) {
    return client.getAsync(key);
  },


};
