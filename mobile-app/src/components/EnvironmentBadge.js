import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EnvironmentBadge({ style, showDetails = false }) {
  // Ne rien afficher en production
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>DEV</Text>
      {showDetails && (
        <Text style={styles.details}>Development</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 165, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  details: {
    color: '#FFFFFF',
    fontSize: 8,
    marginTop: 2,
  },
}); 