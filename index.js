var config = require('./server/config/config');
var mongoDb = require('./server/mongodb');
var dbSeeder = require('./server/util/dbSeeder')(config.db);
var server = require('./server/server');
var authorization = require('./server/business/authorization/authorization');

var start = async function() {
  try {
    await mongoDb.connect(config.db);
    await dbSeeder();
    await server.start(config.server);
    authorization.load();
  } catch(err) {
    console.log(`Could not start properly: ${err}`);
  }
}

start(config);
