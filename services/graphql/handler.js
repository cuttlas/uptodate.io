const serverlessHttp = require("serverless-http");

const Koa = require("koa");
const mount = require("koa-mount");
const cors = require("kcors");
const graphql = require("koa-graphql");

const schema = require("./schema");

const app = new Koa();

app.use(cors());

app.use(
  mount(
    "/",
    graphql({
      schema,
      graphiql: true
    })
  )
);

module.exports.graphql = serverlessHttp(app);
