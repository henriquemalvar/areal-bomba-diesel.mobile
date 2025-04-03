import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EditProfilePage from '../pages/setting/EditProfilePage';
import PrivacyPage from '../pages/setting/PrivacyPage';
import ProfilePage from '../pages/setting/ProfilePage';
import SettingsPage from '../pages/setting/SettingsPage';
import TermsPage from '../pages/setting/TermsPage';

const Stack = createStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfilePage} />
      <Stack.Screen name="EditProfile" component={EditProfilePage} />
      <Stack.Screen name="SettingsScreen" component={SettingsPage} />
      <Stack.Screen name="Terms" component={TermsPage} />
      <Stack.Screen name="Privacy" component={PrivacyPage} />
    </Stack.Navigator>
  );
}
