export function truncate(text, max) {
  if (!text || !text.length) return "";

  let res = text.trim().replace(/<br>/g, "");

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
    return `${res.slice(0, max - 3)}...`;
  }

  return res;
}
