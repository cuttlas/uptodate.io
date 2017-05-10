const articlesRepo = require("../db/repos/articles");
const newslettersRepo = require("../db/repos/newsletters");

const cssWeekly = require("./cssWeekly/cssWeekly");
const ponyFoo = require("./ponyFoo/ponyFoo");
const javascriptWeekly = require("./javascriptWeekly/javascriptWeekly");
const frontendFocus = require("./frontendFocus/frontendFocus");
const reactjsNewsletter = require("./reactjsNewsletter/reactjsNewsletter");

const insertArticles = (articles, newsletter) => {
  return Promise.all(
    articles.map(art => {
      const article = Object.assign({}, art, {
        newsletterId: newsletter.id
      });
      return articlesRepo.insert(article);
    })
  ).then(() =>
    newsletterRepo.update(newsletter.id, {
      last_issue: newsletter.last_issue + 1
    }));
};

const autoscraper = async () => {
  const newsletters = await newslettersRepo.get();

  await Promise.all(
    newsletters.map(nl => {
      switch (nl.name) {
        case "cssWeekly":
          const articles = cssWeekly(nl.last_issue + 1);
          if (articles) return insertArticles(articles, nl);
          break;
        case "javascriptWeekly":
          const articles = javascriptWeekly(nl.last_issue + 1);
          if (articles) return insertArticles(articles, nl);
          break;
        case "reactjsNewsletter":
          const articles = reactjsNewsletter(nl.last_issue + 1);
          if (articles) return insertArticles(articles, nl);
          break;
        case "frontendFocus":
          const articles = frontendFocus(nl.last_issue + 1);
          if (articles) return insertArticles(articles, nl);
          break;
        case "ponyFoo":
          const articles = ponyFoo(nl.last_issue + 1);
          if (articles) return insertArticles(articles, nl);
          break;
        default:
          break;
      }
    })
  );
};

setTimeout(autoscraper, 1000 * 60 * 60 * 1);
