const env = process.env.NODE_ENV || "development";
const config = {
  port: 4000,
  postgres: {
    user: "postgres",
    password: "root",
    port: 5433,
    database: "uptodate"
  },
  mysql: {
    user: "root",
    password: "root",
    port: 3306,
    database: "uptodate"
  }
};

config.oauth = {
  server: {
    protocol: "http",
    host: `dev.uptodate.io:${config.port}`
  },
  twitter: {
    key: "vXEmanXdhfsmmcvYQTWCA8aya",
    secret: "HmSmz903TVnZ2q2F9nNQODFE2rlesynSTn4zKae6jg3LZIEoWE",
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
    config.host = "dev.uptodate.io";
    break;
  case "production":
    config.appHost = "http://uptodate.io";
    config.oauth = {
      server: {
        protocol: "http",
        host: `uptodate.io:${config.port}`
      },
      twitter: {
        key: "itAssc1fK8kJKCGidRg7hfTuS",
        secret: "Cay9ll2BzlwvEcl4DoUe1XUI1bti5AbGIM9BPJZGTCBc0X0kEd",
        callback: "/twitter"
      }
    };
    break;
  default:
}

module.exports = config;
