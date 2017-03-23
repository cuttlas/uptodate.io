const request = require("request");

exports.get = function(url) {
  return new Promise((resolve, reject) => {
    request(
      {
        url,
        headers: {
          "User-Agent": "Chrome 15.0.874 / Mac OS X 10.8.1",
          "Accept-Language": "en-gb"
        }
      },
      (err, res, body) => {
        if (err) return reject(err);
        return resolve(body);
      }
    );
  });
};

exports.head = function(url) {
  return new Promise((resolve, reject) => {
    request(
      {
        method: "HEAD",
        url,
        headers: {
          "User-Agent": "Chrome 15.0.874 / Mac OS X 10.8.1",
          "Accept-Language": "en-gb"
        },
        followRedirects: true
      },
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};
