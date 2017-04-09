import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { App } from "./App";

it("renders without crashing", () => {
  const props = {
    fetchArticles: jest.fn(),
    articles: [
      {
        title: "Mock Title",
        description: "Mock Description",
        url: "www.mock.com",
        imgUrl: "www.mock.com/mock.jpg"
      }
    ]
  };
  mount(<App articles={props.articles} fetchArticles={props.fetchArticles} />);
});

xit("renders the whole tree correctly", () => {
  const props = {
    fetchArticles: jest.fn(),
    articles: [
      {
        title: "Mock Title",
        description: "Mock Description",
        url: "www.mock.com",
        imgUrl: "www.mock.com/mock.jpg"
      }
    ]
  };
  const tree = renderer
    .create(
      <App articles={props.articles} fetchArticles={props.fetchArticles} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
