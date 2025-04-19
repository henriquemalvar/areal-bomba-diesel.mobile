import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

const periodos = [
  { id: 'hoje', label: 'Hoje' },
  { id: 'semana', label: 'Esta Semana' },
  { id: 'mes', label: 'Este Mês' },
  { id: 'personalizado', label: 'Personalizado' },
];

const tiposAbastecimento = [
  { id: 'posto', label: 'Posto Direto' },
  { id: 'galao', label: 'Galão para Draga' },
];

export default function FuelFilterModal({ visible, onClose, onApply, initialFilters }) {
  const { theme } = useTheme();
  const [filters, setFilters] = useState(initialFilters || {
    maquina: '',
    periodo: 'hoje',
    tipoAbastecimento: '',
    responsavel: '',
    quantidadeMin: 0,
    quantidadeMax: 100,
    dataInicio: new Date(),
    dataFim: new Date(),
  });

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      maquina: '',
      periodo: 'hoje',
      tipoAbastecimento: '',
      responsavel: '',
      quantidadeMin: 0,
      quantidadeMax: 100,
      dataInicio: new Date(),
      dataFim: new Date(),
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.backgroundColor }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.textColor }]}>
              Filtros
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={theme.textColor} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.filterGroup}>
              <Text style={[styles.filterLabel, { color: theme.textColor }]}>
                Máquina
              </Text>
              <TouchableOpacity
                style={[styles.input, {
                  backgroundColor: theme.inputBackgroundColor,
                  borderColor: theme.borderColor,
                }]}
                onPress={() => {
                  // TODO: Implementar busca de máquinas
                }}
              >
                <Text style={[styles.inputText, { color: filters.maquina ? theme.textColor : theme.placeholderColor }]}>
                  {filters.maquina || 'Selecione a máquina'}
                </Text>
                <MaterialIcons name="search" size={20} color={theme.textColor} />
              </TouchableOpacity>
            </View>

            <View style={styles.filterGroup}>
              <Text style={[styles.filterLabel, { color: theme.textColor }]}>
                Período
              </Text>
              <View style={styles.periodoContainer}>
                {periodos.map((periodo) => (
                  <TouchableOpacity
                    key={periodo.id}
                    style={[
                      styles.periodoButton,
                      filters.periodo === periodo.id && styles.periodoButtonSelected,
                    ]}
                    onPress={() => setFilters({ ...filters, periodo: periodo.id })}
                  >
                    <Text
                      style={[
                        styles.periodoText,
                        filters.periodo === periodo.id && styles.periodoTextSelected,
                      ]}
                    >
                      {periodo.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterGroup}>
              <Text style={[styles.filterLabel, { color: theme.textColor }]}>
                Tipo de Abastecimento
              </Text>
              <View style={styles.tipoContainer}>
                {tiposAbastecimento.map((tipo) => (
                  <TouchableOpacity
                    key={tipo.id}
                    style={[
                      styles.tipoButton,
                      filters.tipoAbastecimento === tipo.id && styles.tipoButtonSelected,
                    ]}
                    onPress={() => setFilters({ ...filters, tipoAbastecimento: tipo.id })}
                  >
                    <Text
                      style={[
                        styles.tipoText,
                        filters.tipoAbastecimento === tipo.id && styles.tipoTextSelected,
                      ]}
                    >
                      {tipo.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterGroup}>
              <Text style={[styles.filterLabel, { color: theme.textColor }]}>
                Responsável
              </Text>
              <TouchableOpacity
                style={[styles.input, {
                  backgroundColor: theme.inputBackgroundColor,
                  borderColor: theme.borderColor,
                }]}
                onPress={() => {
                  // TODO: Implementar busca de responsáveis
                }}
              >
                <Text style={[styles.inputText, { color: filters.responsavel ? theme.textColor : theme.placeholderColor }]}>
                  {filters.responsavel || 'Selecione o responsável'}
                </Text>
                <MaterialIcons name="person" size={20} color={theme.textColor} />
              </TouchableOpacity>
            </View>

            <View style={styles.filterGroup}>
              <Text style={[styles.filterLabel, { color: theme.textColor }]}>
                Quantidade (L)
              </Text>
              <View style={styles.sliderContainer}>
                <Text style={[styles.sliderValue, { color: theme.textColor }]}>
                  {filters.quantidadeMin}L
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  value={filters.quantidadeMin}
                  onValueChange={(value) => setFilters({ ...filters, quantidadeMin: value })}
                  minimumTrackTintColor={theme.primaryColor}
                  maximumTrackTintColor={theme.borderColor}
                  thumbTintColor={theme.primaryColor}
                />
                <Text style={[styles.sliderValue, { color: theme.textColor }]}>
                  {filters.quantidadeMax}L
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primaryColor }]}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalBody: {
    flex: 1,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    flex: 1,
  },
  periodoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  periodoButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  periodoButtonSelected: {
    backgroundColor: '#1a237e',
  },
  periodoText: {
    fontSize: 14,
    color: '#666',
  },
  periodoTextSelected: {
    color: '#fff',
  },
  tipoContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tipoButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1a237e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipoButtonSelected: {
    backgroundColor: '#1a237e',
  },
  tipoText: {
    fontSize: 16,
    color: '#1a237e',
  },
  tipoTextSelected: {
    color: '#fff',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    fontSize: 14,
    minWidth: 40,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: '#f5f5f5',
  },
  resetButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 