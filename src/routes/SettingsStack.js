import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChangePasswordPage from '../pages/setting/ChangePasswordPage';
import EditProfilePage from '../pages/setting/EditProfilePage';
import PrivacyPage from '../pages/setting/PrivacyPage';
import ProfilePage from '../pages/setting/ProfilePage';
import TermsPage from '../pages/setting/TermsPage';

const Stack = createStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen name="EditProfile" component={EditProfilePage} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordPage} />
      <Stack.Screen name="Terms" component={TermsPage} />
      <Stack.Screen name="Privacy" component={PrivacyPage} />
    </Stack.Navigator>
  );
}
