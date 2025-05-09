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
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Page from '../components/common/Page';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { mockData } from './mockData';

const HOME_CARDS = [
  {
    icon: 'local-gas-station',
    title: 'Registrar Abastecimento',
    description: 'Adicione um novo registro de abastecimento',
    screen: 'RegistrarAbastecimento',
  },
  {
    icon: 'history',
    title: 'Histórico',
    description: 'Visualize o histórico de abastecimentos',
    screen: 'Historico',
  },
  {
    icon: 'bar-chart',
    title: 'Relatórios',
    description: 'Visualize gráficos e estatísticas de consumo',
    screen: 'Relatorios',
  },
  {
    icon: 'build',
    title: 'Gerenciar Máquinas',
    description: 'Adicione, edite ou remova máquinas',
    screen: 'Machines',
  },
  {
    icon: 'person',
    title: 'Perfil',
    description: 'Acesse seu perfil e configurações',
    screen: 'Profile',
    params: { screen: 'ProfileScreen' },
  },
];

const HomeCard = ({ icon, title, description, screen, params }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handlePress = () => navigation.navigate(screen, params);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.card, { backgroundColor: theme.cardBackground }]}
    >
      <View style={styles.cardContent}>
        <MaterialIcons
          name={icon}
          size={40}
          color={theme.primaryColor}
          style={styles.cardIcon}
        />
        <Text style={[styles.cardTitle, { color: theme.textColor }]}>
          {title}
        </Text>
        <Text style={[styles.cardDescription, { color: theme.textSecondaryColor }]}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

HomeCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired,
  params: PropTypes.object,
};

export default function HomePage() {
  const { user } = useAuth();
  const [data] = useState(mockData);
  const hoje = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });
  const nomeUsuario = user?.user_metadata?.nome || user?.email?.split('@')[0] || 'Usuário';

  return (
    <Page title={`Olá, ${nomeUsuario}!`} subtitle={hoje}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {HOME_CARDS.map((card, index) => (
            <HomeCard
              key={index}
              {...card}
            />
          ))}
        </View>
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  grid: {
    gap: 12,
  },
  card: {
    width: '100%',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 12,
  },
  cardContent: {
    padding: 16,
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
}); 