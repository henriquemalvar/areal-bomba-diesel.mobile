import api from '../config/api';

/**
 * @typedef {Object} FiltrosAbastecimento
 * @property {string} [dataInicio] - Data inicial do período
 * @property {string} [dataFim] - Data final do período
 * @property {number} [maquinarioId] - ID do maquinário
 * @property {'DRAGA'|'CAMINHAO'|'PA_CARREGADEIRA'|'OUTRO'} [tipoMaquinario] - Tipo do maquinário
 * @property {string} [nomeMaquinario] - Nome do maquinário
 * @property {number} [bombaId] - ID da bomba
 * @property {number} [usuarioId] - ID do usuário
 */

/**
 * @typedef {Object} Abastecimento
 * @property {number} id - ID do abastecimento
 * @property {number} maquinarioId - ID do maquinário
 * @property {number} litros - Quantidade de litros abastecidos
 * @property {string} data - Data do abastecimento
 * @property {number} bombaId - ID da bomba
 * @property {number} usuarioId - ID do usuário
 * @property {Object} maquinario - Dados do maquinário
 * @property {Object} bomba - Dados da bomba
 * @property {Object} usuario - Dados do usuário
 */

/**
 * Lista todos os abastecimentos com filtros opcionais
 * @param {FiltrosAbastecimento} [filtros] - Filtros para a busca
 * @returns {Promise<Abastecimento[]>} Lista de abastecimentos
 */
export const listarAbastecimentos = async (filtros = {}) => {
    try {
        const response = await api.get('/abastecimentos', { params: filtros });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao listar abastecimentos');
    }
};

/**
 * Cria um novo abastecimento
 * @param {Object} dados - Dados do abastecimento
 * @param {number} dados.maquinarioId - ID do maquinário
 * @param {number} dados.litros - Quantidade de litros
 * @param {string} dados.data - Data do abastecimento
 * @param {number} dados.bombaId - ID da bomba
 * @param {number} dados.usuarioId - ID do usuário
 * @returns {Promise<Abastecimento>} Abastecimento criado
 */
export const criarAbastecimento = async (dados) => {
    try {
        const response = await api.post('/abastecimentos', dados);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao criar abastecimento');
    }
};

/**
 * Obtém um abastecimento pelo ID
 * @param {number} id - ID do abastecimento
 * @returns {Promise<Abastecimento>} Dados do abastecimento
 */
export const obterAbastecimento = async (id) => {
    try {
        const response = await api.get(`/abastecimentos/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao obter abastecimento');
    }
};

/**
 * Atualiza um abastecimento
 * @param {number} id - ID do abastecimento
 * @param {Object} dados - Dados atualizados do abastecimento
 * @returns {Promise<Abastecimento>} Abastecimento atualizado
 */
export const atualizarAbastecimento = async (id, dados) => {
    try {
        const response = await api.put(`/abastecimentos/${id}`, dados);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao atualizar abastecimento');
    }
};

/**
 * Remove um abastecimento
 * @param {number} id - ID do abastecimento
 * @returns {Promise<void>}
 */
export const removerAbastecimento = async (id) => {
    try {
        await api.delete(`/abastecimentos/${id}`);
    } catch (error) {
        throw new Error('Erro ao remover abastecimento');
    }
}; 