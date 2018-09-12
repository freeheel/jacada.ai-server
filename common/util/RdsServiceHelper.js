const Promise = require('bluebird');
const RdsApi = require('./rds/JacadaRDSApi');
const log = require('./logging').log('RdsServiceHelper');

class RdsServiceHelper {

  constructor(apiKey, tenantId, source) {
    this._apiKey = apiKey;
    this._tenantId = tenantId;
    this._source = source;
    this._tApi = new RdsApi.TransactioncontrollerApi();
  }

  startTransaction(externalId) {
    let deferred = Promise.defer();

    this._tApi.startTransaction(this._apiKey, this._source, this._tenantId, externalId, null).then((response) => {

      if (log.debug) {
        log.debug('Started new Transaction for externalId %s -- ', externalId, response.body);
      }

      deferred.resolve(response.body);
    }).catch((err) => {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  findTransactionByExternalId(externalId) {
    let deferred = Promise.defer();

    this._tApi.getTransactions(this._apiKey, this._tenantId, null, null, null, externalId, this._source, null, null, null).then((response) => {

      const responseObject = response.body;
      if (responseObject.length === 0) {
        deferred.reject(new Error('Not found'));
      } else {
        if (responseObject.length > 1) {
          if (log.info) {
            log.info('Found more than one transaction for external sessionId %s. Going to return last one!', externalId);
          }
          deferred.resolve(responseObject[responseObject.length - 1]);
        } else {
          deferred.resolve(responseObject[0]);
        }
      }

    }).catch((err) => {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  findOrCreateTransaction(externalId) {

    let deferred = Promise.defer();

    this.findTransactionByExternalId(externalId).then((transaction) => {
      deferred.resolve(transaction, false);
    }).catch((err) => {

      this.startTransaction(externalId).then((transaction) => {
        deferred.resolve(transaction, true);
      }).catch((err) => {
        deferred.reject(err);
      });

    });

    return deferred.promise;
  }

  addOrUpdateAdditionalData(transaction) {

    let deferred = Promise.defer();

    this._tApi.createAdditionalData(this._apiKey, transaction.additionalData, transaction.id, this._tenantId, null).then((updatedTransaction) => {
      if (log.debug) {
        log.debug('Added or updated additional data for transaction %s', updatedTransaction.id, updatedTransaction.body);
      }
      deferred.resolve(updatedTransaction.body);
    }).catch((err) => {
      if (log.error) {
        log.error('Error adding or updating additional data for transaction %s', transaction.id, err);
      }
      deferred.reject(err);
    });

    return deferred.promise;

  }
}

module.exports = RdsServiceHelper;

