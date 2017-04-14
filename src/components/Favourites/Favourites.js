import React from "react";
import { favouritesQuery } from "queries";

import InfiniteGrid from "components/InfiniteGrid/InfiniteGrid";
import Article from "components/Article/Article";

function Favourites(
  {
    articles,
    hasMore,
    fetchArticles
  }
) {
  return (
    <InfiniteGrid
      loadMore={fetchArticles}
      hasMore={hasMore}
      initialLoad={false}
    >
      {articles &&
        articles.map((article, key) => <Article article={article} key={key} />)}
    </InfiniteGrid>
  );
}

export default favouritesQuery(Favourites);
