var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../../config/config');

var signToken = function(id) {
  return jwt.sign(
    { _id: id },
    config.security.jwt.secret,
    { expiresIn: config.security.jwt.expiresIn }
  )
};

var authenticate = function(plainTextPassword, hashedPassword) {
  return bcrypt.compareSync(plainTextPassword, hashedPassword);
}

var hashPassword = function(plainTextPassword) {
  if (!plainTextPassword) {
    return '';
  } else {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainTextPassword, salt); // TODO: async is better to avoid timed attacks
  }
}

module.exports.signToken = signToken;
module.exports.authenticate = authenticate;
module.exports.hashPassword = hashPassword;