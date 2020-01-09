var expressJwt = require('express-jwt');
var config = require('../config/config');
var checkToken = expressJwt({secret: config.security.jwt.secret});
var usersRepository = require('../repository/users/usersRepository');

// the responsibility of authDecodeToken is to decode an incomming JWT
 var authDecodeToken = function() {
  return function(req, res, next) {
    // make optional to put the JWT also in the query string
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.header.authorization = 'Bearer ' + req.query.access_token;
      // we put the 'Bearer ' string at the beginning since the 
      // checkToken is expecting this format
    }
    // this will call next with no param if token validates or call
    // next wit error param if token does not validate. If token is 
    // is valid the decoded token will be set on req.user
    checkToken(req, res, next);
  }
};

// the resposibility of authGetUser is to get the full user based on the req.user
// provided by the authDecodeToken middleware in req.user. The full user will be
// once again set to req.user.
var authGetUser = function() {
  return async function(req, res, next) {
    if (req.user && req.user._id) {
      var id = req.user._id;
      try {
        var user = await usersRepository.getUserById(id);
        if (user) {
          req.user = user;
          next();
        } else {
          req.user = null;
          next(new Error('Unauthorized user!'));
        }
      } catch (err) {
        next(new Error('Could not authorize user!'));
      }
    } else {
      next(new Error('No user present'));
    }
  }
};

module.exports.authDecodeToken = authDecodeToken;
module.exports.authGetUser = authGetUser;