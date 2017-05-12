const articlesRepo = require("../db/repos/articles");
const newslettersRepo = require("../db/repos/newsletters");

const cssWeekly = require("./cssWeekly/cssWeekly");
const ponyFoo = require("./ponyFoo/ponyFoo");
const javascriptWeekly = require("./javascriptWeekly/javascriptWeekly");
const frontendFocus = require("./frontendFocus/frontendFocus");
const reactjsNewsletter = require("./reactjsNewsletter/reactjsNewsletter");

const publisher = require("./publisher");

const insertArticles = (articles, newsletter) => {
  return Promise.all(
    articles.map(art => {
      const article = Object.assign({}, art, {
        newsletterId: newsletter.id
      });
      return articlesRepo.insert(article);
    })
  ).then(() => {
    console.log(
      `Issue ${newsletter.last_issue + 1} from ${newsletter.name} successfully scrapped`
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
      switch (nl.name) {
        case "cssWeekly":
          return cssWeekly(nl.last_issue + 1).then(articles => {
            if (articles) return insertArticles(articles, nl);
          });
          break;
        case "javascriptWeekly":
          return javascriptWeekly(nl.last_issue + 1).then(articles => {
            if (articles) return insertArticles(articles, nl);
          });
          break;
        case "reactjsNewsletter":
          return reactjsNewsletter(nl.last_issue + 1).then(articles => {
            if (articles) return insertArticles(articles, nl);
          });
          break;
        case "frontendFocus":
          return frontendFocus(nl.last_issue + 1).then(articles => {
            if (articles) return insertArticles(articles, nl);
          });
          break;
        case "ponyFoo":
          return ponyFoo(nl.last_issue + 1).then(articles => {
            if (articles) return insertArticles(articles, nl);
          });
          break;
        default:
          break;
      }
    });

    await promises.reduce((p, fn) => p.then(fn), Promise.resolve());
    await publisher();
  } catch (e) {
    console.log(e);
  }
};

const interval = process.env.NODE_ENV === "production" ? 200 * 60 * 1000 : 5000;
setInterval(autoscraper, interval);

autoscraper(); //first execution
