import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import Page from '../../components/common/Page';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

// Mock de máquinas
const mockMachines = [
  { id: '1', name: 'Escavadeira' },
  { id: '2', name: 'Trator' },
  { id: '3', name: 'Caminhão' },
];

const fuelTypes = ['Diesel', 'Gasolina', 'Etanol'];

export default function RegisterRefillPage() {
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('Diesel');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMachines, setIsLoadingMachines] = useState(true);

  useEffect(() => {
    fetchMachines();
  }, []);

  function fetchMachines() {
    setIsLoadingMachines(true);
    setTimeout(() => {
      setMachines(mockMachines);
      setSelectedMachine(mockMachines[0]?.id || '');
      setIsLoadingMachines(false);
    }, 600);
  }

  function combineDateTime(date, time) {
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    return combined;
  }

  function handleRegister() {
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
      Alert.alert('Sucesso', 'Abastecimento registrado com sucesso.');
    }, 1200);
  }

  if (isLoadingMachines) {
    return (
      <Page title="Registrar Abastecimento">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <ActivityIndicator size={32} color="#FFA000" />
        </View>
      </Page>
    );
  }

  return (
    <Page title="Registrar Abastecimento" subtitle="Preencha os dados para registrar um novo abastecimento">
      <View style={styles.form}>
        {/* Máquina */}
        <Text style={styles.label}>Máquina</Text>
        <View style={styles.selectBox}>
          {machines.map((machine) => (
            <TouchableOpacity
              key={machine.id}
              style={[styles.selectItem, selectedMachine === machine.id && styles.selectItemActive]}
              onPress={() => setSelectedMachine(machine.id)}
            >
              <Text style={selectedMachine === machine.id ? styles.selectItemTextActive : styles.selectItemText}>
                {machine.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tipo de combustível */}
        <Text style={styles.label}>Tipo de Combustível</Text>
        <View style={styles.selectBox}>
          {fuelTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.selectItem, selectedFuelType === type && styles.selectItemActive]}
              onPress={() => setSelectedFuelType(type)}
            >
              <Text style={selectedFuelType === type ? styles.selectItemTextActive : styles.selectItemText}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantidade */}
        <Text style={styles.label}>Quantidade (litros)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 50.5"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />

        {/* Data */}
        <Text style={styles.label}>Data</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="calendar-today" size={18} color="#888" style={{ marginRight: 8 }} />
            <Text>{date.toLocaleDateString('pt-BR')}</Text>
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_, selected) => {
              setShowDatePicker(false);
              if (selected) setDate(selected);
            }}
          />
        )}

        {/* Hora */}
        <Text style={styles.label}>Hora</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowTimePicker(true)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="clock" size={18} color="#888" style={{ marginRight: 8 }} />
            <Text>{time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_, selected) => {
              setShowTimePicker(false);
              if (selected) setTime(selected);
            }}
          />
        )}

        {/* Botão registrar */}
        <TouchableOpacity
          style={[styles.button, isLoading && { opacity: 0.7 }]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Registrar Abastecimento</Text>
          )}
        </TouchableOpacity>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 12,
    color: '#1a237e',
  },
  selectBox: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  selectItem: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: 8,
  },
  selectItemActive: {
    backgroundColor: '#FFD600',
  },
  selectItemText: {
    color: '#222',
  },
  selectItemTextActive: {
    color: '#222',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fafafa',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#FFA000',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 