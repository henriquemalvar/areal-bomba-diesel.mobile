import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FeedbackProvider } from './src/components/FeedbackProvider';
import { AuthProvider } from './src/contexts/AuthContext';
import { MachinesProvider } from './src/contexts/MachinesContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import Routes from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <MachinesProvider>
          <FeedbackProvider>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </FeedbackProvider>
        </MachinesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
