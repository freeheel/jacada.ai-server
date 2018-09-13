'use strict';

const log = require('../../common/util/logging').log('DefaultAdmin Setup');

module.exports = function (app) {


  const User = app.models.User;

  User.findOrCreate({
    username: 'admin'
  }, {
    username: 'admin',
    password: 'JacadaAdmin',
    email: 'admin@jacada.com',
  }, (err, instance, created) => {

  })


};
