import api from '../config/api';

/**
 * @typedef {Object} Bomba
 * @property {number} id - ID da bomba
 * @property {number} capacidade - Capacidade em litros
 * @property {string} localizacao - Localização da bomba
 */

/**
 * Lista todas as bombas
 * @returns {Promise<Bomba[]>} Lista de bombas
 */
export const listarBombas = async () => {
    try {
        const response = await api.get('/bombas');
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Cria uma nova bomba
 * @param {Object} dados - Dados da bomba
 * @param {number} dados.capacidade - Capacidade em litros
 * @param {string} dados.localizacao - Localização da bomba
 * @returns {Promise<Bomba>} Bomba criada
 */
export const criarBomba = async (dados) => {
    try {
        const response = await api.post('/bombas', dados);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Obtém uma bomba específica
 * @param {number} id - ID da bomba
 * @returns {Promise<Bomba>} Bomba encontrada
 */
export const obterBomba = async (id) => {
    try {
        const response = await api.get(`/bombas/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Atualiza uma bomba existente
 * @param {number} id - ID da bomba
 * @param {Object} dados - Dados atualizados
 * @param {number} [dados.capacidade] - Nova capacidade em litros
 * @param {string} [dados.localizacao] - Nova localização
 * @returns {Promise<Bomba>} Bomba atualizada
 */
export const atualizarBomba = async (id, dados) => {
    try {
        const response = await api.put(`/bombas/${id}`, dados);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Remove uma bomba
 * @param {number} id - ID da bomba
 * @returns {Promise<void>}
 */
export const removerBomba = async (id) => {
    try {
        await api.delete(`/bombas/${id}`);
    } catch (error) {
        throw error;
    }
}; 