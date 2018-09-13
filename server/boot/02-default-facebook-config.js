'use strict';

const log = require('../../common/util/logging').log('FacebookConfig Setup');

module.exports = function (app) {

  let FacebookConfig = app.models.FacebookConfig;

  FacebookConfig.findOrCreate({
    where: {
      description: 'DCM-Power'
    }
  }, {
    description: 'DCM-Power',
    verificationToken: 'tomtom',
    apiToken: 'EAAf9fG21ArcBAJmzIqUCZCb4d1tgCRMWmSpXoAjZBTxBn78aRZCadR7yaVnlYN3Pnj10rnoTSepZARkCMSKsBCMvlIeRSixYmqLlAc9QkFmKyjHTB0jglEF1uiIIXrVvyLHmX0v9UXGWMiXAngOq76ToP1ZAfGIHGzYfine3giwZDZD',
    recipientId: '1138734942943439',
    tenantId: 'democenter_df',
    apiKey: '3126dbc6-049c-4b0b-ba74-6fefcf436ef6',
    environment: 'Dev',
    domainName: 'UtilityInc'
  }, (err, instance, created) => {
    log.debug('Created instance %s', created);
  });

};
