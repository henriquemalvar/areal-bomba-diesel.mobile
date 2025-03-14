import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MainRoutes from './MainRoutes';

const Stack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordPage} />
      <Stack.Screen name="Main" component={MainRoutes} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
