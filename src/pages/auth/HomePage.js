import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Página Inicial</Text>
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
