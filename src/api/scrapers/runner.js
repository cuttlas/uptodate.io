/*
* script to manually trigger the scrapping of multiple issues from one newsletter
*/

const newsletterName = process.argv[2];
const from = process.argv[3] || 1;
const to = process.argv[4] || from;
const scrapper = require(`./${newsletterName}/${newsletterName}`);
const newslettersRepo = require("../repos/newsletters");
const articlesRepo = require("../repos/articles");

(async function scrap() {
  const newsletter = await newslettersRepo.find({
    name: newsletterName
  });

  if (!newsletter) return console.error("Invalid Newsletter");

  for (let i = from; i <= to; i++) {
    let articles = [];

    try {
      articles = await scrapper(i);
      await Promise.all(
        articles.map(art => {
          const article = Object.assign({}, art, {
            newsletterId: newsletter.id
          });
          return articlesRepo.insert(article);
        })
      );

      console.log(`Issue ${i} successfully completed`);
    } catch (e) {
      console.error(`Error at issue ${i}.`, e);
      break;
    }
  }
})();
