import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ENV from '../config/env';

const api = axios.create({
  baseURL: ENV.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Ajouter l'environnement dans les headers pour debug
    config.headers['X-App-Environment'] = ENV.appName;
    
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error);
  }
  return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    }
    return Promise.reject(error);
  }
);

export default api; 