import React, { Component } from "react";
import { mainQuery } from "queries";

import Article from "components/Article/Article";
import Header from "components/Header/Header";

import { Container, InfiniteGrid } from "./styles";

class App extends Component {
  static propTypes = {
    data: React.PropTypes.object
  };

  render() {
    const {
      articles,
      hasMore,
      fetchArticles
    } = this.props;

    return (
      <Container>
        <Header />
        <InfiniteGrid
          loadMore={fetchArticles}
          hasMore={hasMore}
          initialLoad={false}
        >
          {articles &&
            articles.map((article, key) => (
              <Article article={article} key={key} />
            ))}
        </InfiniteGrid>
      </Container>
    );
  }
}

export { App };
export default mainQuery(App);
