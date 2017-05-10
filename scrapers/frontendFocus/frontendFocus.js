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
  const html = await request.get(`http://frontendfocus.co/issues/${issue}`);
  const $ = cheerio.load(html);

  const articles = [];
  let article = {};
  let position = 1;

  $("div").each(function(i) {
    const fontSize = $(this).css("font-size");

    if (fontSize === "18px") {
      if (article.title) articles.push(article);

      const title = $(this).find("a").first().text();
      const url = $(this).find("a").first().attr("href");

      if (!title || !url) throw new Error("Missing tittle or url");

      article = {
        title: sanitizeText(title),
        url: sanitizeUrl(url),
        position
      };
      position++;
    } else if (fontSize === "14px" || fontSize === "13px") {
      article.description = sanitizeText($(this).html());
    } else if (fontSize === "12px") {
      article.author = sanitizeText($(this).text());

      // If the article is SPAM. Don't save it.
      /* const sponsor = $(this).find("span").first();
      if (
        (sponsor && sponsor.text() === "Sponsor") ||
        sponsor.text() === "Sponsored"
      )
        article = {}; */
    }
  });

  // add the last one
  if (article.title) articles.push(article);

  return articles;
};
