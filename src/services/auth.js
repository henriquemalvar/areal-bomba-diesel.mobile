import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/api';

const AUTH_TOKEN_KEY = '@auth_token';
const USER_DATA_KEY = '@user_data';

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', {
            email: email.trim(),
            senha: password.trim()
        });

        const { token, usuario } = response.data;

        await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(usuario));

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return { token, user: usuario };
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
        await AsyncStorage.removeItem(USER_DATA_KEY);
        delete api.defaults.headers.common['Authorization'];
    } catch (error) {
        throw error;
    }
};

export const getToken = async () => {
    try {
        return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
        throw error;
    }
};

export const getUserData = async () => {
    try {
        const userData = await AsyncStorage.getItem(USER_DATA_KEY);
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        throw error;
    }
};

export const isAuthenticated = async () => {
    try {
        const token = await getToken();
        return !!token;
    } catch (error) {
        return false;
    }
}; 