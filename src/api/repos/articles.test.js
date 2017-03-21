const articlesRepo = require("./articles");
const knex = require("../knex");
const testData = require("../testData");
const setupDB = require("../setupDb");

beforeEach(() => setupDB.populateDB());

it("should return all articles when there is no filter", async () => {
  const articles = await articlesRepo.get();
  expect(articles).toEqual(testData.articles);
});

it("should find an article by  url", async () => {
  const article = await articlesRepo.find({
    url: "http://www.javascript2.com"
  });

  expect(article).toEqual(testData.articles[1]);
});

it("should return undefined when there is no article with that url", async () => {
  const article = await articlesRepo.find({
    url: "http://www.javascript3.com"
  });

  expect(article).toEqual(undefined);
});

it("should insert an article and an article_newsletter", async () => {
  const article = {
    title: "New Article",
    url: "http://www.newarticle.com",
    newsletterId: 2
  };

  await articlesRepo.insert(article);
  const insertedArticle = await knex("articles")
    .select()
    .where("url", "http://newarticle.com")
    .then(res => res[0]);
  expect(insertedArticle.title).toBe("New Article");
  const articleNewsletter = await knex("article_newsletter")
    .select()
    .where("article_id", insertedArticle.id)
    .then(res => res[0]);
  expect(articleNewsletter).toEqual({
    article_id: insertedArticle.id,
    newsletter_id: 2
  });
});

it("should update an existing article with extra info from the same newsletter", async () => {
  const article1 = {
    title: "New Article",
    date: new Date(2017, 0, 1),
    url: "http://www.newarticle.com",
    newsletterId: 1
  };
  const article2 = {
    title: "New Article",
    author: "John",
    description: "Bla bla bla",
    url: "http://newarticle.com/",
    newsletterId: 1
  };

  await articlesRepo.insert(article1);
  await articlesRepo.insert(article2);

  const article = await knex("articles")
    .select()
    .where("url", "http://newarticle.com")
    .then(res => res[0]);

  expect(article.title).toEqual("New Article");
  expect(article.date).toEqual(new Date(2017, 0, 1));
  expect(article.author).toEqual("John");
  expect(article.description).toEqual("Bla bla bla");

  const articleNewsletter = await knex("article_newsletter")
    .select()
    .where("article_id", article.id);

  expect(articleNewsletter).toEqual([
    {
      article_id: article.id,
      newsletter_id: 1
    }
  ]);
});

it("should update an existing article with extra info from different newsletters", async () => {
  const article1 = {
    title: "New Article",
    date: new Date(2017, 0, 1),
    url: "http://www.newarticle.com",
    newsletterId: 1
  };
  const article2 = {
    title: "New Article",
    author: "John",
    description: "Bla bla bla",
    url: "http://newarticle.com/",
    newsletterId: 2
  };

  await articlesRepo.insert(article1);
  await articlesRepo.insert(article2);

  const article = await knex("articles")
    .select()
    .where("url", "http://newarticle.com")
    .then(res => res[0]);

  expect(article.title).toEqual("New Article");
  expect(article.date).toEqual(new Date(2017, 0, 1));
  expect(article.author).toEqual("John");
  expect(article.description).toEqual("Bla bla bla");

  const articleNewsletter = await knex("article_newsletter")
    .select()
    .where("article_id", article.id);

  expect(articleNewsletter).toEqual([
    {
      article_id: article.id,
      newsletter_id: 1
    },
    {
      article_id: article.id,
      newsletter_id: 2
    }
  ]);
});
