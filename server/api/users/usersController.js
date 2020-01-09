var usersRepository = require('../../repository/users/usersRepository');

//module.exports.params = function(req, res, next, id) {
//  next();
//}

module.exports.get = function(req, res, next) {
  usersRepository.getUsers()
    .then(
      users => { res.json(users); }, 
      err => { next(err); }
    );
};

module.exports.post = function(req, res, next) {
  var user = req.body;
  if (!user) {
    res.status(400).send('Missig body!');
  } else {
    delete user._id;
    usersRepository.createUser(user)
      .then(
        dbUser => { res.json(dbUser); }, 
        err => { next(err); }
      );
  }
};

module.exports.getOne = function(req, res, next) {
  var id = req.params.id;
  usersRepository.getUserById(id)
    .then(
      user=> {
        if (user) {
          res.json(user);
        } else {
          res.status(404).send(`User with id [${id}] not found`);
        }
      }, 
      err => { next(err); }
    );
};

module.exports.put = function(req, res, next) {
  var id = req.params.id;
  var user = req.body;

  if (user._id && user._id != id) {
    res.status(400).send(`The user._id [${user._id}] does not match the URL id [${id}]`);
  } else {
    usersRepository.updateUser(id, user)
      .then(
        dbUser => {
          if (dbUser) {
            res.json(dbUser);
          } else {
            res.status(400).send(`Inexisting user with id [${id}]`);
          }
        }, 
        err => { next(err); }
      );
  }
};

module.exports.delete = function(req, res, next) {
  var id = req.params.id;
  usersRepository.deleteUser(id)
    .then(
      user => { res.json(user); }, 
      err => { next(err); }
    );
};