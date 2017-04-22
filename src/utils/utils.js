import striptags from "striptags";

function getATags(html) {
  const aRegex = /<a[^>]*>([\s\S]*?)<\/a>/g;
  const aMatches = html.match(aRegex);

  return aMatches
    ? aMatches.map(match => ({
        value: striptags(match),
        tag: match
      }))
    : [];
}

export function truncate(text, max) {
  if (!text || !text.length) return "";
  const aTags = getATags(text);

  let res = striptags(text.trim().replace(/<br>/g, ""));

  while (res.length > max) {
    let tmp = res.split(".");
    if (tmp[tmp.length - 1] === "") tmp.pop();
    tmp.pop();
    tmp = tmp.join(".");
    if (tmp === "") break;
    res = tmp;
  }

  const lastChar = res[res.length - 1];
  if (![".", "!", "?"].includes(lastChar)) res += ".";

  if (res.length > max) {
    res = `${res.slice(0, max - 3)}...`;
  }

  aTags.forEach(aTag => {
    res = res.replace(aTag.value, aTag.tag);
  });

  return res;
}
