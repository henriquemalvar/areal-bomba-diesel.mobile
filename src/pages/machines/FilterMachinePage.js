import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import DefaultPage from '../../components/common/DefaultPage';
import { useTheme } from '../../contexts/ThemeContext';

const tiposMaquina = [
    { id: 'draga', label: 'Draga', icon: 'dredger' },
    { id: 'caminhao', label: 'Caminhão', icon: 'local-shipping' },
    { id: 'pa', label: 'Pá Carregadeira', icon: 'construction' },
    { id: 'outro', label: 'Outro', icon: 'build' },
];

export default function FilterMachinePage() {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(false);
    const [filtros, setFiltros] = useState({
        tipo: 'todos',
        status: 'todos',
    });

    const handleApplyFilters = () => {
        navigation.navigate('Machines', { filtros });
    };

    const handleReset = () => {
        setFiltros({
            tipo: 'todos',
            status: 'todos',
        });
    };

    return (
        <DefaultPage title="Filtros" backButton>
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                            Tipo de Máquina
                        </Text>
                        <View style={styles.tiposContainer}>
                            {tiposMaquina.map((tipo) => (
                                <TouchableOpacity
                                    key={tipo.id}
                                    style={[
                                        styles.tipoButton,
                                        {
                                            backgroundColor:
                                                filtros.tipo === tipo.id
                                                    ? theme.primaryColor
                                                    : theme.inputBackground,
                                            borderColor: theme.borderColor,
                                        },
                                    ]}
                                    onPress={() => setFiltros({ ...filtros, tipo: tipo.id })}
                                >
                                    <MaterialIcons
                                        name={tipo.icon}
                                        size={24}
                                        color={filtros.tipo === tipo.id ? '#fff' : theme.textColor}
                                    />
                                    <Text
                                        style={[
                                            styles.tipoText,
                                            {
                                                color:
                                                    filtros.tipo === tipo.id ? '#fff' : theme.textColor,
                                            },
                                        ]}
                                    >
                                        {tipo.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                            Status
                        </Text>
                        <View style={styles.statusContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.statusButton,
                                    {
                                        backgroundColor:
                                            filtros.status === 'ativo'
                                                ? theme.primaryColor
                                                : theme.inputBackground,
                                        borderColor: theme.borderColor,
                                    },
                                ]}
                                onPress={() => setFiltros({ ...filtros, status: 'ativo' })}
                            >
                                <MaterialIcons
                                    name="check-circle"
                                    size={24}
                                    color={filtros.status === 'ativo' ? '#fff' : theme.textColor}
                                />
                                <Text
                                    style={[
                                        styles.statusText,
                                        {
                                            color:
                                                filtros.status === 'ativo' ? '#fff' : theme.textColor,
                                        },
                                    ]}
                                >
                                    Ativo
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.statusButton,
                                    {
                                        backgroundColor:
                                            filtros.status === 'inativo'
                                                ? theme.primaryColor
                                                : theme.inputBackground,
                                        borderColor: theme.borderColor,
                                    },
                                ]}
                                onPress={() => setFiltros({ ...filtros, status: 'inativo' })}
                            >
                                <MaterialIcons
                                    name="cancel"
                                    size={24}
                                    color={filtros.status === 'inativo' ? '#fff' : theme.textColor}
                                />
                                <Text
                                    style={[
                                        styles.statusText,
                                        {
                                            color:
                                                filtros.status === 'inativo' ? '#fff' : theme.textColor,
                                        },
                                    ]}
                                >
                                    Inativo
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.button, styles.resetButton]}
                        onPress={handleReset}
                    >
                        <MaterialIcons name="refresh" size={24} color="#666" />
                        <Text style={styles.resetButtonText}>Limpar Filtros</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.primaryColor }]}
                        onPress={handleApplyFilters}
                    >
                        <MaterialIcons name="check" size={24} color="#fff" />
                        <Text style={styles.applyButtonText}>Aplicar</Text>
                    </TouchableOpacity>
                </View>

                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color={theme.primaryColor} />
                    </View>
                )}
            </View>
        </DefaultPage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    content: {
        flex: 1,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 12,
    },
    tiposContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tipoButton: {
        flex: 1,
        minWidth: '45%',
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 12,
    },
    tipoText: {
        fontSize: 14,
        fontWeight: '500',
    },
    statusContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    statusButton: {
        flex: 1,
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '500',
    },
    footer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 16,
    },
    button: {
        flex: 1,
        height: 48,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    resetButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    resetButtonText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 