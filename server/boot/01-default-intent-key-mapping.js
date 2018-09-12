'use strict';

const log = require('../../common/util/logging').log('IntentHelper');

module.exports = function (app) {

  let IntentKeyMapping = app.models.IntentKeyMapping;

  let defaults = [{
    name: 'TomTest',
    clientAccessKey: '918aa00aa5a2473aa798656202328b53',
    developerAccessKey: '59e7b706727744e5984f17a51123ebff',
  }, {
    name: 'Telcom-Common',
    clientAccessKey: '82782cd9acdb4bd293c117d1d068abc4',
    developerAccessKey: '5e127cc4512d4214b6bb8ad7820464d6',
  },{
    name: 'Telcom-Common-Accenture',
    clientAccessKey: 'd12f71d3d8b648069981294642aea2ff',
    developerAccessKey: '0458ae986a8940aab9f1a7aee14ab094',
  }];

  defaults.map((item) => {
    IntentKeyMapping.findOrCreate({
      clientAccessKey: item.clientAccessKey,
    }, item, (err, instance, created) => {
      if(log.debug) {
        log.debug('Created instance %s', created);
      }

    });
  });

};
