import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomePage from '../pages/auth/HomePage';
import FuelDetailsPage from '../pages/fuel/FuelDetailsPage';
import MaintenanceDetailsPage from '../pages/maintenance/MaintenanceDetailsPage';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="FuelDetails" component={FuelDetailsPage} options={{ headerShown: false }} />
      <Stack.Screen name="MaintenanceDetails" component={MaintenanceDetailsPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
