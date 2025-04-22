import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import DefaultPage from '../../components/common/DefaultPage';

const periodos = [
    { id: 'todos', label: 'Todos' },
    { id: 'hoje', label: 'Hoje' },
    { id: 'semana', label: 'Esta Semana' },
    { id: 'mes', label: 'Este Mês' },
    { id: 'personalizado', label: 'Personalizado' },
];

const maquinas = [
    { id: 'todas', label: 'Todas' },
    { id: 'draga01', label: 'Draga 01' },
    { id: 'draga02', label: 'Draga 02' },
    { id: 'draga03', label: 'Draga 03' },
    { id: 'draga04', label: 'Draga 04' },
];

const tipos = [
    { id: 'todos', label: 'Todos' },
    { id: 'preventiva', label: 'Preventiva' },
    { id: 'corretiva', label: 'Corretiva' },
];

const status = [
    { id: 'todos', label: 'Todos' },
    { id: 'concluida', label: 'Concluída' },
    { id: 'pendente', label: 'Pendente' },
    { id: 'cancelada', label: 'Cancelada' },
];

export default function FilterMaintenancePage() {
    const navigation = useNavigation();
    const route = useRoute();
    const [filtros, setFiltros] = useState({
        periodo: 'todos',
        maquina: 'todas',
        tipo: 'todos',
        status: 'todos',
        dataInicio: '',
        dataFim: '',
    });

    useEffect(() => {
        if (route.params?.filtros) {
            setFiltros(route.params.filtros);
        }
    }, [route.params]);

    const handleApply = () => {
        navigation.navigate('Maintenance', { filtros });
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    const handleReset = () => {
        setFiltros({
            periodo: 'todos',
            maquina: 'todas',
            tipo: 'todos',
            status: 'todos',
            dataInicio: '',
            dataFim: '',
        });
    };

    const renderPicker = (title, value, options, onChange) => {
        const selectedOption = options.find(opt => opt.id === value);
        return (
            <View style={styles.filtroGroup}>
                <Text style={[styles.filtroTitle, { color: '#000' }]}>
                    {title}
                </Text>
                <View style={[styles.pickerContainer, { borderColor: '#1a237e' }]}>
                    <MaterialIcons
                        name={selectedOption?.icon || 'arrow-drop-down'}
                        size={24}
                        color="#1a237e"
                        style={styles.pickerIcon}
                    />
                    <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        style={[styles.picker, { color: '#000' }]}
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
            <Text style={[styles.filtroTitle, { color: '#000' }]}>
                Período Personalizado
            </Text>
            <View style={styles.dateInputsContainer}>
                <View style={[styles.inputContainer, { borderColor: '#1a237e', flex: 1 }]}>
                    <MaterialIcons
                        name="event"
                        size={24}
                        color="#1a237e"
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={[styles.input, { color: '#000' }]}
                        value={filtros.dataInicio}
                        onChangeText={(text) => setFiltros({ ...filtros, dataInicio: text })}
                        placeholder="Início"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.dateSeparator}>
                    <MaterialIcons
                        name="arrow-forward"
                        size={24}
                        color="#1a237e"
                    />
                </View>
                <View style={[styles.inputContainer, { borderColor: '#1a237e', flex: 1 }]}>
                    <MaterialIcons
                        name="event"
                        size={24}
                        color="#1a237e"
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={[styles.input, { color: '#000' }]}
                        value={filtros.dataFim}
                        onChangeText={(text) => setFiltros({ ...filtros, dataFim: text })}
                        placeholder="Fim"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    );

    return (
        <DefaultPage title="Filtros" backButton>
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

                {renderPicker('Status', filtros.status, status, (value) =>
                    setFiltros({ ...filtros, status: value })
                )}
            </ScrollView>

            <View style={[styles.footer, { borderTopColor: '#ddd' }]}>
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
                        style={[styles.button, { backgroundColor: '#1a237e' }]}
                        onPress={handleApply}
                    >
                        <Text style={styles.applyButtonText}>Aplicar</Text>
                    </TouchableOpacity>
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
}); 