import React, { createContext, useContext, useEffect, useState } from 'react';
import ErrorModal from '../components/ErrorModal';
import { useFeedback } from '../components/FeedbackProvider';
import { login, logout, getUserData, updateProfile } from '../services/auth';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const { showSuccess, showError } = useFeedback();

    useEffect(() => {
        let mounted = true;

        const initializeAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                
                if (session && mounted) {
                    const userData = await getUserData();
                    if (userData) {
                        console.log(userData);
                        setUser(userData);
                        showSuccess(`Que bom te ver novamente, ${userData.user_metadata?.nome || userData.email.split('@')[0]}!`, 'Olá! 👋');
                    }
                }
            } catch (error) {
                console.error('Erro ao inicializar autenticação:', error);
                if (error.message !== 'Auth session missing!' && mounted) {
                    showError('Não foi possível verificar sua autenticação');
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        initializeAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (mounted) {
                if (event === 'SIGNED_IN' && session) {
                    const userData = await getUserData();
                    if (userData) {
                        setUser(userData);
                        showSuccess(`Que bom te ver, ${userData.user_metadata?.nome || userData.email}!`, 'Olá! 👋');
                    }
                } else if (event === 'SIGNED_OUT') {
                    setUser(null);
                }
            }
        });

        return () => {
            mounted = false;
            subscription?.unsubscribe();
        };
    }, []);

    async function signIn(email, password) {
        try {
            const response = await login(email, password);
            setUser(response.user);
            showSuccess(`Que bom te ver, ${response.user.user_metadata?.nome || response.user.email.split('@')[0]}!`, 'Olá! 👋');
            return response;
        } catch (error) {
            setError(error);
            showError('Email ou senha incorretos');
            throw error;
        }
    }

    async function signOut() {
        try {
            await logout();
            setUser(null);
            showSuccess('Até logo! 👋', 'Desconectado');
        } catch (error) {
            setError(error);
            showError('Não foi possível fazer logout');
            throw error;
        }
    }

    async function updateUserProfile(data) {
        try {
            const updatedUser = await updateProfile(data);
            setUser(updatedUser);
            showSuccess('Perfil atualizado com sucesso!', 'Alterações salvas');
            return updatedUser;
        } catch (error) {
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