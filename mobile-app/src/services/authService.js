// src/services/authService.js - Service d'authentification (version test)
import AsyncStorage from '@react-native-async-storage/async-storage';

// Version temporaire pour tester sans backend
export const authService = {
  // Inscription (mode test)
  register: async (userData) => {
    try {
      // Simulation d'une inscription réussie
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simule délai réseau
      
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Sauvegarder localement
      await AsyncStorage.setItem('accessToken', mockToken);
      
      const userDataToStore = {
        ...mockUser,
        isLoggedIn: true,
        loginDate: new Date().toISOString(),
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userDataToStore));
      
      return {
        success: true,
        user: mockUser,
        token: mockToken,
      };
    } catch (error) {
      console.error('Erreur inscription:', error);
      return {
        success: false,
        message: 'Erreur lors de l\'inscription',
      };
    }
  },

  // Connexion (mode test)
  login: async (email, password) => {
    try {
      // Simulation d'une connexion
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simule délai réseau
      
      // Vérifier si c'est un compte test
      if (email === 'test@paww.com' && password === 'test123') {
        const mockUser = {
          id: 'test-user-123',
          firstName: 'Test',
          lastName: 'User',
          email: email,
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        // Sauvegarder localement
        await AsyncStorage.setItem('accessToken', mockToken);
        
        const userDataToStore = {
          ...mockUser,
          isLoggedIn: true,
          loginDate: new Date().toISOString(),
        };

        await AsyncStorage.setItem('userData', JSON.stringify(userDataToStore));
        
        return {
          success: true,
          user: mockUser,
          token: mockToken,
        };
      } else {
        return {
          success: false,
          message: 'Email ou mot de passe incorrect (utilisez test@paww.com / test123)',
        };
      }
    } catch (error) {
      console.error('Erreur connexion:', error);
      return {
        success: false,
        message: 'Erreur de connexion',
      };
    }
  },

  // Déconnexion
  logout: async () => {
    try {
      // Nettoyer le stockage local
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userData']);
    } catch (error) {
      console.log('Erreur lors de la déconnexion:', error);
    }
  },

  // Vérifier si l'utilisateur est connecté
  checkAuthStatus: async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const token = await AsyncStorage.getItem('accessToken');
      
      if (userData && token) {
        const user = JSON.parse(userData);
        return {
          isLoggedIn: true,
          user,
          token,
        };
      }
      
      return {
        isLoggedIn: false,
        user: null,
        token: null,
      };
    } catch (error) {
      console.error('Erreur vérification auth:', error);
      return {
        isLoggedIn: false,
        user: null,
        token: null,
      };
    }
  },

  // Vérifier la validité du token (mode test)
  verifyToken: async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      // En mode test, considérer tous les tokens comme valides
      return !!token;
    } catch (error) {
      console.error('Token invalide:', error);
      return false;
    }
  },

  // Récupérer les données utilisateur actuelles
  getCurrentUser: async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Erreur récupération utilisateur:', error);
      return null;
    }
  },
}; 