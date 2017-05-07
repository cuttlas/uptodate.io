const env = process.env.NODE_ENV || "development";
const config = {};

switch (env) {
  case "development":
    config.host = "http://dev.uptodate.io:4000";
    break;
  case "production":
    config.host = "http://ns399575.ip-5-196-67.eu:4000";
    break;
  default:
}

module.exports = config;
