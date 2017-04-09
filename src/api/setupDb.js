import knex from "./knex";
import testData from "./testData";

exports.populateDB = () => {
  return knex("article_newsletter")
    .del()
    .then(() => knex("newsletters").del())
    .then(() => knex("articles").del())
    .then(() => knex("for_later").del())
    .then(() => knex("favourites").del())
    .then(() => knex("users").del())
    .then(() => knex("articles").insert(testData.articles))
    .then(() => knex("newsletters").insert(testData.newsletters))
    .then(() => knex("article_newsletter").insert(testData.articleNewsletter))
    .then(() => knex("users").insert(testData.users))
    .then(() => knex("for_later").insert(testData.forLater))
    .then(() => knex("favourites").insert(testData.favourites));
};

exports.destroyDB = () => {
  return knex.destroy();
};
