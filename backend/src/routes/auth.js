const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

// Route de login
router.post('/login', async (req, res) => {
  try {
    // TODO: Implémenter la vérification avec la base de données
    const { email, password } = req.body;
    
    // Pour le test, on accepte un utilisateur de test
    if (email === 'test@example.com' && password === 'password123') {
      const token = jwt.sign(
        { id: 1, email },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );
      
      res.json({
        success: true,
        token,
        user: { id: 1, email }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion'
    });
  }
});

// Route d'inscription
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // TODO: Implémenter la création d'utilisateur dans la base de données
    res.status(201).json({
      success: true,
      message: 'Inscription réussie'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription'
    });
  }
});

module.exports = router; 