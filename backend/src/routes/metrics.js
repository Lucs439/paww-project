const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Récupère les métriques d'un animal
router.get('/:petId', auth, async (req, res) => {
  try {
    const { petId } = req.params;
    
    // TODO: Implémenter la récupération depuis InfluxDB
    const metrics = {
      temperature: [
        { timestamp: Date.now(), value: 38.5 },
        { timestamp: Date.now() - 3600000, value: 38.2 }
      ],
      activity: [
        { timestamp: Date.now(), value: 'repos' },
        { timestamp: Date.now() - 1800000, value: 'marche' }
      ]
    };
    
    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des métriques'
    });
  }
});

// Ajoute une nouvelle métrique
router.post('/:petId', auth, async (req, res) => {
  try {
    const { petId } = req.params;
    const { type, value } = req.body;
    
    // TODO: Implémenter l'ajout dans InfluxDB
    res.status(201).json({
      success: true,
      message: 'Métrique ajoutée avec succès',
      data: {
        petId,
        type,
        value,
        timestamp: Date.now()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout de la métrique'
    });
  }
});

module.exports = router; 