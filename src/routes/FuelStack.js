import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FuelPage from '../pages/fuel/FuelPage';

const Stack = createStackNavigator();

export default function FuelStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FuelScreen" component={FuelPage} />
    </Stack.Navigator>
  );
}
