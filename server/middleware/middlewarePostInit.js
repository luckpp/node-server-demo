var errorMiddleware = require('./errorMiddleware');

var init = function(app) {
  app.use(errorMiddleware());
}

module.exports = init;