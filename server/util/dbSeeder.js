var usersRepository = require('../repository/users/usersRepository');
var tasksRepository = require('../repository/tasks/tasksRepository');

var noOperation = function () {
  console.log('seeder noOperation()');
}

var cleanDb = function () {
  var cleanPromises = [usersRepository, tasksRepository]
    .map(repository => { 
      repository.clean(); 
    });
  return Promise.all(cleanPromises);
}

var createUser = function (user) {
  return new Promise(async (resolve, reject) => {
    try {
      var dbUser = await usersRepository.createUser(user);
      if (dbUser) {
        resolve();
      } else {
        reject(new Error('No user has been created!'));
      }
    } catch (err) {
      reject(err);
    }
  });
}

var seedOperation = function (data) {
  return function () {
    console.log('seedOperation seed()');
    return new Promise(async (resolve, reject) => {
      try {
        await cleanDb();
        await createUser(data.user);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

var seeder = function (dbConfig) {
  if (shouldSeed(dbConfig)) {
    return seedOperation(dbConfig.seed.data);
  } else {
    return noOperation;
  }
}

var shouldSeed = function (dbConfig) {
  return dbConfig && dbConfig.seed && dbConfig.seed.use === true;
}

module.exports = seeder;