import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MaintenanceDetailsPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalhes da Manutenção</Text>
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
