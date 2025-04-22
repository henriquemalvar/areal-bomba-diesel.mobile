import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Card from '../../components/common/Card';
import DefaultPage from '../../components/common/DefaultPage';
import MenuItem from '../../components/common/MenuItem';
import { UserInfoCard } from '../../components/UserInfoCard';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../styles/theme';

export default function ProfilePage() {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  const menuItems = [
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
      color: colors.error,
    },
  ];

  return (
    <DefaultPage title="Configurações">
      <UserInfoCard user={user} />
      <Card>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            title={item.title}
            onPress={item.onPress}
            color={item.color}
            style={[
              styles.menuItem,
              index < menuItems.length - 1 && styles.menuItemBorder
            ]}
          />
        ))}
      </Card>
    </DefaultPage>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: 15,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});
