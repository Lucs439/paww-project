const { Sequelize } = require('sequelize');
const config = require('../config/config');
const logger = require('./logger');

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: 'postgres',
    logging: (msg) => logger.debug(msg),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('✅ Connexion à la base de données établie avec succès.');
  } catch (error) {
    logger.error('❌ Impossible de se connecter à la base de données:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  testConnection
}; 