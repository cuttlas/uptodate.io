/*
  javascriptweekly.com scrapper. Works from issue 187 forward (July 4, 2014).
*/

const request = require("../request");
const cheerio = require("cheerio");
const normalizeUrl = require("normalize-url");
const emojiStrip = require("emoji-strip");

function sanitizeUrl(url, issue) {
  return normalizeUrl(
    url.replace(`?utm_source=graphqlweekly&utm_medium=email`, "")
  );
}

function sanitizeText(text) {
  return emojiStrip(text.replace(/\n/g, "").replace(/<br>/g, ""));
}

module.exports = async function(issue) {
  const html = await request.get(`https://graphqlweekly.com/issues/${issue}`);
  if (!html) return false;
  const $ = cheerio.load(html);

  const currentIssue = $("h1")
    .first()
    .text()
    .replace("Issue ", "");

  if (issue != currentIssue) return false;

  const articles = [];
  let article = {};
  let position = 1;

  $(".fViBTD").each(function(i) {
    const title = $(this)
      .find(".gWOpyY")
      .first()
      .text();
    const url = $(this)
      .find(".gWOpyY")
      .first()
      .attr("href");
    const description = $(this)
      .find(".fQaFni")
      .first()
      .html();

    if (!title || !url) return;

    article = {
      title: sanitizeText(title),
      url: sanitizeUrl(url),
      description: sanitizeText(description)
    };

    articles.push(article);
  });

  if (!articles.length) return false;

  return articles;
};
