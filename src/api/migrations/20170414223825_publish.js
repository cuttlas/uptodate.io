exports.up = function(knex, Promise) {
  return knex.schema.table("articles", t => {
    t.timestamp("published").nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("articles", t => {
    t.dropColumn("published");
  });
};
