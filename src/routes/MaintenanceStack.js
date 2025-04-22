import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MaintenancePage from '../pages/maintenance/MaintenancePage';
import NewMaintenancePage from '../pages/maintenance/NewMaintenancePage';
import FilterMaintenancePage from '../pages/maintenance/FilterMaintenancePage';

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
      <Stack.Screen name="FilterMaintenance" component={FilterMaintenancePage} />
    </Stack.Navigator>
  );
}
