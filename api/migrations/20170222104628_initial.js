exports.up = (knex) => {
  return knex.schema.createTable('newsletters', (t) => {
    t.increments('id').primary();
    t.string('name', 100).notNullable();
    t.string('img_url', 250)
  })
  .then(() => knex.schema.createTable('articles', (t) => {
    t.increments('id').primary();
    t.string('title', 250).notNullable();
    t.string('url', 250).notNullable();
    t.string('description', 2000);
    t.string('img_url', 250);
    t.unique('url');
    t.timestamp('date').nullable();
  }))
  .then(() => knex.schema.createTable('article_newsletter', (t) => {
    t.integer('article_id').unsigned().references('articles.id')
    .onDelete('CASCADE')
    .notNullable();
    t.integer('newsletter_id').unsigned().references('newsletters.id')
    .onDelete('CASCADE')
    .notNullable();
    t.unique(['article_id', 'newsletter_id']);
  }))
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('articles')
  .then(() => knex.schema.dropTableIfExists('article_newsletter'))
  .then(() => knex.schema.dropTableIfExists('newsletters'))
};
