var router = require('express').Router();
var loginRouter = require('./login/loginRouter');

router.use('/login', loginRouter);

module.exports = router;