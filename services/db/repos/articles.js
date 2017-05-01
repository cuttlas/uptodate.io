const normalizeUrl = require("normalize-url");

const knex = require("../knex");

exports.get = function get({ q } = {}) {
  const query = knex("articles").select();

  query.whereNotNull("published");

  if (q)
    query
      .where("title", "LIKE", `%${q}%`)
      .orWhere("description", "LIKE", `%${q}%`);

  query.orderBy("published", "DESC");

  return query;
};

exports.find = function find({ url }) {
  const query = knex("articles").select();

  if (url) query.where("url", url);

  return query.limit(1).then(res => res && res[0]);
};

exports.getFavourites = function({ userId, q }) {
  const query = knex("articles")
    .join("favourites", "articles.id", "favourites.article_id")
    .select();

  query.where("favourites.user_id", userId);
  if (q)
    query
      .where("articles.title", "LIKE", `%${q}%`)
      .orWhere("articles.description", "LIKE", `%${q}%`);

  return query;
};

exports.getForLater = function({ userId, q }) {
  const query = knex("articles")
    .join("for_later", "articles.id", "for_later.article_id")
    .select();

  query.where("for_later.user_id", userId);
  if (q)
    query
      .where("articles.title", "LIKE", `%${q}%`)
      .orWhere("articles.description", "LIKE", `%${q}%`);

  return query;
};

exports.isForLater = async function({ articleId, userId }) {
  const query = knex("for_later")
    .where({
      article_id: articleId,
      user_id: userId
    })
    .select()
    .limit(1);
  const res = await query;
  return res.length > 0;
};

exports.isFavourite = async function({ articleId, userId }) {
  const query = knex("favourites")
    .where({
      article_id: articleId,
      user_id: userId
    })
    .select()
    .limit(1);
  const res = await query;
  return res.length > 0;
};

exports.insert = async function insert(newArticle) {
  const url = normalizeUrl(newArticle.url);
  const oldArticle = await exports.find({ url });

  // An article with the same url already exists. We save extra info it may have.
  if (oldArticle) {
    // we take the title and descriptions of the new article, if they are longer.
    const getLength = text => (text && text.length) || 0;

    const update = {
      title: getLength(newArticle.title) > getLength(oldArticle.title)
        ? newArticle.title
        : oldArticle.title,
      date: newArticle.date || oldArticle.date,
      description: getLength(newArticle.description) >
        getLength(oldArticle.description)
        ? newArticle.description
        : oldArticle.description,
      author: newArticle.author || oldArticle.author
    };
    await knex("articles").where("id", oldArticle.id).update(update);

    /*
      We create a newsletter relation if we don't have it already. We may already have it if
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
