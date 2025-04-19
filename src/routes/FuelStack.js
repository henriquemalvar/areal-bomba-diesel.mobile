import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FuelDetailsPage from '../pages/fuel/FuelDetailsPage';
import FuelPage from '../pages/fuel/FuelPage';
import NewFuelPage from '../pages/fuel/NewFuelPage';

const Stack = createStackNavigator();

export default function FuelStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Fuel" component={FuelPage} />
      <Stack.Screen name="NewFuel" component={NewFuelPage} />
      <Stack.Screen name="FuelDetails" component={FuelDetailsPage} />
    </Stack.Navigator>
  );
}
