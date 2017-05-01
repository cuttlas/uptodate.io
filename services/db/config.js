const env = process.env.NODE_ENV || "development";
const config = {
  mysql: {
    user: "root",
    password: "root",
    port: 3306,
    database: "uptodate"
  }
};

switch (env) {
  case "test":
    config.mysql.database = "test";
    break;
  case "production":
    break;
  default:
}

module.exports = config;
