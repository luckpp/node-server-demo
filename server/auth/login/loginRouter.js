var router = require('express').Router();
var loginController = require('./loginController');
var loginMiddleware = require('./loginMiddleware');

var verifyUser = loginMiddleware.verifyUser;

router.post('/', verifyUser(), loginController.login);

module.exports = router;
