var tasksRepository = require('../../repository/tasks/tasksRepository');

//module.exports.params = function(req, res, next, id) {
//  next();
//}

module.exports.get = function(req, res, next) {
  tasksRepository.getTasks()
    .then(
      tasks => { res.json(tasks); }, 
      err => { next(err); }
    );
};

module.exports.post = function(req, res, next) {
  var task = req.body;
  if (!task) {
    res.status(400).send('Missig body!');
  } else {
    delete task._id;
    tasksRepository.createTask(task)
      .then(
        dbTask => { res.json(dbTask); }, 
        err => { next(err); }
      );
  }
};

module.exports.getOne = function(req, res, next) {
  var id = req.params.id;
  tasksRepository.getTaskById(id)
    .then(
      task=> {
        if (task) {
          res.json(task);
        } else {
          res.status(404).send(`Task with id [${id}] not found`);
        }
      }, 
      err => { next(err); }
    );
};

module.exports.put = function(req, res, next) {
  var id = req.params.id;
  var task = req.body;

  if (task._id && task._id != id) {
    res.status(400).send(`The task._id [${task._id}] does not match the URL id [${id}]`);
  } else {
    tasksRepository.updateTask(id, task)
      .then(
        dbTask => {
          if (dbTask) {
            res.json(dbTask);
          } else {
            res.status(400).send(`Inexisting task with id [${id}]`);
          }
        }, 
        err => { next(err); }
      );
  }
};

module.exports.delete = function(req, res, next) {
  var id = req.params.id;
  tasksRepository.deleteTask(id)
    .then(
      task => { res.json(task); }, 
      err => { next(err); }
    );
};