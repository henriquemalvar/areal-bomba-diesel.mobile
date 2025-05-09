import React from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const COLORS = {
  primary: '#0a2c63',
  error: '#F44336',
  background: '#fff',
  cardBackground: '#fff',
  inputBackground: '#f7f9fb',
  text: '#222',
  textSecondary: '#757575',
  border: '#ddd',
  avatar: '#0a2c63',
};

const SearchBar = ({ 
  value, 
  onChangeText, 
  onSearch, 
  isSearching, 
  placeholder = "Pesquisar...",
  style,
  inputStyle,
  buttonStyle,
}) => {
  return (
    <View style={[styles.searchRow, style]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
        returnKeyType="search"
        placeholderTextColor={COLORS.textSecondary}
      />
      <TouchableOpacity 
        style={[styles.searchButton, buttonStyle]} 
        onPress={onSearch} 
        disabled={isSearching}
      >
        {isSearching ? (
          <ActivityIndicator size={20} color={COLORS.primary} />
        ) : (
          <Feather name="search" size={20} color={COLORS.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  inputStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    backgroundColor: COLORS.inputBackground,
    marginRight: 8,
    color: COLORS.text,
  },
  searchButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});

export default SearchBar; 