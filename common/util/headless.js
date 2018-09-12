/*
 * headless
 * https://github.com/freeheel/jacada_services
 *
 * Copyright (c) 2017 freeheel80
 * Licensed under the MIT license.
 */

'use strict';

const axios = require('axios');
const Promise = require('bluebird');

const log = require('./logging').log('api.ai - headless');
const pLog = require('./logging').performanceLog();

const _ = require('underscore');
const baseurl = 'https://gointeract.io';

/**
 *
 * @param tenant
 * @param appKey
 * @param interactionId
 * @param params
 */
function createInteraction(tenant, appKey, interactionId, params) {

  let deferred = Promise.defer();

  if (log.info) {
    log.info('Create Interaction for tenant %s with appKey %s and interactionId %s and params %a', tenant, appKey, interactionId, params);
  }

  let pStart = Date.now();

  let url = '/interact/version/1/account/' + tenant + '/interaction/' + interactionId;

  // adding params
  let adder = '?';
  _.each(params, function(value, key) {
    url += adder + key + '=' + value;
    if (adder === '?') {
      adder = '&';
    }
  });

  try {
    axios({
      method: 'post',
      baseURL: baseurl,
      url: url,
      headers: {
        'Tenant-Id': tenant,
        'Application-Key': appKey,
        'Channel-Type': 'MOBILE_WEB',
      },
    })
      .then(function(response) {
        if (log.debug) {
          log.debug('Headers are \n%s', JSON.stringify(response.headers));
        }

        let interactionInstance = {
          instanceId: response.headers['object-instance-id'],
          uniqueId: response.headers['user-id'],
          tenant: tenant,
          appKey: appKey,
        };

        if (log.debug) {
          log.debug('Going to return \n', JSON.stringify(interactionInstance));
        }

        pLog.log('createInteraction', 'it took ' + (Date.now() - pStart) + 'ms');

        deferred.resolve(interactionInstance);

      })
      .catch(function(err) {

        pLog.log('createInteraction with Error', 'it took ' + (Date.now() - pStart) + 'ms');

        if (log.error) {
          log.error('Error creating interaction for tenant %s with interactionId %s. \n%s', tenant, interactionId, err.message);
        }

        if(err.response && err.response.data && err.response.data.message && err.response.data.message.indexOf('cannot be found') > -1) {
          let error = new Error('Interaction not found');
          error.code = '404';
          deferred.reject(error);
        } else {
          deferred.reject(err);
        }

      });
  } catch (e) {

    pLog.log('createInteraction with Error', 'it took ' + (Date.now() - pStart) + 'ms');

    if (log.error) {
      log.error(e.message);
    }
    deferred.reject('Error creating interaction %s' + e.message);
  }

  return deferred.promise;

}

function navigateNext(tenantId, appKey, interactionId, interactionInstanceId, params) {

  let deferred = Promise.defer();

  let payload = {
    navigationType: 'NEXT',
  };

  if (params) {
    payload.param = params;
  }

  let start = new Date();

  try {
    axios({
      method: 'post',
      baseURL: baseurl,
      url: '/interact/version/1/account/' + tenantId + '/interaction/' + interactionId + '/' + interactionInstanceId + '/navigation',
      data: JSON.stringify(payload),
      headers: {
        'Tenant-Id': tenantId,
        'Application-Key': appKey,
        'Channel-Type': 'MOBILE_WEB',
        'Content-Type': 'application/json',
      },
    })
      .then(function(response) {
        if (log.debug) {
          log.debug('Headers: ' + JSON.stringify(response.headers));
        }
        pLog.log('navigateNext', 'it took ' + (Date.now() - start) + 'ms');

        deferred.resolve(response);
      })
      .catch(function(err) {
        if (log.error) {
          log.error('Error navigating interactionInstanceId %s for interactionId %s ', interactionInstanceId, interactionId);
        }
        if (err instanceof Error) {
          deferred.reject(err);
        } else {
          deferred.reject('Error navigateForward');
        }
      });
  } catch (e) {
    if (log.error) {
      log.error('Error navigating next', e.message);
    }
    deferred.reject(e);
  }

  return deferred.promise;

}

function navigateGoTo(tenantId, appKey, interactionId, interactionInstanceId, params) {

  let deferred = Promise.defer();

  let payload = {
    navigationType: 'GO_TO',
  };

  if (params) {
    payload.param = params;
  }

  let start = new Date();

  try {
    axios({
      method: 'post',
      baseURL: baseurl,
      url: '/interact/version/1/account/' + tenantId + '/interaction/' + interactionId + '/' + interactionInstanceId + '/navigation',
      data: JSON.stringify(payload),
      headers: {
        'Tenant-Id': tenantId,
        'Application-Key': appKey,
        'Channel-Type': 'MOBILE_WEB',
        'Content-Type': 'application/json',
      },
    })
      .then(function(response) {
        if (log.debug) {
          log.debug('Headers: ' + JSON.stringify(response.headers));
        }
        pLog.log('navigateGoTo', 'it took ' + (Date.now() - start) + 'ms');

        deferred.resolve(response);
      })
      .catch(function(err) {
        if (log.error) {
          log.error('Error navigating goto interactionInstanceId %s and interactionId %s', interactionInstanceId, interactionId);
          log.error('Error navigating goto instance', err.message);
        }
        if (err instanceof Error) {
          deferred.reject(err);
        } else {
          deferred.reject('Error navigateForward');
        }
      });
  } catch (e) {
    if (log.error) {
      log.error('Error navigating next', e.message);
    }
    deferred.reject(e);
  }

  return deferred.promise;

}

module.exports = {
  createInteraction: createInteraction,
  navigateNext: navigateNext,
  navigateGoTo: navigateGoTo,
};
