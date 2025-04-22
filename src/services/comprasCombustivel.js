import api from '../config/api';

export const registrarCompra = async (dados) => {
    try {
        const response = await api.post('/compras-combustivel', dados);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const listarCompras = async () => {
    try {
        const response = await api.get('/compras-combustivel');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const obterCompra = async (id) => {
    try {
        const response = await api.get(`/compras-combustivel/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const atualizarCompra = async (id, dados) => {
    try {
        const response = await api.put(`/compras-combustivel/${id}`, dados);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removerCompra = async (id) => {
    try {
        await api.delete(`/compras-combustivel/${id}`);
    } catch (error) {
        throw error;
    }
}; 