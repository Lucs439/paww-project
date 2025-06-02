import { Platform } from 'react-native';

// Configuration des polices PAWW
export const fonts = {
  // Police principale pour les titres
  primary: {
    regular: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    medium: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
    }),
    bold: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
    }),
  },
  
  // Police secondaire pour le corps de texte
  secondary: {
    regular: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    medium: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
    }),
    bold: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
    }),
  }
};

// Tailles de police standardisées
export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
};

// Poids de police
export const fontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

// Helper pour créer des styles de texte
export const createTextStyle = (size, weight = 'normal', family = 'primary') => ({
  fontSize: fontSizes[size] || size,
  fontWeight: fontWeights[weight] || weight,
  fontFamily: fonts[family]?.regular || fonts.primary.regular,
}); 