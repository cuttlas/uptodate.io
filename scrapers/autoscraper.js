const articlesRepo = require("../db/repos/articles");
const newslettersRepo = require("../db/repos/newsletters");

const cssWeekly = require("./cssWeekly/cssWeekly");
const ponyFoo = require("./ponyFoo/ponyFoo");
const javascriptWeekly = require("./javascriptWeekly/javascriptWeekly");
const frontendFocus = require("./frontendFocus/frontendFocus");
const reactjsNewsletter = require("./reactjsNewsletter/reactjsNewsletter");
const graphqlWeekly = require("./graphqlWeekly/graphqlWeekly");
const letsReact = require("./letsReact/letsReact");
const serverlessStatus = require("./serverlessStatus/serverlessStatus");
const fullstackReact = require("./fullstackReact/fullstackReact");

const scrapers = {
  cssWeekly,
  ponyFoo,
  javascriptWeekly,
  frontendFocus,
  reactjsNewsletter,
  graphqlWeekly,
  letsReact,
  serverlessStatus,
  fullstackReact
};

const insertArticles = (articles, newsletter) => {
  return Promise.all(
    articles.map(art => {
      const article = Object.assign({}, art, {
        newsletterId: newsletter.id
      });
      return articlesRepo.insert(article).catch(e => {
        console.log(
          `Error scrapping Issue ${newsletter.last_issue + 1} from ${
            newsletter.name
          }`
        );
        console.log(e);
        return Promise.resolve();
      });
    })
  ).then(() => {
    console.log(
      `Issue ${newsletter.last_issue + 1} from ${
        newsletter.name
      } successfully scrapped`
    );
    return newslettersRepo.update(newsletter.id, {
      last_issue: newsletter.last_issue + 1
    });
  });
};

const autoscraper = async () => {
  try {
    const newsletters = await newslettersRepo.get();

    const promises = newsletters.map(nl => {
      let articles;
      return scrapers[nl.name](nl.last_issue + 1).then(articles => {
        if (articles) return insertArticles(articles, nl);
      });
    });

    await promises.reduce((p, fn) => p.then(fn), Promise.resolve());
  } catch (e) {
    console.log(e);
  }
};

const interval = process.env.NODE_ENV === "production" ? 200 * 60 * 1000 : 5000;
setInterval(autoscraper, interval);

autoscraper(); //first execution
