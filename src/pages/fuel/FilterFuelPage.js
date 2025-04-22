import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import DefaultPage from '../../components/common/DefaultPage';
import { useMachines } from '../../contexts/MachinesContext';
import { useTheme } from '../../contexts/ThemeContext';
import { listarBombas } from '../../services/bombas';

export default function FilterFuelPage() {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { maquinas, isLoading: isLoadingMaquinas } = useMachines();
    const [isLoading, setIsLoading] = useState(false);
    const [bombas, setBombas] = useState([]);
    const [filtros, setFiltros] = useState({
        dataInicio: '',
        dataFim: '',
        maquinarioId: '',
        tipoMaquinario: '',
        nomeMaquinario: '',
        bombaId: '',
        usuarioId: '',
    });

    useEffect(() => {
        console.log('Máquinas disponíveis na página:', maquinas);
        console.log('Estado de loading das máquinas:', isLoadingMaquinas);
    }, [maquinas, isLoadingMaquinas]);

    useEffect(() => {
        if (route.params?.filtros) {
            setFiltros(route.params.filtros);
        }
        carregarBombas();
    }, [route.params]);

    const carregarBombas = async () => {
        try {
            setIsLoading(true);
            const bombasData = await listarBombas();
            setBombas(bombasData);
        } catch (error) {
            console.error('Erro ao carregar bombas:', error);
            Alert.alert('Erro', 'Não foi possível carregar as bombas. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleApplyFilters = () => {
        navigation.navigate('Fuel', { filtros });
    };

    const handleReset = () => {
        setFiltros({
            dataInicio: '',
            dataFim: '',
            maquinarioId: '',
            tipoMaquinario: '',
            nomeMaquinario: '',
            bombaId: '',
            usuarioId: '',
        });
    };

    return (
        <DefaultPage title="Filtros de Abastecimento">
            <ScrollView style={styles.container}>
                <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.textColor }]}>Data Inicial</Text>
                    <TextInput
                        style={[styles.input, { color: theme.textColor, borderColor: theme.borderColor }]}
                        value={filtros.dataInicio}
                        onChangeText={(text) => setFiltros({ ...filtros, dataInicio: text })}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor={theme.textSecondaryColor}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.textColor }]}>Data Final</Text>
                    <TextInput
                        style={[styles.input, { color: theme.textColor, borderColor: theme.borderColor }]}
                        value={filtros.dataFim}
                        onChangeText={(text) => setFiltros({ ...filtros, dataFim: text })}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor={theme.textSecondaryColor}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.textColor }]}>Máquina</Text>
                    {isLoadingMaquinas ? (
                        <ActivityIndicator size="small" color={theme.primaryColor} />
                    ) : (
                        <View style={[styles.selectContainer, { borderColor: theme.borderColor }]}>
                            {maquinas.map((maquina) => {
                                console.log('Renderizando máquina:', maquina);
                                return (
                                    <TouchableOpacity
                                        key={maquina.id}
                                        style={[
                                            styles.selectButton,
                                            {
                                                backgroundColor: filtros.maquinarioId === maquina.id ? theme.primaryColor : 'transparent',
                                                borderColor: theme.borderColor,
                                            },
                                        ]}
                                        onPress={() => {
                                            console.log('Máquina selecionada:', maquina);
                                            setFiltros({ ...filtros, maquinarioId: maquina.id });
                                        }}
                                    >
                                        <MaterialIcons
                                            name="build"
                                            size={20}
                                            color={filtros.maquinarioId === maquina.id ? 'white' : theme.textColor}
                                        />
                                        <Text
                                            style={[
                                                styles.selectButtonText,
                                                { color: filtros.maquinarioId === maquina.id ? 'white' : theme.textColor },
                                            ]}
                                        >
                                            {maquina.nome}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    )}
                </View>

                <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.textColor }]}>Bomba</Text>
                    <View style={[styles.selectContainer, { borderColor: theme.borderColor }]}>
                        {bombas.map((bomba) => (
                            <TouchableOpacity
                                key={bomba.id}
                                style={[
                                    styles.selectButton,
                                    {
                                        backgroundColor: filtros.bombaId === bomba.id ? theme.primaryColor : 'transparent',
                                        borderColor: theme.borderColor,
                                    },
                                ]}
                                onPress={() => setFiltros({ ...filtros, bombaId: bomba.id })}
                            >
                                <MaterialIcons
                                    name="local-gas-station"
                                    size={20}
                                    color={filtros.bombaId === bomba.id ? 'white' : theme.textColor}
                                />
                                <Text
                                    style={[
                                        styles.selectButtonText,
                                        { color: filtros.bombaId === bomba.id ? 'white' : theme.textColor },
                                    ]}
                                >
                                    {bomba.localizacao}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.resetButton, { backgroundColor: theme.borderColor }]}
                        onPress={handleReset}
                    >
                        <Text style={styles.buttonText}>Limpar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.primaryColor }]}
                        onPress={handleApplyFilters}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.buttonText}>Aplicar</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </DefaultPage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    selectContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    selectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        flex: 1,
        minWidth: '45%',
        justifyContent: 'center',
        gap: 8,
    },
    selectButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 24,
    },
    button: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    resetButton: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 