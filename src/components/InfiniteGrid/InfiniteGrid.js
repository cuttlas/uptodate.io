import React from "react";
import { InfiniteGrid, EmptyMessage } from "./styles";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import Article from "components/Article/Article";

const renderArticles = articles => (
  <CSSTransitionGroup
    transitionName={"animation"}
    transitionAppear={true}
    transitionLeaveTimeout={100}
    transitionEnterTimeout={300}
    transitionAppearTimeout={500}
    transitionEnter={true}
    transitionLeave={true}
  >
    {articles.map((article, key) => (
      <Article article={article} key={article.id} />
    ))}
  </CSSTransitionGroup>
);

export default function({ articles, loadMore, hasMore, emptyMessage }) {
  return (
    <InfiniteGrid
      initialLoad={false}
      loadMore={loadMore}
      hasMore={hasMore}
      threshold={1000}
    >
      {articles && articles.length
        ? renderArticles(articles)
        : <EmptyMessage>{emptyMessage}</EmptyMessage>}
    </InfiniteGrid>
  );
}
