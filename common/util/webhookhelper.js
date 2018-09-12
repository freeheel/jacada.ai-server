'use strict';

const _ = require('underscore');
const log = require('./logging').log('webhookhelper');
const Promise = require('bluebird');
const headless = require('./headless');

function getInteractActionResponse(config) {

  let deferred = Promise.defer();

  let params = {};

  _.each(config.aiPayload.result.parameters, function(value, key) {
    params['ai_' + key] = value;
  });

  _.each(config.aiPayload.result.contexts, function(value, key) {

    _.each(value.parameters, function(value, key) {
      params['ai_' + key] = value;
    });

  });

  params['ai_userQuery'] = config.aiPayload.result.resolvedQuery;

  params['ai_action'] = config.aiPayload.result.action;
  params['ai_bot_session_id'] = config.aiPayload.sessionId;

  if (log.debug) {
    log.debug('URL Params for interaction: \n%s', JSON.stringify(params));
  }

  let createPromise = headless.createInteraction(config.interact.tenant, config.interact.appKey, config.interact.interactionId, params);
  createPromise.then(function success(data) {
    if (log.debug) {
      log.debug('created interaction with result \n%s', JSON.stringify(data));
    }

    let navigatePromise = headless.navigateNext(config.interact.tenant, config.interact.appKey, config.interact.interactionId, data.instanceId);
    navigatePromise.then(function success(result) {

      if (log.debug) {
        log.debug(JSON.stringify(result.data.interaction.page.pageContent));
      }

      deferred.resolve(result.data.interaction.page.pageContent);

    }, function err(err) {
      if (log.error) {
        log.error('Error during navigate next', err);
      }
    }).catch(function(err) {
      if (log.error) {
        log.error('Error during navigate next', err);
      }
      deferred.reject('Error during navigate next: %s', err.message);
    });

  }, function err(err) {
    if (log.error) {
      log.error('Error during create interaction. \n', err);
    }
  }).catch(function(err) {
    if (log.error) {
      log.error('Error during create interaction. \n', err);
    }
    deferred.reject(err);
  });

  return deferred.promise;

}

module.exports = {
  getInteractActionResponse: getInteractActionResponse,
};
