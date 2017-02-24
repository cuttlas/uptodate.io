import React from 'react';
import './Article.css'

const Article = ({article}) => {
  if (!article) return null;
  const imgStyle = {
    backgroundImage: `url(${article.img})`,
  }

  return (<a href={article.url} target="_blank"> <div style={imgStyle} className="Article">
    <p className="Article-title">{article.title}</p>
    <p className="Article-description">{article.description}</p>
  </div> </a>);
};

export default Article;
