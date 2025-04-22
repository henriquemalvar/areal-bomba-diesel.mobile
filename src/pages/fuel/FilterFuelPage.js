import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
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
import { maquinas, periodos, responsaveis, tipos } from '../../constants/fuel';
import { useTheme } from '../../contexts/ThemeContext';
import { listarAbastecimentos } from '../../services/abastecimentos';

export default function FilterFuelPage() {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(false);
    const [filtros, setFiltros] = useState({
        periodo: 'todos',
        maquina: 'todas',
        tipo: 'todos',
        responsavel: 'todos',
        dataInicio: '',
        dataFim: '',
    });

    useEffect(() => {
        if (route.params?.filtros) {
            setFiltros(route.params.filtros);
        }
    }, [route.params]);

    const handleApplyFilters = async () => {
        setIsLoading(true);
        try {
            const abastecimentos = await listarAbastecimentos();

            // Aplicar filtros nos dados da API
            let abastecimentosFiltrados = [...abastecimentos];

            // Filtro por máquina
            if (filtros.maquina !== 'todas') {
                abastecimentosFiltrados = abastecimentosFiltrados.filter(
                    (a) => a.maquinario?.nome.toLowerCase() === filtros.maquina.toLowerCase()
                );
            }

            // Filtro por tipo
            if (filtros.tipo !== 'todos') {
                abastecimentosFiltrados = abastecimentosFiltrados.filter(
                    (a) => a.tipo === filtros.tipo
                );
            }

            // Filtro por responsável
            if (filtros.responsavel !== 'todos') {
                abastecimentosFiltrados = abastecimentosFiltrados.filter(
                    (a) => a.usuario?.nome.toLowerCase() === filtros.responsavel.toLowerCase()
                );
            }

            // Filtro por período
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            switch (filtros.periodo) {
                case 'hoje':
                    abastecimentosFiltrados = abastecimentosFiltrados.filter(
                        (a) => new Date(a.data).toDateString() === hoje.toDateString()
                    );
                    break;
                case 'semana':
                    const inicioSemana = new Date(hoje);
                    inicioSemana.setDate(hoje.getDate() - hoje.getDay());
                    abastecimentosFiltrados = abastecimentosFiltrados.filter(
                        (a) => new Date(a.data) >= inicioSemana && new Date(a.data) <= hoje
                    );
                    break;
                case 'mes':
                    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
                    abastecimentosFiltrados = abastecimentosFiltrados.filter(
                        (a) => new Date(a.data) >= inicioMes && new Date(a.data) <= hoje
                    );
                    break;
                case 'personalizado':
                    if (filtros.dataInicio && filtros.dataFim) {
                        const inicio = new Date(filtros.dataInicio);
                        const fim = new Date(filtros.dataFim);
                        abastecimentosFiltrados = abastecimentosFiltrados.filter(
                            (a) => new Date(a.data) >= inicio && new Date(a.data) <= fim
                        );
                    }
                    break;
            }

            navigation.navigate('Fuel', { filtros, abastecimentosFiltrados });
        } catch (error) {
            console.error('Erro ao aplicar filtros:', error);
            Alert.alert('Erro', 'Não foi possível aplicar os filtros. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    const handleReset = () => {
        setFiltros({
            periodo: 'todos',
            maquina: 'todas',
            tipo: 'todos',
            responsavel: 'todos',
            dataInicio: '',
            dataFim: '',
        });
    };

    const renderPicker = (title, value, options, onChange) => {
        const selectedOption = options.find(opt => opt.id === value);
        return (
            <View style={styles.filtroGroup}>
                <Text style={[styles.filtroTitle, { color: theme.textColor }]}>
                    {title}
                </Text>
                <View style={[styles.pickerContainer, { borderColor: theme.borderColor }]}>
                    <MaterialIcons
                        name={selectedOption?.icon || 'arrow-drop-down'}
                        size={24}
                        color={theme.primaryColor}
                        style={styles.pickerIcon}
                    />
                    <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        style={[styles.picker, { color: theme.textColor }]}
                        itemStyle={styles.pickerItem}
                    >
                        {options.map((option) => (
                            <Picker.Item
                                key={option.id}
                                label={option.label}
                                value={option.id}
                            />
                        ))}
                    </Picker>
                </View>
            </View>
        );
    };

    const renderDateInputs = () => (
        <View style={styles.filtroGroup}>
            <Text style={[styles.filtroTitle, { color: theme.textColor }]}>
                Período Personalizado
            </Text>
            <View style={styles.dateInputsContainer}>
                <View style={[styles.inputContainer, { borderColor: theme.primaryColor, flex: 1 }]}>
                    <MaterialIcons
                        name="event"
                        size={24}
                        color={theme.primaryColor}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={[styles.input, { color: theme.textColor }]}
                        value={filtros.dataInicio}
                        onChangeText={(text) => setFiltros({ ...filtros, dataInicio: text })}
                        placeholder="Início"
                        placeholderTextColor={theme.placeholderColor}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.dateSeparator}>
                    <MaterialIcons
                        name="arrow-forward"
                        size={24}
                        color={theme.primaryColor}
                    />
                </View>
                <View style={[styles.inputContainer, { borderColor: theme.primaryColor, flex: 1 }]}>
                    <MaterialIcons
                        name="event"
                        size={24}
                        color={theme.primaryColor}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={[styles.input, { color: theme.textColor }]}
                        value={filtros.dataFim}
                        onChangeText={(text) => setFiltros({ ...filtros, dataFim: text })}
                        placeholder="Fim"
                        placeholderTextColor={theme.placeholderColor}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    );

    return (
        <DefaultPage title="Filtros" backButton>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={theme.primaryColor} />
                </View>
            )}

            <View style={[styles.container, isLoading && styles.containerDisabled]}>
                <ScrollView style={styles.content}>
                    {renderPicker('Período', filtros.periodo, periodos, (value) =>
                        setFiltros({ ...filtros, periodo: value })
                    )}

                    {filtros.periodo === 'personalizado' && renderDateInputs()}

                    {renderPicker('Máquina', filtros.maquina, maquinas, (value) =>
                        setFiltros({ ...filtros, maquina: value })
                    )}

                    {renderPicker('Tipo', filtros.tipo, tipos, (value) =>
                        setFiltros({ ...filtros, tipo: value })
                    )}

                    {renderPicker('Responsável', filtros.responsavel, responsaveis, (value) =>
                        setFiltros({ ...filtros, responsavel: value })
                    )}
                </ScrollView>

                <View style={[styles.footer, { borderTopColor: theme.borderColor }]}>
                    <TouchableOpacity
                        style={[styles.resetButton]}
                        onPress={handleReset}
                    >
                        <MaterialIcons name="refresh" size={20} color="#666" style={styles.resetIcon} />
                        <Text style={styles.resetButtonText}>Limpar Filtros</Text>
                    </TouchableOpacity>
                    <View style={styles.footerActions}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={handleCancel}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: theme.primaryColor }]}
                            onPress={handleApplyFilters}
                        >
                            <Text style={styles.applyButtonText}>Aplicar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </DefaultPage>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 16,
    },
    filtroGroup: {
        marginBottom: 32,
    },
    filtroTitle: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '500',
    },
    pickerContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    pickerIcon: {
        marginRight: 8,
    },
    picker: {
        flex: 1,
        height: 50,
    },
    pickerItem: {
        fontSize: 16,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        gap: 12,
    },
    footerActions: {
        flexDirection: 'row',
        gap: 8,
    },
    button: {
        flex: 1,
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    resetIcon: {
        marginRight: 8,
    },
    cancelButton: {
        backgroundColor: '#f5f5f5',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resetButtonText: {
        color: '#666',
        fontSize: 14,
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateInputsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dateSeparator: {
        paddingHorizontal: 8,
    },
    inputContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: '100%',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    containerDisabled: {
        opacity: 0.5,
    },
    container: {
        flex: 1,
    },
}); 