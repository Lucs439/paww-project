require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Import de l'initialisation de la base de données
const { initDatabase } = require('./src/models');

// Import des routes
const authRoutes = require('./src/routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration du rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre
  message: {
    success: false,
    message: 'Trop de requêtes depuis cette IP, réessayez dans 15 minutes.'
  }
});

// Middlewares globaux
app.use(helmet()); // Sécurité
app.use(cors()); // CORS
app.use(limiter); // Rate limiting
app.use(express.json({ limit: '10mb' })); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded

// Middleware de logging simple
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Routes de base
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API PAWW! 🐾',
    version: '1.0.0',
    status: 'active',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      pets: '/api/pets',
      metrics: '/api/metrics'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'connected', // On pourrait faire un vrai check ici
    memory: process.memoryUsage()
  });
});

// ========================================
// ROUTE DE TEST TEMPORAIRE
// ========================================
app.post('/api/auth/debug-test', async (req, res) => {
  try {
    console.log('🧪 Route de test appelée');
    
    res.json({
      success: true,
      message: 'Route de test fonctionne',
      timestamp: new Date().toISOString(),
      body: req.body
    });
  } catch (error) {
    console.error('Erreur route test:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur route test',
      error: error.message
    });
  }
});

// Routes API
app.use('/api/auth', authRoutes);

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route non trouvée',
    message: `La route ${req.originalUrl} n'existe pas`
  });
});

// Middleware de gestion d'erreurs (doit être en dernier)
app.use((err, req, res, next) => {
  console.error('❌ Erreur capturée:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Fonction de démarrage du serveur
const startServer = async () => {
  try {
    // Initialiser la base de données
    console.log('🔌 Initialisation de la base de données...');
    const dbInitialized = await initDatabase();
    
    if (!dbInitialized) {
      console.error('❌ Impossible d\'initialiser la base de données');
      process.exit(1);
    }

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur PAWW démarré sur le port ${PORT}`);
      console.log(`📍 http://localhost:${PORT}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
      console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth/*`);
    });

  } catch (error) {
    console.error('❌ Erreur lors du démarrage:', error);
    process.exit(1);
  }
};

// Gestion des erreurs non catchées
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Démarrer le serveur
startServer();

module.exports = app;