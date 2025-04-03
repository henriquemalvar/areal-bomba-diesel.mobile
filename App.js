import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FeedbackProvider } from './src/components/FeedbackProvider';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import Routes from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <FeedbackProvider>
            <Routes />
          </FeedbackProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
