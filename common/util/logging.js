const winston = require('winston');
const grayLog = require('winston-tcp-graylog');
const _ = require('underscore');
const package = require('../../package');

let facility = 'interact-ai_local';
let loggingLevel = 'info';

let defaultLevel = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5,
};

const existingLoggers = {};

if (process.env.FACILITY) {
  facility = process.env.FACILITY;
  console.log('Setting facility to: ' + facility);
} else {
  console.log('Using default facility ' + facility);
}

if (process.env.LOGGING_LEVEL) {
  loggingLevel = process.env.LOGGING_LEVEL.toLowerCase();
  console.log('Setting logging level to: ' + loggingLevel);
} else {
  console.log('Using default logging level ' + loggingLevel);
}

let grayLogHost = '172.30.1.194';
let grayLogPort = 12201;
if (process.env.LOGGING_HOST) {
  grayLogHost = process.env.LOGGING_HOST;
}
if (process.env.LOGGING_PORT) {
  grayLogHost = parseInt(process.env.LOGGING_PORT);
}

let options = {
  gelfPro: {
    adapterName: 'tcp',
    adapterOptions: {
      host: grayLogHost,
      port: grayLogPort,
    },
    fields: {
      facility: facility,
      owner: 'ai-server',
      env: process.env.NODE_ENV,
      logger: 'standard',
    },
  },
  baseMsg: {
    appVersion: package.version || 'unknown version',
    facility: package.name || 'app-dir',
  },
  name: 'grayLogLogger'
};

console.info('Log options are set to ', options);

function log(name, level) {

  console.log('request logger %s with level %s', name, level);

  // options.level = level;

  let logger = existingLoggers[name];
  if (!logger) {

    if (!level) {
      level = loggingLevel;
    }
    if ('production' == process.env.NODE_ENV || 'test' == process.env.NODE_ENV) {

      let loggerOptions = _.clone(options);
      loggerOptions.baseMsg.logger = name;

      let grayLogLogger = new winston.transports.TcpGraylog(loggerOptions);

      logger = new (winston.Logger)({
        transports: [
          new (winston.transports.Console)({
            name: 'consoleLogger',
          }),
          grayLogLogger,
        ],
      });
    } else {
      let loggerOptions = _.clone(options);
      loggerOptions.baseMsg.logger = name;
      loggerOptions.level = level;
      loggerOptions.gelfPro.adapterOptions.host = '127.0.0.1';

      let grayLogLogger = new winston.transports.TcpGraylog(loggerOptions);

      logger = new (winston.Logger)({
        transports: [
          new (winston.transports.Console)({
            name: 'consoleLogger',
          }),
          new (winston.transports.File)({filename: 'logs.log', name: 'fileLogger'}),
          grayLogLogger,
        ],
      });

    }

    logger.name = name;
    existingLoggers[name] = logger;

    setLevelForLogger(level, name);

  }

  return logger;
}

function getAllLogger() {
  return existingLoggers;
}

function setLevelForLogger(newMinLevel, loggerName) {
  let newLevels = {};

  let levelNumber = defaultLevel[newMinLevel];

  // adjust it
  _.each(defaultLevel, (number, name) => {
    if (number <= levelNumber) {
      newLevels[name] = number;
    }
  });

  existingLoggers[loggerName].setLevels(newLevels);

  _.each(existingLoggers[loggerName].transports, (logger) => {
    logger.level = newMinLevel;
  });

  // set levels bellow to nothing but have function there.

  var logger = existingLoggers[loggerName];

  let emptyFunc = () => {

  };

  switch (newMinLevel) {
    case 'error':

      logger.warn = emptyFunc;

    case 'warn':

      logger.info = emptyFunc;

    case 'info':

      logger.verbose = emptyFunc;

    case 'verbose':

      logger.debug = emptyFunc;

    case 'debug':

      logger.silly = emptyFunc;

    case 'silly':

  }

  return existingLoggers[loggerName];
}

function changeLevelForAll(newMinLevel) {

  _.each(existingLoggers, (logger, name, list) => {
    setLevelForLogger(newMinLevel, name);
  });
}

function performanceLog() {
  let logger = log('performance');

  let logWrapper = {
    logger: logger,
    log: function (stepOrMethod, message) {
      this.logger.info('performance - %s - %s - %s', Date.now(), stepOrMethod, message);
    },
  };

  return logWrapper;
}

module.exports = {
  log: log,
  getAllLogger: getAllLogger,
  changeLevelForAll: changeLevelForAll,
  setLevelForLogger: setLevelForLogger,
  performanceLog: performanceLog,
};
