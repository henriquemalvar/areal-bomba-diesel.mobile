import api from '../config/api';

/**
 * @typedef {Object} Maquina
 * @property {number} id - ID da máquina
 * @property {string} nome - Nome da máquina
 * @property {'DRAGA'|'CAMINHAO'|'PA_CARREGADEIRA'|'OUTRO'} tipo - Tipo da máquina
 * @property {string} codigoBomba - Código da bomba
 * @property {string} dataFabricacao - Data de fabricação no formato ISO
 */

/**
 * Lista todas as máquinas
 * @returns {Promise<Maquina[]>} Lista de máquinas
 */
export const listarMaquinas = async () => {
    try {
        console.log('Fazendo requisição para /maquinarios...');
        const response = await api.get('/maquinarios');
        console.log('Resposta da API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro na requisição de máquinas:', error);
        throw error;
    }
};

/**
 * Cria uma nova máquina
 * @param {Object} dados - Dados da máquina
 * @param {string} dados.nome - Nome da máquina
 * @param {'DRAGA'|'CAMINHAO'|'PA_CARREGADEIRA'|'OUTRO'} dados.tipo - Tipo da máquina
 * @param {string} dados.codigoBomba - Código da bomba
 * @param {string} dados.dataFabricacao - Data de fabricação no formato ISO
 * @returns {Promise<Maquina>} Máquina criada
 */
export const criarMaquina = async (dados) => {
    try {
        const response = await api.post('/maquinarios', dados);
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
        const response = await api.get(`/maquinarios/${id}`);
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
 * @param {'DRAGA'|'CAMINHAO'|'PA_CARREGADEIRA'|'OUTRO'} [dados.tipo] - Novo tipo
 * @param {string} [dados.codigoBomba] - Novo código da bomba
 * @param {string} [dados.dataFabricacao] - Nova data de fabricação
 * @returns {Promise<Maquina>} Máquina atualizada
 */
export const atualizarMaquina = async (id, dados) => {
    try {
        const response = await api.put(`/maquinarios/${id}`, dados);
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
        await api.delete(`/maquinarios/${id}`);
    } catch (error) {
        throw error;
    }
}; 