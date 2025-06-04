// src/services/EnvironmentService.js - Service de gestion d'environnement
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class EnvironmentService {
  constructor() {
    this.environments = {
      int: {
        name: 'Intégration',
        apiUrl: 'https://api-int.paww.app',
        wsUrl: 'wss://ws-int.paww.app',
        debug: true,
        logLevel: 'debug',
        features: {
          analytics: false,
          crashReporting: false,
          pushNotifications: false,
        }
      },
      prod: {
        name: 'Production',
        apiUrl: 'https://api.paww.app',
        wsUrl: 'wss://ws.paww.app',
        debug: false,
        logLevel: 'error',
        features: {
          analytics: true,
          crashReporting: true,
          pushNotifications: true,
        }
      }
    };

    this.currentEnvironment = null;
    this.storageKey = '@paww_environment';
  }

  // Récupérer l'environnement sauvegardé
  async loadEnvironment() {
    try {
      if (Platform.OS === 'web') {
        // Pour le web, utiliser localStorage
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
          this.currentEnvironment = JSON.parse(saved);
          return this.currentEnvironment;
        }
      } else {
        // Pour mobile natif, utiliser AsyncStorage
        const saved = await AsyncStorage.getItem(this.storageKey);
        if (saved) {
          this.currentEnvironment = JSON.parse(saved);
          return this.currentEnvironment;
        }
      }
      return null;
    } catch (error) {
      console.error('❌ Erreur lors du chargement de l\'environnement:', error);
      return null;
    }
  }

  // Sauvegarder l'environnement sélectionné
  async saveEnvironment(envType) {
    try {
      const envConfig = this.environments[envType];
      if (!envConfig) {
        throw new Error(`Environnement inconnu: ${envType}`);
      }

      const environmentData = {
        type: envType,
        config: envConfig,
        selectedAt: new Date().toISOString(),
        platform: Platform.OS,
      };

      if (Platform.OS === 'web') {
        // Pour le web, utiliser localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(environmentData));
      } else {
        // Pour mobile natif, utiliser AsyncStorage
        await AsyncStorage.setItem(this.storageKey, JSON.stringify(environmentData));
      }

      this.currentEnvironment = environmentData;
      
      console.log(`🌍 Environnement ${envConfig.name} configuré:`, {
        type: envType,
        apiUrl: envConfig.apiUrl,
        debug: envConfig.debug,
      });

      return environmentData;
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde de l\'environnement:', error);
      throw error;
    }
  }

  // Obtenir la configuration actuelle
  getCurrentConfig() {
    if (!this.currentEnvironment) {
      console.warn('⚠️ Aucun environnement configuré, utilisation de INT par défaut');
      return this.environments.int;
    }
    return this.currentEnvironment.config;
  }

  // Obtenir l'URL de l'API
  getApiUrl() {
    return this.getCurrentConfig().apiUrl;
  }

  // Obtenir l'URL WebSocket
  getWebSocketUrl() {
    return this.getCurrentConfig().wsUrl;
  }

  // Vérifier si le mode debug est activé
  isDebugMode() {
    return this.getCurrentConfig().debug;
  }

  // Obtenir le niveau de log
  getLogLevel() {
    return this.getCurrentConfig().logLevel;
  }

  // Vérifier si une fonctionnalité est activée
  isFeatureEnabled(featureName) {
    const features = this.getCurrentConfig().features;
    return features[featureName] || false;
  }

  // Obtenir les informations d'environnement pour affichage
  getEnvironmentInfo() {
    if (!this.currentEnvironment) {
      return {
        type: 'Non configuré',
        name: 'Aucun environnement sélectionné',
        selectedAt: null,
      };
    }

    return {
      type: this.currentEnvironment.type.toUpperCase(),
      name: this.currentEnvironment.config.name,
      selectedAt: this.currentEnvironment.selectedAt,
      platform: this.currentEnvironment.platform,
    };
  }

  // Réinitialiser la configuration
  async resetEnvironment() {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(this.storageKey);
      } else {
        await AsyncStorage.removeItem(this.storageKey);
      }
      this.currentEnvironment = null;
      console.log('🔄 Configuration d\'environnement réinitialisée');
    } catch (error) {
      console.error('❌ Erreur lors de la réinitialisation:', error);
      throw error;
    }
  }

  // Logs avec niveau approprié
  log(level, message, ...args) {
    const currentLogLevel = this.getLogLevel();
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    
    if (levels[level] >= levels[currentLogLevel]) {
      console[level](`[${level.toUpperCase()}] ${message}`, ...args);
    }
  }
}

// Instance singleton
const environmentService = new EnvironmentService();

export default environmentService; 