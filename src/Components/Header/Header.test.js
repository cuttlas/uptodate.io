import React from "react";
import { mount } from "enzyme";
import Header from "./Header";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  mount(<Header />);
});
