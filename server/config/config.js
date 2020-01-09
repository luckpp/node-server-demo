var _ = require('lodash');

var defaultConfig = {
  server: {
    port: process.env.PORT | 4200
  },
  db: {
    url: process.env.DB_URL | 'mongodb://localhost:27017/test',
    seed: {
      use: true,
      data: {
        user: {
          name: process.env.USER_NAME | 'admin',
          password: process.env.USER_PASSWORD | 'test',
          role: 'administrator'
        }
      }
    }
  },
  security: {
    use: true,
    jwt: {
      expiresIn: process.env.JWT_EXPIRES_MINUTES | 24 * 60 * 10, // 10 days measured in minutes
      secret: process.env.JWT_SECRET || 'secret key for encryption'
    }
  }
};

var environmentTypes = {
  development: 'development',
  production: 'production',
  test: 'test'
};

var environment = process.env.NODE_ENV || environmentTypes.development;
var environmentConfig = null;

try {
  environmentConfig = require(`./${environment}.js`);
} catch (err) {
  environmentConfig = {};
}

var config = _.merge(defaultConfig, environmentConfig);

module.exports = config;
