const scrapper = require("./reactjsNewsletter");

it("should correctly scrap an issue", async () => {
  let articles = await scrapper(65);
  expect(articles[0]).toEqual({
    url: "https://tylermcginnis.com/building-user-interfaces-with-pure-functions-and-function-composition-in-react-js",
    title: "Building User Interfaces with Pure Functions and Function Composition in React",
    description: "One of the best parts of React.js is that you can use the same intuition that you have about functions for when to create new React components. This article breaks it down."
  });
});
