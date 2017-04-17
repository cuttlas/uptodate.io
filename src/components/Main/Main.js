import React from "react";
import { mainQuery } from "queries";

import InfiniteGrid from "components/InfiniteGrid/InfiniteGrid";

function Main(
  {
    loggedUser,
    articles,
    hasMore,
    fetchArticles,
    loading
  }
) {
  return (
    <InfiniteGrid
      loadMore={fetchArticles}
      hasMore={hasMore}
      articles={articles}
    />
  );
}

export default mainQuery(Main);
