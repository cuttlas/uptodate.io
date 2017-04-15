import React from "react";
import { mainQuery } from "queries";

import InfiniteGrid from "components/InfiniteGrid/InfiniteGrid";
import Article from "components/Article/Article";

/* function hashArticlesByDay(articles) {
  const articlesByDay = {};
  articles.forEach(article => {
    let day = moment(article.published).format("MMMM Do YYYY");
    if (!articlesByDay[day]) articlesByDay[day] = [];
    articlesByDay[day].push(article);
  });
  return articlesByDay;
} */

function Main(
  {
    articles,
    hasMore,
    fetchArticles
  }
) {
  if (!articles) return null;
  // const articlesByDay = hashArticlesByDay(articles);

  return (
    <InfiniteGrid
      loadMore={fetchArticles}
      hasMore={hasMore}
      initialLoad={false}
    >
      {articles.map((article, key) => <Article article={article} key={key} />)}
      {/*Object.keys(articlesByDay).map(day => {
        return [
          <p>{day}</p>,
          articlesByDay[day].map((article, key) => (
            <Article article={article} key={key} />
          ))
        ];
      })*/}

    </InfiniteGrid>
  );
}

export default mainQuery(Main);
