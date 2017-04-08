const knex = require("../knex");

exports.get = function get(args) {
  return knex("newsletters").select();
};

exports.getByArticle = function({ articleId }) {
  const query = knex("newsletters").join(
    "article_newsletter",
    "newsletters.id",
    "article_newsletter.newsletter_id"
  );

  query.where("article_newsletter.article_id", articleId);

  return query;
};

exports.find = function find({ name }) {
  return knex("newsletters")
    .select()
    .where("name", name)
    .limit(1)
    .then(res => res && res[0]);
};
