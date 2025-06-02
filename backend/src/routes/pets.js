const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Liste tous les animaux
router.get('/', auth, async (req, res) => {
  try {
    // TODO: Implémenter la récupération depuis la base de données
    const pets = [
      { id: 1, name: 'Rex', type: 'chien', breed: 'Berger Allemand' },
      { id: 2, name: 'Minou', type: 'chat', breed: 'Siamois' }
    ];
    
    res.json({
      success: true,
      data: pets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des animaux'
    });
  }
});

// Ajoute un nouvel animal
router.post('/', auth, async (req, res) => {
  try {
    const { name, type, breed } = req.body;
    
    // TODO: Implémenter l'ajout dans la base de données
    res.status(201).json({
      success: true,
      message: 'Animal ajouté avec succès',
      data: { id: 3, name, type, breed }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout de l\'animal'
    });
  }
});

module.exports = router; 