var router = require('express').Router();
var usersRouter = require('./users/usersRouter');
var tasksRouter = require('./tasks/tasksRouter');
var config = require('../config/config');
var authMiddleware = require('../middleware/authMiddleware');

if (config.security.use) {
  router.use(authMiddleware.authDecodeToken());
  router.use(authMiddleware.authGetUser());
}
router.use('/users', usersRouter);
router.use('/tasks', tasksRouter);

module.exports = router;