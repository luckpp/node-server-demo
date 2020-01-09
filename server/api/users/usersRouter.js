var router = require('express').Router();
var controller = require('./usersController');
var middleware = require('./usersMiddleware');

//router.param(id, controller.params);

router.route('/')
  .get(controller.get)
  .post(middleware.authorized2Create(), controller.post);

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete);

module.exports = router;