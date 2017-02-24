import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  mount(<App/>);
});

it('renders the whole tree correctly', () => {
  const tree = renderer.create(<App/>).toJSON();
  expect(tree).toMatchSnapshot();
})
