require('dotenv').config();

const config = {
  // Configuration du serveur
  server: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3001
  },

  // Base de données PostgreSQL
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME || 'paww_db',
    user: process.env.DB_USER || 'paww_user',
    password: process.env.DB_PASSWORD || 'paww_password'
  },

  // InfluxDB pour les métriques
  influxdb: {
    url: process.env.INFLUX_URL || 'http://localhost:8086',
    token: process.env.INFLUX_TOKEN || 'default_token',
    org: process.env.INFLUX_ORG || 'paww',
    bucket: process.env.INFLUX_BUCKET || 'pet_metrics'
  },

  // Redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || ''
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'paww_development_secret_key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },

  // Sécurité
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 12
  },

  // API Keys externes
  externalApis: {
    openai: process.env.OPENAI_API_KEY || '',
    pushNotification: process.env.PUSH_NOTIFICATION_KEY || ''
  },

  // Upload de fichiers
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 10485760, // 10MB par défaut
    uploadPath: process.env.UPLOAD_PATH || './uploads'
  },

  // Logs
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  }
};

module.exports = config; 