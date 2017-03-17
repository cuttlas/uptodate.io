import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: lightgreen;
  border: 1px solid black;
  margin: 2px;
  padding: 0;
  width: 200px;
  height: 250px;
  background-size: contain;
  background-color: rgba(255,0,0,0.5);
`;

const Title = styled.p``;
const Description = styled.p``;

const Article = ({article}) => {
  if (!article) return null;
  
  const WrapperWithBG = styled(Wrapper)`
    background-image: url(${article.imgUrl})
  `;

  return (
  <a href={article.url} target="_blank"> 
    <WrapperWithBG>
      <Title>{article.title}</Title>
      <Description>{article.description}</Description>
    </WrapperWithBG> 
  </a>
  );
};

export default Article;
