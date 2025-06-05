// src/utils/responsive.js - Utilitaire pour gestion responsive
import React from 'react';
import { Dimensions, Platform } from 'react-native';

// Obtenir les dimensions de l'écran
export const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

// Breakpoints responsive
export const BREAKPOINTS = {
  xs: 0,     // Mobile très petit (< 375px)
  sm: 375,   // Mobile standard (375px - 768px)
  md: 768,   // Tablette (768px - 1024px)
  lg: 1024,  // Desktop petit (1024px - 1440px)
  xl: 1440,  // Desktop large (> 1440px)
};

// Obtenir le breakpoint actuel
export const getCurrentBreakpoint = () => {
  const { width } = getScreenDimensions();
  
  if (width < BREAKPOINTS.sm) return 'xs';
  if (width < BREAKPOINTS.md) return 'sm';
  if (width < BREAKPOINTS.lg) return 'md';
  if (width < BREAKPOINTS.xl) return 'lg';
  return 'xl';
};

// Vérifier si on est sur une taille spécifique ou plus grande
export const isBreakpoint = (breakpoint) => {
  const { width } = getScreenDimensions();
  return width >= BREAKPOINTS[breakpoint];
};

// Utilitaires pour les tailles courantes
export const isTablet = () => isBreakpoint('md');
export const isDesktop = () => isBreakpoint('lg');
export const isMobile = () => !isBreakpoint('md');

// Obtenir des valeurs responsive selon la taille d'écran
export const getResponsiveValue = (values) => {
  const currentBreakpoint = getCurrentBreakpoint();
  
  // Si une valeur spécifique existe pour le breakpoint actuel
  if (values[currentBreakpoint] !== undefined) {
    return values[currentBreakpoint];
  }
  
  // Sinon, prendre la valeur la plus proche en descendant
  const breakpointOrder = ['xl', 'lg', 'md', 'sm', 'xs'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
  
  for (let i = currentIndex; i < breakpointOrder.length; i++) {
    const bp = breakpointOrder[i];
    if (values[bp] !== undefined) {
      return values[bp];
    }
  }
  
  // Fallback sur la première valeur disponible
  return Object.values(values)[0];
};

// Obtenir une largeur responsive pour les conteneurs
export const getResponsiveWidth = () => {
  const { width } = getScreenDimensions();
  
  if (width < BREAKPOINTS.sm) {
    return '100%'; // Mobile très petit - full width
  } else if (width < BREAKPOINTS.md) {
    return '100%'; // Mobile standard - full width
  } else if (width < BREAKPOINTS.lg) {
    return '90%';  // Tablette - 90% avec marges
  } else if (width < BREAKPOINTS.xl) {
    return '80%';  // Desktop petit - 80% centré
  } else {
    return '70%';  // Desktop large - 70% centré
  }
};

// Obtenir le padding horizontal responsive
export const getResponsivePadding = () => {
  return getResponsiveValue({
    xs: 16,   // Mobile très petit
    sm: 20,   // Mobile standard  
    md: 32,   // Tablette
    lg: 48,   // Desktop petit
    xl: 64,   // Desktop large
  });
};

// Obtenir la taille de police responsive
export const getResponsiveFontSize = (baseSize) => {
  const factor = getResponsiveValue({
    xs: 0.9,   // Plus petit sur très petits écrans
    sm: 1.0,   // Taille normale sur mobile
    md: 1.1,   // Légèrement plus grand sur tablette
    lg: 1.2,   // Plus grand sur desktop
    xl: 1.3,   // Plus grand sur grand desktop
  });
  
  return Math.round(baseSize * factor);
};

// Obtenir l'espacement responsive
export const getResponsiveSpacing = (baseSpacing) => {
  const factor = getResponsiveValue({
    xs: 0.8,
    sm: 1.0,
    md: 1.2,
    lg: 1.4,
    xl: 1.6,
  });
  
  return Math.round(baseSpacing * factor);
};

// Hook pour écouter les changements de dimensions (pour React Native Web)
export const useResponsive = () => {
  const [dimensions, setDimensions] = React.useState(getScreenDimensions());
  
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      const updateDimensions = () => {
        setDimensions(getScreenDimensions());
      };
      
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);
  
  return {
    ...dimensions,
    breakpoint: getCurrentBreakpoint(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    isMobile: isMobile(),
  };
}; 