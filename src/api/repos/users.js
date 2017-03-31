const knex = require("../knex");

exports.find = function({ nickname, password }) {
  const query = knex("users").select();

  if (nickname) query.where("nickname", nickname);
  if (password) query.where("password", password);

  return query.limit(1).then(res => res && res[0]);
};

exports.insert = function({ nickname, token, twitterId }) {
  return knex("users").insert({
    nickname,
    password: token,
    twitter_id: twitterId
  });
};

exports.addFavourite = function({ userId, articleId }) {
  return knex("favourites").insert({
    user_id: userId,
    article_id: articleId
  });
};

exports.addForLater = function({ userId, articleId }) {
  return knex("for_later").insert({
    user_id: userId,
    article_id: articleId
  });
};

exports.removeFavourite = function({ userId, articleId }) {
  return knex("favourites")
    .where({
      user_id: userId,
      article_id: articleId
    })
    .del();
};

exports.removeForLater = function({ userId, articleId }) {
  return knex("for_later")
    .where({
      user_id: userId,
      article_id: articleId
    })
    .del();
};
