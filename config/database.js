require('dotenv').load();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER || 'admin',
    password: process.env.POSTGRES_PASS || 'password',
    database: process.env.POSTGRES_DB || 'news',
    host: process.env.POSTGRES_HOST || 'localhost',
    port : process.env.POSTGRES_PORT || '5432',
    dialect: 'postgres',
    logging : null
  },
  test: {
    username: process.env.POSTGRES_USE || 'admin',
    password: process.env.POSTGRES_PASS || 'password',
    database: process.env.POSTGRES_DB || 'news',
    host: process.env.POSTGRES_HOST || 'localhost',
    port : process.env.POSTGRES_PORT || '5432',
    dialect: 'postgres',
    logging: null
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port : process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging : false 
  },
};
