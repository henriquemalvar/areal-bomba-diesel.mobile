import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import FuelStack from './FuelStack';
import HomeStack from './HomeStack';
import MachinesStack from './MachinesStack';
import MaintenanceStack from './MaintenanceStack';
import SettingsStack from './SettingsStack';

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  headerShown: false,
  tabBarActiveTintColor: '#1a237e',
  tabBarInactiveTintColor: '#666',
  tabBarStyle: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
};

const tabConfig = {
  Inicio: {
    component: HomeStack,
    icon: 'home',
    label: 'Início',
  },
  Abastecimento: {
    component: FuelStack,
    icon: 'local-gas-station',
    label: 'Abastecimento',
  },
  Maquinas: {
    component: MachinesStack,
    icon: 'construction',
    label: 'Máquinas',
  },
  Manutencao: {
    component: MaintenanceStack,
    icon: 'build',
    label: 'Manutenção',
  },
  Configuracoes: {
    component: SettingsStack,
    icon: 'settings',
    label: 'Configurações',
  },
};

export default function MainRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...tabBarOptions,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons
            name={tabConfig[route.name].icon}
            size={size}
            color={color}
          />
        ),
      })}
    >
      {Object.entries(tabConfig).map(([name, config]) => (
        <Tab.Screen
          key={name}
          name={name}
          component={config.component}
          options={{
            tabBarLabel: config.label,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
