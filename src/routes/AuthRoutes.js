import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChangePasswordPage from '../pages/auth/ChangePasswordPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import MainRoutes from './MainRoutes';

const Stack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterPage}
        options={{ headerShown: true, headerTitle: 'Cadastro' }}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} 
      options={{ headerShown: true, headerTitle: 'Recuperar Senha' }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordPage} 
      options={{ headerShown: true, headerTitle: 'Alterar Senha' }} />
      <Stack.Screen name="Main" component={MainRoutes} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
