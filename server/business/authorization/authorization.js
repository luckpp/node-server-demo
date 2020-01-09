const AccessControl = require('role-acl');

var ac = new AccessControl();

var load = function() {
  ac = new AccessControl();

  ac.grant('administrator')
    .execute('create').on('users')
    .execute('read').on('users')
    .execute('update').on('users')
    .execute('delete').on('users');

    ac.grant('user')
      .execute('read').on('users');
}

var getAc = function() {
  return ac;
}

module.exports.load = load;
module.exports.getAc = getAc;