const Koa = require('koa');
const convert = require('koa-convert');
const mount = require('koa-mount');
const graphql = require('koa-graphql');

const app = new Koa();
const schema = require('./schema');

app.use(mount('/graphql', convert(graphql({
  schema,
  graphiql: true
}))));

app.listen(4000);
