import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';

const Stack = createStackNavigator();

export default function Routes() {
    const { signed, loading } = useAuth();

    if (loading) {
        return null; // ou um componente de loading
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {signed ? (
                    <Stack.Screen name="Main" component={MainRoutes} />
                ) : (
                    <Stack.Screen name="Auth" component={AuthRoutes} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
