import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MaintenanceDetailsPage from '../pages/maintenance/MaintenanceDetailsPage';
import MaintenanceListPage from '../pages/maintenance/MaintenanceListPage';
import MaintenanceRegisterPage from '../pages/maintenance/MaintenanceRegisterPage';

const Stack = createStackNavigator();

const MaintenanceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MaintenanceList" component={MaintenanceListPage} options={{ headerShown: false }} />
      <Stack.Screen name="MaintenanceRegister" component={MaintenanceRegisterPage} />
      <Stack.Screen name="MaintenanceDetails" component={MaintenanceDetailsPage} />
    </Stack.Navigator>
  );
};

export default MaintenanceStack;
