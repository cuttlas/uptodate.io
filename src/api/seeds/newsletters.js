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
          img_url: "https://static.esea.net/global/images/users/679944.1458605905.jpg"
        },
        {
          id: 2,
          name: "reactjsNewsletter",
          url: "http://reactjsnewsletter.com/",
          img_url: "https://previews.123rf.com/images/mikekiev/mikekiev1109/mikekiev110900016/10628139-binary-stream-Stock-Photo-software-matrix-binary.jpg"
        }
        /* {
          id: 3,
          name: "cssWeekly",
          img_url: "http://melissavandyke.com/wp-content/uploads/2015/09/code.jpg"
        } */
      ]);
    });
};
