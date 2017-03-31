exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.increments("id").primary();
    t.string("nickname", 100).notNullable();
    t.string("password", 100).notNullable();
    t.string("twitter_id", 100);
    t.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
