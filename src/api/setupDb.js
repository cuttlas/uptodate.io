import knex from "./knex";
import testData from "./testData";

exports.populateDB = () => {
  return knex("article_newsletter")
    .del()
    .then(() => knex("newsletters").del())
    .then(() => knex("articles").del())
    .then(() => knex("articles").insert(testData.articles))
    .then(() => knex("newsletters").insert(testData.newsletters))
    .then(() => knex("article_newsletter").insert(testData.articleNewsletter));
};

exports.destroyDB = () => {
  return knex.destroy();
};
