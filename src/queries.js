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
        imgUrl
      }
    }
  }
`;

const pageSize = 30;

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
    favourites(first: ${pageSize}, after: $cursor, q: $q) {
      ${listArticles}
    }
  }
}`;

const forLater = gql`query getForLater ($cursor: String, $q: String) {
  loggedUser {
    id
    forLater(first: ${pageSize}, after: $cursor, q: $q) {
      ${listArticles}
    }
  }
}`;

export const mainQuery = graphql(main, {
  options: ({ search }) => ({
    variables: {
      q: search
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
  options: ({ search }) => ({
    fetchPolicy: "network-only",
    variables: {
      q: search
    }
  }),
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
  options: ({ search }) => ({
    fetchPolicy: "network-only",
    variables: {
      q: search
    }
  }),
  props({ data: { loading, loggedUser, fetchMore } }) {
    return {
      articles: loggedUser && loggedUser.forLater.edges.map(edge => edge.node),
      hasMore: loggedUser && loggedUser.forLater.pageInfo.hasNextPage,
      loading,
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
