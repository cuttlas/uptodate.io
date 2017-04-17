import React from "react";
import { InfiniteGrid, EmptyMessage } from "./styles";

import Article from "components/Article/Article";

export default function({ articles, loadMore, hasMore, emptyMessage }) {
  return (
    <InfiniteGrid initialLoad={false} loadMore={loadMore} hasMore={hasMore}>
      {articles && articles.length
        ? articles.map((article, key) => (
            <Article article={article} key={key} />
          ))
        : <EmptyMessage>{emptyMessage}</EmptyMessage>}
    </InfiniteGrid>
  );
}
