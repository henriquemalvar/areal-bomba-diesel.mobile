import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Alert, ScrollView, Animated } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import Page from '../../components/common/Page';
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

// Mock de dados e funções (substitua por API real depois)
const mockMachines = [
  { id: '1', name: 'Escavadeira', type: 'Pesada', created_by: 'João' },
  { id: '2', name: 'Trator', type: 'Agrícola', created_by: 'Maria' },
  { id: '3', name: 'Caminhão', type: 'Transporte', created_by: 'Carlos' },
];

const FilterAccordion = ({ title, children, isOpen, onToggle }) => {
  const [animation] = useState(new Animated.Value(0));

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
        <Feather 
          name={isOpen ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color={COLORS.textSecondary} 
        />
      </TouchableOpacity>
      <Animated.View style={[styles.accordionContent, { maxHeight }]}>
        {children}
      </Animated.View>
    </View>
  );
};

const TypeButton = ({ type, selectedType, onPress }) => (
  <TouchableOpacity
    style={[
      styles.typeButton,
      selectedType === type && styles.typeButtonActive
    ]}
    onPress={() => onPress(type)}
  >
    <Text style={[
      styles.typeButtonText,
      selectedType === type && styles.typeButtonTextActive
    ]}>{type}</Text>
  </TouchableOpacity>
);

const FilterButtons = ({ onClearFilters, onApplyFilters }) => (
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
      <Feather name="filter" size={18} color={COLORS.background} style={{ marginRight: 6 }} />
      <Text style={styles.filterButtonText}>Aplicar Filtros</Text>
    </TouchableOpacity>
  </View>
);

const MachineCard = ({ machine, onEdit, onDelete }) => (
  <View style={styles.machineCard}>
    <View>
      <Text style={styles.machineName}>{machine.name}</Text>
      <Text style={styles.machineType}>Tipo: {machine.type}</Text>
      {machine.created_by && (
        <Text style={styles.machineCreatedBy}>Cadastrado por: {machine.created_by}</Text>
      )}
    </View>
    <View style={styles.actionsRow}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => onEdit(machine.id)}
        title="Editar"
      >
        <Feather name="edit" size={18} color={COLORS.primary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconButton, { marginLeft: 8 }]}
        onPress={() => onDelete(machine)}
        title="Excluir"
      >
        <Feather name="trash-2" size={18} color={COLORS.error} />
      </TouchableOpacity>
    </View>
  </View>
);

const DeleteConfirmationModal = ({ machine, onCancel, onConfirm, isDeleting }) => (
  <View style={styles.modalOverlay}>
    <View style={styles.modalBox}>
      <Text style={styles.modalTitle}>Confirmar exclusão</Text>
      <Text style={styles.modalDesc}>
        Tem certeza que deseja excluir a máquina "{machine.name}"? Esta ação não pode ser desfeita.
      </Text>
      <View style={styles.modalActions}>
        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: COLORS.inputBackground }]}
          onPress={onCancel}
          disabled={isDeleting}
        >
          <Text style={{ color: COLORS.text }}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: COLORS.error }]}
          onPress={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <ActivityIndicator size={18} color={COLORS.background} />
          ) : (
            <Text style={{ color: COLORS.background }}>Excluir</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function MachinesPage() {
  const [machines, setMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [machineToDelete, setMachineToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchMachines();
  }, []);

  function fetchMachines() {
    setIsLoading(true);
    setTimeout(() => {
      setMachines(mockMachines);
      setIsLoading(false);
    }, 800);
  }

  function handleSearch() {
    if (!searchQuery.trim()) {
      fetchMachines();
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      setMachines(
        mockMachines.filter((m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setIsSearching(false);
    }, 500);
  }

  function handleAddMachine() {
    Alert.alert('Nova Máquina', 'Funcionalidade de adicionar máquina.');
  }

  function handleEditMachine(id) {
    Alert.alert('Editar Máquina', `Funcionalidade de editar máquina ${id}.`);
  }

  function handleDeleteClick(machine) {
    setMachineToDelete(machine);
  }

  function handleDeleteConfirm() {
    if (!machineToDelete) return;
    setIsDeleting(true);
    setTimeout(() => {
      setMachines((prev) => prev.filter((m) => m.id !== machineToDelete.id));
      setIsDeleting(false);
      setMachineToDelete(null);
      Alert.alert('Sucesso', 'Máquina excluída com sucesso.');
    }, 1000);
  }

  function handleClearFilters() {
    setSearchQuery('');
    setSelectedType('all');
    fetchMachines();
  }

  return (
    <Page subtitle="Adicione, edite ou remova máquinas do sistema">
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

        <FilterAccordion 
          title="Filtros Avançados" 
          isOpen={isFiltersOpen} 
          onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <View style={styles.filtersContent}>
            <Text style={styles.filterLabel}>Tipo de Máquina</Text>
            <View style={styles.typeButtonsRow}>
              <TypeButton 
                type="all" 
                selectedType={selectedType} 
                onPress={setSelectedType} 
              />
              <TypeButton 
                type="Pesada" 
                selectedType={selectedType} 
                onPress={setSelectedType} 
              />
              <TypeButton 
                type="Agrícola" 
                selectedType={selectedType} 
                onPress={setSelectedType} 
              />
              <TypeButton 
                type="Transporte" 
                selectedType={selectedType} 
                onPress={setSelectedType} 
              />
            </View>

            <FilterButtons 
              onClearFilters={handleClearFilters}
              onApplyFilters={handleSearch}
            />
          </View>
        </FilterAccordion>

        {isLoading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size={32} color={COLORS.primary} />
          </View>
        ) : machines.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              {searchQuery
                ? 'Nenhuma máquina encontrada para a pesquisa.'
                : 'Nenhuma máquina cadastrada. Clique em "Nova Máquina" para adicionar.'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={machines}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 8 }}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <MachineCard 
                machine={item}
                onEdit={handleEditMachine}
                onDelete={handleDeleteClick}
              />
            )}
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
            icon: 'add',
            onPress: handleAddMachine,
            color: COLORS.primary,
            tooltip: 'Adicionar Máquina',
          },
        ]}
      />

      {machineToDelete && (
        <DeleteConfirmationModal 
          machine={machineToDelete}
          onCancel={() => setMachineToDelete(null)}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
        />
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 15,
  },
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
  machineCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  machineName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.text,
  },
  machineType: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  machineCreatedBy: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalBox: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 24,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: COLORS.text,
  },
  modalDesc: {
    color: COLORS.textSecondary,
    marginBottom: 18,
    fontSize: 14,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 8,
  },
  accordionContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
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
    backgroundColor: COLORS.background,
  },
  accordionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  accordionContent: {
    overflow: 'hidden',
  },
  filtersContent: {
    padding: 16,
    backgroundColor: COLORS.background,
  },
  filterLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  typeButtonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  typeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  typeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeButtonText: {
    fontSize: 13,
    color: COLORS.text,
  },
  typeButtonTextActive: {
    color: COLORS.background,
  },
  filterButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  clearButtonText: {
    color: COLORS.textSecondary,
    fontWeight: '500',
    fontSize: 14,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 14,
  },
}); 