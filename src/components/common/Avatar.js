import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/theme';

export default function Avatar({
  size = 120,
  icon,
  name,
  color = colors.primary,
  backgroundColor = colors.primary,
  textColor = '#ffffff',
  style,
  fontSize,
  showOverlay = true,
  shadow = true
}) {
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={[
      styles.avatarContainer,
      {
        width: size,
        height: size,
        backgroundColor,
        borderRadius: size / 2,
      },
      shadow && styles.shadow,
      style
    ]}>
      {icon ? (
        <>
          <MaterialIcons name={icon} size={size * 0.6} color={color} />
          {showOverlay && <View style={styles.avatarOverlay} />}
        </>
      ) : (
        <Text style={[
          styles.initials,
          {
            fontSize: fontSize || size * 0.4,
            color: textColor
          }
        ]}>
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  initials: {
    fontWeight: 'bold',
  },
}); 