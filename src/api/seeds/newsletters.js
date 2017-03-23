exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("article_newsletter")
    .del()
    .then(() => knex("newsletters").del())
    .then(() => knex("articles").del())
    .then(function() {
      // Inserts seed entries
      return knex("newsletters").insert([
        { id: 1, name: "javascriptWeekly" },
        { id: 2, name: "reactjsNewsletter" },
        { id: 3, name: "cssWeekly" }
      ]);
    });
};
