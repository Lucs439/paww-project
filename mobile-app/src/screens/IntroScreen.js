// src/screens/IntroScreen.js - Page d'introduction avec sélection d'environnement
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Platform,
  Alert,
  StatusBar
} from 'react-native';

// Import du wrapper pour optimisation mobile web
import MobileWebWrapper from '../components/MobileWebWrapper';

// Import du logo
import { Logo } from '../assets/illustrations';

// Import du service d'environnement
import EnvironmentService from '../services/EnvironmentService';

export default function IntroScreen({ navigation }) {
  const [selectedEnv, setSelectedEnv] = useState(null);
  const [currentEnvInfo, setCurrentEnvInfo] = useState(null);

  useEffect(() => {
    // Charger l'environnement existant au démarrage
    loadCurrentEnvironment();
  }, []);

  const loadCurrentEnvironment = async () => {
    try {
      await EnvironmentService.loadEnvironment();
      const envInfo = EnvironmentService.getEnvironmentInfo();
      setCurrentEnvInfo(envInfo);
      
      // Si un environnement est déjà configuré, on peut proposer de continuer
      if (envInfo.type !== 'Non configuré') {
        console.log('🌍 Environnement déjà configuré:', envInfo);
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement de l\'environnement:', error);
    }
  };

  const handleEnvironmentSelect = async (environment) => {
    setSelectedEnv(environment);
    
    // Afficher une confirmation
    const envName = environment === 'int' ? 'Intégration (Test)' : 'Production';
    Alert.alert(
      `Environnement ${envName}`,
      `Vous avez sélectionné l'environnement ${envName.toLowerCase()}.\n\nContinuer ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
          onPress: () => setSelectedEnv(null)
        },
        {
          text: 'Continuer',
          style: 'default',
          onPress: async () => {
            try {
              // Sauvegarder l'environnement avec le service
              await EnvironmentService.saveEnvironment(environment);
              
              // Mettre à jour l'état local
              const envInfo = EnvironmentService.getEnvironmentInfo();
              setCurrentEnvInfo(envInfo);
              
              // Navigation vers Welcome
              navigation.navigate('Welcome');
            } catch (error) {
              console.error('❌ Erreur lors de la sauvegarde:', error);
              Alert.alert('Erreur', 'Impossible de sauvegarder la configuration.');
            }
          }
        }
      ]
    );
  };

  const handleEmergencyAccess = () => {
    Alert.alert(
      '🚨 Accès d\'urgence',
      'Cet accès est réservé aux développeurs en cas d\'urgence.\n\nVous serez redirigé directement vers l\'écran de connexion.',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Continuer',
          style: 'destructive',
          onPress: () => navigation.navigate('Login')
        }
      ]
    );
  };

  const handleResetEnvironment = () => {
    Alert.alert(
      '🔄 Réinitialiser',
      'Voulez-vous réinitialiser la configuration d\'environnement ?',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: async () => {
            try {
              await EnvironmentService.resetEnvironment();
              setCurrentEnvInfo({ type: 'Non configuré', name: 'Aucun environnement sélectionné' });
            } catch (error) {
              console.error('❌ Erreur lors de la réinitialisation:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <MobileWebWrapper hasBottomButton={false}>
        <View style={styles.content}>
          {/* Header avec logo et titre */}
          <View style={styles.header}>
            <Logo width={80} height={80} />
            <Text style={styles.title}>PAWW</Text>
            <Text style={styles.subtitle}>Configuration d'environnement</Text>
            
            {/* Affichage de l'environnement actuel */}
            {currentEnvInfo && currentEnvInfo.type !== 'Non configuré' && (
              <View style={styles.currentEnvBadge}>
                <Text style={styles.currentEnvText}>
                  Actuel: {currentEnvInfo.type}
                </Text>
              </View>
            )}
          </View>

          {/* Informations importantes */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>ℹ️ Informations importantes</Text>
            
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Version de l'application :</Text>
              <Text style={styles.infoValue}>1.0.0-beta</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Plateforme :</Text>
              <Text style={styles.infoValue}>{Platform.OS === 'web' ? 'Web (React Native Web)' : Platform.OS}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Build :</Text>
              <Text style={styles.infoValue}>#{new Date().getFullYear()}0603</Text>
            </View>

            {/* Informations de l'environnement actuel */}
            {currentEnvInfo && currentEnvInfo.type !== 'Non configuré' && (
              <>
                <View style={styles.infoCard}>
                  <Text style={styles.infoLabel}>Environnement :</Text>
                  <Text style={styles.infoValue}>{currentEnvInfo.name}</Text>
                </View>
                
                <View style={styles.infoCard}>
                  <Text style={styles.infoLabel}>API URL :</Text>
                  <Text style={styles.infoValue}>{EnvironmentService.getApiUrl()}</Text>
                </View>
              </>
            )}

            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                ⚠️ Choisissez votre environnement avec attention.{'\n'}
                INT pour les tests, PROD pour l'utilisation réelle.
              </Text>
            </View>
          </View>

          {/* Sélection d'environnement */}
          <View style={styles.environmentSection}>
            <Text style={styles.sectionTitle}>Choisir l'environnement</Text>
            
            {/* Bouton INT */}
            <TouchableOpacity 
              style={[styles.envButton, styles.intButton]} 
              onPress={() => handleEnvironmentSelect('int')}
              activeOpacity={0.8}
            >
              <View style={styles.envButtonContent}>
                <Text style={styles.envButtonIcon}>🧪</Text>
                <View style={styles.envButtonText}>
                  <Text style={styles.envButtonTitle}>INTÉGRATION</Text>
                  <Text style={styles.envButtonSubtitle}>Environnement de test • Données factices</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Bouton PROD */}
            <TouchableOpacity 
              style={[styles.envButton, styles.prodButton]} 
              onPress={() => handleEnvironmentSelect('prod')}
              activeOpacity={0.8}
            >
              <View style={styles.envButtonContent}>
                <Text style={styles.envButtonIcon}>🚀</Text>
                <View style={styles.envButtonText}>
                  <Text style={styles.envButtonTitle}>PRODUCTION</Text>
                  <Text style={styles.envButtonSubtitle}>Environnement réel • Données utilisateurs</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Actions */}
          <View style={styles.actionsSection}>
            {/* Réinitialiser si configuré */}
            {currentEnvInfo && currentEnvInfo.type !== 'Non configuré' && (
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={handleResetEnvironment}
                activeOpacity={0.7}
              >
                <Text style={styles.resetText}>🔄 Réinitialiser la configuration</Text>
              </TouchableOpacity>
            )}
            
            {/* Accès d'urgence */}
            <TouchableOpacity 
              style={styles.emergencyButton}
              onPress={handleEmergencyAccess}
              activeOpacity={0.7}
            >
              <Text style={styles.emergencyText}>🆘 Accès d'urgence développeur</Text>
            </TouchableOpacity>
          </View>
        </View>
      </MobileWebWrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#171717',
    marginTop: 12,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  currentEnvBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  currentEnvText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Sections
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Informations
  infoSection: {
    marginBottom: 40,
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  warningBox: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  warningText: {
    fontSize: 14,
    color: '#92400E',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Environnements
  environmentSection: {
    flex: 1,
  },
  envButton: {
    borderRadius: 12,
    marginBottom: 16,
    // Ombre pour iOS
    ...(Platform.OS === 'ios' && {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    }),
    // Ombre pour Android
    ...(Platform.OS === 'android' && {
      elevation: 3,
    }),
  },
  intButton: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
    borderWidth: 2,
  },
  prodButton: {
    backgroundColor: '#F0FDF4',
    borderColor: '#22C55E',
    borderWidth: 2,
  },
  envButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  envButtonIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  envButtonText: {
    flex: 1,
  },
  envButtonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  envButtonSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Actions
  actionsSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  resetButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 12,
  },
  resetText: {
    fontSize: 14,
    color: '#F59E0B',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Accès d'urgence
  emergencyButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 20,
  },
  emergencyText: {
    fontSize: 14,
    color: '#DC2626',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
}); 