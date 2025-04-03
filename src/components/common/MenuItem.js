import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, spacing } from '../../styles/theme';

export default function MenuItem({ 
  icon, 
  title, 
  onPress, 
  color = colors.primary,
  showChevron = true,
  style 
}) {
  return (
    <TouchableOpacity
      style={[styles.menuItem, style]}
      onPress={onPress}
    >
      <View style={styles.menuItemLeft}>
        <MaterialIcons
          name={icon}
          size={24}
          color={color}
          style={styles.menuIcon}
        />
        <Text style={[styles.menuItemText, { color }]}>
          {title}
        </Text>
      </View>
      {showChevron && (
        <MaterialIcons
          name="chevron-right"
          size={24}
          color={colors.text.secondary}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: spacing.md,
  },
  menuItemText: {
    fontSize: 16,
  },
}); 