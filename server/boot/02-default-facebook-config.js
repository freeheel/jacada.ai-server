'use strict';

const log = require('../../common/util/logging').log('FacebookConfig Setup');

module.exports = function (app) {

  let FacebookConfig = app.models.FacebookConfig;

  FacebookConfig.findOrCreate({
    where: {
      description: 'DCM-Power',
    },
  }, {
    description: 'DCM-Power',
    verificationToken: 'tomtom',
    apiToken: 'EAAf9fG21ArcBAMO42diHHjR2I0mR9NegPEhK6qDli916xoFZAZAPVvUTKfKf7GIZBYBseA2l4ktgG6ukjp4qXaUwkc5TETLDPTzp6Dm81bZCoTkU2u0txFb9N8z11IUPvN8D0dgyTmyM8nN67zA0G8baS9UTV0pmhh4jOTBTGgZDZD',
    recipientId: '1138734942943439',
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
