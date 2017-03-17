import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { App }  from './App';

it('renders without crashing', () => {
  const data = {
    articles: [{
      title: 'Mock Title',
      description: 'Mock Description',
      url: 'www.mock.com',
      imgUrl: 'www.mock.com/mock.jpg'
    }]
  }
  mount(<App data={data}/>);
});

it('renders the whole tree correctly', () => {
  const data = {
    articles: [{
      title: 'Mock Title',
      description: 'Mock Description',
      url: 'www.mock.com',
      imgUrl: 'www.mock.com/mock.jpg'
    }]
  }
  const tree = renderer.create(<App data={data}/>).toJSON();
  expect(tree).toMatchSnapshot();
})
