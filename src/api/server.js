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
const userRepo = require("./repos/users");

const Grant = require("grant-koa");
const grant = new Grant(config.oauth);

app.keys = ["grant"];
app.use(session(app));
app.use(mount(grant));

const authHandlers = require("./handlers/auth");

router.get("/twitter", authHandlers.twitter);

app.use(convert(cors()));

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.use(async (context, next) => {
  const token = context.request.header.authorization;

  if (token) {
    const user = await userRepo.find({ password: token });
    if (user) {
      context.state.user = user;
    }
  }

  // await sleep(3000);
  await next();
});

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
