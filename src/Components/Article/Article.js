import React from "react";
import styled from "styled-components";

const expandOnHover = () =>
  `&:hover > .Article-overlay {
    height: 100%;
  }

  &:hover > .Article-overlay > .Article-title {
    height: 15%;
  }

  &:hover > .Article-overlay > .Article-description {
    height: 85%;
  }`;

const Box = styled.div`
  display: inline-block;
  margin-left: 5px;
  width: 98vw;
  height: 90vw;
  position: relative;
  background-image: url(${props => props.bgImg});

  @media (min-width:480px)  { 
    width: 48.9vw;
    height: 43vw;
  }
  @media (min-width:801px)  { 
    width: 32.6vw;
    height: 28vw;
    ${expandOnHover}
  }
  @media (min-width:1100px) { 
    width: 24.5vw;
    height: 22vw;
    ${expandOnHover}
  }
  @media (min-width:1481px) {
    width: 19.6vw;
    height: 18vw; 
    ${expandOnHover}
  }  
`;

const Link = styled.a`
  text-decoration: none;
`;

const TextOverlay = styled.div.withConfig({ componentId: "Article-overlay" })`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(54, 25, 25, .75);
  bottom: 0;
  color: white;
  transition: height 0.35s ease 0.20s;

  @media (min-width:801px)  { 
    height: 35%;
  }
`;

const Title = styled.p.withConfig({ componentId: "Article-title" })`
  height: 15%;
  padding: 0px 15px 0px 15px;
  font-size: 0.85em;
  font-weight: bold;
  text-align: left;
  transition: height 0.40s ease 0.20s;

  @media (min-width:801px)  { 
    height: 100%;
  }
`;

const Description = styled.p.withConfig({ componentId: "Article-description" })`
  height: 85%;
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

  @media (min-width:801px)  { 
    height: 0%;
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
