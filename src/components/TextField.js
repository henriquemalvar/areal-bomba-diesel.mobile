import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export function TextField({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  editable = true,
  ...props
}) {
  return (
    <View style={styles.block}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputRow, error && styles.inputRowError]}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#bdbdbd"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  inputRowError: {
    borderColor: '#d32f2f',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 2,
  },
}); 