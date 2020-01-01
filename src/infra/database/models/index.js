const Sequelize = require('sequelize');
const ModelsLoader = require('src/infra/sequelize');
const { db: config } = require('config');
const logger = require('src/infra/logging/logger')

if(config) {
  const sequelize = new Sequelize(config);
  module.exports = ModelsLoader.load({
    sequelize,
    baseFolder: __dirname
  });
} else {
  logger.error('Database configuration not found, disabling database.');
}
