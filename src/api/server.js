const Koa = require("koa");
const convert = require("koa-convert");
const mount = require("koa-mount");
const graphql = require("koa-graphql");
const cors = require("kcors");
const session = require("koa-session");
const router = require("koa-router")();

const config = require("../config");

const app = new Koa();
const schema = require("./schema");

const Grant = require("grant-koa");
const grant = new Grant(config.oauth);

app.keys = ["grant"];
app.use(session(app));
app.use(mount(grant));

const authHandlers = require("./handlers/auth");

router.get("/twitter", authHandlers.twitter);

app.use(convert(cors()));

app.use(
  mount(
    "/graphql",
    convert(
      graphql({
        schema,
        graphiql: true
      })
    )
  )
);

app.use(router.routes());

app.listen(config.port, () => console.log(`listening to port ${config.port}`));
