'use strict';

const log = require('../../common/util/logging').log('FacebookConfig Setup');

module.exports = function (app) {

  let FacebookConfig = app.models.FacebookConfig;

  FacebookConfig.findOrCreate({
    description: 'DCM-Power'
  }, {
    description: 'DCM-Power',
    verificationToken: 'tomtom',
    apiToken: 'EAAf9fG21ArcBACw8jIYCvbfIG2wFd5utjYcViVO6iT6tpNXKOpOlngXgKEFCwGqKICP3Rr2VlAcZA97ZB09b9d5kOwBORzyiwxB1Ps5BtKm6ZA8NaytpNdliBxu18Hrhof4BMeQvMjY7CVFZAHRxfMvKbcGuqpCcZAzUiiFGCNZAPuBPDK55BucU4SCwF5BRgZD'
  }, (err, instance, created) => {
    log.debug('Created instance %s', created);
  });

};
