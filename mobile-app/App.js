// App.js - Application PAWW avec vérification d'environnement au démarrage

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import des écrans
import IntroScreen from './src/screens/IntroScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import OnboardingScreen2 from './src/screens/OnboardingScreen2';
import OnboardingScreen3 from './src/screens/OnboardingScreen3';
import OnboardingScreen4 from './src/screens/OnboardingScreen4';
import OnboardingScreen5 from './src/screens/OnboardingScreen5';
import OnboardingScreen6 from './src/screens/OnboardingScreen6';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

// Import du logo
import { Logo } from './src/assets/illustrations';

// Import du service d'environnement
import EnvironmentService from './src/services/EnvironmentService';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasEnvironment, setHasEnvironment] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Intro');

  useEffect(() => {
    checkEnvironmentOnStartup();
  }, []);

  const checkEnvironmentOnStartup = async () => {
    try {
      console.log('🚀 Démarrage de l\'application PAWW...');
      
      // Charger l'environnement existant
      const envData = await EnvironmentService.loadEnvironment();
      
      if (envData && envData.type) {
        // Environnement déjà configuré
        console.log('✅ Environnement trouvé:', envData.type.toUpperCase());
        setHasEnvironment(true);
      } else {
        // Pas d'environnement configuré
        console.log('⚠️ Aucun environnement configuré');
        setHasEnvironment(false);
      }
      
      // Toujours commencer par l'écran d'introduction
      console.log('📱 Affichage de l\'écran d\'introduction');
      setInitialRoute('Intro');
      
    } catch (error) {
      console.error('❌ Erreur lors de la vérification d\'environnement:', error);
      // En cas d'erreur, forcer l'affichage de l'intro
      setHasEnvironment(false);
      setInitialRoute('Intro');
    } finally {
      setIsLoading(false);
    }
  };

  // Écran de chargement pendant la vérification
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false, // Cache la barre de navigation par défaut
          gestureEnabled: true, // Active les gestes de retour
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        {/* Écran d'introduction avec sélection d'environnement */}
        <Stack.Screen 
          name="Intro" 
          component={IntroScreen}
          options={{
            title: 'Introduction',
            gestureEnabled: false, // Empêche le retour sur cet écran
          }}
        />

        {/* Écran d'accueil */}
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{
            title: 'Bienvenue',
          }}
        />
        
        {/* Écrans d'onboarding */}
        <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
        <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
        <Stack.Screen name="Onboarding4" component={OnboardingScreen4} />
        <Stack.Screen name="Onboarding5" component={OnboardingScreen5} />
        <Stack.Screen name="Onboarding6" component={OnboardingScreen6} />
        
        {/* Écran de connexion */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            title: 'Connexion',
          }}
        />
        
        {/* Écran d'inscription */}
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={{
            title: 'Inscription',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Composant d'écran de chargement
function LoadingScreen() {
  return (
    <View style={loadingStyles.container}>
      <View style={loadingStyles.content}>
        <Logo width={100} height={100} />
        <Text style={loadingStyles.title}>PAWW</Text>
        <Text style={loadingStyles.subtitle}>Vérification de l'environnement...</Text>
        <ActivityIndicator 
          size="large" 
          color="#9E6AFF" 
          style={loadingStyles.spinner}
        />
      </View>
    </View>
  );
}

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#171717',
    marginTop: 20,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  spinner: {
    marginTop: 20,
  },
});

// 🎯 APPLICATION MISE À JOUR !
// 
// ✅ Vérification d'environnement au démarrage
// ✅ Écran de chargement pendant la vérification
// ✅ Toujours commencer par l'écran d'introduction
// ✅ Page d'intro affichée à chaque refresh/démarrage
// ✅ Gestion des environnements préservée pour fonctionnalités avancées
// 
// 🚀 LOGIQUE DE DÉMARRAGE :
// 
// 1. App démarre → LoadingScreen
// 2. Vérification environnement avec EnvironmentService (en arrière-plan)
// 3. Toujours → IntroScreen (page d'accueil principale)
// 4. Utilisateur choisit environnement → Navigation vers onboarding/Welcome
// 5. Après sélection environnement → Welcome