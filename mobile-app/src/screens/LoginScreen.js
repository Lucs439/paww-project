import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { authService } from '../services/authService';

export default function LoginScreen({ navigation }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      // Appel au service d'authentification pour la connexion
      const result = await authService.login(formData.email, formData.password);

      if (result.success) {
        // ✅ Connexion réussie - redirection vers l'app principale
        navigation.navigate('MainApp');
      } else {
        // Afficher l'erreur retournée par le backend
        alert(result.message);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      alert('Une erreur inattendue est survenue. Veuillez réessayer.');
    }
  };

  const handleBackToWelcome = () => {
    navigation.navigate('Welcome');
  };

  const handleForgotPassword = () => {
    console.log('💭 Mot de passe oublié');
    // Navigation vers écran de récupération
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackToWelcome} style={styles.backButton}>
            <Text style={styles.backText}>← Retour</Text>
          </TouchableOpacity>
          
          <Text style={styles.title}>Connexion</Text>
          <Text style={styles.subtitle}>
            Retrouvez vos compagnons PAWW
          </Text>
        </View>

        {/* Formulaire */}
        <View style={styles.form}>
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

          {/* Mot de passe oublié */}
          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotButton}>
            <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>

        {/* Bouton de connexion */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Se connecter</Text>
        </TouchableOpacity>

        {/* Lien d'inscription */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Signup')} 
          style={styles.signupContainer}
        >
          <Text style={styles.signupText}>
            Pas encore de compte ?{' '}
            <Text style={styles.signupLink}>Créer un compte</Text>
          </Text>
        </TouchableOpacity>
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
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    justifyContent: 'space-between',
  },
  
  // Header
  header: {
    marginBottom: 40,
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
    flex: 1,
    marginTop: 40,
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
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotText: {
    fontSize: 14,
    color: '#9E6AFF',
    fontWeight: '500',
  },
  
  // Boutons
  loginButton: {
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
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Inscription
  signupContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  signupText: {
    fontSize: 16,
    color: '#6B7280',
  },
  signupLink: {
    color: '#9E6AFF',
    fontWeight: '600',
  },
}); 