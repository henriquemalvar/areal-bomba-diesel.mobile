import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Card from '../../components/common/Card';
import Container from '../../components/common/Container';
import FilterModal from '../../components/common/FilterModal';
import { useTheme } from '../../contexts/ThemeContext';

// Dados mockados para exemplo
const mockManutencoes = [
  {
    id: '1',
    maquina: 'Draga 01',
    tipo: 'preventiva',
    data: new Date('2024-04-15'),
    status: 'concluida',
    descricao: 'Troca de óleo e filtros',
    responsavel: 'João Silva',
    proximaRevisao: new Date('2024-05-15'),
    custo: 1500.00,
  },
  {
    id: '2',
    maquina: 'Pá Carregadeira 02',
    tipo: 'corretiva',
    data: new Date('2024-04-10'),
    status: 'pendente',
    descricao: 'Reparo no sistema hidráulico',
    responsavel: 'Maria Santos',
    proximaRevisao: null,
    custo: 2500.00,
  },
];

const mockMaquinas = [
  { id: '1', nome: 'Draga 01' },
  { id: '2', nome: 'Draga 02' },
  { id: '3', nome: 'Pá Carregadeira 01' },
  { id: '4', nome: 'Pá Carregadeira 02' },
];

const mockData = {
  resumoMes: {
    totalManutencoes: 8,
    preventivas: 5,
    corretivas: 3,
  },
  ultimasManutencoes: [
    {
      id: '1',
      maquina: 'Draga 01',
      tipo: 'preventiva',
      data: new Date(),
      status: 'concluida',
      responsavel: 'João Silva',
    },
    {
      id: '2',
      maquina: 'Draga 02',
      tipo: 'corretiva',
      data: new Date(),
      status: 'pendente',
      responsavel: 'Maria Santos',
    },
  ],
};

export default function MaintenancePage() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [data, setData] = useState(mockData);
  const [modalVisible, setModalVisible] = useState(false);
  const [filtros, setFiltros] = useState({
    periodo: 'hoje',
    maquina: 'todas',
    tipo: 'todos',
    status: 'todos',
  });

  const handleDelete = (id) => {
    setData(prev => ({
      ...prev,
      ultimasManutencoes: prev.ultimasManutencoes.filter(m => m.id !== id)
    }));
  };

  const handleEdit = (manutencao) => {
    navigation.navigate('NewMaintenance', { manutencao });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'concluida':
        return theme.successColor;
      case 'pendente':
        return theme.warningColor;
      case 'cancelada':
        return theme.errorColor;
      default:
        return theme.textColor;
    }
  };

  const renderManutencao = (manutencao) => (
    <Card key={manutencao.id} style={styles.maintenanceCard}>
      <TouchableOpacity
        style={styles.maintenanceCardContent}
        onPress={() => navigation.navigate('MaintenanceDetails', { manutencao })}
      >
        <View style={styles.maintenanceHeader}>
          <Text style={[styles.maintenanceTitle, { color: theme.textColor }]}>
            {manutencao.maquina}
          </Text>
          <View style={styles.status}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(manutencao.status) }]}>
              <Text style={styles.statusText}>
                {manutencao.status === 'concluida' ? 'Concluída' : 'Pendente'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.maintenanceInfo}>
          <Text style={[styles.maintenanceLabel, { color: theme.textSecondaryColor }]}>
            Tipo:
          </Text>
          <Text style={[styles.maintenanceValue, { color: theme.primaryColor }]}>
            {manutencao.tipo === 'preventiva' ? 'Preventiva' : 'Corretiva'}
          </Text>
        </View>
        <View style={styles.maintenanceInfo}>
          <Text style={[styles.maintenanceLabel, { color: theme.textSecondaryColor }]}>
            Data:
          </Text>
          <Text style={[styles.maintenanceValue, { color: theme.primaryColor }]}>
            {manutencao.data.toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.maintenanceInfo}>
          <Text style={[styles.maintenanceLabel, { color: theme.textSecondaryColor }]}>
            Responsável:
          </Text>
          <Text style={[styles.maintenanceValue, { color: theme.primaryColor }]}>
            {manutencao.responsavel}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEdit(manutencao)}
          >
            <MaterialIcons
              name="edit"
              size={20}
              color={theme.primaryColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDelete(manutencao.id)}
          >
            <MaterialIcons
              name="delete"
              size={20}
              color={theme.errorColor}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Card>
  );

  const filterSections = [
    {
      title: 'Período',
      options: [
        { label: 'Hoje', value: 'hoje', selected: filtros.periodo === 'hoje' },
        { label: 'Semana', value: 'semana', selected: filtros.periodo === 'semana' },
        { label: 'Mês', value: 'mes', selected: filtros.periodo === 'mes' },
      ],
      onSelect: (value) => setFiltros(prev => ({ ...prev, periodo: value })),
    },
    {
      title: 'Máquina',
      options: [
        { label: 'Todas', value: 'todas', selected: filtros.maquina === 'todas' },
        { label: 'Draga 01', value: 'draga01', selected: filtros.maquina === 'draga01' },
        { label: 'Draga 02', value: 'draga02', selected: filtros.maquina === 'draga02' },
      ],
      onSelect: (value) => setFiltros(prev => ({ ...prev, maquina: value })),
    },
    {
      title: 'Tipo',
      options: [
        { label: 'Todos', value: 'todos', selected: filtros.tipo === 'todos' },
        { label: 'Preventiva', value: 'preventiva', selected: filtros.tipo === 'preventiva' },
        { label: 'Corretiva', value: 'corretiva', selected: filtros.tipo === 'corretiva' },
      ],
      onSelect: (value) => setFiltros(prev => ({ ...prev, tipo: value })),
    },
    {
      title: 'Status',
      options: [
        { label: 'Todos', value: 'todos', selected: filtros.status === 'todos' },
        { label: 'Concluída', value: 'concluida', selected: filtros.status === 'concluida' },
        { label: 'Pendente', value: 'pendente', selected: filtros.status === 'pendente' },
        { label: 'Cancelada', value: 'cancelada', selected: filtros.status === 'cancelada' },
      ],
      onSelect: (value) => setFiltros(prev => ({ ...prev, status: value })),
    },
  ];

  return (
    <Container>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textColor }]}>
          Manutenções
        </Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons
            name="filter-list"
            size={24}
            color={theme.primaryColor}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Resumo do Mês
          </Text>
          <View style={styles.summaryCards}>
            <Card style={styles.summaryCard}>
              <View style={styles.summaryCardContent}>
                <Text style={[styles.summaryTitle, { color: theme.textSecondaryColor }]}>
                  Total Manutenções
                </Text>
                <Text style={[styles.summaryValue, { color: theme.primaryColor }]}>
                  {data.resumoMes.totalManutencoes}
                </Text>
              </View>
            </Card>
            <Card style={styles.summaryCard}>
              <View style={styles.summaryCardContent}>
                <Text style={[styles.summaryTitle, { color: theme.textSecondaryColor }]}>
                  Preventivas
                </Text>
                <Text style={[styles.summaryValue, { color: theme.primaryColor }]}>
                  {data.resumoMes.preventivas}
                </Text>
              </View>
            </Card>
            <Card style={styles.summaryCard}>
              <View style={styles.summaryCardContent}>
                <Text style={[styles.summaryTitle, { color: theme.textSecondaryColor }]}>
                  Corretivas
                </Text>
                <Text style={[styles.summaryValue, { color: theme.primaryColor }]}>
                  {data.resumoMes.corretivas}
                </Text>
              </View>
            </Card>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
              Últimas Manutenções
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('NewMaintenance')}
            >
              <Text style={[styles.novaManutencao, { color: theme.primaryColor }]}>
                Nova
              </Text>
            </TouchableOpacity>
          </View>
          {data.ultimasManutencoes.map(renderManutencao)}
        </View>
      </View>

      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApply={() => {
          // Aplicar filtros aqui
          setModalVisible(false);
        }}
        title="Filtros"
        sections={filterSections}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
    paddingTop: 0,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  novaManutencao: {
    fontSize: 14,
  },
  summaryCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    minWidth: '45%',
  },
  summaryCardContent: {
    padding: 16,
  },
  summaryTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  maintenanceCard: {
    marginBottom: 16,
  },
  maintenanceCardContent: {
    padding: 16,
  },
  maintenanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  maintenanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  maintenanceDate: {
    fontSize: 14,
  },
  maintenanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  maintenanceLabel: {
    fontSize: 14,
  },
  maintenanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusText: {
    fontSize: 14,
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    padding: 8,
  },
  filterButton: {
    padding: 8,
  },
}); 