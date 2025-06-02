const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Erreur de validation',
      details: err.message
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Non autorisé',
      details: err.message
    });
  }

  return res.status(500).json({
    error: 'Erreur interne du serveur',
    details: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
  });
};

module.exports = errorHandler; 