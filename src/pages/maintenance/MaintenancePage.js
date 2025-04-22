import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DefaultPage from '../../components/common/DefaultPage';

const mockData = {
  ultimasManutencoes: [
    {
      id: '1',
      maquina: 'Draga 01',
      tipo: 'preventiva',
      data: new Date('2024-03-20T10:00:00'),
      status: 'concluida',
      responsavel: 'João Silva',
    },
    {
      id: '2',
      maquina: 'Draga 02',
      tipo: 'corretiva',
      data: new Date('2024-03-19T15:30:00'),
      status: 'pendente',
      responsavel: 'Maria Santos',
    },
    {
      id: '3',
      maquina: 'Draga 03',
      tipo: 'preventiva',
      data: new Date('2024-03-18T09:15:00'),
      status: 'concluida',
      responsavel: 'Pedro Oliveira',
    },
    {
      id: '4',
      maquina: 'Draga 01',
      tipo: 'corretiva',
      data: new Date('2024-03-17T14:20:00'),
      status: 'pendente',
      responsavel: 'João Silva',
    },
  ],
};

export default function MaintenancePage() {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState(mockData);
  const [filtros, setFiltros] = useState({
    periodo: 'todos',
    maquina: 'todas',
    tipo: 'todos',
    status: 'todos',
  });

  useEffect(() => {
    if (route.params?.filtros) {
      setFiltros(route.params.filtros);
      filtrarManutencoes(route.params.filtros);
    }
  }, [route.params]);

  const filtrarManutencoes = (filtros) => {
    let manutencoesFiltradas = [...mockData.ultimasManutencoes];

    // Filtro por máquina
    if (filtros.maquina !== 'todas') {
      manutencoesFiltradas = manutencoesFiltradas.filter(
        (m) => m.maquina.toLowerCase() === filtros.maquina.toLowerCase()
      );
    }

    // Filtro por tipo
    if (filtros.tipo !== 'todos') {
      manutencoesFiltradas = manutencoesFiltradas.filter(
        (m) => m.tipo === filtros.tipo
      );
    }

    // Filtro por status
    if (filtros.status !== 'todos') {
      manutencoesFiltradas = manutencoesFiltradas.filter(
        (m) => m.status === filtros.status
      );
    }

    // Filtro por período
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    switch (filtros.periodo) {
      case 'hoje':
        manutencoesFiltradas = manutencoesFiltradas.filter(
          (m) => m.data.toDateString() === hoje.toDateString()
        );
        break;
      case 'semana':
        const inicioSemana = new Date(hoje);
        inicioSemana.setDate(hoje.getDate() - hoje.getDay());
        manutencoesFiltradas = manutencoesFiltradas.filter(
          (m) => m.data >= inicioSemana && m.data <= hoje
        );
        break;
      case 'mes':
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        manutencoesFiltradas = manutencoesFiltradas.filter(
          (m) => m.data >= inicioMes && m.data <= hoje
        );
        break;
      case 'personalizado':
        if (filtros.dataInicio && filtros.dataFim) {
          const inicio = new Date(filtros.dataInicio);
          const fim = new Date(filtros.dataFim);
          manutencoesFiltradas = manutencoesFiltradas.filter(
            (m) => m.data >= inicio && m.data <= fim
          );
        }
        break;
    }

    setData({
      ...data,
      ultimasManutencoes: manutencoesFiltradas
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'concluida':
        return '#4caf50';
      case 'pendente':
        return '#ff9800';
      case 'cancelada':
        return '#f44336';
      default:
        return '#666';
    }
  };

  const handleViewDetails = (manutencao) => {
    const manutencaoSerializado = {
      ...manutencao,
      data: manutencao.data.toISOString(),
      dataFormatada: manutencao.data.toLocaleDateString('pt-BR'),
      horaFormatada: manutencao.data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    navigation.navigate('NewMaintenance', {
      manutencao: manutencaoSerializado,
      mode: 'view'
    });
  };

  const handleFilterPress = () => {
    navigation.navigate('FilterMaintenance', { filtros });
  };

  const renderManutencao = (manutencao) => (
    <TouchableOpacity
      key={manutencao.id}
      style={[styles.manutencaoContainer, { backgroundColor: '#fff' }]}
      onPress={() => handleViewDetails(manutencao)}
      activeOpacity={0.7}
    >
      <View style={styles.manutencaoInfo}>
        <View style={styles.manutencaoHeader}>
          <View style={styles.maquinaContainer}>
            <MaterialIcons
              name="build"
              size={20}
              color="#1a237e"
              style={styles.maquinaIcon}
            />
            <Text style={[styles.manutencaoMaquina, { color: '#000' }]}>
              {manutencao.maquina}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(manutencao.status) }]}>
            <Text style={styles.statusText}>
              {manutencao.status === 'concluida' ? 'Concluída' : 'Pendente'}
            </Text>
          </View>
        </View>
        <View style={styles.manutencaoDetalhes}>
          <View style={styles.detalheItem}>
            <MaterialIcons
              name={manutencao.tipo === 'preventiva' ? 'build' : 'warning'}
              size={16}
              color="#666"
            />
            <Text style={[styles.manutencaoLabel, { color: '#666' }]}>
              Tipo:
            </Text>
            <Text style={[styles.manutencaoValor, { color: '#1a237e' }]}>
              {manutencao.tipo === 'preventiva' ? 'Preventiva' : 'Corretiva'}
            </Text>
          </View>
          <View style={styles.detalheItem}>
            <MaterialIcons
              name="event"
              size={16}
              color="#666"
            />
            <Text style={[styles.manutencaoLabel, { color: '#666' }]}>
              Data:
            </Text>
            <Text style={[styles.manutencaoValor, { color: '#1a237e' }]}>
              {manutencao.data.toLocaleDateString('pt-BR')}
            </Text>
          </View>
        </View>
        <View style={styles.responsavelContainer}>
          <MaterialIcons
            name="person"
            size={16}
            color="#666"
          />
          <Text style={[styles.manutencaoResponsavel, { color: '#666' }]}>
            {manutencao.responsavel}
          </Text>
        </View>
      </View>
      <MaterialIcons
        name="chevron-right"
        size={24}
        color="#666"
      />
    </TouchableOpacity>
  );

  return (
    <DefaultPage title="Manutenções">
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={handleFilterPress}
            >
              <MaterialIcons
                name="filter-list"
                size={20}
                color="#1a237e"
              />
              <Text style={[styles.filterButtonText, { color: '#1a237e' }]}>
                Filtros
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.manutencoesScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {data.ultimasManutencoes.map(renderManutencao)}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[styles.fab, { backgroundColor: '#1a237e' }]}
          onPress={() => navigation.navigate('NewMaintenance')}
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
  manutencoesScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  manutencaoContainer: {
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
  manutencaoInfo: {
    flex: 1,
  },
  manutencaoHeader: {
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
  manutencaoMaquina: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  manutencaoDetalhes: {
    gap: 8,
    marginBottom: 12,
  },
  detalheItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  manutencaoLabel: {
    fontSize: 14,
  },
  manutencaoValor: {
    fontSize: 14,
    fontWeight: '500',
  },
  responsavelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  manutencaoResponsavel: {
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