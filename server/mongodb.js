var mongoose = require('mongoose');

module.exports.connect = function(dbConfig) {
  return new Promise(function(resolve, reject) {
    if (dbConfig && dbConfig.url) {
      mongoose.connect(dbConfig.url, {useNewUrlParser: true}, function(err) {
        if (err) {
          console.log(`Could not connect to mongodb: ${err}`);
          reject(err);
        } else {
          console.log(`Connected to mongodb ${dbConfig.url}`);
          resolve();
        }
      });
    } else {
      reject(new Error(`dbConfig is not properly defined: ${JSON.stringify(dbConfig)}`));
    }
  });
}
