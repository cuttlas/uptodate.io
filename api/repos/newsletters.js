const knex = require('../knex');

exports.get = function get(args) {
  return knex('newsletters').select();
}

exports.find = function find({name}) {
  return knex('newsletters')
          .select()
          .where('name', name)
          .limit(1)
          .then(res => res && res[0]);
}
