import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';

const Tab = createBottomTabNavigator();

const MainRoutes = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
};

export default MainRoutes;
