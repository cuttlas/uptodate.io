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

it('renders and article with title, description, url and background image', () => {
  const article = {
    title: 'Mock Title',
    description: 'Mock Description',
    url: 'www.mock.com',
    img: 'www.mock.com/mock.jpg'
  }
  const wrapper = mount(<Article article={article}/>);

  expect(wrapper.find('a')).toHaveProp('href', 'www.mock.com');
  expect(wrapper.find('.Article')).toBePresent();
  expect(wrapper.find('.Article')).toHaveProp('style', {backgroundImage: 'url(www.mock.com/mock.jpg)'});
  expect(wrapper.find('.Article-title')).toHaveText('Mock Title');
  expect(wrapper.find('.Article-description')).toHaveText('Mock Description');
});
