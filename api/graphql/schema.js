const graphql = require("graphql");
const gqlUtils = require("graphql-relay");

const articlesRepo = require("../../db/repos/articles");
const newslettersRepo = require("../../db/repos/newsletters");
const usersRepo = require("../../db/repos/users");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = graphql;

const GraphQLDate = require("graphql-date");

const NewsletterType = new GraphQLObjectType({
  name: "Newsletter",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    imgUrl: {
      type: GraphQLString,
      resolve(parentValue) {
        return parentValue.img_url;
      }
    }
  }
});

const ArticleType = new GraphQLObjectType({
  name: "Article",
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
    author: { type: GraphQLString },
    description: { type: GraphQLString },
    imgUrl: { type: GraphQLString },
    published: { type: GraphQLDate },
    publishedBy: {
      type: NewsletterType,
      resolve(parentValue, args, context) {
        return newslettersRepo.find({ id: parentValue.published_by });
      }
    },
    forLater: {
      type: GraphQLBoolean,
      resolve(parentValue, args, context) {
        if (!context.state.user) return false;

        return articlesRepo.isForLater({
          userId: context.state.user.id,
          articleId: parentValue.id
        });
      }
    },
    favourite: {
      type: GraphQLBoolean,
      resolve(parentValue, args, context) {
        if (!context.state.user) return false;

        return articlesRepo.isFavourite({
          userId: context.state.user.id,
          articleId: parentValue.id
        });
      }
    },
    newsletters: {
      type: new GraphQLList(NewsletterType),
      resolve(parentValue, args) {
        return newslettersRepo.getByArticle({
          articleId: parentValue.id
        });
      }
    }
  }
});

const { connectionType: ArticleConnection } = gqlUtils.connectionDefinitions({
  nodeType: ArticleType
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    nickname: { type: GraphQLString },
    forLater: {
      type: ArticleConnection,
      args: Object.assign(
        { q: { type: GraphQLString } },
        gqlUtils.connectionArgs
      ),
      resolve(parentValue, args) {
        return articlesRepo
          .getForLater({
            userId: parentValue.id,
            q: args.q
          })
          .then(data => {
            return gqlUtils.connectionFromArray(data, args);
          });
      }
    },
    favourites: {
      type: ArticleConnection,
      args: Object.assign(
        { q: { type: GraphQLString } },
        gqlUtils.connectionArgs
      ),
      resolve(parentValue, args) {
        return articlesRepo
          .getFavourites({
            userId: parentValue.id,
            q: args.q
          })
          .then(data => {
            return gqlUtils.connectionFromArray(data, args);
          });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    loggedUser: {
      type: UserType,
      resolve(parentValue, args, context, resolveInfo) {
        return context.state.user;
      }
    },
    articles: {
      type: ArticleConnection,
      args: Object.assign(
        { q: { type: GraphQLString } },
        gqlUtils.connectionArgs
      ),
      resolve(parentValue, args, context, resolveInfo) {
        const user = context.state.user;
        return articlesRepo
          .get({
            q: args.q
          })
          .then(data => {
            return gqlUtils.connectionFromArray(data, args);
          });
      }
    }
  })
});

const ResponseType = new GraphQLObjectType({
  name: "Response",
  fields: {
    error: { type: GraphQLString }
  }
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addFavourite: {
      type: ArticleType,
      args: {
        articleId: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args, context) {
        const user = context.state.user;
        if (!user) return { error: "Invalid User" };

        return usersRepo
          .addFavourite({
            userId: user.id,
            articleId: args.articleId
          })
          .then(() => {
            return {
              id: args.articleId
            };
          })
          .catch(e => {
            if (e.message.indexOf("Duplicate entry") > 0) {
              return { error: "Article already added to favourites" };
            }
            return { error: e.message };
          });
      }
    },
    addForLater: {
      type: ArticleType,
      args: {
        articleId: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args, context) {
        const user = context.state.user;
        if (!user) return { error: "Invalid User" };

        return usersRepo
          .addForLater({
            userId: user.id,
            articleId: args.articleId
          })
          .then(() => {
            return {
              id: args.articleId
            };
          })
          .catch(e => {
            if (e.message.indexOf("Duplicate entry") > 0) {
              return { error: "Article already added for later" };
            }
            return { error: e.message };
          });
      }
    },
    removeFavourite: {
      type: ArticleType,
      args: {
        articleId: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args, context) {
        const user = context.state.user;
        if (!user) return { error: "Invalid User" };

        return usersRepo
          .removeFavourite({
            userId: user.id,
            articleId: args.articleId
          })
          .then(() => {
            return {
              id: args.articleId
            };
          })
          .catch(e => {
            return { error: e.message };
          });
      }
    },
    removeForLater: {
      type: ArticleType,
      args: {
        articleId: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args, context) {
        const user = context.state.user;
        if (!user) return { error: "Invalid User" };

        return usersRepo
          .removeForLater({
            userId: user.id,
            articleId: args.articleId
          })
          .then(() => {
            return {
              id: args.articleId
            };
          })
          .catch(e => {
            return { error: e.message };
          });
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
