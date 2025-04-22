import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FilterMachinePage from '../pages/machines/FilterMachinePage';
import MachinesPage from '../pages/machines/MachinesPage';
import NewMachinePage from '../pages/machines/NewMachinePage';

const Stack = createStackNavigator();

export default function MachinesStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Machines" component={MachinesPage} />
            <Stack.Screen name="NewMachine" component={NewMachinePage} />
            <Stack.Screen name="FilterMachine" component={FilterMachinePage} />
        </Stack.Navigator>
    );
} 