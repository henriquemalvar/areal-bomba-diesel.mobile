import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ProfilePage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Perfil</Text>
      <View style={{ margin: 10 }}>
        <Button
          title="Editar Perfil"
          onPress={() => navigation.navigate('EditProfile')}
        />
      </View>
      <Button style={{
        margin: 10,
      }}
        title="Configurações"
        onPress={() => navigation.navigate('SettingsScreen')}
      />
      <View style={{ margin: 10 }}>
        <Button
          title="Sair"
          onPress={() => navigation.navigate('Logout')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  }
});
