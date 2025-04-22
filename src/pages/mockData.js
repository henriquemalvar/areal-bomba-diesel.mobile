// Dados mockados para exemplo
export const mockData = {
    usuario: {
        nome: 'Henrique',
    },
    resumoDia: {
        totalAbastecimentos: 3,
        litrosTotais: 150,
        maquinaMaisAtiva: 'Draga 01',
    },
    alertas: [
        {
            id: '1',
            tipo: 'combustivel',
            mensagem: 'Combustível abaixo de 10% no tanque',
            maquina: 'Draga 02',
            nivel: 8,
        },
        {
            id: '2',
            tipo: 'abastecimento',
            mensagem: 'Draga 01 precisa ser abastecida',
            maquina: 'Draga 01',
        },
    ],
    ultimosAbastecimentos: [
        {
            id: '1',
            maquina: 'Draga 01',
            quantidade: 50,
            data: new Date(),
        },
        {
            id: '2',
            maquina: 'Draga 02',
            quantidade: 30,
            data: new Date(),
        },
        {
            id: '3',
            maquina: 'Draga 03',
            quantidade: 70,
            data: new Date(),
        },
    ],
    manutencoesPrevistas: [
        {
            id: '1',
            maquina: 'Draga 01',
            tipo: 'Preventiva',
            data: new Date('2024-04-20'),
        },
        {
            id: '2',
            maquina: 'Draga 02',
            tipo: 'Corretiva',
            data: new Date('2024-04-25'),
        },
    ],
    consumoSemanal: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [
            {
                data: [120, 150, 100, 200, 180, 90, 160],
            },
        ],
    },
};
