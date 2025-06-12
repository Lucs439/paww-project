import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Animated,
  Platform,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';

// Import du logo
import { Logo } from '../assets/illustrations';

export default function SplashScreen({ navigation }) {
  // État pour gérer la navigation
  const [navigationReady, setNavigationReady] = useState(false);

  // Animations
  const logoScale = new Animated.Value(0);
  const logoOpacity = new Animated.Value(0);
  const titleOpacity = new Animated.Value(0);
  const dot1Opacity = new Animated.Value(0.3);
  const dot2Opacity = new Animated.Value(0.3);
  const dot3Opacity = new Animated.Value(0.3);

  // Fonction pour gérer la navigation selon l'état de l'utilisateur
  const handleNavigation = async () => {
    try {
      // Vérifier si c'est la première fois
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      const isFirstTime = hasSeenOnboarding === null;

      // Vérifier l'état de connexion
      const authStatus = await authService.checkAuthStatus();
      let isLoggedIn = false;

      if (authStatus.isLoggedIn) {
        // Vérifier si le token est encore valide
        const isTokenValid = await authService.verifyToken();
        isLoggedIn = isTokenValid;
      }

      // Déterminer la destination
      if (isLoggedIn) {
        // Utilisateur connecté → aller à l'app principale
        console.log('🏠 Utilisateur connecté, redirection vers MainApp');
        navigation.replace('MainApp');
      } else if (isFirstTime) {
        // Première fois → aller au tutoriel (onboarding)
        console.log('🎯 Première visite, redirection vers Onboarding');
        navigation.replace('Onboarding2');
      } else {
        // Utilisateur non connecté qui a déjà vu le tuto → aller au welcome
        console.log('👋 Retour utilisateur, redirection vers Welcome');
        navigation.replace('Welcome');
      }
    } catch (error) {
      console.error('Erreur lors de la navigation depuis Splash:', error);
      // En cas d'erreur, aller vers le welcome par défaut
      navigation.replace('Welcome');
    }
  };

  useEffect(() => {
    // Animation du logo
    Animated.sequence([
      // Apparition du logo avec scale
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 80,
          friction: 8,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]),
      // Apparition du titre après un délai
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();

    // Animation des points de chargement
    const animateLoadingDots = () => {
      Animated.sequence([
        Animated.timing(dot1Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(dot2Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(dot3Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.parallel([
          Animated.timing(dot1Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(dot2Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(dot3Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ]),
      ]).start(() => animateLoadingDots());
    };

    // Démarrer l'animation des points après 1 seconde
    const dotsTimer = setTimeout(animateLoadingDots, 1000);

    // Déterminer la destination et naviguer après 3 secondes
    const timer = setTimeout(async () => {
      await handleNavigation();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(dotsTimer);
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Status bar pour Android */}
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#9E6AFF" 
        translucent={false}
      />
      
      <View style={styles.content}>
        {/* Logo animé */}
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }]
            }
          ]}
        >
          <Logo width={120} height={120} />
        </Animated.View>

        {/* Titre animé */}
        <Animated.View 
          style={[
            styles.titleContainer,
            { opacity: titleOpacity }
          ]}
        >
          <Text style={styles.title}>PAWW</Text>
          <Text style={styles.subtitle}>L'amour, ça se suit de près !</Text>
        </Animated.View>

        {/* Indicateur de chargement discret */}
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.loadingDot, { opacity: dot1Opacity }]} />
          <Animated.View style={[styles.loadingDot, { opacity: dot2Opacity }]} />
          <Animated.View style={[styles.loadingDot, { opacity: dot3Opacity }]} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9E6AFF', // Couleur primaire violette
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  
  // Logo
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
    // Légère ombre pour faire ressortir le logo
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    // Pour Android
    elevation: 8,
  },
  
  // Titre
  titleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    lineHeight: 24,
  },
  
  // Indicateur de chargement
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 80,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 4,
    // Animation de pulsation
    ...(Platform.OS === 'ios' && {
      shadowColor: '#FFFFFF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
    }),
  },
}); 