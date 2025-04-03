import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function SettingsPage() {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const { theme } = useTheme();

  const menuItems = [
    {
      icon: 'person',
      title: 'Perfil',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      icon: 'edit',
      title: 'Editar Perfil',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      icon: 'lock',
      title: 'Alterar Senha',
      onPress: () => navigation.navigate('ChangePassword'),
    },
    {
      icon: 'description',
      title: 'Termos de Uso',
      onPress: () => navigation.navigate('Terms'),
    },
    {
      icon: 'security',
      title: 'Política de Privacidade',
      onPress: () => navigation.navigate('Privacy'),
    },
    {
      icon: 'logout',
      title: 'Sair',
      onPress: signOut,
      color: '#d32f2f',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textColor }]}>Configurações</Text>
      </View>

      <View style={styles.content}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { borderBottomColor: theme.borderColor }]}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              <MaterialIcons
                name={item.icon}
                size={24}
                color={item.color || theme.primaryColor}
              />
              <Text style={[styles.menuItemText, { color: item.color || theme.textColor }]}>
                {item.title}
              </Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={item.color || theme.textColor}
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
  },
});
