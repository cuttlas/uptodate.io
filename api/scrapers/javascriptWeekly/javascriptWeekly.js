/*
  javascriptweekly.com scrapper. Works from issue 187 forward (July 4, 2014).
*/

const request = require('../request');
const cheerio = require('cheerio');

function sanitizeUrl(url) {
  return url
        .replace('?utm_source=javascriptweekly&utm_medium=email', '')
        .replace(/\/$/, "");
}

function sanitizeText(text) {
  return text.replace(/\n/g, '');
}

module.exports = async function (issue) {
  const html = await request(`http://javascriptweekly.com/issues/${issue}`);
  const $ = cheerio.load(html);

  const articles = [];
  let article = {};

  $('.issue-html div').each(function(i) {
    const fontSize = $(this).css('font-size');

    if (fontSize === '18px' || fontSize === '16px') {
      if (article.title) articles.push(article);

      const title = $(this).find('a').first().text();
      const url = $(this).find('a').first().attr('href');

      if (!title || !url) throw new Error("Missing tittle or url");

      article = {
        title,
        url: sanitizeUrl(url)
      }
    } else if (fontSize === '14px'){
      article.description = sanitizeText($(this).html());
    } else if (fontSize === '12px') {
      article.author = sanitizeText($(this).text());

      // If the article is SPAM. Don't save it.
      const sponsor = $(this).find('span').first();
      if (sponsor && (sponsor.text() === 'Sponsor') || (sponsor.text() === 'Sponsored')) article = {};
    }
  });

  // add the last one
  if (article.title) articles.push(article);

  return articles;
}
