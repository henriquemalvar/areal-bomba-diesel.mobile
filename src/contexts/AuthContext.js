import React, { createContext, useContext, useEffect, useState } from 'react';
import ErrorModal from '../components/ErrorModal';
import { useFeedback } from '../components/FeedbackProvider';
import { getUserData, login, logout, updateProfile } from '../services/auth';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const { showSuccess, showError } = useFeedback();

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            const userData = await getUserData();
            if (__DEV__) {
                console.log('Dados do usuário recuperados:', userData);
            }

            if (userData) {
                setUser(userData);
                showSuccess(`Que bom te ver novamente, ${userData.nome}!`, 'Olá! 👋');
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            showError('Não foi possível verificar sua autenticação');
        } finally {
            setLoading(false);
        }
    }

    async function signIn(email, password) {
        try {
            const response = await login(email, password);
            if (__DEV__) {
                console.log('Resposta do login:', response);
            }
            setUser(response.user);
            showSuccess(`Que bom te ver, ${response.user.nome}!`, 'Olá! 👋');
            return response;
        } catch (error) {
            if (__DEV__) {
                console.error('Erro no login:', error);
            }
            setError(error);
            showError('Email ou senha incorretos');
            throw error;
        }
    }

    async function signUp(name, email, password) {
        try {
            const response = await login(email, password);
            if (__DEV__) {
                console.log('Resposta do cadastro:', response);
            }
            setUser(response.user);
            showSuccess(`Seja bem-vindo(a), ${response.user.nome}!`, 'Conta criada! 🎉');
            return response;
        } catch (error) {
            if (__DEV__) {
                console.error('Erro ao criar conta:', error);
            }
            setError(error);
            showError('Não foi possível criar sua conta');
            throw error;
        }
    }

    async function signOut() {
        try {
            await logout();
            if (__DEV__) {
                console.log('Logout realizado com sucesso');
            }
            setUser(null);
            showSuccess('Até logo! 👋', 'Desconectado');
        } catch (error) {
            if (__DEV__) {
                console.error('Erro no logout:', error);
            }
            setError(error);
            showError('Não foi possível fazer logout');
            throw error;
        }
    }

    async function updateUserProfile(data) {
        try {
            const updatedUser = await updateProfile(data);
            if (__DEV__) {
                console.log('Perfil atualizado:', updatedUser);
            }
            setUser(updatedUser);
            showSuccess('Perfil atualizado com sucesso!', 'Alterações salvas');
            return updatedUser;
        } catch (error) {
            if (__DEV__) {
                console.error('Erro ao atualizar perfil:', error);
            }
            setError(error);
            showError('Não foi possível atualizar seu perfil');
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
            signOut,
            updateProfile: updateUserProfile
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