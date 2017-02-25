const config = require('./config');
module.exports = {
  development: {
    client: 'mysql',
    connection: config.database,
  },
  manresa: {
    client: 'mysql',
    connection: config.database,
  },
  test: {
    client: 'mysql',
    connection: config.database,
  },
  production: {
    client: 'mysql',
    connection: config.database,
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
