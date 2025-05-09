import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Platform, ScrollView } from 'react-native';
import Page from '../../components/common/Page';
import { MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

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

// Mock de máquinas e dados de relatório
const mockMachines = [
  { id: '1', name: 'Escavadeira' },
  { id: '2', name: 'Trator' },
  { id: '3', name: 'Caminhão' },
];
const mockReportData = {
  totalConsumption: 320.5,
  totalRefills: 12,
  averageConsumption: 26.7,
  mostUsedFuelType: { fuelType: 'Diesel' },
  consumptionByMachine: [
    { machineName: 'Escavadeira', machineType: 'Pesada', totalConsumption: 120, refillCount: 4 },
    { machineName: 'Trator', machineType: 'Agrícola', totalConsumption: 100, refillCount: 5 },
    { machineName: 'Caminhão', machineType: 'Transporte', totalConsumption: 100.5, refillCount: 3 },
  ],
  consumptionByFuelType: [
    { fuelType: 'Diesel', totalConsumption: 200, refillCount: 7 },
    { fuelType: 'Gasolina', totalConsumption: 80, refillCount: 3 },
    { fuelType: 'Etanol', totalConsumption: 40.5, refillCount: 2 },
  ],
};

export default function ReportsPage() {
  const [startDate, setStartDate] = useState(new Date(Date.now() - 86400000 * 30));
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState('all');
  const [machines, setMachines] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    fetchMachines();
    fetchReportData();
  }, []);

  function fetchMachines() {
    setMachines(mockMachines);
  }

  function fetchReportData() {
    setIsLoading(true);
    setTimeout(() => {
      setReportData(mockReportData);
      setIsLoading(false);
    }, 800);
  }

  function handleFilter() {
    setIsFiltering(true);
    setTimeout(() => {
      fetchReportData();
      setIsFiltering(false);
    }, 400);
  }

  return (
    <Page subtitle="Visualize estatísticas e gráficos de consumo de combustível">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Filtros */}
        <View style={styles.filtersBox}>
          <Text style={styles.filterLabel}>Período</Text>
          <View style={styles.row}>
            <View style={styles.dateInputContainer}>
              <Text style={styles.dateLabel}>Data Inicial</Text>
              <TouchableOpacity 
                style={[styles.dateButton, startDate && styles.dateButtonActive]} 
                onPress={() => setShowStartDate(true)}
              >
                <MaterialIcons name="calendar-today" size={18} color={COLORS.textSecondary} style={{ marginRight: 6 }} />
                <Text style={styles.dateText}>
                  {startDate ? startDate.toLocaleDateString('pt-BR') : 'Selecionar'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dateInputContainer}>
              <Text style={styles.dateLabel}>Data Final</Text>
              <TouchableOpacity 
                style={[styles.dateButton, endDate && styles.dateButtonActive]} 
                onPress={() => setShowEndDate(true)}
              >
                <MaterialIcons name="calendar-today" size={18} color={COLORS.textSecondary} style={{ marginRight: 6 }} />
                <Text style={styles.dateText}>
                  {endDate ? endDate.toLocaleDateString('pt-BR') : 'Selecionar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.filterLabel}>Máquina</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedMachine}
              onValueChange={(itemValue) => setSelectedMachine(itemValue)}
              style={styles.picker}
              dropdownIconColor={COLORS.textSecondary}
            >
              <Picker.Item label="Todas as máquinas" value="all" color={COLORS.text} />
              {machines.map((machine) => (
                <Picker.Item 
                  key={machine.id} 
                  label={machine.name} 
                  value={machine.id}
                  color={COLORS.text}
                />
              ))}
            </Picker>
          </View>

          <TouchableOpacity 
            style={styles.filterButton} 
            onPress={handleFilter} 
            disabled={isFiltering}
          >
            {isFiltering ? (
              <ActivityIndicator size={18} color={COLORS.background} />
            ) : (
              <View style={styles.buttonContent}>
                <Feather name="filter" size={18} color={COLORS.background} style={{ marginRight: 6 }} />
                <Text style={styles.filterButtonText}>Aplicar Filtros</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Cards de resumo */}
        {isLoading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size={32} color={COLORS.primary} />
          </View>
        ) : reportData ? (
          <View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.summaryScrollContent}
            >
              <View style={styles.summaryCard}>
                <MaterialCommunityIcons name="gas-station" size={28} color={COLORS.primary} />
                <Text style={styles.summaryLabel}>Consumo Total</Text>
                <Text style={styles.summaryValue}>{reportData.totalConsumption.toFixed(2)} L</Text>
              </View>
              <View style={styles.summaryCard}>
                <Feather name="list" size={28} color={COLORS.primary} />
                <Text style={styles.summaryLabel}>Total de Abastecimentos</Text>
                <Text style={styles.summaryValue}>{reportData.totalRefills}</Text>
              </View>
              <View style={styles.summaryCard}>
                <Feather name="bar-chart-2" size={28} color={COLORS.primary} />
                <Text style={styles.summaryLabel}>Média por Abastecimento</Text>
                <Text style={styles.summaryValue}>{reportData.averageConsumption.toFixed(2)} L</Text>
              </View>
              <View style={styles.summaryCard}>
                <Feather name="droplet" size={28} color={COLORS.primary} />
                <Text style={styles.summaryLabel}>Combustível Mais Usado</Text>
                <Text style={styles.summaryValue}>{reportData.mostUsedFuelType?.fuelType || 'N/A'}</Text>
              </View>
            </ScrollView>

            {/* Listagem por máquina */}
            <Text style={styles.sectionTitle}>Consumo por Máquina</Text>
            <FlatList
              data={reportData.consumptionByMachine}
              keyExtractor={(_, idx) => 'machine-' + idx}
              style={{ marginBottom: 16 }}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.detailCard}>
                  <Text style={styles.detailTitle}>{item.machineName} <Text style={styles.detailType}>({item.machineType})</Text></Text>
                  <Text style={styles.detailInfo}>Consumo Total: <Text style={styles.detailValue}>{item.totalConsumption.toFixed(2)} L</Text></Text>
                  <Text style={styles.detailInfo}>Abastecimentos: <Text style={styles.detailValue}>{item.refillCount}</Text></Text>
                  <Text style={styles.detailInfo}>Média: <Text style={styles.detailValue}>{(item.totalConsumption / item.refillCount).toFixed(2)} L</Text></Text>
                </View>
              )}
            />

            {/* Listagem por combustível */}
            <Text style={styles.sectionTitle}>Consumo por Tipo de Combustível</Text>
            <FlatList
              data={reportData.consumptionByFuelType}
              keyExtractor={(_, idx) => 'fuel-' + idx}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.detailCard}>
                  <Text style={styles.detailTitle}>{item.fuelType}</Text>
                  <Text style={styles.detailInfo}>Consumo Total: <Text style={styles.detailValue}>{item.totalConsumption.toFixed(2)} L</Text></Text>
                  <Text style={styles.detailInfo}>Abastecimentos: <Text style={styles.detailValue}>{item.refillCount}</Text></Text>
                  <Text style={styles.detailInfo}>Média: <Text style={styles.detailValue}>{(item.totalConsumption / item.refillCount).toFixed(2)} L</Text></Text>
                  <Text style={styles.detailInfo}>% do Total: <Text style={styles.detailValue}>{((item.totalConsumption / reportData.totalConsumption) * 100).toFixed(1)}%</Text></Text>
                </View>
              )}
            />
          </View>
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Nenhum dado disponível para o período selecionado.</Text>
          </View>
        )}
      </ScrollView>

      {/* Date Pickers */}
      {showStartDate && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartDate(false);
            if (selectedDate) {
              setStartDate(selectedDate);
            }
          }}
        />
      )}
      {showEndDate && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndDate(false);
            if (selectedDate) {
              setEndDate(selectedDate);
            }
          }}
        />
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  filtersBox: {
    marginBottom: 18,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  filterLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  dateInputContainer: {
    flex: 1,
    marginRight: 8,
  },
  dateLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
  },
  dateText: {
    color: COLORS.text,
    fontSize: 13,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.inputBackground,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: COLORS.text,
  },
  filterButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 15,
  },
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  summaryScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  summaryCard: {
    width: 160,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    alignItems: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryLabel: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  summaryValue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.primary,
    marginTop: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 18,
    marginBottom: 8,
    color: COLORS.primary,
  },
  detailCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
    color: COLORS.text,
  },
  detailType: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  detailInfo: {
    fontSize: 13,
    color: COLORS.text,
    marginRight: 12,
  },
  detailValue: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  emptyBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    marginTop: 24,
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
}); 