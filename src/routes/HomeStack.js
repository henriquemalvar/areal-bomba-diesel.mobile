import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomePage from '../pages/HomePage';
import FuelPage from '../pages/fuel/FuelPage';
import MaintenancePage from '../pages/maintenance/MaintenancePage';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="FuelDetails" component={FuelPage} />
      <Stack.Screen name="Maintenance" component={MaintenancePage} />
    </Stack.Navigator>
  );
}
