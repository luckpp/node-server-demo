var UsersModel = require('./usersModel');

var clean = function() {
  return new Promise((resolve, reject) => {
    UsersModel.deleteMany({}, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}

var getUsers = function() {
  return new Promise((resolve, reject) => {
    UsersModel.find({})
      .then(
        users => { resolve(users); }, 
        err => { reject(err); }
      );
  });
};

var getUserById = function(id) {
  return new Promise((resolve, reject) => {
    UsersModel.findById(id)
      .then(
        user => { resolve(user); }, 
        err => { reject(err); }
      );
  });
};

var getUserByName = function(name) {
  return new Promise((resolve, reject) => {
    UsersModel.findOne({name: name})
      .then(
        user => { resolve(user); }, 
        err => { reject(err); }
      );
  });
};

var createUser = function(user) {
  return new Promise((resolve, reject) => {
    UsersModel.create(user)
      .then(
        dbUser => { resolve(dbUser); }, 
        err => { reject(err); }
      );
  });
}

var updateUser = function(id, user) {
  return new Promise((resolve, reject) => {
    var options = {
      new: true
    };
    UsersModel.findByIdAndUpdate(id, user, options)
      .then(
        dbUser => { resolve(dbUser) }, 
        err => { reject(err); }
      );
    });
};

var deleteUser = function(id) {
  return new Promise((resolve, reject) => {
    UsersModel.findByIdAndDelete(id)
      .then(
        user => { resolve(user); }, 
        err => { reject(err); }
      );
  });
};

module.exports.clean = clean;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.getUserByName = getUserByName;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;