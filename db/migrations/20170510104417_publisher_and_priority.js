exports.up = function(knex, Promise) {
  return knex.schema
    .table("articles", t => {
      t
        .integer("published_by")
        .unsigned()
        .references("newsletters.id")
        .onDelete("CASCADE")
        .nullable();
    })
    .then(() => {
      return knex.schema.table("newsletters", t => {
        t.integer("priority").nullable();
      });
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table("articles", t => {
      t.dropColumn("published_by");
    })
    .then(() => {
      return knex.schema.table("newsletters", t => {
        t.dropColumn("priority");
      });
    });
};
