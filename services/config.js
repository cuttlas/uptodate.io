const env = process.env.NODE_ENV || "development";
const config = {
  port: 4000
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
