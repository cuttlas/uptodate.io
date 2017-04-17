import React from "react";
import { favouritesQuery } from "queries";

import InfiniteGrid from "components/InfiniteGrid/InfiniteGrid";

function Favourites(
  {
    loading,
    articles,
    hasMore,
    fetchArticles
  }
) {
  return (
    <InfiniteGrid
      loadMore={fetchArticles}
      hasMore={hasMore}
      articles={articles}
      emptyMessage={"You have not added any article to your favourites yet"}
    />
  );
}

export default favouritesQuery(Favourites);
