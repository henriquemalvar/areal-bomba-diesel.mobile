import { API_URL } from '@env';
import axios from 'axios';

const api = axios.create({
    baseURL: `${API_URL}/api`,
    timeout: 10000,
    headers: {
        'Accept': 'application/json'
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
            console.error('API Response Error:', {
                url: error.config?.url,
                status: error.response?.status,
                data: error.response?.data,
                headers: error.config?.headers,
                requestData: error.config?.data,
            });
            return Promise.reject(error);
        }
    );
}

export default api; 