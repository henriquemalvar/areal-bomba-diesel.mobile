import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Card from '../components/common/Card';
import Container from '../components/common/Container';
import { useTheme } from '../contexts/ThemeContext';

// Dados mockados para exemplo
const mockData = {
  usuario: {
    nome: 'Henrique',
  },
  resumoDia: {
    totalAbastecimentos: 3,
    litrosTotais: 150,
    maquinaMaisAtiva: 'Draga 01',
  },
  alertas: [
    {
      id: '1',
      tipo: 'combustivel',
      mensagem: 'Combustível abaixo de 10% no tanque',
      maquina: 'Draga 02',
      nivel: 8,
    },
    {
      id: '2',
      tipo: 'abastecimento',
      mensagem: 'Draga 01 precisa ser abastecida',
      maquina: 'Draga 01',
    },
  ],
  ultimosAbastecimentos: [
    {
      id: '1',
      maquina: 'Draga 01',
      quantidade: 50,
      data: new Date(),
    },
    {
      id: '2',
      maquina: 'Draga 02',
      quantidade: 30,
      data: new Date(),
    },
    {
      id: '3',
      maquina: 'Draga 03',
      quantidade: 70,
      data: new Date(),
    },
  ],
  manutencoesPrevistas: [
    {
      id: '1',
      maquina: 'Draga 01',
      tipo: 'Preventiva',
      data: new Date('2024-04-20'),
    },
    {
      id: '2',
      maquina: 'Draga 02',
      tipo: 'Corretiva',
      data: new Date('2024-04-25'),
    },
  ],
  consumoSemanal: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        data: [120, 150, 100, 200, 180, 90, 160],
      },
    ],
  },
};

export default function HomePage() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [data] = useState(mockData);

  const hoje = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });

  const renderAlerta = (alerta) => (
    <Card key={alerta.id} style={styles.alertaCard}>
      <View style={styles.alertaContent}>
        <MaterialIcons
          name={alerta.tipo === 'combustivel' ? 'local-gas-station' : 'warning'}
          size={24}
          color={alerta.tipo === 'combustivel' ? '#f44336' : '#ff9800'}
        />
        <View style={styles.alertaInfo}>
          <Text style={[styles.alertaMensagem, { color: theme.textColor }]}>
            {alerta.mensagem}
          </Text>
          <Text style={[styles.alertaMaquina, { color: theme.textSecondaryColor }]}>
            {alerta.maquina}
          </Text>
        </View>
      </View>
    </Card>
  );

  const renderAbastecimento = (abastecimento) => (
    <Card key={abastecimento.id} style={styles.abastecimentoCard}>
      <TouchableOpacity
        style={styles.abastecimentoContent}
        onPress={() => navigation.navigate('FuelDetails', { abastecimento })}
      >
        <View style={styles.abastecimentoInfo}>
          <Text style={[styles.abastecimentoMaquina, { color: theme.textColor }]}>
            {abastecimento.maquina}
          </Text>
          <Text style={[styles.abastecimentoQuantidade, { color: theme.primaryColor }]}>
            {abastecimento.quantidade}L
          </Text>
        </View>
        <Text style={[styles.abastecimentoData, { color: theme.textSecondaryColor }]}>
          {format(abastecimento.data, 'HH:mm')}
        </Text>
      </TouchableOpacity>
    </Card>
  );

  const renderManutencao = (manutencao) => (
    <Card key={manutencao.id} style={styles.manutencaoCard}>
      <View style={styles.manutencaoContent}>
        <View style={styles.manutencaoInfo}>
          <Text style={[styles.manutencaoMaquina, { color: theme.textColor }]}>
            {manutencao.maquina}
          </Text>
          <Text style={[styles.manutencaoTipo, { color: theme.textSecondaryColor }]}>
            {manutencao.tipo}
          </Text>
        </View>
        <Text style={[styles.manutencaoData, { color: theme.textSecondaryColor }]}>
          {format(manutencao.data, "dd 'de' MMMM", { locale: ptBR })}
        </Text>
      </View>
    </Card>
  );

  return (
    <Container>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.textColor }]}>
            Olá, {data.usuario.nome}!
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondaryColor }]}>
            {hoje}
          </Text>
        </View>

        <View style={styles.sections}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
              Resumo do Dia
            </Text>
            <Card style={styles.resumoCard}>
              <View style={styles.resumoContent}>
                <View style={styles.resumoItem}>
                  <Text style={[styles.resumoLabel, { color: theme.textSecondaryColor }]}>
                    Abastecimentos
                  </Text>
                  <Text style={[styles.resumoValor, { color: theme.primaryColor }]}>
                    {data.resumoDia.totalAbastecimentos}
                  </Text>
                </View>
                <View style={styles.resumoItem}>
                  <Text style={[styles.resumoLabel, { color: theme.textSecondaryColor }]}>
                    Litros Totais
                  </Text>
                  <Text style={[styles.resumoValor, { color: theme.primaryColor }]}>
                    {data.resumoDia.litrosTotais}L
                  </Text>
                </View>
                <View style={styles.resumoItem}>
                  <Text style={[styles.resumoLabel, { color: theme.textSecondaryColor }]}>
                    Máquina Mais Ativa
                  </Text>
                  <Text style={[styles.resumoValor, { color: theme.primaryColor }]}>
                    {data.resumoDia.maquinaMaisAtiva}
                  </Text>
                </View>
              </View>
            </Card>
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
              <TouchableOpacity
                onPress={() => navigation.navigate('Fuel')}
              >
                <Text style={[styles.verTodos, { color: theme.primaryColor }]}>
                  Ver todos
                </Text>
              </TouchableOpacity>
            </View>
            {data.ultimosAbastecimentos.map(renderAbastecimento)}
          </View>

          {data.manutencoesPrevistas.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                  Manutenções Previstas
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Maintenance')}
                >
                  <Text style={[styles.verTodos, { color: theme.primaryColor }]}>
                    Ver todos
                  </Text>
                </TouchableOpacity>
              </View>
              {data.manutencoesPrevistas.map(renderManutencao)}
            </View>
          )}

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
              Consumo Semanal
            </Text>
            <Card style={styles.graficoCard}>
              <LineChart
                data={data.consumoSemanal}
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
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
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
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  sections: {
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
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  verTodos: {
    fontSize: 14,
  },
  resumoCard: {
    marginBottom: 20,
  },
  resumoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  resumoItem: {
    alignItems: 'center',
  },
  resumoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  resumoValor: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertaCard: {
    marginBottom: 12,
  },
  alertaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  alertaInfo: {
    marginLeft: 12,
    flex: 1,
  },
  alertaMensagem: {
    fontSize: 14,
    marginBottom: 4,
  },
  alertaMaquina: {
    fontSize: 12,
  },
  abastecimentoCard: {
    marginBottom: 12,
  },
  abastecimentoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  abastecimentoInfo: {
    flex: 1,
  },
  abastecimentoMaquina: {
    fontSize: 16,
    marginBottom: 4,
  },
  abastecimentoQuantidade: {
    fontSize: 14,
  },
  abastecimentoData: {
    fontSize: 14,
  },
  manutencaoCard: {
    marginBottom: 12,
  },
  manutencaoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  manutencaoInfo: {
    flex: 1,
  },
  manutencaoMaquina: {
    fontSize: 16,
    marginBottom: 4,
  },
  manutencaoTipo: {
    fontSize: 14,
  },
  manutencaoData: {
    fontSize: 14,
  },
  graficoCard: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardContent: {
    padding: 16,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  alertMessage: {
    fontSize: 14,
    lineHeight: 20,
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
}); 