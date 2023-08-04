import knex from 'knex';
import config from '../shared/config/index.js';

const db = knex({
  client: 'postgresql',
  connection: {
    host: config.db.host,
    port: config.db.port,
    database: config.db.name,
    user: config.db.user,
    password: config.db.password
  },
  pool: {
    min: 2,
    max: 10
  },
});

export default db;