import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DefaultPage from '../../components/common/DefaultPage';
import { responsaveis } from '../../constants/fuel';
import { useTheme } from '../../contexts/ThemeContext';
import { listarAbastecimentos } from '../../services/abastecimentos';

export default function FuelPage() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState({
    resumoMes: {
      totalAbastecimentos: 0,
      litrosTotais: 0,
      mediaDiaria: 0,
    },
    ultimosAbastecimentos: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    periodo: 'todos',
    maquina: 'todas',
    tipo: 'todos',
    responsavel: 'todos',
    dataInicio: '',
    dataFim: '',
  });

  useEffect(() => {
    carregarAbastecimentos();
  }, []);

  useEffect(() => {
    if (route.params?.filtros) {
      setFiltros(route.params.filtros);
      filtrarAbastecimentos(route.params.filtros);
    }
  }, [route.params]);

  const carregarAbastecimentos = async () => {
    try {
      setIsLoading(true);
      const abastecimentos = await listarAbastecimentos();

      // Transformar os dados da API para o formato esperado pelo componente
      const abastecimentosFormatados = abastecimentos.map(abastecimento => ({
        id: abastecimento.id.toString(),
        maquina: abastecimento.maquinario?.nome || 'Máquina não especificada',
        quantidade: abastecimento.quantidade,
        data: new Date(abastecimento.data),
        tipo: abastecimento.tipo,
        responsavel: abastecimento.usuario?.nome || 'Responsável não especificado',
      }));

      // Calcular resumo do mês
      const hoje = new Date();
      const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
      const abastecimentosMes = abastecimentosFormatados.filter(
        a => a.data >= inicioMes && a.data <= hoje
      );

      const resumoMes = {
        totalAbastecimentos: abastecimentosMes.length,
        litrosTotais: abastecimentosMes.reduce((total, a) => total + a.quantidade, 0),
        mediaDiaria: abastecimentosMes.length > 0
          ? abastecimentosMes.reduce((total, a) => total + a.quantidade, 0) / abastecimentosMes.length
          : 0,
      };

      setData({
        resumoMes,
        ultimosAbastecimentos: abastecimentosFormatados,
      });
    } catch (error) {
      console.error('Erro ao carregar abastecimentos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os abastecimentos. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const filtrarAbastecimentos = (filtros) => {
    let abastecimentosFiltrados = [...data.ultimosAbastecimentos];

    // Filtro por máquina
    if (filtros.maquina !== 'todas') {
      abastecimentosFiltrados = abastecimentosFiltrados.filter(
        (a) => a.maquina.toLowerCase() === filtros.maquina.toLowerCase()
      );
    }

    // Filtro por tipo
    if (filtros.tipo !== 'todos') {
      abastecimentosFiltrados = abastecimentosFiltrados.filter(
        (a) => a.tipo === filtros.tipo
      );
    }

    // Filtro por responsável
    if (filtros.responsavel !== 'todos') {
      const responsavelSelecionado = responsaveis.find(r => r.id === filtros.responsavel);
      if (responsavelSelecionado) {
        abastecimentosFiltrados = abastecimentosFiltrados.filter(
          (a) => a.responsavel.toLowerCase() === responsavelSelecionado.label.toLowerCase()
        );
      }
    }

    // Filtro por período
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    switch (filtros.periodo) {
      case 'hoje':
        abastecimentosFiltrados = abastecimentosFiltrados.filter(
          (a) => a.data.toDateString() === hoje.toDateString()
        );
        break;
      case 'semana':
        const inicioSemana = new Date(hoje);
        inicioSemana.setDate(hoje.getDate() - hoje.getDay());
        abastecimentosFiltrados = abastecimentosFiltrados.filter(
          (a) => a.data >= inicioSemana && a.data <= hoje
        );
        break;
      case 'mes':
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        abastecimentosFiltrados = abastecimentosFiltrados.filter(
          (a) => a.data >= inicioMes && a.data <= hoje
        );
        break;
      case 'personalizado':
        if (filtros.dataInicio && filtros.dataFim) {
          const inicio = new Date(filtros.dataInicio);
          const fim = new Date(filtros.dataFim);
          abastecimentosFiltrados = abastecimentosFiltrados.filter(
            (a) => a.data >= inicio && a.data <= fim
          );
        }
        break;
    }

    setData({
      ...data,
      ultimosAbastecimentos: abastecimentosFiltrados
    });
  };

  const handleViewDetails = (abastecimento) => {
    const abastecimentoSerializado = {
      ...abastecimento,
      data: abastecimento.data.toISOString(),
      dataFormatada: abastecimento.data.toLocaleDateString('pt-BR'),
      horaFormatada: abastecimento.data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    navigation.navigate('NewFuel', {
      abastecimento: abastecimentoSerializado,
      mode: 'view'
    });
  };

  const renderAbastecimento = (abastecimento) => (
    <TouchableOpacity
      key={abastecimento.id}
      style={[styles.abastecimentoContainer, { backgroundColor: theme.cardBackground }]}
      onPress={() => handleViewDetails(abastecimento)}
      activeOpacity={0.7}
    >
      <View style={styles.abastecimentoInfo}>
        <View style={styles.abastecimentoHeader}>
          <View style={styles.maquinaContainer}>
            <MaterialIcons
              name="build"
              size={20}
              color={theme.primaryColor}
              style={styles.maquinaIcon}
            />
            <Text style={[styles.abastecimentoMaquina, { color: theme.textColor }]}>
              {abastecimento.maquina}
            </Text>
          </View>
          <Text style={[styles.abastecimentoData, { color: theme.textSecondaryColor }]}>
            {abastecimento.data.toLocaleDateString('pt-BR')}
          </Text>
        </View>
        <View style={styles.abastecimentoDetalhes}>
          <View style={styles.detalheItem}>
            <MaterialIcons
              name="local-gas-station"
              size={16}
              color={theme.textSecondaryColor}
            />
            <Text style={[styles.abastecimentoLabel, { color: theme.textSecondaryColor }]}>
              Quantidade:
            </Text>
            <Text style={[styles.abastecimentoValor, { color: theme.primaryColor }]}>
              {abastecimento.quantidade}L
            </Text>
          </View>
          <View style={styles.detalheItem}>
            <MaterialIcons
              name={abastecimento.tipo === 'posto' ? 'local-gas-station' : 'inventory'}
              size={16}
              color={theme.textSecondaryColor}
            />
            <Text style={[styles.abastecimentoLabel, { color: theme.textSecondaryColor }]}>
              Tipo:
            </Text>
            <Text style={[styles.abastecimentoValor, { color: theme.primaryColor }]}>
              {abastecimento.tipo === 'posto' ? 'Posto Direto' : 'Galão para Draga'}
            </Text>
          </View>
        </View>
        <View style={styles.responsavelContainer}>
          <MaterialIcons
            name="person"
            size={16}
            color={theme.textSecondaryColor}
          />
          <Text style={[styles.abastecimentoResponsavel, { color: theme.textSecondaryColor }]}>
            {abastecimento.responsavel}
          </Text>
        </View>
      </View>
      <MaterialIcons
        name="chevron-right"
        size={24}
        color={theme.textSecondaryColor}
      />
    </TouchableOpacity>
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
    <DefaultPage title="Abastecimentos">
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => navigation.navigate('FilterFuel', { filtros })}
            >
              <MaterialIcons
                name="filter-list"
                size={20}
                color={theme.primaryColor}
              />
              <Text style={[styles.filterButtonText, { color: theme.primaryColor }]}>
                Filtros
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.abastecimentosScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color={theme.primaryColor} />
            ) : (
              data.ultimosAbastecimentos.map(renderAbastecimento)
            )}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[styles.fab, { backgroundColor: theme.primaryColor }]}
          onPress={() => navigation.navigate('NewFuel')}
        >
          <MaterialIcons
            name="add"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </DefaultPage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  section: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  filterButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  abastecimentosScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  abastecimentoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  abastecimentoInfo: {
    flex: 1,
  },
  abastecimentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  maquinaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  maquinaIcon: {
    marginRight: 8,
  },
  abastecimentoMaquina: {
    fontSize: 16,
    fontWeight: '600',
  },
  abastecimentoData: {
    fontSize: 14,
  },
  abastecimentoDetalhes: {
    gap: 8,
    marginBottom: 12,
  },
  detalheItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  abastecimentoLabel: {
    fontSize: 14,
  },
  abastecimentoValor: {
    fontSize: 14,
    fontWeight: '500',
  },
  responsavelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  abastecimentoResponsavel: {
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}); 