import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Card from '../../components/common/Card';
import Container from '../../components/common/Container';
import FilterModal from '../../components/common/FilterModal';
import { useTheme } from '../../contexts/ThemeContext';

const mockData = {
  resumoMes: {
    totalAbastecimentos: 12,
    litrosTotais: 1200,
    mediaDiaria: 40,
  },
  consumoMensal: {
    labels: ['1', '5', '10', '15', '20', '25', '30'],
    datasets: [
      {
        data: [100, 150, 200, 180, 220, 190, 160],
      },
    ],
  },
  ultimosAbastecimentos: [
    {
      id: '1',
      maquina: 'Draga 01',
      quantidade: 50,
      data: new Date(),
      tipo: 'posto',
      responsavel: 'João Silva',
    },
    {
      id: '2',
      maquina: 'Draga 02',
      quantidade: 30,
      data: new Date(),
      tipo: 'galao',
      responsavel: 'Maria Santos',
    },
  ],
};

export default function FuelPage() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [data, setData] = useState(mockData);
  const [modalVisible, setModalVisible] = useState(false);
  const [filtros, setFiltros] = useState({
    periodo: 'hoje',
    maquina: 'todas',
    tipo: 'todos',
  });

  const handleDelete = (id) => {
    setData(prev => ({
      ...prev,
      ultimosAbastecimentos: prev.ultimosAbastecimentos.filter(a => a.id !== id)
    }));
  };

  const handleEdit = (abastecimento) => {
    navigation.navigate('NewFuel', { abastecimento });
  };

  const renderAbastecimento = (abastecimento) => (
    <Card key={abastecimento.id} style={styles.supplyCard}>
      <View style={styles.supplyCardContent}>
        <View style={styles.supplyHeader}>
          <Text style={[styles.supplyTitle, { color: theme.textColor }]}>
            {abastecimento.maquina}
          </Text>
          <Text style={[styles.supplyDate, { color: theme.textSecondaryColor }]}>
            {abastecimento.data.toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.supplyInfo}>
          <Text style={[styles.supplyLabel, { color: theme.textSecondaryColor }]}>
            Quantidade:
          </Text>
          <Text style={[styles.supplyValue, { color: theme.primaryColor }]}>
            {abastecimento.quantidade}L
          </Text>
        </View>
        <View style={styles.supplyInfo}>
          <Text style={[styles.supplyLabel, { color: theme.textSecondaryColor }]}>
            Tipo:
          </Text>
          <Text style={[styles.supplyValue, { color: theme.primaryColor }]}>
            {abastecimento.tipo === 'posto' ? 'Posto Direto' : 'Galão para Draga'}
          </Text>
        </View>
        <View style={styles.status}>
          <Text style={[styles.statusText, { color: theme.textSecondaryColor }]}>
            Responsável: {abastecimento.responsavel}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEdit(abastecimento)}
          >
            <MaterialIcons
              name="edit"
              size={20}
              color={theme.primaryColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDelete(abastecimento.id)}
          >
            <MaterialIcons
              name="delete"
              size={20}
              color={theme.errorColor}
            />
          </TouchableOpacity>
        </View>
      </View>
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
        { label: 'Posto Direto', value: 'posto', selected: filtros.tipo === 'posto' },
        { label: 'Galão', value: 'galao', selected: filtros.tipo === 'galao' },
      ],
      onSelect: (value) => setFiltros(prev => ({ ...prev, tipo: value })),
    },
  ];

  return (
    <Container>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textColor }]}>
          Abastecimentos
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
                  Total Abastecimentos
                </Text>
                <Text style={[styles.summaryValue, { color: theme.primaryColor }]}>
                  {data.resumoMes.totalAbastecimentos}
                </Text>
              </View>
            </Card>
            <Card style={styles.summaryCard}>
              <View style={styles.summaryCardContent}>
                <Text style={[styles.summaryTitle, { color: theme.textSecondaryColor }]}>
                  Litros Totais
                </Text>
                <Text style={[styles.summaryValue, { color: theme.primaryColor }]}>
                  {data.resumoMes.litrosTotais}L
                </Text>
              </View>
            </Card>
            <Card style={styles.summaryCard}>
              <View style={styles.summaryCardContent}>
                <Text style={[styles.summaryTitle, { color: theme.textSecondaryColor }]}>
                  Média Diária
                </Text>
                <Text style={[styles.summaryValue, { color: theme.primaryColor }]}>
                  {data.resumoMes.mediaDiaria}L
                </Text>
              </View>
            </Card>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Consumo Mensal
          </Text>
          <Card style={styles.graficoCard}>
            <LineChart
              data={data.consumoMensal}
              width={Dimensions.get('window').width - 48}
              height={220}
              chartConfig={{
                backgroundColor: theme.backgroundColor,
                backgroundGradientFrom: theme.backgroundColor,
                backgroundGradientTo: theme.backgroundColor,
                decimalPlaces: 0,
                color: (opacity = 1) => theme.primaryColor,
                labelColor: (opacity = 1) => theme.textColor,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: theme.primaryColor,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
              Últimos Abastecimentos
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('NewFuel')}
            >
              <Text style={[styles.novoAbastecimento, { color: theme.primaryColor }]}>
                Novo
              </Text>
            </TouchableOpacity>
          </View>
          {data.ultimosAbastecimentos.map(renderAbastecimento)}
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
  novoAbastecimento: {
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
  supplyCard: {
    marginBottom: 16,
  },
  supplyCardContent: {
    padding: 16,
  },
  supplyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  supplyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  supplyDate: {
    fontSize: 14,
  },
  supplyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  supplyLabel: {
    fontSize: 14,
  },
  supplyValue: {
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
  graficoCard: {
    padding: 16,
  },
}); 