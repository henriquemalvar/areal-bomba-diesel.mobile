import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FuelListPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lista de Abastecimentos</Text>
      <View style={{ margin: 10 }}>
        <Button
          title="Register Fuel"
          onPress={() => navigation.navigate('FuelRegister')}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Button
          title="Fuel Details"
          onPress={() => navigation.navigate('FuelDetails')}
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
  },
});
