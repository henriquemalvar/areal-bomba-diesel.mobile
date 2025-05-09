import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

const menuOptions = [
  {
    label: 'Início',
    icon: <MaterialIcons name="home" size={20} color="#222" style={{ marginRight: 16 }} />,
    route: 'Inicio',
  },
  {
    label: 'Registrar Abastecimento',
    icon: <Feather name="plus-circle" size={20} color="#222" style={{ marginRight: 16 }} />,
    route: 'RegistrarAbastecimento',
  },
  {
    label: 'Histórico',
    icon: <Feather name="clock" size={20} color="#222" style={{ marginRight: 16 }} />,
    route: 'Historico',
  },
  {
    label: 'Relatórios',
    icon: <MaterialCommunityIcons name="chart-bar" size={20} color="#222" style={{ marginRight: 16 }} />,
    route: 'Relatorios',
  },
  {
    label: 'Gerenciar Máquinas',
    icon: <Feather name="settings" size={20} color="#222" style={{ marginRight: 16 }} />,
    route: 'GerenciarMaquinas',
  },
  {
    label: 'Perfil',
    icon: <MaterialIcons name="person" size={20} color="#222" style={{ marginRight: 16 }} />,
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
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.menuTitle}>Menu</Text>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <MaterialIcons name="close" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getUserInitials(user?.name || user?.email)}</Text>
        </View>
        <View>
          <Text style={styles.userName}>{user?.name || user?.email?.split('@')[0]}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
        <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>
      </View>

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
              {React.cloneElement(item.icon, { color: isActive ? '#222' : '#222' })}
              <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Sair */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <MaterialCommunityIcons name="logout" size={20} color="#fff" style={{ marginRight: 8 }} />
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
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    color: '#bbb',
    fontWeight: 'bold',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userEmail: {
    color: '#888',
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
    backgroundColor: '#FFD600',
  },
  menuLabel: {
    fontSize: 16,
    color: '#222',
  },
  menuLabelActive: {
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 