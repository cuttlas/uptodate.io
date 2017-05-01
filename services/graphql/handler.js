const graphql = require("graphql").graphql;
const schema = require("./schema");

const parseJson = str => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
};

module.exports.graphql = (event, context, cb) => {
  const payload = parseJson(event.body);
  const query = payload[Object.keys(payload)[0]];

  graphql(
    schema,
    query,
    {},
    {
      state: {}
    }
  )
    .then(res => {
      console.log(res);
      cb(null, {
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        statusCode: 200,
        body: JSON.stringify(res)
      });
    })
    .catch(cb);
};
