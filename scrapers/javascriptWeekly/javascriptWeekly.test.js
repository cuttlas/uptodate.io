const scrapper = require("./javascriptWeekly");
const setupDB = require("../../setupDb");

it("should return an array of articles", async () => {
  let articles = await scrapper(323);
  expect(articles[0]).toEqual({
    url: "https://v8project.blogspot.com/2017/02/high-performance-es2015-and-beyond.html",
    title: "High-Performance ES2015 and Beyond",
    author: "Michael Hablich",
    description: "A look at recent efforts within the V8 team to bring the performance of newly added JavaScript features on par with their transpiled ES5 counterparts."
  });

  articles = await scrapper(254);
  expect(articles[2]).toEqual({
    url: "http://javascriptplayground.com/blog/2015/10/authoring-modules-in-es6",
    title: "Authoring JavaScript Modules with ES6",
    author: "Jack Franklin",
    description: "Want to write a module so it can be used out of the box in Node and client-side through tools like Webpack or Browserify? Jack shares an approach."
  });

  articles = await scrapper(190);
  expect(articles[5]).toEqual({
    url: "http://ifandelse.com/its-not-hard-making-your-library-support-amd-and-commonjs",
    title: "It's Not Hard: Making Your Library Support AMD and CommonJS",
    author: "Jim Cowart"
  });
});
