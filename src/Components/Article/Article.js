import React from "react";
import styled from "styled-components";

const Box = styled.div`
  margin: 5px;
  width: 310px;
  height: 280px;
  position: relative;
  background-image: url(${props => props.bgImg});

  &:hover > .Article-overlay {
    height: 100%;
  }

  &:hover > .Article-overlay > .Article-title {
    height: 15%;
  }

  &:hover > .Article-overlay > .Article-description {
    height: 85%;
  } 
`;

const Link = styled.a`
  text-decoration: none;
`;

const TextOverlay = styled.div.withConfig({ componentId: "Article-overlay" })`
  position: absolute;
  width: 100%;
  height: 35%;
  background: rgba(54, 25, 25, .75);
  bottom: 0;
  color: white;
  transition: height 0.35s ease 0.20s;
`;

const Title = styled.p.withConfig({ componentId: "Article-title" })`
  height: 100%;
  padding: 0px 15px 0px 15px;
  font-weight: bold;
  text-align: left;
  transition: height 0.40s ease 0.20s;
`;

const Description = styled.p.withConfig({ componentId: "Article-description" })`
  height: 0%;
  padding: 0px 15px 0px 15px;
  font-size: 0.75em;
  text-align: left;
  cursor: pointer;

  a {
    color: white;
    &:hover {
      color: lightblue;
    }
  }
`;

Article.propTypes = {
  article: React.PropTypes.shape({
    url: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    author: React.PropTypes.string
  })
};

function Article({ article }) {
  if (!article) return null;

  const bgImg = "https://cdn-images-1.medium.com/max/1024/1*bcZz-qb_DNpvrNNwQBhQmQ.jpeg";

  return (
    <Link href={article.url} target="_blank">
      <Box bgImg={bgImg}>
        <TextOverlay>
          <Title>{article.title}</Title>
          <Description
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
        </TextOverlay>
      </Box>
    </Link>
  );
}

export default Article;
