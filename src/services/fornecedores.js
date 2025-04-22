import api from '../config/api';

export const criarFornecedor = async (dados) => {
    try {
        const response = await api.post('/fornecedores', dados);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const listarFornecedores = async () => {
    try {
        const response = await api.get('/fornecedores');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const obterFornecedor = async (id) => {
    try {
        const response = await api.get(`/fornecedores/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const atualizarFornecedor = async (id, dados) => {
    try {
        const response = await api.put(`/fornecedores/${id}`, dados);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removerFornecedor = async (id) => {
    try {
        await api.delete(`/fornecedores/${id}`);
    } catch (error) {
        throw error;
    }
}; 