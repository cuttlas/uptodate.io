import { gql, graphql } from "react-apollo";

const addFavourite = gql`mutation addFavourite ($articleId: Int!) {
  addFavourite(articleId: $articleId) {
    id
    favourite
  }
}`;

const addForLater = gql`mutation addForLater ($articleId: Int!) {
  addForLater(articleId: $articleId) {
    id
    forLater
  }
}`;

const removeFavourite = gql`mutation removeFavourite ($articleId: Int!) {
  removeFavourite(articleId: $articleId) {
    id
    favourite
  }
}`;

const removeForLater = gql`mutation removeForLater ($articleId: Int!) {
  removeForLater(articleId: $articleId) {
    id
    forLater
  }
}`;

export const addFavouriteMutation = graphql(addFavourite, {
  name: "addFavourite",
  props({ addFavourite }) {
    return {
      addFavourite: articleId => {
        addFavourite({
          variables: { articleId },
          optimisticResponse: {
            __typename: "Mutation",
            addFavourite: {
              id: articleId,
              favourite: true,
              __typename: "Article"
            }
          }
        });
      }
    };
  }
});
export const addForLaterMutation = graphql(addForLater, {
  name: "addForLater",
  props({ addForLater }) {
    return {
      addForLater: articleId => {
        addForLater({
          variables: { articleId },
          optimisticResponse: {
            __typename: "Mutation",
            addForLater: {
              id: articleId,
              forLater: true,
              __typename: "Article"
            }
          }
        });
      }
    };
  }
});
export const removeFavouriteMutation = graphql(removeFavourite, {
  name: "removeFavourite",
  props({ removeFavourite }) {
    return {
      removeFavourite: articleId => {
        removeFavourite({
          variables: { articleId },
          optimisticResponse: {
            __typename: "Mutation",
            removeFavourite: {
              id: articleId,
              favourite: false,
              __typename: "Article"
            }
          }
        });
      }
    };
  }
});

export const removeForLaterMutation = graphql(removeForLater, {
  name: "removeForLater",
  props({ removeForLater }) {
    return {
      removeForLater: articleId => {
        removeForLater({
          variables: { articleId },
          optimisticResponse: {
            __typename: "Mutation",
            removeForLater: {
              id: articleId,
              forLater: false,
              __typename: "Article"
            }
          }
        });
      }
    };
  }
});
