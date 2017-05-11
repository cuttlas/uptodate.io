exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("article_newsletter")
    .del()
    .then(() => knex("newsletters").del())
    .then(() => knex("articles").del())
    .then(function() {
      // Inserts seed entries
      return knex("newsletters").insert([
        {
          id: 1,
          name: "javascriptWeekly",
          url: "http://javascriptweekly.com",
          img_url: "speed-green.jpg",
          priority: 2
        },
        {
          id: 2,
          name: "reactjsNewsletter",
          url: "http://reactjsnewsletter.com",
          img_url: "blue.jpg",
          priority: 3
        },
        {
          id: 3,
          name: "cssWeekly",
          url: "http://css-weekly.com",
          img_url: "speed-orange.jpg",
          priority: 4
        },
        {
          id: 4,
          name: "frontendFocus",
          url: "http://frontendfocus.co",
          img_url: "green.jpg",
          priority: 1
        },
        {
          id: 5,
          name: "ponyFoo",
          url: "http://ponyfoo.com",
          img_url: "speed.jpg",
          priority: 5
        }
      ]);
    });
};
