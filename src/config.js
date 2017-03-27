const env = process.env.NODE_ENV || "development";
const config = {
  port: 4000,
  postgres: {
    user: "postgres",
    password: "root",
    port: 5433,
    database: "weweekly"
  },
  mysql: {
    user: "root",
    password: "root",
    port: 3306,
    database: "weweekly"
  }
};

config.oauth = {
  server: {
    protocol: "http",
    host: `dev.weweekly:${config.port}`
  },
  twitter: {
    key: "16khXvKNzv7MRUGZzNDcUBL4h",
    secret: "zsk2y5Ubd0sdAJkWJ6azL6UiDzdJbJum8BvMz4xvTf9fU1SOu9",
    callback: "/twitter"
  }
};

switch (env) {
  case "test":
    config.appHost = "http://localhost:3000";
    config.mysql.database = "test";
    break;
  case "development":
    config.appHost = "http://localhost:3000";
    config.host = "dev.weweekly";
    break;
  case "production":
    config.appHost = "http://weweekly.com";
    break;
  default:
}

module.exports = config;
