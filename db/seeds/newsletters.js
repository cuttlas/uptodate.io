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
          url: "https://frontendfoc.us",
          img_url: "green.jpg",
          priority: 1
        },
        {
          id: 5,
          name: "ponyFoo",
          url: "http://ponyfoo.com",
          img_url: "speed.jpg",
          priority: 5
        },
        {
          id: 6,
          name: "graphqlWeekly",
          url: "https://graphqlweekly.com",
          img_url: "bubbles.jpg",
          priority: 5
        },
        {
          id: 7,
          name: "letsReact",
          url: "http://letsreact.io",
          img_url: "electric-blue.jpg",
          priority: 5
        },
        {
          id: 8,
          name: "serverlessStatus",
          url: "https://serverless.email",
          img_url: "multicolor.jpg",
          priority: 5
        },
        {
          id: 9,
          name: "fullstackReact",
          url: "http://newsletter.fullstackreact.com",
          img_url: "cubes.jpg",
          priority: 5
        }
      ]);
    });
};
