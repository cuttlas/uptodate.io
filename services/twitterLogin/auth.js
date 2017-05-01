const userRepo = require("../repos/users");
const config = require("../../config");

exports.twitter = async function() {
  const nickname = this.query["raw[screen_name]"];
  const twitterId = this.query["raw[user_id]"];
  const token = this.query.access_token;

  try {
    const user = await userRepo.find({
      nickname
    });

    if (!user) {
      await userRepo.insert({
        nickname,
        twitterId,
        token
      });
    }

    this.redirect(`${config.appHost}?token=${token}`);
  } catch (e) {
    this.redirect(`${config.appHost}?error=true`);
  }
};
