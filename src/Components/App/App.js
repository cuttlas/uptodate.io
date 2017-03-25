import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";

import logo from "logo.svg";
import Article from "Components/Article/Article";

const query = gql`query getArticles ($cursor: String) {
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
        description
        newsletters {
          id
          name
        }
      }
    }
  }
}`;

const Container = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  height: 80px;
`;

const Header = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfiniteGrid = styled(InfiniteScroll)`
  margin-top: 25px;
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
`;

class App extends Component {
  static propTypes = {
    data: React.PropTypes.object
  };

  render() {
    const { articles, hasMore, fetchArticles } = this.props;

    return (
      <Container>
        <Header>
          <Logo src={logo} alt="logo" />
          <h2>WeWeekly</h2>
        </Header>
        <InfiniteGrid
          loadMore={fetchArticles}
          hasMore={hasMore}
          initialLoad={false}
        >
          {articles &&
            articles.map((article, key) => (
              <Article className="Article" article={article} key={key} />
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
