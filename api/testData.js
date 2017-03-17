const knex = require('./knex');
const newsletters = [
  {id: 1, name: 'javascriptWeekly'},
  {id: 2, name: 'reactNewsletter'},
  {id: 3, name: 'cssWeekly'},
]

const articles = [{
  id: 1,
  title: "JavaScript's Journey Through 2012",
  url: "http://www.javascript.com",
  description: "The team at Telerik looks back at their predictions... ",
  date: new Date(2017,1,14),
  img_url: null
}, {
  id: 2,
  title: "JavaScript's Journey Through 2013",
  url: "http://www.javascript2.com",
  description: "The team at Telerik looks back at their predictions... ",
  date: new Date(2016, 12, 4),
  img_url: null
}];

const articleNewsletter = [{
  article_id: 2,
  newsletter_id: 1
},{
  article_id: 2,
  newsletter_id: 2
}]

exports.initDB = function initDB() {
  return knex('article_newsletter').del()
  .then(() => knex('newsletters').del())
  .then(() => knex('articles').del())
  .then(() => knex('articles').insert(articles))
  .then(() => knex('newsletters').insert(newsletters))
  .then(() => knex('article_newsletter').insert(articleNewsletter))
}

exports.articles = articles;
exports.newsletters = newsletters;
exports.articleNewsletter = articleNewsletter;
