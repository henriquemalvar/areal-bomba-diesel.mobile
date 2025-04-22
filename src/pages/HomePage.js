import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DefaultPage from '../components/common/DefaultPage';
import { useTheme } from '../contexts/ThemeContext';
import { mockData } from './mockData';

export default function HomePage() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [data] = useState(mockData);

  const hoje = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });

  const renderAlerta = (alerta) => (
    <View key={alerta.id} style={[styles.alertaContainer, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.alertaInfo}>
        <View style={styles.alertaHeader}>
          <MaterialIcons
            name={alerta.tipo === 'combustivel' ? 'local-gas-station' : 'warning'}
            size={24}
            color={alerta.tipo === 'combustivel' ? '#f44336' : '#ff9800'}
          />
          <Text style={[styles.alertaMensagem, { color: theme.textColor }]}>
            {alerta.mensagem}
          </Text>
        </View>
        <View style={styles.alertaFooter}>
          <MaterialIcons
            name="build"
            size={16}
            color={theme.textSecondaryColor}
          />
          <Text style={[styles.alertaMaquina, { color: theme.textSecondaryColor }]}>
            {alerta.maquina}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderAbastecimento = (abastecimento) => (
    <View
      key={abastecimento.id}
      style={[styles.abastecimentoContainer, { backgroundColor: theme.cardBackground }]}
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
            {format(abastecimento.data, 'HH:mm')}
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
        </View>
      </View>
    </View>
  );

  const renderManutencao = (manutencao) => (
    <View key={manutencao.id} style={[styles.manutencaoContainer, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.manutencaoInfo}>
        <View style={styles.manutencaoHeader}>
          <View style={styles.maquinaContainer}>
            <MaterialIcons
              name="build"
              size={20}
              color={theme.primaryColor}
              style={styles.maquinaIcon}
            />
            <Text style={[styles.manutencaoMaquina, { color: theme.textColor }]}>
              {manutencao.maquina}
            </Text>
          </View>
          <Text style={[styles.manutencaoData, { color: theme.textSecondaryColor }]}>
            {format(manutencao.data, "dd 'de' MMMM", { locale: ptBR })}
          </Text>
        </View>
        <View style={styles.manutencaoDetalhes}>
          <View style={styles.detalheItem}>
            <MaterialIcons
              name="build"
              size={16}
              color={theme.textSecondaryColor}
            />
            <Text style={[styles.manutencaoLabel, { color: theme.textSecondaryColor }]}>
              Tipo:
            </Text>
            <Text style={[styles.manutencaoValor, { color: theme.primaryColor }]}>
              {manutencao.tipo}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderResumoItem = (icon, label, value) => (
    <View style={[styles.resumoItem, { backgroundColor: theme.cardBackground }]}>
      <MaterialIcons
        name={icon}
        size={24}
        color={theme.primaryColor}
        style={styles.resumoIcon}
      />
      <Text style={[styles.resumoLabel, { color: theme.textSecondaryColor }]}>
        {label}
      </Text>
      <Text style={[styles.resumoValor, { color: theme.primaryColor }]}>
        {value}
      </Text>
    </View>
  );

  return (
    <DefaultPage title={`Olá, ${data.usuario.nome}!`} subtitle={hoje}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Resumo do Dia
          </Text>
          <View style={styles.resumoContainer}>
            {renderResumoItem('local-gas-station', 'Abastecimentos', data.resumoDia.totalAbastecimentos)}
            {renderResumoItem('water-drop', 'Litros Totais', `${data.resumoDia.litrosTotais}L`)}
            {renderResumoItem('build', 'Máquina Mais Ativa', data.resumoDia.maquinaMaisAtiva)}
          </View>
        </View>

        {data.alertas.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
              Alertas Ativos
            </Text>
            {data.alertas.map(renderAlerta)}
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
              Últimos Abastecimentos
            </Text>
            <View onPress={() => navigation.navigate('Fuel')}>
              <Text style={[styles.verTodos, { color: theme.primaryColor }]}>
                Ver todos
              </Text>
            </View>
          </View>
          {data.ultimosAbastecimentos.map(renderAbastecimento)}
        </View>

        {data.manutencoesPrevistas.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                Manutenções Previstas
              </Text>
              <View onPress={() => navigation.navigate('Maintenance')}>
                <Text style={[styles.verTodos, { color: theme.primaryColor }]}>
                  Ver todos
                </Text>
              </View>
            </View>
            {data.manutencoesPrevistas.map(renderManutencao)}
          </View>
        )}
      </ScrollView>
    </DefaultPage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
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
  verTodos: {
    fontSize: 14,
    fontWeight: '500',
  },
  resumoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  resumoItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  resumoIcon: {
    marginBottom: 8,
  },
  resumoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  resumoValor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertaContainer: {
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
  alertaInfo: {
    flex: 1,
  },
  alertaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertaFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertaMensagem: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  alertaMaquina: {
    fontSize: 12,
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
  abastecimentoDetalhes: {
    gap: 8,
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
  abastecimentoData: {
    fontSize: 14,
  },
  manutencaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  manutencaoMaquina: {
    fontSize: 16,
    fontWeight: '600',
  },
  manutencaoDetalhes: {
    gap: 8,
  },
  manutencaoLabel: {
    fontSize: 14,
  },
  manutencaoValor: {
    fontSize: 14,
    fontWeight: '500',
  },
  manutencaoData: {
    fontSize: 14,
  },
}); 