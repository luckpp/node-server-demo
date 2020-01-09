var mongoose = require('mongoose');
var authorization = require('../../business/authentication/authentication');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

// middleware that will run before the document is created
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = authorization.hashPassword(this.password);
  }
  next();
});

UserSchema.methods = {
  // check the password on signin
  authenticate: function(plainTextPassword) {
    return authorization.authenticate(plainTextPassword, this.password);
  }
};

module.exports = mongoose.model('users', UserSchema);
