exports.up = function(knex, Promise) {
  return knex.schema.table("newsletters", t => {
    t.string("url").nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("newsletters", t => {
    t.dropColumn("url");
  });
};
