import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MaintenancePage from '../pages/maintenance/MaintenancePage';

const Stack = createStackNavigator();

export default function MaintenanceStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MaintenanceScreen" component={MaintenancePage} />
    </Stack.Navigator>
  );
}
