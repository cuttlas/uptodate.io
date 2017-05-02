const env = process.env.NODE_ENV || "development";
const config = {};

switch (env) {
  case "development":
    config.host = "http://dev.uptodate.io:4000";
    break;
  case "production":
    config.host = "https://veggflyoyd.execute-api.us-east-1.amazonaws.com/production";
    break;
  default:
}

module.exports = config;
