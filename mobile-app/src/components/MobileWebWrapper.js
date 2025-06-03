import React from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Platform,
  Dimensions 
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

export default function MobileWebWrapper({ children, style, hasBottomButton = false }) {
  // Détection si on est sur web
  const isWeb = Platform.OS === 'web';
  
  // Padding bottom adaptatif pour éviter que le footer du navigateur cache les boutons
  const getBottomPadding = () => {
    if (!isWeb) return 20;
    
    // Sur web mobile, on ajoute plus de padding pour le footer du navigateur
    if (hasBottomButton) {
      return screenHeight < 700 ? 120 : 80; // Plus de padding sur petits écrans
    }
    return 40;
  };

  const containerStyle = [
    styles.container,
    {
      paddingBottom: getBottomPadding()
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