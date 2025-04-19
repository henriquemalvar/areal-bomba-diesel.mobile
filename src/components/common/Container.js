import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gradients } from '../../styles/theme';

export default function Container({ children, style, gradient = 'primary' }) {
  return (
    <SafeAreaView style={[styles.container, style]} edges={['right', 'bottom', 'left']}>
      <LinearGradient
        colors={gradients[gradient]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {children}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
}); 