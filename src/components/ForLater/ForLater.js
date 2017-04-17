import React from "react";
import { forLaterQuery } from "queries";

import InfiniteGrid from "components/InfiniteGrid/InfiniteGrid";

function ForLater(
  {
    articles,
    loading,
    hasMore,
    fetchArticles
  }
) {
  return (
    <InfiniteGrid
      loadMore={fetchArticles}
      hasMore={hasMore}
      articles={articles}
      emptyMessage={"You have not saved any article for later yet"}
    />
  );
}

export default forLaterQuery(ForLater);
