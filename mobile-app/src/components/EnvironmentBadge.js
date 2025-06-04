// src/components/EnvironmentBadge.js - Badge d'affichage de l'environnement
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import EnvironmentService from '../services/EnvironmentService';

export default function EnvironmentBadge({ style, showDetails = false }) {
  const [envInfo, setEnvInfo] = useState(null);

  useEffect(() => {
    loadEnvironmentInfo();
  }, []);

  const loadEnvironmentInfo = async () => {
    try {
      await EnvironmentService.loadEnvironment();
      const info = EnvironmentService.getEnvironmentInfo();
      setEnvInfo(info);
    } catch (error) {
      console.error('❌ Erreur lors du chargement de l\'environnement:', error);
    }
  };

  if (!envInfo || envInfo.type === 'Non configuré') {
    return null;
  }

  const isInt = envInfo.type === 'INT';
  const badgeStyle = isInt ? styles.intBadge : styles.prodBadge;
  const icon = isInt ? '🧪' : '🚀';

  return (
    <View style={[styles.container, badgeStyle, style]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.text}>{envInfo.type}</Text>
      {showDetails && (
        <Text style={styles.details}>
          {EnvironmentService.getApiUrl()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  intBadge: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  prodBadge: {
    backgroundColor: '#F0FDF4',
    borderColor: '#22C55E',
  },
  icon: {
    fontSize: 14,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#171717',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  details: {
    fontSize: 10,
    color: '#6B7280',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
}); 