import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../services/authService';

export default function SignupScreen({ navigation }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ level: '', score: 0, feedback: [] });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Limites de caractères
  const MAX_NAME_LENGTH = 30;
  const MIN_PASSWORD_LENGTH = 8;

  // Validation email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation force du mot de passe
  const calculatePasswordStrength = (password) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score += 1;
    else feedback.push('Au moins 8 caractères');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Une minuscule');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Une majuscule');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Un chiffre');

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    else feedback.push('Un caractère spécial');

    let level = 'none';
    if (score === 0) level = 'none';
    else if (score <= 2) level = 'facile';
    else if (score <= 3) level = 'moyen';
    else level = 'difficile';

    return { level, score, feedback };
  };

  // Validation en temps réel
  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'firstName':
        if (value.length > MAX_NAME_LENGTH) {
          newErrors.firstName = `Maximum ${MAX_NAME_LENGTH} caractères`;
        } else if (value.length === 0) {
          newErrors.firstName = 'Prénom requis';
        } else {
          delete newErrors.firstName;
        }
        break;

      case 'lastName':
        if (value.length > MAX_NAME_LENGTH) {
          newErrors.lastName = `Maximum ${MAX_NAME_LENGTH} caractères`;
        } else if (value.length === 0) {
          newErrors.lastName = 'Nom requis';
        } else {
          delete newErrors.lastName;
        }
        break;

      case 'email':
        if (!validateEmail(value) && value.length > 0) {
          newErrors.email = 'Format email invalide';
        } else if (value.length === 0) {
          newErrors.email = 'Email requis';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        const strength = calculatePasswordStrength(value);
        setPasswordStrength(strength);
        
        if (value.length === 0) {
          newErrors.password = 'Mot de passe requis';
        } else if (strength.level !== 'difficile') {
          newErrors.password = 'Mot de passe trop faible (niveau difficile requis)';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password) {
          newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        } else if (value.length === 0) {
          newErrors.confirmPassword = 'Confirmation requise';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  // Vérification de la validité du formulaire
  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    const passwordIsStrong = passwordStrength.level === 'difficile';
    
    setIsFormValid(!hasErrors && allFieldsFilled && passwordIsStrong);
  }, [errors, formData, passwordStrength]);

  const handleSignup = async () => {
    // Validation finale avant soumission
    if (!isFormValid) {
      Alert.alert('Erreur', 'Veuillez corriger les erreurs avant de continuer');
      return;
    }

    try {
      // Appel au service d'authentification pour l'inscription
      const result = await authService.register(formData);

      if (result.success) {
        // 🎉 Inscription réussie - redirection vers l'app principale
        navigation.navigate('MainApp');
      } else {
        // Afficher l'erreur retournée par le backend
        Alert.alert(
          'Erreur d\'inscription',
          result.message,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      Alert.alert(
        'Erreur',
        'Une erreur inattendue est survenue. Veuillez réessayer.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  // Style conditionnel pour les champs avec erreur
  const getInputStyle = (fieldName) => [
    styles.input,
    errors[fieldName] ? styles.inputError : null
  ];

  // Couleur de l'indicateur de force
  const getStrengthColor = (level) => {
    switch (level) {
      case 'facile': return '#EF4444';
      case 'moyen': return '#F59E0B';
      case 'difficile': return '#10B981';
      default: return '#E5E7EB';
    }
  };

  const getStrengthText = (level) => {
    switch (level) {
      case 'facile': return 'Facile';
      case 'moyen': return 'Moyen';
      case 'difficile': return 'Difficile';
      default: return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
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
            {/* Prénom */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, errors.firstName && styles.labelError]}>
                Prénom {errors.firstName ? `${formData.firstName.length}/${MAX_NAME_LENGTH}` : ''}
              </Text>
              <TextInput
                style={getInputStyle('firstName')}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Votre prénom"
                placeholderTextColor="#9CA3AF"
                maxLength={MAX_NAME_LENGTH}
              />
              {errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}
            </View>

            {/* Nom */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, errors.lastName && styles.labelError]}>
                Nom {errors.lastName ? `${formData.lastName.length}/${MAX_NAME_LENGTH}` : ''}
              </Text>
              <TextInput
                style={getInputStyle('lastName')}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Votre nom"
                placeholderTextColor="#9CA3AF"
                maxLength={MAX_NAME_LENGTH}
              />
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, errors.email && styles.labelError]}>Email</Text>
              <TextInput
                style={getInputStyle('email')}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="votre@email.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Mot de passe */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, errors.password && styles.labelError]}>
                Mot de passe
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[getInputStyle('password'), styles.passwordInput]}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color="#9CA3AF" 
                  />
                </TouchableOpacity>
              </View>
              
              {/* Indicateur de force du mot de passe */}
              {formData.password.length > 0 && (
                <View style={styles.passwordStrength}>
                  <View style={styles.strengthBar}>
                    <View 
                      style={[
                        styles.strengthFill, 
                        { 
                          width: `${(passwordStrength.score / 5) * 100}%`,
                          backgroundColor: getStrengthColor(passwordStrength.level)
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.strengthText, { color: getStrengthColor(passwordStrength.level) }]}>
                    {getStrengthText(passwordStrength.level)}
                    {passwordStrength.level !== 'difficile' && passwordStrength.feedback.length > 0 && (
                      ` - Il manque: ${passwordStrength.feedback.join(', ')}`
                    )}
                  </Text>
                </View>
              )}
              
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Confirmation mot de passe */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, errors.confirmPassword && styles.labelError]}>
                Confirmer le mot de passe
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[getInputStyle('confirmPassword'), styles.passwordInput]}
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity 
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons 
                    name={showConfirmPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color="#9CA3AF" 
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>
          </View>

          {/* Bouton d'inscription */}
          <TouchableOpacity 
            style={[
              styles.signupButton, 
              !isFormValid && styles.signupButtonDisabled
            ]} 
            onPress={handleSignup}
            disabled={!isFormValid}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.signupButtonText,
              !isFormValid && styles.signupButtonTextDisabled
            ]}>
              Créer mon compte
            </Text>
          </TouchableOpacity>

          {/* Message de sécurité */}
          {passwordStrength.level !== 'difficile' && formData.password.length > 0 && (
            <View style={styles.securityNotice}>
              <Text style={styles.securityText}>
                ⚠️ Seuls les mots de passe de niveau "Difficile" sont acceptés pour votre sécurité
              </Text>
            </View>
          )}

          {/* Termes et conditions */}
          <Text style={styles.termsText}>
            En créant un compte, vous acceptez nos{' '}
            <Text style={styles.linkText}>Conditions d'utilisation</Text>{' '}
            et notre <Text style={styles.linkText}>Politique de confidentialité</Text>
          </Text>

          {/* Lien de connexion */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('Login')} 
            style={styles.loginContainer}
            activeOpacity={0.7}
          >
            <Text style={styles.loginText}>
              Vous avez déjà un compte ?{' '}
              <Text style={styles.loginLink}>Se connecter</Text>
            </Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
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
  labelError: {
    color: '#EF4444',
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
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    fontWeight: '500',
  },
  
  // Indicateur de force du mot de passe
  passwordStrength: {
    marginTop: 8,
  },
  strengthBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 4,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
    transition: 'width 0.3s ease',
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '500',
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
  signupButtonDisabled: {
    backgroundColor: '#9CA3AF',
    ...(Platform.OS === 'ios' && {
      shadowOpacity: 0,
    }),
    ...(Platform.OS === 'android' && {
      elevation: 0,
    }),
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButtonTextDisabled: {
    color: '#D1D5DB',
  },
  
  // Notice de sécurité
  securityNotice: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  securityText: {
    fontSize: 12,
    color: '#92400E',
    textAlign: 'center',
    fontWeight: '500',
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
  
  // Mot de passe
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  eyeButton: {
    padding: 8,
  },
  
  // Lien de connexion
  loginContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  loginLink: {
    color: '#9E6AFF',
    fontWeight: '600',
  },
}); 