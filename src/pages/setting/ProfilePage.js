import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from '../../components/common/Avatar';
import Card from '../../components/common/Card';
import Container from '../../components/common/Container';
import MenuItem from '../../components/common/MenuItem';
import { useAuth } from '../../contexts/AuthContext';
import { colors, typography } from '../../styles/theme';

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
    <Container>
      <View style={styles.profileSection}>
        <Avatar />
        <Text style={[typography.h1, styles.userName]}>{user?.nome}</Text>
        <Text style={[typography.body2, styles.userEmail]}>{user?.email}</Text>
      </View>

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
    </Container>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  userName: {
    marginBottom: 10,
    textAlign: 'center',
  },
  userEmail: {
    textAlign: 'center',
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});
