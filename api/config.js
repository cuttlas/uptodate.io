const env = process.env.NODE_ENV || 'development';
const config = {
  port: 3000,
  database: {
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'weweekly'
  }
};

switch (env) {
  case 'development':
    config.database.port= 3307;
    break;
  case 'production':

    break;
  default:

}

module.exports = config;
