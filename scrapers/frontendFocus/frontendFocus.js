/*
  javascriptweekly.com scrapper. Works from issue 187 forward (July 4, 2014).
*/

const request = require("../request");
const cheerio = require("cheerio");
const normalizeUrl = require("normalize-url");
const emojiStrip = require("emoji-strip");

function sanitizeUrl(url, issue) {
  return normalizeUrl(
    url.replace(`?utm_source=frontendfocus&utm_medium=email`, "")
  );
}

function sanitizeText(text) {
  return emojiStrip(text.replace(/\n/g, "").replace(/<br>/g, ""));
}

module.exports = async function(issue) {
  const head = await request.head(`https://frontendfoc.us/issues/${issue}`);
  const lastIssue = head.request.path.replace("/issues/", "");
  if (lastIssue != issue) return false;
  const html = await request.get(`https://frontendfoc.us/issues/${issue}`);
  if (!html) return false;
  const $ = cheerio.load(html);

  const articles = [];
  let article = {};
  let position = 1;

  $(".item").each(function(i) {
    const title = $(this)
      .find("a")
      .first()
      .text();
    const url = $(this)
      .find("a")
      .first()
      .attr("href");
    const author = $(this)
      .find(".name")
      .first()
      .text();

    $(this)
      .find(".mainlink")
      .remove();
    const description = $(this)
      .find(".desc")
      .first()
      .html();

    if (!title || !url) return;

    article = {
      title: sanitizeText(title),
      url: sanitizeUrl(url),
      author: sanitizeText(author),
      description: sanitizeText(description)
    };

    articles.push(article);
  });

  if (!articles.length) return false;

  return articles;
};
