import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Platform, Animated, ScrollView } from 'react-native';
import Page from '../../components/common/Page';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import SearchBar from '../../components/common/SearchBar';
import FloatingButtons from '../../components/common/FloatingButtons';

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

// Mock de máquinas e abastecimentos
const mockMachines = [
  { id: '1', name: 'Escavadeira' },
  { id: '2', name: 'Trator' },
  { id: '3', name: 'Caminhão' },
];
const mockRefills = [
  {
    id: 'r1',
    machine_id: '1',
    machine: { name: 'Escavadeira' },
    fuel_type: 'Diesel',
    quantity: 50,
    date: new Date().toISOString(),
    user: { name: 'João' },
  },
  {
    id: 'r2',
    machine_id: '2',
    machine: { name: 'Trator' },
    fuel_type: 'Gasolina',
    quantity: 30,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    user: { name: 'Maria' },
  },
];

const FilterAccordion = ({ title, isOpen, onToggle, children }) => {
  const [animation] = useState(new Animated.Value(isOpen ? 1 : 0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity style={styles.accordionHeader} onPress={onToggle}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <MaterialIcons 
          name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={24} 
          color={COLORS.textSecondary} 
        />
      </TouchableOpacity>
      <Animated.View style={[styles.accordionContent, { maxHeight }]}>
        {children}
      </Animated.View>
    </View>
  );
};

const DateFilter = ({ label, date, onPress, isActive }) => {
  return (
    <View style={styles.dateInputContainer}>
      <Text style={styles.dateLabel}>{label}</Text>
      <TouchableOpacity 
        style={[styles.dateButton, isActive && styles.dateButtonActive]} 
        onPress={onPress}
      >
        <MaterialIcons name="calendar-today" size={18} color={COLORS.textSecondary} style={{ marginRight: 6 }} />
        <Text style={styles.dateText}>
          {date ? date.toLocaleDateString('pt-BR') : 'Selecionar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const FilterSection = ({ 
  startDate, 
  endDate, 
  selectedMachine, 
  machines, 
  onStartDateChange, 
  onEndDateChange, 
  onMachineChange, 
  onClearFilters, 
  onApplyFilters 
}) => {
  return (
    <View style={styles.filtersBox}>
      <Text style={styles.filterLabel}>Período</Text>
      <View style={styles.row}>
        <DateFilter 
          label="Data Inicial" 
          date={startDate} 
          onPress={() => onStartDateChange(null)} 
          isActive={!!startDate} 
        />
        <DateFilter 
          label="Data Final" 
          date={endDate} 
          onPress={() => onEndDateChange(null)} 
          isActive={!!endDate} 
        />
      </View>
      <Text style={styles.filterLabel}>Máquina</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMachine}
          onValueChange={onMachineChange}
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
      <View style={styles.filterButtonsRow}>
        <TouchableOpacity 
          style={styles.clearButton} 
          onPress={onClearFilters}
        >
          <Feather name="x" size={18} color={COLORS.textSecondary} style={{ marginRight: 6 }} />
          <Text style={styles.clearButtonText}>Limpar Filtros</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={onApplyFilters}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="filter" size={18} color={COLORS.background} style={{ marginRight: 6 }} />
            <Text style={styles.filterButtonText}>Aplicar Filtros</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RefillCard = ({ item }) => {
  return (
    <View style={styles.refillCard}>
      <View style={styles.refillHeader}>
        <Text style={styles.machineName}>{item.machine.name}</Text>
        <Text style={styles.dateInfo}>
          {new Date(item.date).toLocaleString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit', 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
          })}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.info}>
          <Text style={styles.infoLabel}>Combustível:</Text> {item.fuel_type}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.infoLabel}>Quantidade:</Text> {item.quantity} litros
        </Text>
      </View>
      <View style={styles.row}>
        <Feather name="user" size={14} color={COLORS.textSecondary} style={{ marginRight: 4 }} />
        <Text style={styles.userInfo}>
          Registrado por: {item.user?.name || 'Usuário desconhecido'}
        </Text>
      </View>
    </View>
  );
};

export default function HistoryPage() {
  const [refills, setRefills] = useState([]);
  const [filteredRefills, setFilteredRefills] = useState([]);
  const [machines, setMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchMachines();
    fetchRefills();
  }, []);

  useEffect(() => {
    filterRefills();
  }, [refills, selectedMachine, searchQuery, startDate, endDate]);

  function fetchMachines() {
    setMachines(mockMachines);
  }

  function fetchRefills() {
    setIsLoading(true);
    setTimeout(() => {
      setRefills(mockRefills);
      setFilteredRefills(mockRefills);
      setIsLoading(false);
    }, 800);
  }

  function filterRefills() {
    let filtered = [...refills];
    if (selectedMachine !== 'all') {
      filtered = filtered.filter((refill) => refill.machine_id === selectedMachine);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (refill) =>
          refill.machine.name.toLowerCase().includes(query) ||
          refill.fuel_type.toLowerCase().includes(query) ||
          refill.quantity.toString().includes(query) ||
          (refill.user?.name && refill.user.name.toLowerCase().includes(query))
      );
    }
    if (startDate && endDate) {
      filtered = filtered.filter((refill) => {
        const d = new Date(refill.date);
        return d >= startDate && d <= endDate;
      });
    }
    setFilteredRefills(filtered);
  }

  function handleFilter() {
    setIsFiltering(true);
    setTimeout(() => {
      filterRefills();
      setIsFiltering(false);
    }, 400);
  }

  const handleClearFilters = () => {
    setSearchQuery('');
    setStartDate(null);
    setEndDate(null);
    setSelectedMachine('all');
    filterRefills();
  };

  const handleAddNewRecord = () => {
    console.log('Adicionar novo registro');
  };

  const handleExport = () => {
    console.log('Exportar dados');
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      filterRefills();
      setIsSearching(false);
    }, 400);
  };

  return (
    <Page subtitle="Visualize e filtre os registros de abastecimento">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSearch={handleSearch}
          isSearching={isSearching}
          placeholder="Pesquisar registros..."
        />

        <FilterAccordion 
          title="Filtros Avançados" 
          isOpen={isFiltersOpen} 
          onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <FilterSection 
            startDate={startDate}
            endDate={endDate}
            selectedMachine={selectedMachine}
            machines={machines}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onMachineChange={setSelectedMachine}
            onClearFilters={handleClearFilters}
            onApplyFilters={handleFilter}
          />
        </FilterAccordion>

        {isLoading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size={32} color={COLORS.primary} />
          </View>
        ) : filteredRefills.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Nenhum registro encontrado para os filtros selecionados.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredRefills}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 8 }}
            renderItem={({ item }) => <RefillCard item={item} />}
          />
        )}
      </ScrollView>

      <FloatingButtons 
        buttons={[
          {
            icon: 'menu',
            onPress: () => {},
            color: COLORS.primary,
            tooltip: 'Menu',
          },
          {
            icon: 'file-download',
            onPress: handleExport,
            color: COLORS.textSecondary,
            tooltip: 'Exportar Dados',
          },
          {
            icon: 'local-gas-station',
            onPress: handleAddNewRecord,
            color: COLORS.primary,
            tooltip: 'Novo Abastecimento',
          },
        ]}
      />

      {showStartDate && (
        <DateTimePicker
          value={startDate || new Date()}
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
          value={endDate || new Date()}
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
  accordionContainer: {
    marginBottom: 16,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.cardBackground,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  accordionContent: {
    overflow: 'hidden',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    backgroundColor: COLORS.inputBackground,
    marginBottom: 16,
    color: COLORS.text,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 16,
  },
  filtersBox: {
    padding: 16,
    paddingTop: 0,
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
  filterButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  clearButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  clearButtonText: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  filterButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
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
  refillCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  refillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  machineName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.text,
  },
  dateInfo: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  info: {
    fontSize: 13,
    color: COLORS.text,
    marginRight: 12,
  },
  infoLabel: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  userInfo: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  container: {
    padding: 16,
  },
}); 