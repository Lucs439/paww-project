// src/screens/HomeScreen.js - Écran principal Santé
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../services/authService';

// TEMPORAIRE : Commenté les imports PNG pour éviter les crashes Metro
// import HomeBienEtreIllustration from '../assets/illustrations/Home.bienêtre.Illustration.png';
// import HomeNuitIllustration from '../assets/illustrations/Home.Nuit.Illustration.png';
// import HomeDebutJourneeIllustration from '../assets/illustrations/Home.débutdejournée.Illustration.png';
// import HomeFinIllustration from '../assets/illustrations/Home.Fin.Illustration.png';

const HomeScreen = ({ navigation }) => {
  const [selectedAnimal, setSelectedAnimal] = useState({
    id: 1,
    name: 'Twist',
    age: 3,
    type: 'chat',
    photo: 'https://via.placeholder.com/60x60/FF6B35/FFFFFF?text=🐱',
    subscription: 'Félin pour l\'autre',
    isActive: true,
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentUser, setCurrentUser] = useState(null);

  // Récupérer les données utilisateur au chargement
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.log('Erreur lors de la récupération des données utilisateur:', error);
    }
  };

  // Données mockées
  const wellnessData = {
    overall: 95,
    sleep: {
      percentage: 95,
      duration: '7h45min',
      heartRate: 65,
      quality: 'paisible',
    },
    activities: [
      {
        id: 1,
        type: 'Promenade',
        objective: '30min de marche',
        progress: 15,
        total: 30,
        unit: 'min',
        description: 'Votre animal à besoin de faire davantage de marche, nous préconisons une petite sortie de 15m.',
      },
      {
        id: 2,
        type: 'Interaction sociale',
        objective: 'aller à la rencontre d\'autres animaux',
        progress: 1,
        total: 3,
        unit: 'chiens',
        description: 'Votre animal à besoin de faire davantage de rencontre pour socialiser faites une balade pour qu\'il capte plus d\'odeur.',
      },
      {
        id: 3,
        type: 'Jeux',
        objective: 'Jouer pour mieux se dépenser',
        progress: 10,
        total: 20,
        unit: 'min',
        description: 'Votre animal à besoin de faire davantage de jeux avec vous, il est resté trop longtemps tout seul, prenez un jouet et jouer avec lui.',
      },
    ],
  };

  const getCurrentHour = () => new Date().getHours();

  const isCardUnlocked = (cardType) => {
    const hour = getCurrentHour();
    switch (cardType) {
      case 'sleep':
        return hour >= 6; // Débloqué à 6h
      case 'morning':
        return hour >= 8; // Débloqué à 8h
      case 'evening':
        return hour >= 14; // Débloqué à 14h
      default:
        return true;
    }
  };

  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Aujourd\'hui';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hier';
    } else {
      return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long' 
      });
    }
  };

  const getUserDisplayName = () => {
    if (currentUser?.firstName) {
      return currentUser.firstName;
    }
    return 'Lucas';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Salut !</Text>
          <Text style={styles.titleText}>{getUserDisplayName()}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#374151" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Animal Selector */}
        <TouchableOpacity style={styles.animalSelector}>
          <View style={styles.animalInfo}>
            <View style={styles.animalPhotoContainer}>
              <Image source={{ uri: selectedAnimal.photo }} style={styles.animalPhoto} />
              {selectedAnimal.isActive && <View style={styles.activeIndicator} />}
            </View>
            <View style={styles.animalDetails}>
              <Text style={styles.animalName}>{selectedAnimal.name} • {selectedAnimal.age} ans</Text>
              <View style={styles.subscriptionBadge}>
                <Ionicons name="paw" size={16} color="#8B5CF6" />
                <Text style={styles.subscriptionText}>{selectedAnimal.subscription}</Text>
              </View>
            </View>
          </View>
          <Ionicons name="chevron-down" size={20} color="#6B7280" />
        </TouchableOpacity>

        {/* Date Selector */}
        <View style={styles.dateSelector}>
          <TouchableOpacity style={styles.dateBackButton}>
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateButton}>
            <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          </TouchableOpacity>
        </View>

        {/* Wellness Overview */}
        <TouchableOpacity 
          style={styles.wellnessCard}
          onPress={() => navigation.navigate('WellnessDetail')}
        >
          <View style={styles.wellnessHeader}>
            <View style={styles.wellnessTitleRow}>
              <Image 
                source={require('../assets/illustrations/wellness.png')} 
                style={styles.wellnessIllustration}
                resizeMode="contain"
              />
              <View style={styles.wellnessTitleContainer}>
                <Text style={styles.wellnessTitle}>Taux de bien-être</Text>
                <Text style={styles.wellnessPercentage}>{wellnessData.overall}%</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8B5CF6" />
          </View>
          <View style={styles.wellnessDescription}>
            <Ionicons name="paw" size={16} color="#8B5CF6" />
            <Text style={styles.wellnessText}>
              {selectedAnimal.name} montre des signes de bien-être et d'engagement positif dans ses activités quotidiennes.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Sleep Card */}
        <TouchableOpacity 
          style={[styles.sleepCard, !isCardUnlocked('sleep') && styles.lockedCard]}
          onPress={() => isCardUnlocked('sleep') && navigation.navigate('SleepDetail')}
          disabled={!isCardUnlocked('sleep')}
        >
          <View style={styles.sleepHeader}>
            <View>
              <Text style={styles.sleepTitle}>Nuit dernière</Text>
              <Text style={styles.sleepTime}>22h-6h</Text>
            </View>
            <Image 
              source={require('../assets/illustrations/night.png')} 
              style={styles.sleepIllustration}
              resizeMode="contain"
            />
          </View>

          {isCardUnlocked('sleep') ? (
            <>
              <View style={styles.sleepProgress}>
                <View style={styles.progressCircle}>
                  <Text style={styles.progressPercentage}>{wellnessData.sleep.percentage}%</Text>
                  <Text style={styles.progressLabel}>Bien-être nocturne</Text>
                </View>
              </View>

              <View style={styles.sleepDetails}>
                <Ionicons name="paw" size={16} color="#8B5CF6" />
                <Text style={styles.sleepDescription}>
                  {selectedAnimal.name} a passé une excellente nuit de repos : il a dormi pendant{' '}
                  <Text style={styles.highlight}>{wellnessData.sleep.duration}</Text>, a maintenu une{' '}
                  <Text style={styles.highlight}>fréquence cardiaque stable de {wellnessData.sleep.heartRate} bpm</Text>, et n'a connu qu'un bref épisode d'agitation. La qualité de son sommeil est considérée comme{' '}
                  <Text style={styles.highlight}>{wellnessData.sleep.quality}</Text>, ce qui favorise une récupération optimale et un équilibre émotionnel aujourd'hui.
                </Text>
              </View>

              <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>En savoir plus</Text>
                <Ionicons name="chevron-forward" size={16} color="#374151" />
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.lockedContent}>
              <Text style={styles.lockedText}>Données disponibles à 6h</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Morning Card */}
        <TouchableOpacity 
          style={[styles.morningCard, !isCardUnlocked('morning') && styles.lockedCard]}
          onPress={() => isCardUnlocked('morning') && navigation.navigate('MorningDetail')}
          disabled={!isCardUnlocked('morning')}
        >
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Début de journée</Text>
              <Text style={styles.cardTime}>8h-14h</Text>
            </View>
            <Image 
              source={require('../assets/illustrations/morning.png')} 
              style={styles.cardIllustration}
              resizeMode="contain"
            />
          </View>
          
          {isCardUnlocked('morning') ? (
            <Text style={styles.cardDescription}>Résultat en cours</Text>
          ) : (
            <Text style={styles.lockedText}>En attente de données</Text>
          )}
        </TouchableOpacity>

        {/* Evening Card */}
        <TouchableOpacity 
          style={[styles.eveningCard, !isCardUnlocked('evening') && styles.lockedCard]}
          onPress={() => isCardUnlocked('evening') && navigation.navigate('EveningDetail')}
          disabled={!isCardUnlocked('evening')}
        >
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Fin de journée</Text>
              <Text style={styles.cardTime}>14h-22h</Text>
            </View>
            <Image 
              source={require('../assets/illustrations/evening.png')} 
              style={styles.cardIllustration}
              resizeMode="contain"
            />
          </View>
          
          {isCardUnlocked('evening') ? (
            <Text style={styles.cardDescription}>Résultat en cours</Text>
          ) : (
            <Text style={styles.lockedText}>En attente de données</Text>
          )}
        </TouchableOpacity>

        {/* Activities Section */}
        <View style={styles.activitiesSection}>
          <Text style={styles.activitiesTitle}>Activité préconisée pour la journée</Text>
          
          {wellnessData.activities.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityType}>{activity.type}</Text>
                <Text style={styles.activityProgress}>
                  {activity.progress}/{activity.total}{activity.unit}
                </Text>
              </View>
              
              <Text style={styles.activityObjective}>{activity.objective}</Text>
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(activity.progress / activity.total) * 100}%` }
                  ]} 
                />
              </View>
              
              <View style={styles.activityDescription}>
                <Ionicons name="paw" size={16} color="#8B5CF6" />
                <Text style={styles.activityText}>{activity.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  animalSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  animalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  animalPhotoContainer: {
    position: 'relative',
    marginRight: 12,
  },
  animalPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  animalDetails: {
    flex: 1,
  },
  animalName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  subscriptionText: {
    fontSize: 12,
    color: '#8B5CF6',
    marginLeft: 4,
    fontWeight: '500',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    flex: 1,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  wellnessCard: {
    backgroundColor: '#E8DDFD',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  wellnessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  wellnessTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  wellnessTitleContainer: {
    marginLeft: 12,
  },
  wellnessTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  wellnessIllustration: {
    width: 50,
    height: 50,
  },
  wellnessPercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  wellnessDescription: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  wellnessText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  sleepCard: {
    backgroundColor: '#002647',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  sleepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sleepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sleepTime: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  sleepIllustration: {
    width: 100,
    height: 80,
  },
  sleepProgress: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressCircle: {
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
  },
  sleepDetails: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#003355',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  sleepDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  highlight: {
    fontWeight: '600',
    color: '#FBBF24',
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  learnMoreText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginRight: 8,
  },
  morningCard: {
    backgroundColor: '#FFC76F',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  eveningCard: {
    backgroundColor: '#5BB2FF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardTime: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  cardIllustration: {
    width: 80,
    height: 80,
  },
  cardDescription: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  lockedCard: {
    opacity: 0.6,
  },
  lockedContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  lockedText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontStyle: 'italic',
    opacity: 0.7,
  },
  activitiesSection: {
    marginBottom: 20,
  },
  activitiesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  activityProgress: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B5CF6',
  },
  activityObjective: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
  activityDescription: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  activityText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 20,
  },
  // Styles généraux pour les écrans de détail
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default HomeScreen; 