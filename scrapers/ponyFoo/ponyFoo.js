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
      `?utm_source=ponyfoo+weekly&utm_medium=email&utm_campaign=issue-${issue}`,
      ""
    )
  );
}

function sanitizeText(text) {
  return emojiStrip(text.replace(/\n/g, "").replace(/<br>/g, ""));
}

module.exports = async function(issue) {
  const html = await request.get(`http://ponyfoo.com/weekly/${issue}`);
  const $ = cheerio.load(html);

  const articles = [];
  let article = {};
  let position = 1;

  $(".wy-link-title").each(function(i) {
    const title = $(this).text();
    const url = $(this).attr("href");
    const description = $(this)
      .parent()
      .next()
      .find(".wy-link-description")
      .first()
      .html();
    const author = $(this)
      .parent()
      .next()
      .find(".wy-link-source")
      .first()
      .text();

    if (!title || !url) return;

    article = {
      title: sanitizeText(title),
      url: sanitizeUrl(url, issue),
      position,
      author
    };

    position++;

    if (description) article.description = sanitizeText(description);
    articles.push(article);
  });

  return articles;
};
