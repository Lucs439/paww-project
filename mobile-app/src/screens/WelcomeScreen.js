import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Platform,
  Image
} from 'react-native';

// Import du wrapper pour optimisation mobile web
import MobileWebWrapper from '../components/MobileWebWrapper';

// Import des SVG et images
import { Logo, WelcomePets } from '../assets/illustrations';

export default function WelcomeScreen({ navigation }) {
  const handleGetStarted = () => {
    console.log('🚀 Navigation vers onboarding');
    navigation.navigate('Onboarding2');
  };

  const handleLogin = () => {
    console.log('🔐 Navigation vers connexion');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <MobileWebWrapper hasBottomButton={true}>
        <View style={styles.content}>
          {/* Logo PAWW */}
          <View style={styles.logoContainer}>
            <Logo width={65} height={65} />
          </View>

          {/* Titre et slogan */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Paww</Text>
            <Text style={styles.subtitle}>
              L'amour, ça se{'\n'}suit de près !
            </Text>
          </View>

          {/* Illustration des animaux */}
          <View style={styles.illustrationContainer}>
            <Image 
              source={WelcomePets} 
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>

          {/* Boutons */}
          <View style={styles.buttonContainer}>
            {/* Bouton principal */}
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>
                Création de mon compte
              </Text>
            </TouchableOpacity>
            
            {/* Texte de connexion */}
            <TouchableOpacity 
              onPress={handleLogin} 
              style={styles.loginContainer}
              activeOpacity={0.7}
            >
              <Text style={styles.loginText}>
                Vous avez déjà un compte ? 
                <Text style={styles.loginLink}> Connexion</Text>
              </Text>
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
    justifyContent: 'space-between',
  },
  
  // Logo
  logoContainer: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 60 : 40,
  },
  
  // Titre et slogan
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 0,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  subtitle: {
    fontSize: 48,
    fontWeight: '700',
    color: '#171717',
    textAlign: 'center',
    lineHeight: 52,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  
  // Illustration
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  illustrationImage: {
    width: 320,
    height: 240,
    maxWidth: '100%',
  },
  
  // Boutons
  buttonContainer: {
    marginBottom: Platform.OS === 'web' ? 0 : (Platform.OS === 'ios' ? 40 : 20),
  },
  primaryButton: {
    backgroundColor: '#9E6AFF',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    minHeight: 56,
    // Ombre pour iOS
    ...(Platform.OS === 'ios' && {
      shadowColor: '#9E6AFF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    }),
    // Ombre pour Android
    ...(Platform.OS === 'android' && {
      elevation: 4,
    }),
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  
  // Texte de connexion
  loginContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  loginText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#171717',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  loginLink: {
    color: '#FA4D5E',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
}); 