const request = require('request');

module.exports = function makeRequest(url) {
  return new Promise((resolve, reject) => {
    request({
      url,
      headers: {
        'User-Agent': 'Chrome 15.0.874 / Mac OS X 10.8.1',
        'Accept-Language': 'en-gb',
      },
    }, (err, res, body) => {
      if (err) return reject(err);
      return resolve(body);
    });
  });
}
