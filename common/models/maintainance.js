'use strict';

const log = require('../util/logging').log('Maintainance');
const stringify = require('json-stringify-safe');

module.exports = function(Maintainance) {

  Maintainance.changeLoggingLevel = function(newLevel, cb) {

    if (log[newLevel]) {
      log[newLevel]('Changing logging level for all loggers to %s', newLevel);
    } else {
      log.warn('Changing logging level for all loggers to %s', newLevel);
    }

    const logConfig = require('../util/logging');

    logConfig.changeLevelForAll(newLevel);

    cb(null, {
      code: '200',
    });

  };

  Maintainance.remoteMethod('changeLoggingLevel', {
    accepts: [
      {arg: 'newLevel', type: 'string'},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {path: '/changeLoggingLevel', verb: 'get'},
  });

  Maintainance.getLoggers = function(cb) {

    if (log.info) {
      log.info('get Loggers');
    }

    const logConfig = require('../util/logging');

    const allLogger = logConfig.getAllLogger();

    if (log.info) {
      log.info('Get loggers result %s', stringify(allLogger));
    }

    cb(null, allLogger);

  };

  Maintainance.remoteMethod('getLoggers', {
    accepts: [
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {path: '/getLoggers', verb: 'get'},
  });

  Maintainance.setLoglevel = function(loggerName, newlevel, cb) {


    if (log.info) {
      log.info('setLoglevel for logger %s with new Level %s', loggerName, newlevel);
    }

    const logConfig = require('../util/logging');
    const logger = logConfig.setLevelForLogger(newlevel, loggerName);

    cb(null, logger);
  };

  Maintainance.remoteMethod('setLoglevel', {
    accepts: [
      {arg: 'loggerName', type: 'string'},
      {arg: 'newlevel', type: 'string'},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {path: '/setLoglevel', verb: 'get'},
  });

};
