import React from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Platform,
  Dimensions 
} from 'react-native';
import { 
  useResponsive, 
  getResponsiveWidth, 
  getResponsivePadding,
  getResponsiveSpacing 
} from '../utils/responsive';

const { height: screenHeight } = Dimensions.get('window');

export default function MobileWebWrapper({ children, style, hasBottomButton = false }) {
  // Utiliser le hook responsive
  const responsive = useResponsive();
  const isWeb = Platform.OS === 'web';
  
  // Padding adaptatif selon la taille d'écran
  const getBottomPadding = () => {
    if (!isWeb) return getResponsiveSpacing(20);
    
    // Sur web, adapter selon la taille d'écran
    if (hasBottomButton) {
      if (responsive.isMobile) {
        return responsive.height < 700 ? 120 : 80;
      } else {
        return getResponsiveSpacing(60);
      }
    }
    return getResponsiveSpacing(40);
  };

  // Style responsive du conteneur
  const containerStyle = [
    styles.container,
    {
      paddingBottom: getBottomPadding(),
      paddingHorizontal: getResponsivePadding(),
      maxWidth: responsive.isDesktop ? 1200 : '100%',
      alignSelf: 'center',
      width: getResponsiveWidth(),
    },
    style
  ];

  if (isWeb) {
    // Sur web, on utilise un ScrollView pour permettre le défilement
    return (
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={containerStyle}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        // Empêche le zoom sur double tap
        maximumZoomScale={1}
        minimumZoomScale={1}
        // Optimisations pour le web mobile
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    );
  }

  // Sur mobile natif, on garde la structure normale
  return (
    <View style={containerStyle}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    minHeight: Platform.OS === 'web' ? '100vh' : 'auto',
  },
}); 