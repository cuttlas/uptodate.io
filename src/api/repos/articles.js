const normalizeUrl = require("normalize-url");

const knex = require("../knex");

exports.get = function get() {
  return knex("articles").select();
};

exports.find = function find({ url }) {
  const query = knex("articles").select();

  if (url) query.where("url", url);

  return query.limit(1).then(res => res && res[0]);
};

exports.insert = async function insert(newArticle) {
  const url = normalizeUrl(newArticle.url);
  const oldArticle = await exports.find({ url });

  // An article with the same url already exists. We save extra info it may have.
  if (oldArticle) {
    const update = {
      date: newArticle.date || oldArticle.date,
      description: newArticle.description || oldArticle.description,
      author: newArticle.author || oldArticle.author
    };
    await knex("articles").where("id", oldArticle.id).update(update);

    /*
      We create a newsletter relation if we don't already have it. We may already have it if
      we are scraping an issue we had already scrapped to obtain more info.
     */
    const articleNewsletter = await knex("article_newsletter").select().where({
      article_id: oldArticle.id,
      newsletter_id: newArticle.newsletterId
    });

    if (!articleNewsletter.length) {
      await knex("article_newsletter").insert({
        article_id: oldArticle.id,
        newsletter_id: newArticle.newsletterId
      });
    }
  } else {
    // It's a new article. We create the article and the newsletter relation.
    const res = await knex("articles")
      .insert({
        title: newArticle.title,
        url,
        date: newArticle.date,
        description: newArticle.description,
        author: newArticle.author
      })
      .returning("id");
    const articleId = res[0];

    await knex("article_newsletter").insert({
      article_id: articleId,
      newsletter_id: newArticle.newsletterId
    });
  }
};
