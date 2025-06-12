import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const handleGetStarted = () => {
    console.log('🚀 Navigation vers création de compte');
    navigation.navigate('Signup');
  };

  const handleLogin = () => {
    console.log('🔐 Navigation vers connexion');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo PAWW simplifié */}
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>PAWW</Text>
          </View>
        </View>

        {/* Titre et slogan */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Paww</Text>
          <Text style={styles.subtitle}>
            L'amour, ça se{'\n'}suit de près !
          </Text>
        </View>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../assets/illustrations/Illu page 1.jpg')}
            style={styles.illustration}
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
  logoPlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 8,
    backgroundColor: '#9E6AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
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
    fontSize: 24,
    fontWeight: '700',
    color: '#171717',
    textAlign: 'center',
    lineHeight: 28,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  
  // Illustration
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  illustration: {
    width: 300,
    height: 200,
    borderRadius: 20,
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