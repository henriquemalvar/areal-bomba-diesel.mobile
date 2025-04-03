import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../styles/theme';

export default function Avatar({ 
  size = 120, 
  icon = 'account-circle',
  color = colors.primary,
  style 
}) {
  return (
    <View style={[styles.avatarContainer, { width: size, height: size }, style]}>
      <MaterialIcons name={icon} size={size} color={color} />
      <View style={styles.avatarOverlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}); 