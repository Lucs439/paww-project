// App.js - Navigation principale avec Bottom Tabs
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { authService } from './src/services/authService';

// Import des écrans principaux
import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import OnboardingScreen2 from './src/screens/OnboardingScreen2';
import OnboardingScreen3 from './src/screens/OnboardingScreen3';
import OnboardingScreen4 from './src/screens/OnboardingScreen4';
import OnboardingScreen5 from './src/screens/OnboardingScreen5';
import OnboardingScreen6 from './src/screens/OnboardingScreen6';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

// Import des écrans de l'app principale
import HomeScreen from './src/screens/HomeScreen';
import VeterinaryScreen from './src/screens/VeterinaryScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Import des écrans de détail
import WellnessDetailScreen from './src/screens/WellnessDetailScreen';
import SleepDetailScreen from './src/screens/SleepDetailScreen';
import MorningDetailScreen from './src/screens/MorningDetailScreen';
import EveningDetailScreen from './src/screens/EveningDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Écran de chargement
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#8B5CF6" />
    <Text style={styles.loadingText}>Vérification de votre compte...</Text>
  </View>
);

// Navigation Bottom Tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Santé') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Vétérinaire') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Santé" component={HomeScreen} />
      <Tab.Screen name="Vétérinaire" component={VeterinaryScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Navigation principale
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    try {
      // Vérifier l'état de connexion avec le service d'auth
      const authStatus = await authService.checkAuthStatus();
      
      if (authStatus.isLoggedIn) {
        // Vérifier si le token est encore valide
        const isTokenValid = await authService.verifyToken();
        
        if (isTokenValid) {
          setIsUserLoggedIn(true);
          setCurrentUser(authStatus.user);
        } else {
          // Token invalide, déconnecter l'utilisateur
          setIsUserLoggedIn(false);
          setCurrentUser(null);
        }
      } else {
        // Pas connecté
        setIsUserLoggedIn(false);
        setCurrentUser(null);
      }
    } catch (error) {
      console.log('Erreur lors de la vérification de connexion:', error);
      setIsUserLoggedIn(false);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isUserLoggedIn ? "MainApp" : "Login"}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        {/* Écrans d'onboarding */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
        <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
        <Stack.Screen name="Onboarding4" component={OnboardingScreen4} />
        <Stack.Screen name="Onboarding5" component={OnboardingScreen5} />
        <Stack.Screen name="Onboarding6" component={OnboardingScreen6} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        {/* App principale avec tabs */}
        <Stack.Screen name="MainApp" component={MainTabs} />

        {/* Écrans de détail */}
        <Stack.Screen 
          name="WellnessDetail" 
          component={WellnessDetailScreen}
          options={{ 
            headerShown: true,
            title: 'Détails Bien-être',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen 
          name="SleepDetail" 
          component={SleepDetailScreen}
          options={{ 
            headerShown: true,
            title: 'Analyse du Sommeil',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen 
          name="MorningDetail" 
          component={MorningDetailScreen}
          options={{ 
            headerShown: true,
            title: 'Début de Journée',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen 
          name="EveningDetail" 
          component={EveningDetailScreen}
          options={{ 
            headerShown: true,
            title: 'Fin de Journée',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#6B7280',
  },
});

