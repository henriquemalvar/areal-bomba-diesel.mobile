import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockData } from '../pages/mockData';

const FuelContext = createContext();

export function FuelProvider({ children }) {
    const [fuelData, setFuelData] = useState({
        resumoDia: {
            totalAbastecimentos: 0,
            litrosTotais: 0,
            maquinaMaisAtiva: '',
        },
        ultimosAbastecimentos: [],
        alertas: [],
        manutencoesPrevistas: [],
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Substituir por chamada real à API
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Simulando chamada à API
                await new Promise(resolve => setTimeout(resolve, 1000));
                setFuelData(mockData);
            } catch (error) {
                console.error('Erro ao carregar dados de abastecimento:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const getResumoDia = () => fuelData.resumoDia;

    const getUltimosAbastecimentos = () => fuelData.ultimosAbastecimentos;

    const getAlertas = () => fuelData.alertas;

    const getManutencoesPrevistas = () => fuelData.manutencoesPrevistas;

    const value = {
        fuelData,
        isLoading,
        getResumoDia,
        getUltimosAbastecimentos,
        getAlertas,
        getManutencoesPrevistas,
    };

    return (
        <FuelContext.Provider value={value}>
            {children}
        </FuelContext.Provider>
    );
}

export function useFuel() {
    const context = useContext(FuelContext);
    if (!context) {
        throw new Error('useFuel deve ser usado dentro de um FuelProvider');
    }
    return context;
} 