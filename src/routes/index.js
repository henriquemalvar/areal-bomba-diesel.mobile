import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import CustomDrawer from '../components/CustomDrawer';
import { useAuth } from '../contexts/AuthContext';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ProfilePage from '../pages/profile/ProfilePage';
import RegisterRefillPage from '../pages/refill/RegisterRefillPage';
import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          height: 60,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 18,
        },
        headerTitleAlign: 'center',
        headerStatusBarHeight: 0,
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomePage}
        options={({ navigation }) => ({
          title: 'Início',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 16 }}
            >
              <MaterialIcons name="menu" size={24} color="#1a237e" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          height: 60,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 18,
        },
        headerTitleAlign: 'center',
        headerStatusBarHeight: 0,
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={({ navigation }) => ({
          title: 'Perfil',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 16 }}
            >
              <MaterialIcons name="menu" size={24} color="#1a237e" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function RegisterRefillStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          height: 60,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 18,
        },
        headerTitleAlign: 'center',
        headerStatusBarHeight: 0,
      }}
    >
      <Stack.Screen
        name="RegistrarAbastecimento"
        component={RegisterRefillPage}
        options={({ navigation }) => ({
          title: 'Registrar Abastecimento',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 16 }}
            >
              <MaterialIcons name="menu" size={24} color="#1a237e" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#1a237e',
        drawerInactiveTintColor: '#666',
        drawerStyle: {
          backgroundColor: '#fff',
        },
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="home" size={size} color={color} />
        ),
      }}
    >
      <Drawer.Screen
        name="Inicio"
        component={HomeStack}
        options={{
          drawerLabel: 'Início',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="RegistrarAbastecimento"
        component={RegisterRefillStack}
        options={{
          drawerLabel: 'Registrar Abastecimento',
          drawerIcon: ({ color, size }) => (
            <Feather name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerLabel: 'Perfil',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Routes() {
  const { signed, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {signed ? (
          <Stack.Screen name="Main" component={MainDrawer} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
