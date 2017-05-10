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

exports.find = function find({ name, id }) {
  const query = knex("newsletters").select();

  if (name) query.where("name", name);
  if (id) query.where("id", id);

  query.limit(1);

  return query.then(res => res && res[0]);
};

exports.update = function(id, params) {
  return knex("newsletters").where(id, id).update(params);
};
