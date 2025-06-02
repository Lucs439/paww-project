const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Récupère le profil de l'utilisateur connecté
router.get('/profile', auth, async (req, res) => {
  try {
    // TODO: Implémenter la récupération depuis la base de données
    const user = {
      id: req.user.id,
      email: req.user.email,
      name: 'John Doe',
      pets: [
        { id: 1, name: 'Rex' },
        { id: 2, name: 'Minou' }
      ]
    };
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du profil'
    });
  }
});

// Met à jour le profil de l'utilisateur
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // TODO: Implémenter la mise à jour dans la base de données
    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: { id: req.user.id, name, email }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du profil'
    });
  }
});

module.exports = router; 