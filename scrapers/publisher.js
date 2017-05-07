/*It publishes the last non published article from the newsletter with the oldest published date*/

const knex = require("../db/knex");

module.exports = async function(date = new Date()) {
  try {
    const newsletters = await knex("newsletters")
      .select()
      .orderByRaw("last_published IS NULL DESC, last_published");

    const newsletter = newsletters[0];

    const articles = await knex("articles")
      .select()
      .join(
        "article_newsletter",
        "articles.id",
        "article_newsletter.article_id"
      )
      .where("article_newsletter.newsletter_id", newsletter.id)
      .whereNull("published");

    const article = articles[0];

    if (!article) {
      console.log("No article to publish");
      return false;
    }

    await knex("articles").where("id", article.id).update("published", date);
    await knex("newsletters")
      .where("id", newsletter.id)
      .update("last_published", date);

    console.log(`Article ${article.id} published`);
    return true;
  } catch (e) {
    console.log(e);
  }
};
