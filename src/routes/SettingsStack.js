import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EditProfilePage from '../pages/setting/EditProfilePage';
import ProfilePage from '../pages/setting/ProfilePage';
import SettingsPage from '../pages/setting/SettingsPage';

const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfilePage} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfilePage} />
      <Stack.Screen name="SettingsScreen" component={SettingsPage} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
