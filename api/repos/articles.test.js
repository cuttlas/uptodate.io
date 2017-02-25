const articlesRepo = require('./articles');
const knex = require('../knex');
const testData = require('../testData');

beforeEach(() => {
  return testData.initDB();
})

it('should return all articles when there is no filter', async () => {
  const articles = await articlesRepo.get();
  expect(articles).toEqual(testData.articles);
})

it('should find an article by url', async () => {
  const article = await articlesRepo.find({
    url: 'http://www.javascript2.com'
  });

  expect(article).toEqual(testData.articles[1]);
});

it('should return undefined when there is no article with that url', async () => {
  const article = await articlesRepo.find({
    url: 'http://www.javascript3.com'
  });

  expect(article).toEqual(undefined);
});

it('should insert an article and an article_newsletter', async () => {
  const article = {
    title: 'New Article',
    url: 'http://www.newarticle.com',
    newsletterId: 2
  };

  await articlesRepo.insert(article);
  const insertedArticle = await knex('articles').select().where('url', article.url).then(res => res[0]);
  expect(insertedArticle.title).toBe('New Article');
  const articleNewsletter = await knex('article_newsletter')
                                  .select().where('article_id', insertedArticle.id).then(res => res[0]);
  expect(articleNewsletter).toEqual({
    article_id: insertedArticle.id,
    newsletter_id: 2
  })
});
