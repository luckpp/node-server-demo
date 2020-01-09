var authorization = require('../../business/authorization/authorization');
var config = require('../../config/config');

var authorized2Create = function() {
  return function(req, res, next) {
    if (config.security.use) {
      var ac = authorization.getAc();
      var role = req.user.role;
      var permission = ac.can(role).execute('create').on('users');
      if (permission.granted) {
        next();
      } else {
        res.status(401).send('You can not create users!');
      }
    } else {
      next();
    }
  }
};

module.exports.authorized2Create = authorized2Create;