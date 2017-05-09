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
      forLater
      favourite
      description
      published
      newsletters {
        id
        name
        url
        imgUrl
      }
    }
  }
`;

const pageSize = 25;

const user = gql`query getUser {
  loggedUser {
    id
    nickname
  }
}`;

const main = gql`query getArticles ($cursor: String, $q: String) {
  loggedUser {
    id
    nickname
  }
  articles(first: ${pageSize}, after: $cursor, q: $q) {
    ${listArticles}
  }
}`;

const favourites = gql`query getFavourites ($cursor: String, $q: String) {
  loggedUser {
    id
    nickname
    favourites(first: ${pageSize}, after: $cursor, q: $q) {
      ${listArticles}
    }
  }
}`;

const forLater = gql`query getForLater ($cursor: String, $q: String) {
  loggedUser {
    id
    nickname
    forLater(first: ${pageSize}, after: $cursor, q: $q) {
      ${listArticles}
    }
  }
}`;

export const userQuery = graphql(user, {
  props({ data: { loading, loggedUser } }) {
    return {
      loading,
      loggedUser
    };
  }
});

export const mainQuery = graphql(main, {
  options: ({ q }) => ({
    variables: {
      q
    }
  }),
  props({ data: { loading, articles, loggedUser, fetchMore } }) {
    return {
      articles: articles && articles.edges.map(edge => edge.node),
      loggedUser,
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
  options: ({ q }) => ({
    fetchPolicy: "network-only",
    variables: {
      q
    }
  }),
  props({ data: { loading, loggedUser, fetchMore } }) {
    return {
      articles: loggedUser &&
        loggedUser.favourites.edges.map(edge => edge.node),
      hasMore: loggedUser && loggedUser.favourites.pageInfo.hasNextPage,
      loading,
      loggedUser,
      fetchArticles: () => {
        return fetchMore({
          favourites,
          variables: {
            cursor: loggedUser.favourites.pageInfo.endCursor
          },
          updateQuery: (oldData, { fetchMoreResult }) => {
            const newData = fetchMoreResult.data;
            return {
              loggedUser: {
                ...oldData.loggedUser,
                favourites: {
                  edges: [
                    ...oldData.loggedUser.favourites.edges,
                    ...newData.loggedUser.favourites.edges
                  ],
                  pageInfo: newData.loggedUser.favourites.pageInfo
                }
              }
            };
          }
        });
      }
    };
  }
});

export const forLaterQuery = graphql(forLater, {
  options: ({ q }) => ({
    fetchPolicy: "network-only",
    variables: {
      q
    }
  }),
  props({ data: { loading, loggedUser, fetchMore } }) {
    return {
      articles: loggedUser && loggedUser.forLater.edges.map(edge => edge.node),
      hasMore: loggedUser && loggedUser.forLater.pageInfo.hasNextPage,
      loading,
      loggedUser,
      fetchArticles: () => {
        return fetchMore({
          forLater,
          variables: {
            cursor: loggedUser.forLater.pageInfo.endCursor
          },
          updateQuery: (oldData, { fetchMoreResult }) => {
            const newData = fetchMoreResult.data;
            return {
              loggedUser: {
                ...oldData.loggedUser,
                forLater: {
                  edges: [
                    ...oldData.loggedUser.forLater.edges,
                    ...newData.loggedUser.forLater.edges
                  ],
                  pageInfo: newData.loggedUser.forLater.pageInfo
                }
              }
            };
          }
        });
      }
    };
  }
});
