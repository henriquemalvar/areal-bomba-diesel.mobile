import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function EditProfilePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Editar Perfil</Text>
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
  },
});
