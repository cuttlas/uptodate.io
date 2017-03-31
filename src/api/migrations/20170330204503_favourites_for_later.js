exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("favourites", t => {
      t
        .integer("article_id")
        .unsigned()
        .references("articles.id")
        .onDelete("CASCADE")
        .notNullable();
      t
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onDelete("CASCADE")
        .notNullable();
      t.unique(["article_id", "user_id"]);
    })
    .then(() =>
      knex.schema.createTable("for_later", t => {
        t
          .integer("article_id")
          .unsigned()
          .references("articles.id")
          .onDelete("CASCADE")
          .notNullable();
        t
          .integer("user_id")
          .unsigned()
          .references("users.id")
          .onDelete("CASCADE")
          .notNullable();
        t.unique(["article_id", "user_id"]);
      }));
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("favourites")
    .then(() => knex.schema.dropTableIfExists("for_later"));
};
