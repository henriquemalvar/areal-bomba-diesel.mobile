import api from '../config/api';

/**
 * @typedef {Object} Maquina
 * @property {number} id - ID da máquina
 * @property {string} nome - Nome da máquina
 * @property {string} tipo - Tipo da máquina (draga, caminhao, pa, outro)
 * @property {string} descricao - Descrição da máquina
 * @property {string} status - Status da máquina (ativo, inativo)
 */

/**
 * Lista todas as máquinas
 * @returns {Promise<Maquina[]>} Lista de máquinas
 */
export const listarMaquinas = async () => {
    try {
        const response = await api.get('/maquinas');
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Cria uma nova máquina
 * @param {Object} dados - Dados da máquina
 * @param {string} dados.nome - Nome da máquina
 * @param {string} dados.tipo - Tipo da máquina
 * @param {string} dados.descricao - Descrição da máquina
 * @param {string} dados.status - Status da máquina
 * @returns {Promise<Maquina>} Máquina criada
 */
export const criarMaquina = async (dados) => {
    try {
        const response = await api.post('/maquinas', dados);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Obtém uma máquina específica
 * @param {number} id - ID da máquina
 * @returns {Promise<Maquina>} Dados da máquina
 */
export const obterMaquina = async (id) => {
    try {
        const response = await api.get(`/maquinas/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Atualiza uma máquina existente
 * @param {number} id - ID da máquina
 * @param {Object} dados - Dados atualizados
 * @param {string} [dados.nome] - Novo nome
 * @param {string} [dados.tipo] - Novo tipo
 * @param {string} [dados.descricao] - Nova descrição
 * @param {string} [dados.status] - Novo status
 * @returns {Promise<Maquina>} Máquina atualizada
 */
export const atualizarMaquina = async (id, dados) => {
    try {
        const response = await api.put(`/maquinas/${id}`, dados);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Remove uma máquina
 * @param {number} id - ID da máquina
 * @returns {Promise<void>}
 */
export const removerMaquina = async (id) => {
    try {
        await api.delete(`/maquinas/${id}`);
    } catch (error) {
        throw error;
    }
}; 