import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

export default function Input({
  label,
  icon,
  error,
  secureTextEntry,
  showPassword,
  onTogglePassword,
  ...props
}) {
  return (
    <View style={styles.container}>
      {label && <Text style={[typography.body2, styles.label]}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {icon && (
          <MaterialIcons
            name={icon}
            size={24}
            color={error ? colors.error : colors.primary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[typography.body1, styles.input]}
          placeholderTextColor={colors.text.light}
          secureTextEntry={secureTextEntry}
          {...props}
        />
        {secureTextEntry !== undefined && (
          <TouchableOpacity onPress={onTogglePassword}>
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={24}
              color={colors.text.secondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[typography.caption, styles.errorText]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  inputError: {
    borderColor: colors.error,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.xs,
  },
}); 