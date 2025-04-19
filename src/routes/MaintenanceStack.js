import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MaintenanceDetailsPage from '../pages/maintenance/MaintenanceDetailsPage';
import MaintenancePage from '../pages/maintenance/MaintenancePage';
import NewMaintenancePage from '../pages/maintenance/NewMaintenancePage';

const Stack = createStackNavigator();

export default function MaintenanceStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Maintenance" component={MaintenancePage} />
      <Stack.Screen name="NewMaintenance" component={NewMaintenancePage} />
      <Stack.Screen name="MaintenanceDetails" component={MaintenanceDetailsPage} />
    </Stack.Navigator>
  );
}
