// src/screens/OnboardingScreen6.js - "Un export simple et efficace"
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
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import du wrapper pour optimisation mobile web
import MobileWebWrapper from '../components/MobileWebWrapper';

// Import de l'illustration et du background
import { Onboarding6Image, Vector6 } from '../assets/illustrations';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function OnboardingScreen6({ navigation }) {
  const handleFinish = async () => {
    try {
      // Marquer que l'utilisateur a vu l'onboarding
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      console.log('✅ Onboarding terminé, marqué comme vu');
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'onboarding:', error);
      navigation.navigate('Welcome');
    }
  };

  const handleSkip = async () => {
    try {
      // Marquer que l'utilisateur a vu l'onboarding même en skip
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      console.log('⏭️ Onboarding skippé, marqué comme vu');
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'onboarding:', error);
      navigation.navigate('Welcome');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MobileWebWrapper hasBottomButton={true}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Passer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Un export simple{'\n'}et efficace
            </Text>
            <Text style={styles.subtitle}>
              Votre vétérinaire peut recevoir par mail{'\n'}
              les rapports générés afin d'avoir un suivi{'\n'}
              plus précis sur votre animal.{'\n'}
              Trop pratique !
            </Text>
          </View>

          <View style={styles.illustrationContainer}>
            <View style={styles.backgroundShape}>
              <Vector6 width="120%" height="100%" />
            </View>
            <View style={styles.illustrationPlaceholder}>
              <Image 
                source={Onboarding6Image} 
                style={styles.illustrationImage}
                resizeMode="cover"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.finishButton} 
              onPress={handleFinish}
              activeOpacity={0.8}
            >
              <Text style={styles.finishButtonText}>Continuer</Text>
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
    alignItems: 'center',
    marginBottom: Platform.OS === 'web' ? 0 : (Platform.OS === 'ios' ? 40 : 20),
    zIndex: 10,
    position: 'relative',
  },
  finishButton: {
    backgroundColor: '#9E6AFF',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
}); 