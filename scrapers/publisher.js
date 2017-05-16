/*It publishes the last non published article from the newsletter with the oldest published date*/

const knex = require("../db/knex");

const getArticleToPublish = async newsletter => {
  const articles = await knex("articles")
    .select()
    .join("article_newsletter", "articles.id", "article_newsletter.article_id")
    .where("article_newsletter.newsletter_id", newsletter.id)
    .whereNull("published")
    .orderBy("position")
    .orderBy("id", "DESC");

  return articles[0];
};

module.exports = async function(date = new Date(), reverse = false) {
  try {
    const newsletters = await knex("newsletters")
      .select()
      .orderByRaw(
        `last_published IS NULL DESC, last_published ${reverse ? "DESC" : "ASC"}`
      );

    let article;
    let newsletter;
    for (let i = 0; i < newsletters.length; i++) {
      newsletter = newsletters[i];
      article = await getArticleToPublish(newsletter);
      if (article) break;
    }

    if (!article) {
      console.log("No article to publish");
      return false;
    }

    await knex("articles")
      .where("id", article.id)
      .update({ published: date, published_by: newsletter.id });
    await knex("newsletters")
      .where("id", newsletter.id)
      .update("last_published", date);

    console.log(`Article ${article.id} from ${newsletter.name} published`);
    return true;
  } catch (e) {
    console.log(e);
  }
};
