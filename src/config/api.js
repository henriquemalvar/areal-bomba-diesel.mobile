import { API_URL } from '@env';
import axios from 'axios';

const api = axios.create({
    baseURL: `${API_URL}/api`,
    timeout: 30000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

// Interceptor para log de requisições em desenvolvimento
if (__DEV__) {
    api.interceptors.request.use(
        (config) => {
            console.log('API Request:', {
                url: config.url,
                method: config.method,
                data: config.data,
                headers: config.headers,
            });
            return config;
        },
        (error) => {
            console.error('API Request Error:', error);
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => {
            console.log('API Response:', {
                url: response.config.url,
                status: response.status,
                data: response.data,
            });
            return response;
        },
        (error) => {
            const errorMessage = error.response?.data?.message || error.message;
            const errorStatus = error.response?.status;
            
            console.error('API Response Error:', {
                url: error.config?.url,
                status: errorStatus,
                message: errorMessage,
                data: error.response?.data,
                headers: error.config?.headers,
                requestData: error.config?.data,
            });

            // Tratamento específico para erros de rede
            if (error.message === 'Network Error') {
                throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
            }

            // Tratamento para erros de autenticação
            if (errorStatus === 401) {
                throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');
            }

            throw new Error(errorMessage || 'Ocorreu um erro inesperado. Tente novamente mais tarde.');
        }
    );
}

export default api; 