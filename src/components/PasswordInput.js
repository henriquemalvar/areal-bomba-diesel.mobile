import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

export function PasswordInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  editable = true,
  ...props
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const { isDarkMode } = useTheme();

  return (
    <View style={[styles.block, isDarkMode && styles.darkBlock]}>
      {label && <Text style={[styles.label, isDarkMode && styles.darkLabel]}>{label}</Text>}
      <View style={[styles.inputRow, error && styles.inputRowError, isDarkMode && styles.darkInputRow]}>
        <MaterialIcons name="lock" size={22} color={isDarkMode ? "#fff" : "#1a237e"} style={[styles.icon, isDarkMode && styles.darkIcon]} />
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
          secureTextEntry={!showPassword}
          editable={editable}
          {...props}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={[styles.iconRight, isDarkMode && styles.darkIconRight]}>
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={22}
            color={isDarkMode ? "#fff" : "#1a237e"}
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={[styles.errorText, isDarkMode && styles.darkErrorText]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 20,
    width: '100%',
  },
  darkBlock: {
    backgroundColor: '#3d3d3d',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    marginBottom: 6,
  },
  darkLabel: {
    color: '#fff',
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
  darkInputRow: {
    borderColor: '#4d4d4d',
  },
  icon: {
    marginRight: 8,
  },
  darkIcon: {
    color: '#fff',
  },
  iconRight: {
    marginLeft: 8,
  },
  darkIconRight: {
    color: '#fff',
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
  darkInput: {
    color: '#fff',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 2,
  },
  darkErrorText: {
    color: '#d32f2f',
  },
}); 