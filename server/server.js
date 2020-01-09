var express = require('express');
var middlewarePreInit = require('./middleware/middlewarePreInit');
var middlewarePostInit = require('./middleware/middlewarePostInit');
var apiRouter = require('./api/apiRouter');
var authRouter = require('./auth/authRouter');

var app = express();
middlewarePreInit(app);
app.use('/api', apiRouter);
app.use('/auth', authRouter);
middlewarePostInit(app);

module.exports.start = function(serverConfig) {
  return new Promise(function(resolve, reject) {
    if (serverConfig && serverConfig.port) {
      var server = app.listen(serverConfig.port);
      server.on('error', function(err) {
        console.log(`Could not start server: ${err}`);
        reject(err);
      });
      server.on('listening', function() {
        console.log(`Server started on http://localhost:${serverConfig.port}`);
        resolve();
      });
    } else {
      reject(new Error(`serverConfig is not properly defined: ${JSON.stringify(serverConfig)}`));
    }
  });
}
