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
import { useTheme } from '../../contexts/ThemeContext';
import { listarAbastecimentos } from '../../services/abastecimentos';

export default function FuelPage() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [abastecimentos, setAbastecimentos] = useState([]);
  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    maquinarioId: '',
    tipoMaquinario: '',
    nomeMaquinario: '',
    bombaId: '',
    usuarioId: '',
  });

  useEffect(() => {
    if (route.params?.filtros) {
      setFiltros(route.params.filtros);
    }
  }, [route.params]);

  useEffect(() => {
    carregarAbastecimentos();
  }, [filtros]);

  const carregarAbastecimentos = async () => {
    try {
      setIsLoading(true);
      const dados = await listarAbastecimentos(filtros);
      console.log('Dados dos abastecimentos:', JSON.stringify(dados, null, 2));
      setAbastecimentos(dados);
    } catch (error) {
      console.error('Erro ao carregar abastecimentos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os abastecimentos. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (abastecimento) => {
    navigation.navigate('NewFuel', {
      abastecimento,
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
              {abastecimento.maquinario.nome}
            </Text>
          </View>
          <Text style={[styles.abastecimentoData, { color: theme.textSecondaryColor }]}>
            {new Date(abastecimento.data).toLocaleDateString('pt-BR')}
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
              {abastecimento.litros}L
            </Text>
          </View>
          <View style={styles.detalheItem}>
            <MaterialIcons
              name="local-gas-station"
              size={16}
              color={theme.textSecondaryColor}
            />
            <Text style={[styles.abastecimentoLabel, { color: theme.textSecondaryColor }]}>
              Bomba:
            </Text>
            <Text style={[styles.abastecimentoValor, { color: theme.primaryColor }]}>
              {abastecimento.bomba.localizacao}
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
            {abastecimento.usuario.nome}
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
              abastecimentos.map(renderAbastecimento)
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