const env = process.env.NODE_ENV || 'development';
const config = {
  port: 3000,
  postgres: {
    user: 'postgres',
    password: 'root',
    port: 5433,
    database: 'weweekly'
  },
  mysql: {
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'weweekly'
  }
};

switch (env) {
  case 'test':
    config.mysql.database= 'test';
    config.mysql.port= 3307;
    break;
  case 'development':
    config.mysql.port= 3307;
    break;
  case 'production':

    break;
  default:

}

module.exports = config;
