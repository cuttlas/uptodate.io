exports.up = function(knex, Promise) {
  return knex.schema.table("articles", t => {
    t.string("author").nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("articles", t => {
    t.dropColumn("author");
  });
};
