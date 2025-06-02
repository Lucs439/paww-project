import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';

export default function SignupScreen({ navigation }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = () => {
    console.log('🚀 Inscription avec:', formData);
    // Ici tu connecteras avec ton backend
  };

  const handleBackToLogin = () => {
    navigation.navigate('Welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackToLogin} style={styles.backButton}>
              <Text style={styles.backText}>← Retour</Text>
            </TouchableOpacity>
            
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>
              Rejoignez PAWW pour suivre vos compagnons
            </Text>
          </View>

          {/* Formulaire */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Prénom</Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Votre prénom"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Votre nom"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="votre@email.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmer le mot de passe</Text>
              <TextInput
                style={styles.input}
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
              />
            </View>
          </View>

          {/* Bouton d'inscription */}
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Créer mon compte</Text>
          </TouchableOpacity>

          {/* Termes et conditions */}
          <Text style={styles.termsText}>
            En créant un compte, vous acceptez nos{' '}
            <Text style={styles.linkText}>Conditions d'utilisation</Text>{' '}
            et notre <Text style={styles.linkText}>Politique de confidentialité</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
  },
  
  // Header
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 24,
  },
  backText: {
    fontSize: 16,
    color: '#9E6AFF',
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  
  // Formulaire
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  
  // Bouton
  signupButton: {
    backgroundColor: '#9E6AFF',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    ...(Platform.OS === 'ios' && {
      shadowColor: '#9E6AFF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    }),
    ...(Platform.OS === 'android' && {
      elevation: 4,
    }),
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Termes
  termsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    paddingBottom: 20,
  },
  linkText: {
    color: '#9E6AFF',
    fontWeight: '500',
  },
}); 