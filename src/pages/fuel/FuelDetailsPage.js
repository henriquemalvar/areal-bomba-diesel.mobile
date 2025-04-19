import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export default function FuelDetailsPage() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { params } = useRoute();
  const { abastecimento } = params;

  const getTipoAbastecimentoLabel = (tipo) => {
    switch (tipo) {
      case 'posto':
        return 'Posto Direto';
      case 'galao':
        return 'Galão para Draga';
      default:
        return tipo;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={theme.textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>
          Detalhes do Abastecimento
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.card, { backgroundColor: theme.cardBackgroundColor }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.maquinaText, { color: theme.textColor }]}>
              {abastecimento.maquina}
            </Text>
            <Text style={[styles.quantidadeText, { color: theme.primaryColor }]}>
              {abastecimento.quantidade}L
            </Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={[styles.infoLabel, { color: theme.textColor }]}>
              Data e Hora
            </Text>
            <View style={styles.infoRow}>
              <MaterialIcons name="event" size={20} color={theme.textColor} />
              <Text style={[styles.infoValue, { color: theme.textColor }]}>
                {abastecimento.data.toLocaleDateString('pt-BR')} {abastecimento.data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </View>

          <View style={styles.infoGroup}>
            <Text style={[styles.infoLabel, { color: theme.textColor }]}>
              Responsável
            </Text>
            <View style={styles.infoRow}>
              <MaterialIcons name="person" size={20} color={theme.textColor} />
              <Text style={[styles.infoValue, { color: theme.textColor }]}>
                {abastecimento.responsavel}
              </Text>
            </View>
          </View>

          <View style={styles.infoGroup}>
            <Text style={[styles.infoLabel, { color: theme.textColor }]}>
              Tipo de Abastecimento
            </Text>
            <View style={styles.infoRow}>
              <MaterialIcons name="local-gas-station" size={20} color={theme.textColor} />
              <Text style={[styles.infoValue, { color: theme.textColor }]}>
                {getTipoAbastecimentoLabel(abastecimento.tipo)}
              </Text>
            </View>
          </View>

          {abastecimento.observacoes && (
            <View style={styles.infoGroup}>
              <Text style={[styles.infoLabel, { color: theme.textColor }]}>
                Observações
              </Text>
              <View style={styles.infoRow}>
                <MaterialIcons name="note" size={20} color={theme.textColor} />
                <Text style={[styles.infoValue, { color: theme.textColor }]}>
                  {abastecimento.observacoes}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
    padding: 16,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  maquinaText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantidadeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoGroup: {
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.7,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoValue: {
    fontSize: 16,
  },
});
