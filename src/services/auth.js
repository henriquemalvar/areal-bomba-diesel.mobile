import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, signIn, signUp, signOut, getCurrentUser } from '../config/supabase';

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
 * @returns {Promise<Object>} Dados do login
 */
export const login = async (email, password) => {
    try {
        const { data, error } = await signIn(email, password);
        
        if (error) throw error;

        const { user, session } = data;
        
        if (session) {
            await AsyncStorage.setItem(AUTH_TOKEN_KEY, session.access_token);
        }
        
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));

        return { user };
    } catch (error) {
        console.error('Erro no login:', error);
        throw error;
    }
};

/**
 * Registra um novo usuário
 * @param {Object} dados - Dados do usuário
 * @param {string} dados.nome - Nome do usuário
 * @param {string} dados.email - Email do usuário
 * @param {string} dados.senha - Senha do usuário
 * @returns {Promise<Object>} Dados do registro
 */
export const register = async ({ nome, email, senha }) => {
    try {
        const { data, error } = await signUp(email, senha);
        
        if (error) throw error;

        const { user, session } = data;
        
        if (session) {
            await AsyncStorage.setItem(AUTH_TOKEN_KEY, session.access_token);
        }

        // Atualiza os metadados do usuário com o nome
        const { error: updateError } = await supabase.auth.updateUser({
            data: { nome }
        });

        if (updateError) throw updateError;

        return { user };
    } catch (error) {
        console.error('Erro no registro:', error);
        throw error;
    }
};

/**
 * Realiza o logout do usuário
 * @returns {Promise<void>}
 */
export const logout = async () => {
    try {
        const { error } = await signOut();
        if (error) throw error;
        
        await AsyncStorage.removeItem(USER_DATA_KEY);
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
        console.error('Erro no logout:', error);
        throw error;
    }
};

/**
 * Obtém o token de autenticação
 * @returns {Promise<string|null>} Token JWT
 */
export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        if (!token) {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await AsyncStorage.setItem(AUTH_TOKEN_KEY, session.access_token);
                return session.access_token;
            }
        }
        return token;
    } catch (error) {
        console.error('Erro ao obter token:', error);
        throw error;
    }
};

/**
 * Obtém os dados do usuário
 * @returns {Promise<Object|null>} Dados do usuário
 */
export const getUserData = async () => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
            return null;
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;
        if (!user) return null;

        return user;
    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        throw error;
    }
};

/**
 * Verifica se o usuário está autenticado
 * @returns {Promise<boolean>}
 */
export const isAuthenticated = async () => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        return !!session;
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        return false;
    }
};

/**
 * Atualiza o perfil do usuário
 * @param {Object} data - Dados para atualização
 * @returns {Promise<Object>} Dados atualizados
 */
export const updateProfile = async (data) => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
            throw new Error('Usuário não autenticado');
        }

        const { data: { user }, error: updateError } = await supabase.auth.updateUser({
            data
        });
        
        if (updateError) throw updateError;
        if (!user) throw new Error('Usuário não encontrado');

        return user;
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        throw error;
    }
}; 