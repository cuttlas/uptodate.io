exports.up = function(knex, Promise) {
  return knex.schema.table("articles", t => {
    t.integer("position").nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("articles", t => {
    t.dropColumn("position");
  });
};
