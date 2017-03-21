const config = require('./config');
module.exports = {
  development: {
    client: 'mysql',
    connection: config.mysql,
  },
  manresa: {
    client: 'mysql',
    connection: config.mysql,
  },
  test: {
    client: 'mysql',
    connection: config.mysql,
  },
  production: {
    client: 'mysql',
    connection: config.mysql,
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
