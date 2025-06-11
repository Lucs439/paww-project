import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Animated,
  Platform,
  StatusBar
} from 'react-native';

// Import du logo
import { Logo } from '../assets/illustrations';

export default function SplashScreen({ navigation }) {
  // Animations
  const logoScale = new Animated.Value(0);
  const logoOpacity = new Animated.Value(0);
  const titleOpacity = new Animated.Value(0);
  const dot1Opacity = new Animated.Value(0.3);
  const dot2Opacity = new Animated.Value(0.3);
  const dot3Opacity = new Animated.Value(0.3);

  useEffect(() => {
    // Animation du logo
    Animated.sequence([
      // Apparition du logo avec scale
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      // Apparition du titre après un délai
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation des points de chargement
    const animateLoadingDots = () => {
      Animated.sequence([
        Animated.timing(dot1Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot2Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot3Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(dot1Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => animateLoadingDots());
    };

    // Démarrer l'animation des points après 1 seconde
    const dotsTimer = setTimeout(animateLoadingDots, 1000);

    // Navigation vers Onboarding après 3 secondes
    const timer = setTimeout(() => {
      navigation.replace('Onboarding2');
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