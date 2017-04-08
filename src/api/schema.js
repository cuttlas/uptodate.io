const graphql = require("graphql");
const gqlUtils = require("graphql-relay");
const knex = require("./knex");
const joinMonster = require("join-monster").default;

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

const UserType = new GraphQLObjectType({
  name: "User",
  sqlTable: "users",
  uniqueKey: "id",
  fields: () => ({
    id: { type: GraphQLInt },
    nickname: { type: GraphQLString },
    forLater: {
      type: new GraphQLList(ArticleType),
      junctionTable: "for_later",
      sqlJoins: [
        (userTable, joinTable) => `${userTable}.id = ${joinTable}.user_id`,
        (joinTable, articleTable) =>
          `${joinTable}.article_id = ${articleTable}.id`
      ]
    },
    favourites: {
      type: new GraphQLList(ArticleType),
      junctionTable: "favourites",
      sqlJoins: [
        (userTable, joinTable) => `${userTable}.id = ${joinTable}.user_id`,
        (joinTable, articleTable) =>
          `${joinTable}.article_id = ${articleTable}.id`
      ]
    }
  })
});

const NewsletterType = new GraphQLObjectType({
  name: "Newsletter",
  sqlTable: "newsletters",
  uniqueKey: "id",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  }
});

const ArticleType = new GraphQLObjectType({
  name: "Article",
  sqlTable: "articles",
  uniqueKey: "id",
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
    description: { type: GraphQLString },
    imgUrl: { type: GraphQLString, sqlColumn: "img_url" },
    date: { type: GraphQLDate },
    readLater: {
      type: GraphQLBoolean,
      sqlExpr: (table, args) =>
        `(SELECT COUNT(*) FROM article_newsletter an WHERE an.newsletter_id = 1) = 0`
    },
    newsletters: {
      type: new GraphQLList(NewsletterType),
      junctionTable: "article_newsletter",
      sqlJoins: [
        (articleTable, joinTable) =>
          `${articleTable}.id = ${joinTable}.article_id`,
        (joinTable, newsletterTable) =>
          `${joinTable}.newsletter_id = ${newsletterTable}.id`
      ]
    }
  }
});

const { connectionType: ArticleConnection } = gqlUtils.connectionDefinitions({
  nodeType: ArticleType
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user: {
      type: UserType,
      resolve(parentValue, args, context, resolveInfo) {
        const user = context.state.user;
        return user;
      }
    },
    article: {
      type: ArticleType,
      args: { url: { type: GraphQLString } },
      resolve(parentValue, args, context, resolveInfo) {
        return joinMonster(resolveInfo, {}, sql => knex.raw, {
          dialect: "mysql"
        });
      }
    },
    articles: {
      type: ArticleConnection,
      args: Object.assign(
        { url: { type: GraphQLString } },
        gqlUtils.connectionArgs
      ),
      resolve(parentValue, args, context, resolveInfo) {
        const user = context.state.user;

        return joinMonster(
          resolveInfo,
          {},
          sql => {
            return knex.raw(sql).then(result => {
              return result[0];
            });
          },
          { dialect: "mysql" }
        ).then(data => gqlUtils.connectionFromArray(data, args));
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
        const user = context.state.user || { id: 1 };

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
        const user = context.state.user || { id: 1 };
        await usersRepo.addForLater({
          userId: user.id,
          articleId: args.articleId
        });
        return user;
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
        const user = context.state.user || { id: 1 };
        await usersRepo.removeFavourite({
          userId: user.id,
          articleId: args.articleId
        });
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
        const user = context.state.user || { id: 1 };
        await usersRepo.removeForLater({
          userId: user.id,
          articleId: args.articleId
        });
        return user;
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
