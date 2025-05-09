import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

const COLORS = {
  primary: '#0a2c63',
  error: '#F44336',
  background: '#fff',
  cardBackground: '#fff',
  inputBackground: '#f7f9fb',
  text: '#222',
  textSecondary: '#757575',
  border: '#ddd',
  avatar: '#0a2c63',
};

const menuOptions = [
  {
    label: 'Início',
    icon: <MaterialIcons name="home" size={20} color={COLORS.text} style={{ marginRight: 16 }} />,
    route: 'Inicio',
  },
  {
    label: 'Registrar Abastecimento',
    icon: <MaterialIcons name="local-gas-station" size={20} color={COLORS.text} style={{ marginRight: 16 }} />,
    route: 'RegistrarAbastecimento',
  },
  {
    label: 'Histórico',
    icon: <MaterialIcons name="history" size={20} color={COLORS.text} style={{ marginRight: 16 }} />,
    route: 'Historico',
  },
  {
    label: 'Relatórios',
    icon: <MaterialIcons name="bar-chart" size={20} color={COLORS.text} style={{ marginRight: 16 }} />,
    route: 'Relatorios',
  },
  {
    label: 'Gerenciar Máquinas',
    icon: <MaterialIcons name="build" size={20} color={COLORS.text} style={{ marginRight: 16 }} />,
    route: 'Machines',
  },
  {
    label: 'Perfil',
    icon: <MaterialIcons name="person" size={20} color={COLORS.text} style={{ marginRight: 16 }} />,
    route: 'Profile',
  },
];

function getUserInitials(nameOrEmail) {
  if (!nameOrEmail) return '';
  const parts = nameOrEmail.split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function CustomDrawer(props) {
  const navigation = useNavigation();
  const currentRoute = props.state.routeNames[props.state.index];
  const { user, signOut } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.menuTitle}>Menu</Text>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <MaterialIcons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <TouchableOpacity style={styles.userInfoCard} onPress={() => navigation.navigate('Profile', { screen: 'ProfileScreen' })} activeOpacity={0.8}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getUserInitials(user?.user_metadata?.nome || user?.email)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{user?.user_metadata?.nome || user?.email?.split('@')[0]}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
      </TouchableOpacity>

      {/* Menu Items */}
      <View style={{ flex: 1, paddingTop: 8 }}>
        {menuOptions.map((item, idx) => {
          const isActive = currentRoute === item.route;
          return (
            <TouchableOpacity
              key={item.route}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
              onPress={() => {
                if (!isActive) {
                  navigation.navigate(item.route);
                }
                props.navigation.dispatch(DrawerActions.closeDrawer());
              }}
            >
              {React.cloneElement(item.icon, { color: isActive ? COLORS.primary : COLORS.text })}
              <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Sair */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <MaterialIcons name="logout" size={20} color={COLORS.background} style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    justifyContent: 'space-between',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  userInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.avatar,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    color: COLORS.background,
    fontWeight: 'bold',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.text,
  },
  userEmail: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: COLORS.inputBackground,
  },
  menuLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  menuLabelActive: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.error,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  logoutText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 