import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { spacing } from '../../styles/spacing';

const LOGO_SIZES = {
  small: 48,
  medium: 64,
  large: 96,
  xlarge: 128
};

const Logo = ({ size = 'medium', style }) => {
  const getSize = () => {
    const dimension = LOGO_SIZES[size] || LOGO_SIZES.medium;
    return {
      width: dimension,
      height: dimension
    };
  };

  return (
    <Image
      source={require('../../assets/images/logo.png')}
      style={[styles.logo, getSize(), style]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: LOGO_SIZES.medium,
    height: LOGO_SIZES.medium,
  }
});

export default Logo;
