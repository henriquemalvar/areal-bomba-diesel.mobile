import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthRoutes from './src/routes/AuthRoutes';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
