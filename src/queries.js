import { gql, graphql } from "react-apollo";

const listArticles = `
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
`;

const main = gql`query getArticles ($cursor: String) {
  loggedUser {
    id
    nickname
  }
  articles(first: 10, after: $cursor) {
    ${listArticles}
  }
}`;

const favourites = gql`query getFavourites ($cursor: String) {
  loggedUser {
    favourites {
      ${listArticles}
    }
  }
}`;

const forLater = gql`query getForLater ($cursor: String) {
  loggedUser {
    forLater {
      ${listArticles}
    }
  }
}`;

export const mainQuery = graphql(main, {
  props({ data: { loading, articles, fetchMore } }) {
    return {
      articles: articles && articles.edges.map(edge => edge.node),
      hasMore: articles && articles.pageInfo.hasNextPage,
      loading,
      fetchArticles: () => {
        return fetchMore({
          main,
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
});

export const favouritesQuery = graphql(favourites, {
  props({ data: { loading, loggedUser, fetchMore } }) {
    return {
      articles: loggedUser &&
        loggedUser.favourites.edges.map(edge => edge.node),
      hasMore: loggedUser && loggedUser.favourites.pageInfo.hasNextPage,
      loading,
      fetchArticles: () => {
        return fetchMore({
          favourites,
          variables: {
            cursor: loggedUser.favourites.pageInfo.endCursor
          },
          updateQuery: (oldData, { fetchMoreResult }) => {
            const newData = fetchMoreResult.data.loggedUser;
            return {
              loggedUser: {
                favourites: {
                  edges: [
                    ...oldData.favourites.edges,
                    ...newData.favourites.edges
                  ],
                  pageInfo: newData.favourites.pageInfo
                }
              }
            };
          }
        });
      }
    };
  }
});
