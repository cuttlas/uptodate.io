/*
  reactjsNewsletter.com scrapper. Works from issue 1
*/

const request = require("../request");
const cheerio = require("cheerio");
const normalizeUrl = require("normalize-url");
const emojiStrip = require("emoji-strip");

function sanitizeUrl(url, issue) {
  return normalizeUrl(
    url.replace(
      `utm_campaign=React%2BNewsletter&utm_medium=web&utm_source=React_Newsletter_${issue}`,
      ""
    )
  );
}

function sanitizeText(text) {
  return emojiStrip(
    text
      .replace(/\n/g, "")
      .replace(/<br>/g, "")
      .replace(
        /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
        ""
      )
  );
}

module.exports = async function(issue) {
  const html = await request.get(
    `http://reactjsnewsletter.com/issues/${issue}`
  );
  if (!html) return false;
  const $ = cheerio.load(html);

  const articles = [];
  let article = {};

  let position = 1;

  $(".item--issue").each(function(i) {
    const title = $(this).find(".item__title").first().text();
    const url = $(this).find(".item__title a").first().attr("href");
    const description = $(this).find("p").first().html();

    if (title && url) {
      articles.push({
        title: sanitizeText(title),
        url,
        position,
        description: sanitizeText(description)
      });

      position++;
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
