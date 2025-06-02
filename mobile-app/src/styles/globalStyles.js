import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fonts } from './fonts';
import { spacing } from './spacing';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  padding: {
    padding: spacing.md,
  },
  
  paddingHorizontal: {
    paddingHorizontal: spacing.md,
  },
  
  paddingVertical: {
    paddingVertical: spacing.md,
  },
  
  // Typographie
  title: {
    fontSize: fonts.sizes['3xl'],
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.medium,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  
  body: {
    fontSize: fonts.sizes.base,
    fontWeight: fonts.weights.regular,
    color: colors.text.primary,
    lineHeight: 24,
  },
  
  caption: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.regular,
    color: colors.text.light,
  },
  
  // Boutons
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    color: colors.white,
    fontSize: fonts.sizes.base,
    fontWeight: fonts.weights.semibold,
  },
  
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  
  buttonSecondaryText: {
    color: colors.primary,
  },
  
  // Inputs
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    fontSize: fonts.sizes.base,
    color: colors.text.primary,
  },
  
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  
  inputError: {
    borderColor: colors.error,
  },
  
  // Cards
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Progress bar
  progressBar: {
    height: 4,
    backgroundColor: colors.gray[200],
    borderRadius: 2,
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
}); 