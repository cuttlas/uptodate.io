import React from 'react';
import { mount } from 'enzyme';
import Article from './Article';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  mount(<Article/>)
});

it('does not render anything if no article is passed as prop', () => {
  const tree = renderer.create(<Article/>);
  expect(tree).toMatchSnapshot();
});