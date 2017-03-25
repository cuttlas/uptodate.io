/*
  reactjsNewsletter.com scrapper. Works from issue 1
*/

const request = require("../request");
const cheerio = require("cheerio");
const normalizeUrl = require("normalize-url");

function sanitizeUrl(url, issue) {
  return normalizeUrl(
    url.replace(
      `utm_campaign=React%2BNewsletter&utm_medium=web&utm_source=React_Newsletter_${issue}`,
      ""
    )
  );
}

function sanitizeText(text) {
  return text.replace(/\n/g, "");
}

module.exports = async function(issue) {
  const html = await request.get(
    `http://reactjsnewsletter.com/issues/${issue}`
  );
  const $ = cheerio.load(html);

  const articles = [];
  let article = {};

  $(".item--issue").each(function(i) {
    const title = $(this).find(".item__title").first().text();
    const url = $(this).find(".item__title a").first().attr("href");
    const description = $(this).find("p").first().html();

    if (title && url) {
      articles.push({
        title,
        url,
        description
      });
    }
  });

  return await Promise.all(
    articles.map(async article => {
      const realUrl = await request.head(article.url);
      article.url = sanitizeUrl(realUrl.request.uri.href, issue);
      return article;
    })
  );
};
