var signToken = require('../../business/authentication/authentication').signToken;

module.exports.login = function(req, res, next) {
  var id = req.user._id;
  var token = signToken(id);
  res.json({token: token});
}