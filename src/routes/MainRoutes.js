import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import FuelStack from './FuelStack';
import HomeStack from './HomeStack';
import MaintenanceStack from './MaintenanceStack';
import SettingsStack from './SettingsStack';

const Tab = createBottomTabNavigator();

export default function MainRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = 'home';
          } else if (route.name === 'Abastecimento') {
            iconName = 'local-gas-station';
          } else if (route.name === 'Manutencao') {
            iconName = 'build';
          } else if (route.name === 'Configuracoes') {
            iconName = 'settings';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#1a237e',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeStack}
        options={{
          tabBarLabel: 'Início'
        }}
      />
      <Tab.Screen
        name="Abastecimento"
        component={FuelStack}
        options={{
          tabBarLabel: 'Abastecimento'
        }}
      />
      <Tab.Screen
        name="Manutencao"
        component={MaintenanceStack}
        options={{
          tabBarLabel: 'Manutenção'
        }}
      />
      <Tab.Screen
        name="Configuracoes"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Configurações'
        }}
      />
    </Tab.Navigator>
  );
}
