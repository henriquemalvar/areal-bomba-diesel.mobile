import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import ErrorModal from '../components/ErrorModal';
import { login, logout } from '../services/auth';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            const token = await AsyncStorage.getItem('@token');
            const userData = await AsyncStorage.getItem('@user');

            if (token && userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
        } finally {
            setLoading(false);
        }
    }

    async function signIn(email, password) {
        try {
            const response = await login(email, password);
            if (__DEV__) {
                console.log('Login realizado com sucesso:', response);
            }
            await AsyncStorage.setItem('@token', response.token);
            await AsyncStorage.setItem('@user', JSON.stringify(response.user));
            setUser(response.user);
            return response;
        } catch (error) {
            if (__DEV__) {
                console.error('Erro no login:', error);
            }
            setError(error);
            throw error;
        }
    }

    async function signUp(name, email, password) {
        try {
            const response = await login(email, password);
            if (__DEV__) {
                console.log('Login realizado com sucesso:', response);
            }
            await AsyncStorage.setItem('@token', response.token);
            await AsyncStorage.setItem('@user', JSON.stringify(response.user));
            setUser(response.user);
            return response;
        } catch (error) {
            if (__DEV__) {
                console.error('Erro ao criar conta:', error);
            }
            setError(error);
            throw error;
        }
    }

    async function signOut() {
        try {
            await logout();
            await AsyncStorage.removeItem('@token');
            await AsyncStorage.removeItem('@user');
            if (__DEV__) {
                console.log('Logout realizado com sucesso');
            }
            setUser(null);
        } catch (error) {
            if (__DEV__) {
                console.error('Erro no logout:', error);
            }
            setError(error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            loading,
            signIn,
            signUp,
            signOut
        }}>
            {children}
            <ErrorModal
                visible={!!error}
                error={error}
                onClose={() => setError(null)}
            />
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
} 