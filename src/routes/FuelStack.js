import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FilterFuelPage from '../pages/fuel/FilterFuelPage';
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
      <Stack.Screen name="FilterFuel" component={FilterFuelPage} />
    </Stack.Navigator>
  );
}
