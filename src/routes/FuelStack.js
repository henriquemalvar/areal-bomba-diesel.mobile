import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FuelDetailsPage from '../pages/fuel/FuelDetailsPage';
import FuelListPage from '../pages/fuel/FuelListPage';
import FuelRegisterPage from '../pages/fuel/FuelRegisterPage';

const Stack = createStackNavigator();

const FuelStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FuelList" component={FuelListPage} options={{ headerShown: false }} />
      <Stack.Screen name="FuelRegister" component={FuelRegisterPage} />
      <Stack.Screen name="FuelDetails" component={FuelDetailsPage} />
    </Stack.Navigator>
  );
};

export default FuelStack;
