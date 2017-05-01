const serverlessHttp = require("serverless-http");

const Koa = require("koa");
const mount = require("koa-mount");
const convert = require("koa-convert");
const graphql = require("koa-graphql");

const schema = require("./schema");

const app = new Koa();

app.use(
  mount(
    "/",
    convert(
      graphql({
        schema,
        graphiql: true
      })
    )
  )
);

module.exports.graphql = serverlessHttp(app);
