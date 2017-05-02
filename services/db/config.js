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
    config.mysql.host = "uptodateio-mysql.cidajczud5hb.us-east-1.rds.amazonaws.com";
    config.mysql.user = "uptodateio";
    config.mysql.password = "upt0datei0";
    break;
  default:
}

module.exports = config;
