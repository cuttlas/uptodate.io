import React, { Component } from "react";
import { gql, graphql, compose } from "react-apollo";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";

import Article from "components/Article/Article";
import Header from "components/Header/Header";

const query = gql`query getArticles ($cursor: String) {
  loggedUser {
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
        author
        url
        date
        forLater
        favourite
        description
        newsletters {
          id
          name
        }
      }
    }
  }
}`;

const addFavourite = gql`mutation addFavourite ($articleId: Int!) {
  addFavourite(articleId: $articleId) {
    id
    favourite
  }
}`;

const addForLater = gql`mutation addForLater ($articleId: Int!) {
  addForLater(articleId: $articleId) {
    error
  }
}`;

const removeFavourite = gql`mutation removeFavourite ($articleId: Int!) {
  removeFavourite(articleId: $articleId) {
    error
  }
}`;

const removeForLater = gql`mutation removeForLater ($articleId: Int!) {
  removeForLater(articleId: $articleId) {
    error
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
    const {
      articles,
      hasMore,
      fetchArticles,
      addFavourite,
      addForLater,
      removeFavourite,
      removeForLater
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
              <Article
                article={article}
                addFavourite={addFavourite}
                addForLater={addForLater}
                removeFavourite={removeFavourite}
                removeForLater={removeForLater}
                key={key}
              />
            ))}
        </InfiniteGrid>
      </Container>
    );
  }
}

export { App };
export default compose(
  graphql(query, {
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
  }),
  graphql(addFavourite, {
    name: "addFavourite",
    props({ addFavourite }) {
      return {
        addFavourite: articleId => {
          addFavourite({
            variables: { articleId }
          });
        }
      };
    }
  }),
  graphql(addForLater, {
    name: "addForLater",
    props({ addForLater }) {
      return {
        addForLater: articleId => {
          addForLater({
            variables: { articleId }
          });
        }
      };
    }
  }),
  graphql(removeFavourite, {
    name: "removeFavourite",
    props({ removeFavourite }) {
      return {
        removeFavourite: articleId => {
          removeFavourite({
            variables: { articleId }
          });
        }
      };
    }
  }),
  graphql(removeForLater, {
    name: "removeForLater",
    props({ removeForLater }) {
      return {
        removeForLater: articleId => {
          removeForLater({
            variables: { articleId }
          });
        }
      };
    }
  })
)(App);
