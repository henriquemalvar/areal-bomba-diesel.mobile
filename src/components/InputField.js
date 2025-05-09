import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  iconLeft,
  iconRight,
  onPressRight,
  error,
  secureTextEntry = false,
  editable = true,
  keyboardType = 'default',
  autoCapitalize = 'none',
  type = 'flat', // 'flat' | 'outlined'
  ...props
}) {
  return (
    <View style={styles.block}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputRow,
        type === 'outlined' ? styles.inputRowOutlined : styles.inputRowFlat,
        error && styles.inputRowError,
      ]}>
        {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#bdbdbd"
          secureTextEntry={secureTextEntry}
          editable={editable}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          {...props}
        />
        {iconRight && (
          onPressRight ? (
            <TouchableOpacity onPress={onPressRight} style={styles.iconRight}>
              {iconRight}
            </TouchableOpacity>
          ) : (
            <View style={styles.iconRight}>{iconRight}</View>
          )
        )}
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
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  inputRowFlat: {
    backgroundColor: '#f5f6fa',
    borderColor: '#e0e0e0',
  },
  inputRowOutlined: {
    backgroundColor: '#fff',
    borderColor: '#1a237e',
  },
  inputRowError: {
    borderColor: '#d32f2f',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
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