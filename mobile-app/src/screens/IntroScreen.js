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
  StatusBar,
  Linking
} from 'react-native';

// Import du wrapper pour optimisation mobile web
import MobileWebWrapper from '../components/MobileWebWrapper';

// Import du logo
import { Logo } from '../assets/illustrations';

// Import du service d'environnement
import EnvironmentService from '../services/EnvironmentService';

// Import des utilitaires responsive
import { 
  useResponsive, 
  getResponsiveFontSize, 
  getResponsiveSpacing,
  getResponsiveValue 
} from '../utils/responsive';

export default function IntroScreen({ navigation }) {
  const [selectedEnv, setSelectedEnv] = useState(null);
  const [currentEnvInfo, setCurrentEnvInfo] = useState(null);
  
  // Hook responsive
  const responsive = useResponsive();

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
    console.log('🔘 Bouton cliqué pour environnement:', environment);
    setSelectedEnv(environment);
    
    // Si c'est l'environnement INT, démarrer l'onboarding directement
    if (environment === 'int') {
      try {
        // Sauvegarder l'environnement sélectionné
        await EnvironmentService.saveEnvironment(environment);
        
        // Mettre à jour l'état local
        const envInfo = EnvironmentService.getEnvironmentInfo();
        setCurrentEnvInfo(envInfo);
        
        console.log('✅ Environnement INT configuré');
        console.log('🚀 Démarrage de l\'onboarding...');
        
        // Naviguer directement vers l'onboarding
        navigation.navigate('Onboarding2');
        
      } catch (error) {
        console.error('❌ Erreur lors de la configuration:', error);
        Alert.alert(
          'Erreur de configuration', 
          `Impossible de configurer l'environnement d'intégration.\n\nErreur: ${error.message}`
        );
      }
      setSelectedEnv(null);
      return;
    }
    
    // Pour la production, afficher une confirmation
    const envName = 'Production';
    const envUrl = 'api.paww.app';
    
    console.log('📱 Affichage de l\'alerte pour:', envName);
    
    Alert.alert(
      `Environnement ${envName}`,
      `Configuration ${envName.toLowerCase()} :\n• API: ${envUrl}\n• Mode debug: Désactivé\n\nContinuer ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
          onPress: () => {
            console.log('❌ Sélection annulée');
            setSelectedEnv(null);
          }
        },
        {
          text: 'Continuer',
          style: 'default',
          onPress: async () => {
            console.log('✅ Confirmation de l\'environnement:', environment);
            try {
              // Sauvegarder l'environnement sélectionné
              await EnvironmentService.saveEnvironment(environment);
              
              // Mettre à jour l'état local
              const envInfo = EnvironmentService.getEnvironmentInfo();
              setCurrentEnvInfo(envInfo);
              
              console.log(`✅ Environnement ${envName} configuré`);
              console.log('🧭 Navigation vers Welcome...');
              
              // Navigation vers Welcome avec l'environnement configuré  
              navigation.navigate('Welcome');
            } catch (error) {
              console.error('❌ Erreur lors de la configuration:', error);
              Alert.alert(
                'Erreur de configuration', 
                `Impossible de configurer l'environnement ${envName.toLowerCase()}.\n\nErreur: ${error.message}`
              );
              setSelectedEnv(null);
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

  // Génération des styles responsive
  const styles = createResponsiveStyles(responsive);

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
            
            {/* Information sur les configurations */}
            <View style={styles.destinationInfo}>
              <Text style={styles.destinationTitle}>⚙️ Configurations :</Text>
              <Text style={styles.destinationUrl}>
                🧪 INT → Démarre l'onboarding • Mode test • Debug activé
              </Text>
              <Text style={styles.destinationUrl}>
                🚀 PROD → API: api.paww.app • Analytics activé
              </Text>
            </View>
            
            {/* Conteneur responsive pour les boutons */}
            <View style={styles.buttonsContainer}>
              {/* Bouton INT */}
              <TouchableOpacity 
                style={[styles.envButton, styles.intButton]} 
                onPress={() => {
                  console.log('🧪 Clic bouton INT détecté');
                  handleEnvironmentSelect('int');
                }}
                activeOpacity={0.8}
              >
                <View style={styles.envButtonContent}>
                  <Text style={styles.envButtonIcon}>🧪</Text>
                  <View style={styles.envButtonText}>
                    <Text style={styles.envButtonTitle}>INTÉGRATION</Text>
                    <Text style={styles.envButtonSubtitle}>Démarre l'onboarding • Mode test • Debug activé</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Bouton PROD */}
              <TouchableOpacity 
                style={[styles.envButton, styles.prodButton]} 
                onPress={() => {
                  console.log('🚀 Clic bouton PROD détecté');
                  handleEnvironmentSelect('prod');
                }}
                activeOpacity={0.8}
              >
                <View style={styles.envButtonContent}>
                  <Text style={styles.envButtonIcon}>🚀</Text>
                  <View style={styles.envButtonText}>
                    <Text style={styles.envButtonTitle}>PRODUCTION</Text>
                    <Text style={styles.envButtonSubtitle}>Environnement réel • Analytics • API de production</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionsSection}>
            {/* Continuer avec environnement actuel */}
            {currentEnvInfo && currentEnvInfo.type !== 'Non configuré' && (
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={() => navigation.navigate('Welcome')}
                activeOpacity={0.8}
              >
                <Text style={styles.continueText}>
                  ✅ Continuer avec {currentEnvInfo.type}
                </Text>
              </TouchableOpacity>
            )}
            
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

// Fonction pour créer des styles responsive
const createResponsiveStyles = (responsive) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 0, // Maintenant géré par MobileWebWrapper
    paddingVertical: getResponsiveSpacing(20),
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginBottom: getResponsiveSpacing(40),
    paddingTop: getResponsiveSpacing(20),
  },
  title: {
    fontSize: getResponsiveFontSize(32),
    fontWeight: '700',
    color: '#171717',
    marginTop: getResponsiveSpacing(12),
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  subtitle: {
    fontSize: getResponsiveFontSize(16),
    color: '#6B7280',
    marginTop: getResponsiveSpacing(4),
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
    fontSize: getResponsiveFontSize(18),
    fontWeight: '600',
    color: '#171717',
    marginBottom: getResponsiveSpacing(16),
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Informations
  infoSection: {
    marginBottom: getResponsiveSpacing(40),
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
  buttonsContainer: {
    flexDirection: responsive.isDesktop ? 'row' : 'column',
    gap: responsive.isDesktop ? getResponsiveSpacing(16) : 0,
    justifyContent: 'space-between',
  },
  destinationInfo: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  destinationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  destinationUrl: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  envButton: {
    borderRadius: getResponsiveSpacing(12),
    marginBottom: responsive.isDesktop ? 0 : getResponsiveSpacing(16),
    overflow: 'hidden',
    flex: responsive.isDesktop ? 1 : undefined,
    minHeight: getResponsiveSpacing(100),
    // S'assurer que le bouton est cliquable
    pointerEvents: 'auto',
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
    flexDirection: responsive.isMobile ? 'column' : 'row',
    alignItems: responsive.isMobile ? 'center' : 'center',
    padding: getResponsiveSpacing(20),
    textAlign: responsive.isMobile ? 'center' : 'left',
  },
  envButtonIcon: {
    fontSize: getResponsiveFontSize(32),
    marginRight: responsive.isMobile ? 0 : getResponsiveSpacing(16),
    marginBottom: responsive.isMobile ? getResponsiveSpacing(8) : 0,
  },
  envButtonText: {
    flex: 1,
    alignItems: responsive.isMobile ? 'center' : 'flex-start',
  },
  envButtonTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: '700',
    color: '#171717',
    marginBottom: getResponsiveSpacing(4),
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textAlign: responsive.isMobile ? 'center' : 'left',
  },
  envButtonSubtitle: {
    fontSize: getResponsiveFontSize(14),
    color: '#6B7280',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textAlign: responsive.isMobile ? 'center' : 'left',
  },

  // Actions
  actionsSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  continueButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    minWidth: 200,
    alignItems: 'center',
  },
  continueText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
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
    fontSize: getResponsiveFontSize(14),
    color: '#DC2626',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
});