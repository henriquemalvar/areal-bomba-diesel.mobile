import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from '../../components/common/Card';
import Container from '../../components/common/Container';
import { useTheme } from '../../contexts/ThemeContext';

export default function MaintenanceDetailsPage({ route }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { manutencao } = route.params;

  const getStatusColor = (status) => {
    switch (status) {
      case 'concluida':
        return '#4CAF50';
      case 'pendente':
        return '#FFC107';
      case 'cancelada':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'concluida':
        return 'Concluída';
      case 'pendente':
        return 'Pendente';
      case 'cancelada':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const getTipoLabel = (tipo) => {
    switch (tipo) {
      case 'preventiva':
        return 'Preventiva';
      case 'corretiva':
        return 'Corretiva';
      default:
        return tipo;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={theme.textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>Detalhes da Manutenção</Text>
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.maquinaContainer}>
              <MaterialIcons
                name={manutencao.tipo === 'preventiva' ? 'build' : 'warning'}
                size={24}
                color={theme.primaryColor}
              />
              <Text style={[styles.maquina, { color: theme.textColor }]}>{manutencao.maquina}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(manutencao.status) }]}>
              <Text style={styles.statusText}>{getStatusLabel(manutencao.status)}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <MaterialIcons name="build" size={16} color={theme.textSecondaryColor} />
                <Text style={[styles.infoLabel, { color: theme.textSecondaryColor }]}>Tipo</Text>
              </View>
              <Text style={[styles.infoValue, { color: theme.textColor }]}>
                {getTipoLabel(manutencao.tipo)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <MaterialIcons name="event" size={16} color={theme.textSecondaryColor} />
                <Text style={[styles.infoLabel, { color: theme.textSecondaryColor }]}>Data</Text>
              </View>
              <Text style={[styles.infoValue, { color: theme.textColor }]}>
                {formatDate(manutencao.data)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <MaterialIcons name="person" size={16} color={theme.textSecondaryColor} />
                <Text style={[styles.infoLabel, { color: theme.textSecondaryColor }]}>Responsável</Text>
              </View>
              <Text style={[styles.infoValue, { color: theme.textColor }]}>
                {manutencao.responsavel}
              </Text>
            </View>

            {manutencao.proximaRevisao && (
              <View style={styles.infoRow}>
                <View style={styles.infoLabelContainer}>
                  <MaterialIcons name="schedule" size={16} color={theme.textSecondaryColor} />
                  <Text style={[styles.infoLabel, { color: theme.textSecondaryColor }]}>Próxima Revisão</Text>
                </View>
                <Text style={[styles.infoValue, { color: theme.textColor }]}>
                  {formatDate(manutencao.proximaRevisao)}
                </Text>
              </View>
            )}

            {manutencao.custo && (
              <View style={styles.infoRow}>
                <View style={styles.infoLabelContainer}>
                  <MaterialIcons name="attach-money" size={16} color={theme.textSecondaryColor} />
                  <Text style={[styles.infoLabel, { color: theme.textSecondaryColor }]}>Custo</Text>
                </View>
                <Text style={[styles.infoValue, { color: theme.textColor }]}>
                  {formatCurrency(manutencao.custo)}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.descriptionSection}>
            <View style={styles.descriptionHeader}>
              <MaterialIcons name="description" size={16} color={theme.textSecondaryColor} />
              <Text style={[styles.descriptionLabel, { color: theme.textSecondaryColor }]}>
                Descrição
              </Text>
            </View>
            <Text style={[styles.descriptionText, { color: theme.textColor }]}>
              {manutencao.descricao}
            </Text>
          </View>
        </Card>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  maquinaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  maquina: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  descriptionSection: {
    marginTop: 20,
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  descriptionLabel: {
    fontSize: 14,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
