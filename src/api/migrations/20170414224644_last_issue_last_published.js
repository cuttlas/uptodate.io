exports.up = function(knex, Promise) {
  return knex.schema.table("newsletters", t => {
    t.timestamp("last_published").nullable();
    t.integer("last_issue").nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("newsletters", t => {
    t.dropColumn("last_published");
    t.dropColumn("last_issue");
  });
};
