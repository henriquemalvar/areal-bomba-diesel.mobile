import api from '../config/api';

export const criarFuncao = async (dados) => {
    try {
        const response = await api.post('/funcoes', dados);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const listarFuncoes = async () => {
    try {
        const response = await api.get('/funcoes');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const obterFuncao = async (id) => {
    try {
        const response = await api.get(`/funcoes/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const atualizarFuncao = async (id, dados) => {
    try {
        const response = await api.put(`/funcoes/${id}`, dados);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removerFuncao = async (id) => {
    try {
        await api.delete(`/funcoes/${id}`);
    } catch (error) {
        throw error;
    }
}; 