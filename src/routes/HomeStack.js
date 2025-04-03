import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomePage from '../pages/HomePage';
import FuelDetailsPage from '../pages/fuel/FuelDetailsPage';
import MaintenanceDetailsPage from '../pages/maintenance/MaintenanceDetailsPage';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomePage} />
      <Stack.Screen name="FuelDetails" component={FuelDetailsPage} />
      <Stack.Screen name="MaintenanceDetails" component={MaintenanceDetailsPage} />
    </Stack.Navigator>
  );
}
