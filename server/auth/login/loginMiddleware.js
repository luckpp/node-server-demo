var usersRepository = require('../../repository/users/usersRepository');

// the responsibility of authVerifyUser is to check if the user provided in the
// request body matches a valid user present in DB
var verifyUser = function() {
  return async function(req, res, next) {
    var user = req.body;
    var name = user.name;
    var password = user.password;

    if (!name || !password) {
      res.status(400).send('User\'s name and password are required!');
      return;
    }

    try {
      var user = await usersRepository.getUserByName(name);
      if (!user) {
        res.status(401).send(`Could not find user [${name}]!`);
      } else {
        if (!user.authenticate(password)) {
          res.status(401).send(`Wrong password [${password}] for user [${name}]!`);
        } else {
          req.user = user;
          next();
        }
      }
    } catch(err) {
      next(err);
    }
  }
};

module.exports.verifyUser = verifyUser;