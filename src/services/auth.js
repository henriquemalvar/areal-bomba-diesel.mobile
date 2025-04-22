import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/api';

const AUTH_TOKEN_KEY = '@auth_token';
const USER_DATA_KEY = '@user_data';

/**
 * @typedef {Object} LoginResponse
 * @property {string} token - Token JWT
 * @property {Object} usuario - Dados do usuário
 */

/**
 * @typedef {Object} RegisterData
 * @property {string} nome - Nome do usuário
 * @property {string} email - Email do usuário
 * @property {string} senha - Senha do usuário
 * @property {string} telefone - Telefone do usuário
 * @property {string} dataNascimento - Data de nascimento
 * @property {number} funcaoId - ID da função
 */

/**
 * Realiza o login do usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<LoginResponse>} Dados do login
 */
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

/**
 * Registra um novo usuário
 * @param {RegisterData} dados - Dados do usuário
 * @returns {Promise<Object>} Dados do registro
 */
export const register = async (dados) => {
    try {
        const response = await api.post('/auth/register', dados);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Realiza o logout do usuário
 * @returns {Promise<void>}
 */
export const logout = async () => {
    try {
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
        await AsyncStorage.removeItem(USER_DATA_KEY);
        delete api.defaults.headers.common['Authorization'];
    } catch (error) {
        throw error;
    }
};

/**
 * Obtém o token de autenticação
 * @returns {Promise<string|null>} Token JWT
 */
export const getToken = async () => {
    try {
        return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
        throw error;
    }
};

/**
 * Obtém os dados do usuário
 * @returns {Promise<Object|null>} Dados do usuário
 */
export const getUserData = async () => {
    try {
        const userData = await AsyncStorage.getItem(USER_DATA_KEY);
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        throw error;
    }
};

/**
 * Verifica se o usuário está autenticado
 * @returns {Promise<boolean>} Status da autenticação
 */
export const isAuthenticated = async () => {
    try {
        const token = await getToken();
        return !!token;
    } catch (error) {
        return false;
    }
};

/**
 * Atualiza o perfil do usuário
 * @param {Object} data - Dados a serem atualizados
 * @returns {Promise<Object>} Dados atualizados
 */
export const updateProfile = async (data) => {
    try {
        const response = await api.put('/auth/profile', data);
        const { usuario } = response.data;

        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(usuario));
        return usuario;
    } catch (error) {
        throw error;
    }
}; 