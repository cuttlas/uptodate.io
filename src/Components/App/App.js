import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";

import Article from "components/Article/Article";
import Header from "components/Header/Header";

const query = gql`query getArticles ($cursor: String) {
  user {
    id
    nickname
  }
  articles(first: 10, after: $cursor) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        title
        imgUrl
        url
        date
        readLater
        description
        newsletters {
          id
          name
        }
      }
    }
  }
}`;

const Container = styled.div``;

const InfiniteGrid = styled(InfiniteScroll)`
  margin-top: 5px;
`;

class App extends Component {
  static propTypes = {
    data: React.PropTypes.object
  };

  render() {
    const { articles, hasMore, fetchArticles } = this.props;

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
export default graphql(query, {
  props({ data: { loading, articles, fetchMore } }) {
    return {
      articles: articles && articles.edges.map(edge => edge.node),
      hasMore: articles && articles.pageInfo.hasNextPage,
      loading,
      fetchArticles: () => {
        return fetchMore({
          query,
          variables: {
            cursor: articles.pageInfo.endCursor
          },
          updateQuery: (oldData, { fetchMoreResult }) => {
            const newData = fetchMoreResult.data;
            return {
              articles: {
                edges: [...oldData.articles.edges, ...newData.articles.edges],
                pageInfo: newData.articles.pageInfo
              }
            };
          }
        });
      }
    };
  }
})(App);
