const Koa = require('koa');
const convert = require('koa-convert');
const mount = require('koa-mount');
const graphql = require('koa-graphql');
const cors = require('kcors');

const app = new Koa();
const schema = require('./schema');

app.use(cors());

app.use(mount('/graphql', convert(graphql({
  schema,
  graphiql: true
}))));

app.listen(4000, () => console.log(`listening to port 4000`));
