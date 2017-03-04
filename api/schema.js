const graphql = require('graphql');
const knex = require('./knex');
const joinMonster = require('join-monster').default;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = graphql;

const articlesRepo = require('./repos/articles');
const newslettersRepo = require('./repos/newsletters');

const NewsletterType = new GraphQLObjectType({
  name: 'Newsletter',
  sqlTable: 'newsletters',
  uniqueKey: 'id',
  fields: {
    id: {type: GraphQLInt},
    name: {type: GraphQLString}
  }
});

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  sqlTable: 'articles',
  uniqueKey: 'id',
  fields: {
    id: {type: GraphQLInt},
    title: {type: GraphQLString},
    url: {type: GraphQLString},
    description: {type: GraphQLString},
    imgUrl: {type: GraphQLString, sqlColumn: 'img_url'},
    newsletters: {
      type: new GraphQLList(NewsletterType),
      junctionTable: 'article_newsletter',
      sqlJoins: [
        (articleTable, joinTable) => `${articleTable}.id = ${joinTable}.article_id`,
        (joinTable, newsletterTable) => `${joinTable}.newsletter_id = ${newsletterTable}.id`,
      ]
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    article: {
      type: ArticleType,
      args: {url : { type: GraphQLString }},
      resolve(parentValue, args, context, resolveInfo) {
        return joinMonster(resolveInfo, {}, sql => knex.raw, { dialect: 'mysql' })
      }
    },
    articles: {
      type: new GraphQLList(ArticleType),
      args: {},
      resolve(parentValue, args, context, resolveInfo) {
        return joinMonster(resolveInfo, {}, sql => {
          return knex.raw(sql).then(result => result[0]);
        }, { dialect: 'mysql' })
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
