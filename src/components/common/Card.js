import React from 'react';
import { StyleSheet, View } from 'react-native';
import { borderRadius, shadows, spacing } from '../../styles/theme';

export default function Card({ children, style }) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    ...shadows.medium,
    overflow: 'hidden',
    padding: spacing.md,
  },
}); 