const serverlessHttp = require("serverless-http");

const Koa = require("koa");
const mount = require("koa-mount");
const cors = require("kcors");

const userRepo = require("../../db/repos/users");
const config = require("../config");

const Grant = require("grant-koa");
const grant = new Grant(config.oauth);
const session = require("koa-session");

const app = new Koa();

app.use(cors());

app.keys = ["grant"];
app.use(session(app));
app.use(mount(grant));
exports.login = serverlessHttp(app);

exports.twitter = function(event, context, cb) {
  const nickname = this.query["raw[screen_name]"];
  const twitterId = this.query["raw[user_id]"];
  const token = this.query.access_token;

  userRepo
    .find({
      nickname
    })
    .then(user => {
      if (!user)
        return userRepo.insert({
          nickname,
          twitterId,
          token
        });
    })
    .then(() => {
      cb({});
    })
    .catch(() => {
      cb({});
    });

  // this.redirect(`${config.appHost}?token=${token}`);
  // this.redirect(`${config.appHost}?error=true`);
};
