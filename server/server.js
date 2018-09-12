'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var fs = require('fs');
var app = module.exports = loopback();

const log = require('../common/util/logging').log('server', 'debug');

app.use((req, res, next) => {
  res.header('X-Frame-Options', ['ALLOWALL']);
  next();
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    if(log.debug) {
      log.debug('Web server listening at: %s', baseUrl);
    }
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      if(log.debug) {
        log.debug('Browse your REST API at %s%s', baseUrl, explorerPath);
      }

      app.use('/interact_ai/admin', loopback.static(path.resolve(__dirname, '../client/admin/dist')));
      app.use('/interact_ai/bot', loopback.static(path.resolve(__dirname, '../client/chatbotClient/dist')));
      app.use('/interact_ai/botBeta', loopback.static(path.resolve(__dirname, '../client/chatbotBetaClient/dist')));
      app.use('/interact_ai/chatBotUI', loopback.static(path.resolve(__dirname, '../client/chatBotWatson')));

    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = require('socket.io')(app.start());


    app.io.on('connection', function(socket){
      console.log('a user connected');
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    });


  }
    //app.start();

});
