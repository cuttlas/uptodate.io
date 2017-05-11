/*
  javascriptweekly.com scrapper. Works from issue 187 forward (July 4, 2014).
*/

const request = require("../request");
const cheerio = require("cheerio");
const normalizeUrl = require("normalize-url");
const emojiStrip = require("emoji-strip");

function sanitizeUrl(url, issue) {
  return normalizeUrl(
    url.replace(
      `?utm_source=CSS-Weekly&utm_campaign=Issue-${issue}&utm_medium=web`,
      ""
    )
  );
}

function sanitizeText(text) {
  return emojiStrip(text.replace(/\n/g, "").replace(/<br>/g, ""));
}

module.exports = async function(issue) {
  const html = await request.get(`http://css-weekly.com/issue-${issue}`);
  if (!html) return false;
  const $ = cheerio.load(html);

  const articles = [];
  let article = {};
  let position = 1;

  $(".newsletter-article").each(function(i) {
    const title = $(this).find("a").first().text();
    const url = $(this).find("a").first().attr("href");
    const description = $(this).find("p").first().html();

    if (!title || !url) return;

    article = {
      title: sanitizeText(title),
      url: sanitizeUrl(url, issue),
      position
    };

    position++;

    if (description) article.description = sanitizeText(description);
    articles.push(article);
  });

  if (!articles.length) return false;

  return articles;
};
