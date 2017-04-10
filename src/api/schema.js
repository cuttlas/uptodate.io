const graphql = require("graphql");
const gqlUtils = require("graphql-relay");
const knex = require("./knex");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = graphql;

const GraphQLDate = require("graphql-date");

const articlesRepo = require("./repos/articles");
const newslettersRepo = require("./repos/newsletters");
const usersRepo = require("./repos/users");

const NewsletterType = new GraphQLObjectType({
  name: "Newsletter",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  }
});

const ArticleType = new GraphQLObjectType({
  name: "Article",
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
    description: { type: GraphQLString },
    imgUrl: { type: GraphQLString },
    date: { type: GraphQLDate },
    forLater: {
      type: GraphQLBoolean,
      async resolve(parentValue, args, context) {
        if (!context.state.user) return false;

        return await articlesRepo.isForLater({
          userId: context.state.user.id,
          articleId: parentValue.id
        });
      }
    },
    favourite: {
      type: GraphQLBoolean,
      async resolve(parentValue, args, context) {
        if (!context.state.user) return false;

        return await articlesRepo.isFavourite({
          userId: context.state.user.id,
          articleId: parentValue.id
        });
      }
    },
    newsletters: {
      type: new GraphQLList(NewsletterType),
      async resolve(parentValue, args) {
        return await newslettersRepo.getByArticle({
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
      async resolve(parentValue, args) {
        const data = await articlesRepo.getForLater({
          userId: parentValue.id,
          q: args.q
        });

        return gqlUtils.connectionFromArray(data, args);
      }
    },
    favourites: {
      type: ArticleConnection,
      args: Object.assign(
        { q: { type: GraphQLString } },
        gqlUtils.connectionArgs
      ),
      async resolve(parentValue, args) {
        const data = await articlesRepo.getFavourites({
          userId: parentValue.id,
          q: args.q
        });

        return gqlUtils.connectionFromArray(data, args);
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
      async resolve(parentValue, args, context, resolveInfo) {
        const user = context.state.user;
        const data = await articlesRepo.get({
          q: args.q
        });
        const articles = gqlUtils.connectionFromArray(data, args);

        return articles;
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
      type: ResponseType,
      args: {
        articleId: {
          type: GraphQLInt
        }
      },
      async resolve(parentValue, args, context) {
        const user = context.state.user;
        if (!user) return { error: "Invalid User" };

        try {
          await usersRepo.addFavourite({
            userId: user.id,
            articleId: args.articleId
          });
          return {};
        } catch (e) {
          return { error: e.message };
        }
      }
    },
    addForLater: {
      type: ResponseType,
      args: {
        articleId: {
          type: GraphQLInt
        }
      },
      async resolve(parentValue, args, context) {
        const user = context.state.user;
        if (!user) return { error: "Invalid User" };

        try {
          await usersRepo.addForLater({
            userId: user.id,
            articleId: args.articleId
          });
          return {};
        } catch (e) {
          return { error: e.message };
        }
      }
    },
    removeFavourite: {
      type: ResponseType,
      args: {
        articleId: {
          type: GraphQLInt
        }
      },
      async resolve(parentValue, args, context) {
        const user = context.state.user;
        if (!user) return { error: "Invalid User" };

        try {
          await usersRepo.removeFavourite({
            userId: user.id,
            articleId: args.articleId
          });
          return {};
        } catch (e) {
          return { error: e.message };
        }
      }
    },
    removeForLater: {
      type: ResponseType,
      args: {
        articleId: {
          type: GraphQLInt
        }
      },
      async resolve(parentValue, args, context) {
        const user = context.state.user;
        if (!user) return { error: "Invalid User" };

        try {
          await usersRepo.removeForLater({
            userId: user.id,
            articleId: args.articleId
          });
          return {};
        } catch (e) {
          return { error: e.message };
        }
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
