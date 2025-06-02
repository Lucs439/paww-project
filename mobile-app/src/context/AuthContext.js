import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // Vérifier si l'utilisateur a vu l'onboarding
      const onboardingSeen = await AsyncStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(onboardingSeen === 'true');

      // Vérifier si l'utilisateur est connecté
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        // Optionnel : vérifier si le token est valide
        const userData = await authService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'état d\'auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await authService.login(email, password);
      
      if (response.success) {
        // Sauvegarder les tokens
        await AsyncStorage.setItem('accessToken', response.data.tokens.accessToken);
        await AsyncStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        
        setUser(response.data.user);
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return { success: false, message: 'Erreur de connexion' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      
      if (response.success) {
        // Sauvegarder les tokens
        await AsyncStorage.setItem('accessToken', response.data.tokens.accessToken);
        await AsyncStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        
        setUser(response.data.user);
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      return { success: false, message: 'Erreur d\'inscription' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      setUser(null);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  const markOnboardingAsSeen = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'onboarding:', error);
    }
  };

  const value = {
    user,
    isLoading,
    hasSeenOnboarding,
    login,
    register,
    logout,
    markOnboardingAsSeen,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 