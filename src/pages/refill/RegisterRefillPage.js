import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Page from '../../components/common/Page';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import SearchBar from '../../components/common/SearchBar';

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

const MOCK_MACHINES = [
  { id: '1', name: 'Escavadeira' },
  { id: '2', name: 'Trator' },
  { id: '3', name: 'Caminhão' },
];

const FUEL_TYPES = ['Diesel', 'Gasolina', 'Etanol'];

const DateTimeInput = ({ label, value, onPress, icon, showPicker, onDateChange, mode }) => {
  const formatValue = () => {
    if (mode === 'date') {
      return value.toLocaleDateString('pt-BR');
    }
    return value.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity 
        style={[styles.input, styles.dateInput]} 
        onPress={onPress}
      >
        <View style={styles.inputContent}>
          {icon}
          <Text style={styles.dateText}>{formatValue()}</Text>
        </View>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={value}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={mode === 'time'}
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

DateTimeInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date).isRequired,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  showPicker: PropTypes.bool.isRequired,
  onDateChange: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['date', 'time']).isRequired,
};

const LoadingScreen = () => (
  <Page subtitle="Preencha os dados para registrar um novo abastecimento">
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={32} color={COLORS.primary} />
    </View>
  </Page>
);

const PickerInput = ({ label, value, onValueChange, items, placeholder }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.picker}
        dropdownIconColor={COLORS.textSecondary}
      >
        {placeholder && (
          <Picker.Item 
            label={placeholder} 
            value="" 
            color={COLORS.textSecondary}
          />
        )}
        {items.map((item) => (
          <Picker.Item 
            key={item.id || item} 
            label={item.name || item} 
            value={item.id || item}
            color={COLORS.text}
          />
        ))}
      </Picker>
    </View>
  </View>
);

PickerInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  placeholder: PropTypes.string,
};

const TextInputField = ({ label, value, onChangeText, placeholder, keyboardType }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={COLORS.textSecondary}
    />
  </View>
);

TextInputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
};

const RegisterButton = ({ onPress, isLoading }) => (
  <TouchableOpacity
    style={[styles.button, isLoading && styles.buttonDisabled]}
    onPress={onPress}
    disabled={isLoading}
  >
    {isLoading ? (
      <ActivityIndicator size={20} color={COLORS.background} />
    ) : (
      <View style={styles.buttonContent}>
        <MaterialIcons name="add-circle" size={20} color={COLORS.background} style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Registrar Abastecimento</Text>
      </View>
    )}
  </TouchableOpacity>
);

RegisterButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default function RegisterRefillPage() {
  const navigation = useNavigation();
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState(FUEL_TYPES[0]);
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMachines, setIsLoadingMachines] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = () => {
    setIsLoadingMachines(true);
    setTimeout(() => {
      setMachines(MOCK_MACHINES);
      setSelectedMachine(MOCK_MACHINES[0]?.id || '');
      setIsLoadingMachines(false);
    }, 600);
  };

  const handleDateChange = (_, selected) => {
    setShowDatePicker(false);
    if (selected) setDate(selected);
  };

  const handleTimeChange = (_, selected) => {
    setShowTimePicker(false);
    if (selected) setTime(selected);
  };

  const handleRegister = () => {
    if (!selectedMachine || !quantity || Number.parseFloat(quantity) <= 0) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setQuantity('');
      setDate(new Date());
      setTime(new Date());
      Alert.alert('Sucesso', 'Abastecimento registrado com sucesso.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]);
    }, 1200);
  };

  const handleSearch = () => {
    setIsSearching(true);
    // Implemente a lógica para buscar máquinas com base no searchQuery
    setIsSearching(false);
  };

  if (isLoadingMachines) {
    return <LoadingScreen />;
  }

  return (
    <Page subtitle="Registre um novo abastecimento">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSearch={handleSearch}
          isSearching={isSearching}
          placeholder="Pesquisar máquinas..."
        />

        <PickerInput
          label="Máquina"
          value={selectedMachine}
          onValueChange={setSelectedMachine}
          items={machines}
        />

        <PickerInput
          label="Tipo de Combustível"
          value={selectedFuelType}
          onValueChange={setSelectedFuelType}
          items={FUEL_TYPES}
        />

        <TextInputField
          label="Quantidade (litros)"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Ex: 50.5"
          keyboardType="numeric"
        />

        <DateTimeInput
          label="Data"
          value={date}
          onPress={() => setShowDatePicker(true)}
          icon={<MaterialIcons name="calendar-today" size={18} color={COLORS.textSecondary} style={styles.inputIcon} />}
          showPicker={showDatePicker}
          onDateChange={handleDateChange}
          mode="date"
        />

        <DateTimeInput
          label="Hora"
          value={time}
          onPress={() => setShowTimePicker(true)}
          icon={<Feather name="clock" size={18} color={COLORS.textSecondary} style={styles.inputIcon} />}
          showPicker={showTimePicker}
          onDateChange={handleTimeChange}
          mode="time"
        />

        <RegisterButton
          onPress={handleRegister}
          isLoading={isLoading}
        />
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  form: {
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.inputBackground,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    backgroundColor: COLORS.inputBackground,
    color: COLORS.text,
  },
  dateInput: {
    backgroundColor: COLORS.inputBackground,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: 8,
  },
  dateText: {
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 