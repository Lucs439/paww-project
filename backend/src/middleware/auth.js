const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token d\'authentification manquant' 
      });
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      error: 'Token invalide ou expiré' 
    });
  }
};

module.exports = auth; 