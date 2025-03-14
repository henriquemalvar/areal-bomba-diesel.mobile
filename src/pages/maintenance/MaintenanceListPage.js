import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MaintenanceListPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lista de Manutenções</Text>
      <View style={{ margin: 10 }}>
        <Button
          title="Register Maintenance"
          onPress={() => navigation.navigate('MaintenanceRegister')}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Button
          title="Maintenance Details"
          onPress={() => navigation.navigate('MaintenanceDetails')}
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
  },
});
