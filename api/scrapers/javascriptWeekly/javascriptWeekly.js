/*
  javascriptweekly.com scrapper. Works from issue 188 forward (July 4, 2014).
*/

import request from '../request';
import cheerio from 'cheerio';

function sanitizeUrl(url) {
  return url
        .replace('?utm_source=javascriptweekly&utm_medium=email', '')
        .replace(/\/$/, "");
}

function sanitizeText(text) {
  return text.replace(/\n/g, '');
}

export default async function (issue) {
  const html = await request(`http://javascriptweekly.com/issues/${issue}`);
  const $ = cheerio.load(html);

  const articles = [];
  let article = {};

  $('.issue-html div').each(function(i) {
    const fontSize = $(this).css('font-size');

    if (fontSize === '18px' || fontSize === '16px') {
      if (article.title) articles.push(article);
      article = {
        title: $(this).find('a').first().text(),
        url: sanitizeUrl($(this).find('a').first().attr('href'))
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
