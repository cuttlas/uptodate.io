/*
* script to manually trigger the scrapping of multiple issues from one newsletter
*/

const newsletterName = process.argv[2];
const from = process.argv[3] || 1;
const to = process.argv[4] || from;
const scrapper = require(`./${newsletterName}/${newsletterName}`);
const newslettersRepo = require("../db/repos/newsletters");
const articlesRepo = require("../db/repos/articles");

(async function scrap() {
  const newsletter = await newslettersRepo.find({
    name: newsletterName
  });

  if (!newsletter) return console.error("Invalid Newsletter");

  for (let i = from; i <= to; i++) {
    let articles = [];

    try {
      articles = await scrapper(i);
      if (!articles.length) return console.error("Invalid Issue");

      for (let art of articles) {
        const article = Object.assign({}, art, {
          newsletterId: newsletter.id
        });

        try {
          await articlesRepo.insert(article);
        } catch (e) {
          console.log(e);
        }
      }

      if (!newsletter.last_issue || newsletter.last_issue < i) {
        await newslettersRepo.update(newsletter.id, {
          last_issue: i
        });
      }

      console.log(`Issue ${i} from ${newsletterName} successfully completed`);
    } catch (e) {
      console.error(`Error at issue ${i} from ${newsletterName}.`, e);
      break;
    }
  }

  process.exit();
})();
