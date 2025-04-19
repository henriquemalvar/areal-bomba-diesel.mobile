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
import Container from '../../components/common/Container';
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
    <Container>
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
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.maquinaText, { color: theme.textColor }]}>
              {abastecimento.maquina}
            </Text>
            <Text style={[styles.quantidadeText, { color: theme.primaryColor }]}>
              {abastecimento.quantidade}L
            </Text>
          </View>

          <View style={styles.infoGroup}>
            <View style={styles.infoRow}>
              <MaterialIcons name="event" size={20} color={theme.textSecondaryColor} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.textSecondaryColor }]}>
                  Data e Hora
                </Text>
                <Text style={[styles.infoValue, { color: theme.textColor }]}>
                  {abastecimento.data.toLocaleDateString('pt-BR')} {abastecimento.data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="person" size={20} color={theme.textSecondaryColor} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.textSecondaryColor }]}>
                  Responsável
                </Text>
                <Text style={[styles.infoValue, { color: theme.textColor }]}>
                  {abastecimento.responsavel}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="local-gas-station" size={20} color={theme.textSecondaryColor} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.textSecondaryColor }]}>
                  Tipo de Abastecimento
                </Text>
                <Text style={[styles.infoValue, { color: theme.textColor }]}>
                  {getTipoAbastecimentoLabel(abastecimento.tipo)}
                </Text>
              </View>
            </View>

            {abastecimento.observacoes && (
              <View style={styles.infoRow}>
                <MaterialIcons name="note" size={20} color={theme.textSecondaryColor} />
                <View style={styles.infoContent}>
                  <Text style={[styles.infoLabel, { color: theme.textSecondaryColor }]}>
                    Observações
                  </Text>
                  <Text style={[styles.infoValue, { color: theme.textColor }]}>
                    {abastecimento.observacoes}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
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
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  maquinaText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  quantidadeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoGroup: {
    gap: 24,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
  },
});
