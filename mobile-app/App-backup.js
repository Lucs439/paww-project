// App.js - Sauvegarde de la version complète

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import des écrans
import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import OnboardingScreen2 from './src/screens/OnboardingScreen2';
import OnboardingScreen3 from './src/screens/OnboardingScreen3';
import OnboardingScreen4 from './src/screens/OnboardingScreen4';
import OnboardingScreen5 from './src/screens/OnboardingScreen5';
import OnboardingScreen6 from './src/screens/OnboardingScreen6';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
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
        {/* Écran de splash */}
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{
            title: 'Splash',
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