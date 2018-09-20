'use strict';

const log = require('../../common/util/logging').log('FacebookConfig Setup');

module.exports = function (app) {

  let FacebookConfig = app.models.FacebookConfig;

  FacebookConfig.findOrCreate({
    where: {
      description: 'DCM-Power-Prod',
    },
  }, {
    description: 'DCM-Power-Prod',
    verificationToken: 'tomtom',
    apiToken: 'EAAPr979X5V0BAEHPJuUQMKdmVB6v0CKNp0oIBhqdWfcbMjX2xx2ByyDBejwY85qxLZCmqJV4zsP3FedIWLZAbwxdX0G2ECLXaaL1oHku1qXgkCBORq5VL2tTkiNQjCogfef8ziX1ZBE9zUFxrYrX8PBaIAgNScaVJfnCzJvGwZDZD',
    recipientId: '318092118965762',
    tenantId: 'democenter_df',
    apiKey: '3126dbc6-049c-4b0b-ba74-6fefcf436ef6',
    environment: 'Dev',
    domainName: 'UtilityInc',
    spuiMapping: [{
      spui: 'thomas',
      senderId: '2656645241027953',
    }],
  }, (err, instance, created) => {
    log.debug('Created instance %s', created);
  });

};
