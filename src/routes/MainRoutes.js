import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { MaterialIcons } from 'react-native-vector-icons';
import FuelStack from './FuelStack';
import HomeStack from './HomeStack';
import MaintenanceStack from './MaintenanceStack';
import SettingsStack from './SettingsStack';

const Tab = createBottomTabNavigator();

const MainRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'FuelTab') {
            iconName = 'local-gas-station';
          } else if (route.name === 'MaintenanceTab') {
            iconName = 'build';
          } else if (route.name === 'SettingsTab') {
            iconName = 'settings';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="FuelTab" component={FuelStack} />
      <Tab.Screen name="MaintenanceTab" component={MaintenanceStack} />
      <Tab.Screen name="SettingsTab" component={SettingsStack} />
    </Tab.Navigator>
  );
};

export default MainRoutes;
