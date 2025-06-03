// src/screens/OnboardingScreen3.js - "A t-il la banane ?"
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Platform,
  Image,
  Dimensions
} from 'react-native';

// Import du wrapper pour optimisation mobile web
import MobileWebWrapper from '../components/MobileWebWrapper';

// Import de l'illustration et des backgrounds
import { Onboarding3Image, Vector3 } from '../assets/illustrations';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function OnboardingScreen3({ navigation }) {
  const handleNext = () => {
    navigation.navigate('Onboarding4');
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <MobileWebWrapper hasBottomButton={true}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '40%' }]} />
          </View>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Passer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>A t-il la banane ?</Text>
            <Text style={styles.subtitle}>
              En observant l'ensemble de ses données{'\n'}
              nous pouvons vous alerter et vous{'\n'}
              conseiller sur l'état mental de votre{'\n'}
              animal.
            </Text>
          </View>

          <View style={styles.illustrationContainer}>
            {/* Background avec Vector3 */}
            <View style={styles.backgroundShape}>
              <Vector3 width="120%" height="100%" />
            </View>
            
            <View style={styles.illustrationPlaceholder}>
              <Image 
                source={Onboarding3Image} 
                style={styles.illustrationImage}
                resizeMode="cover"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.nextButton} 
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>→</Text>
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 16 : 24,
    paddingBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginRight: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#171717',
    borderRadius: 2,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipText: {
    fontSize: 16,
    color: '#171717',
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  
  // Titres
  titleContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 24,
    lineHeight: 52,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#171717',
    lineHeight: 26,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  
  // Illustrations
  illustrationContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  backgroundShape: {
    position: 'absolute',
    bottom: -350,
    left: -80,
    right: -80,
    width: '150%',
    height: '170%',
  },
  illustrationPlaceholder: {
    alignItems: 'center',
    zIndex: 1,
    width: screenWidth - 20,
    height: 350,
    marginBottom: Platform.OS === 'web' ? 0 : 40,
    backgroundColor: 'transparent',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  
  // Boutons
  buttonContainer: {
    alignItems: 'flex-end',
    marginBottom: Platform.OS === 'web' ? 0 : (Platform.OS === 'ios' ? 40 : 20),
    zIndex: 10,
    position: 'relative',
  },
  nextButton: {
    backgroundColor: '#9E6AFF',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
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
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
}); 