import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';

// Mock de dados e funções (substitua por API real depois)
const mockMachines = [
  { id: '1', name: 'Escavadeira', type: 'Pesada', created_by: 'João' },
  { id: '2', name: 'Trator', type: 'Agrícola', created_by: 'Maria' },
  { id: '3', name: 'Caminhão', type: 'Transporte', created_by: 'Carlos' },
];

export default function MachinesPage() {
  const [machines, setMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [machineToDelete, setMachineToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Gerenciar Máquinas</Text>
          <Text style={styles.subtitle}>Adicione, edite ou remova máquinas do sistema</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddMachine}>
          <Feather name="plus" size={20} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.addButtonText}>Nova Máquina</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar máquinas..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={isSearching}>
          {isSearching ? (
            <ActivityIndicator size={20} color="#1a237e" />
          ) : (
            <Feather name="search" size={20} color="#1a237e" />
          )}
        </TouchableOpacity>
      </View>

      {/* Lista de máquinas */}
      {isLoading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size={32} color="#FFA000" />
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
          renderItem={({ item }) => (
            <View style={styles.machineCard}>
              <View>
                <Text style={styles.machineName}>{item.name}</Text>
                <Text style={styles.machineType}>Tipo: {item.type}</Text>
                {item.created_by && (
                  <Text style={styles.machineCreatedBy}>Cadastrado por: {item.created_by}</Text>
                )}
              </View>
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleEditMachine(item.id)}
                  title="Editar"
                >
                  <Feather name="edit" size={18} color="#1a237e" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.iconButton, { marginLeft: 8 }]}
                  onPress={() => handleDeleteClick(item)}
                  title="Excluir"
                >
                  <Feather name="trash-2" size={18} color="#F44336" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Modal de confirmação de exclusão */}
      {machineToDelete && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Confirmar exclusão</Text>
            <Text style={styles.modalDesc}>
              Tem certeza que deseja excluir a máquina "{machineToDelete.name}"? Esta ação não pode ser desfeita.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#eee' }]}
                onPress={() => setMachineToDelete(null)}
                disabled={isDeleting}
              >
                <Text style={{ color: '#222' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#F44336' }]}
                onPress={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <ActivityIndicator size={18} color="#fff" />
                ) : (
                  <Text style={{ color: '#fff' }}>Excluir</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#888',
    fontSize: 13,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA000',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
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
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fafafa',
    marginRight: 8,
  },
  searchButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  emptyBox: {
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    marginTop: 24,
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
  },
  machineCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    elevation: 1,
  },
  machineName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  machineType: {
    color: '#666',
    fontSize: 13,
  },
  machineCreatedBy: {
    color: '#aaa',
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
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
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '85%',
    elevation: 4,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  modalDesc: {
    color: '#444',
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
}); 