var TasksModel = require('./tasksModel');

var clean = function() {
  return TasksModel.deleteMany({}).exec();
}

var getTasks = function() {
  return new Promise((resolve, reject) => {
    TasksModel.find({})
      .then(
        tasks => { resolve(tasks); }, 
        err => { reject(err); }
      );
  });
};

var getTaskById = function(id) {
  return new Promise((resolve, reject) => {
    TasksModel.findById(id)
      .then(
        task => { resolve(task); }, 
        err => { reject(err); }
      );
  });
};

var createTask = function(task) {
  return new Promise((resolve, reject) => {
    TasksModel.create(task)
      .then(
        dbTask => { resolve(dbTask); }, 
        err => { reject(err); }
      );
  });
}

var updateTask = function(id, task) {
  return new Promise((resolve, reject) => {
    var options = {
      new: true
    };
    TasksModel.findByIdAndUpdate(id, task, options)
      .then(
        dbTask => { resolve(dbTask) }, 
        err => { reject(err); }
      );
    });
};

var deleteTask = function(id) {
  return new Promise((resolve, reject) => {
    TasksModel.findByIdAndDelete(id)
      .then(
        task => { resolve(task); }, 
        err => { reject(err); }
      );
  });
};

module.exports.clean = clean;
module.exports.getTasks = getTasks;
module.exports.getTaskById = getTaskById;
module.exports.createTask = createTask;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;