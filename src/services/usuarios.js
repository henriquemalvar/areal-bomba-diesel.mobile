import api from '../config/api';

/**
 * @typedef {Object} Endereco
 * @property {string} cep - CEP
 * @property {string} logradouro - Logradouro
 * @property {string} numero - Número
 * @property {string} [complemento] - Complemento
 * @property {string} bairro - Bairro
 * @property {string} cidade - Cidade
 * @property {string} estado - Estado
 */

/**
 * @typedef {Object} Usuario
 * @property {number} id - ID do usuário
 * @property {string} nome - Nome do usuário
 * @property {string} email - Email do usuário
 * @property {string} telefone - Telefone do usuário
 * @property {string} dataNascimento - Data de nascimento
 * @property {Endereco} endereco - Endereço do usuário
 * @property {number} funcaoId - ID da função
 * @property {Object} [funcao] - Dados da função
 */

/**
 * Lista todos os usuários
 * @returns {Promise<Usuario[]>} Lista de usuários
 */
export const listarUsuarios = async () => {
    try {
        const response = await api.get('/usuarios');
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Cria um novo usuário
 * @param {Omit<Usuario, 'id'|'funcao'>} dados - Dados do usuário
 * @returns {Promise<Usuario>} Usuário criado
 */
export const criarUsuario = async (dados) => {
    try {
        const response = await api.post('/usuarios', dados);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Obtém um usuário específico
 * @param {number} id - ID do usuário
 * @returns {Promise<Usuario>} Dados do usuário
 */
export const obterUsuario = async (id) => {
    try {
        const response = await api.get(`/usuarios/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Atualiza um usuário existente
 * @param {number} id - ID do usuário
 * @param {Partial<Usuario>} dados - Dados a serem atualizados
 * @returns {Promise<Usuario>} Usuário atualizado
 */
export const atualizarUsuario = async (id, dados) => {
    try {
        const response = await api.put(`/usuarios/${id}`, dados);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Remove um usuário
 * @param {number} id - ID do usuário
 * @returns {Promise<void>}
 */
export const removerUsuario = async (id) => {
    try {
        await api.delete(`/usuarios/${id}`);
    } catch (error) {
        throw error;
    }
}; 