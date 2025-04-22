import React, { createContext, useContext, useEffect, useState } from 'react';
import { listarMaquinas } from '../services/maquinas';

const MachinesContext = createContext();

export function MachinesProvider({ children }) {
    const [maquinas, setMaquinas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const carregarMaquinas = async () => {
        try {
            console.log('Iniciando carregamento de máquinas no contexto...');
            setIsLoading(true);
            setError(null);
            const dados = await listarMaquinas();
            console.log('Máquinas carregadas no contexto:', dados);
            setMaquinas(dados);
        } catch (error) {
            console.error('Erro ao carregar máquinas no contexto:', error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        carregarMaquinas();
    }, []);

    const atualizarMaquinas = async () => {
        await carregarMaquinas();
    };

    return (
        <MachinesContext.Provider value={{ maquinas, isLoading, error, atualizarMaquinas }}>
            {children}
        </MachinesContext.Provider>
    );
}

export function useMachines() {
    const context = useContext(MachinesContext);
    if (!context) {
        throw new Error('useMachines deve ser usado dentro de um MachinesProvider');
    }
    return context;
} 