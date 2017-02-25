const knex = require('../knex');

exports.get = function get() {
  return knex('articles').select();
}

exports.find = function find({url}) {
  const query = knex('articles').select()

  if (url) query.where('url', url);

  return query.limit(1)
         .then(res => res && res[0]);
}

exports.insert = async function insert(newArticle) {
  const oldArticle = await exports.find({url: newArticle.url});

  const res = await knex('articles').insert({
    title: newArticle.title,
    url: newArticle.url,
    description: newArticle.description,
    //author: newArticle.author,
  });

  const articleId = res[0];

  return await knex('article_newsletter').insert({
    article_id: articleId,
    newsletter_id: newArticle.newsletterId,
  })
}
