import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import DefaultPage from '../../components/common/DefaultPage';
import { useTheme } from '../../contexts/ThemeContext';
import { listarMaquinas } from '../../services/maquinas';

export default function MachinesPage() {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(true);
    const [maquinas, setMaquinas] = useState([]);
    const [filtros, setFiltros] = useState({
        tipo: 'todos',
        status: 'todos',
    });

    useEffect(() => {
        if (route.params?.filtros) {
            setFiltros(route.params.filtros);
        }
    }, [route.params]);

    useEffect(() => {
        carregarMaquinas();
    }, [filtros]);

    const carregarMaquinas = async () => {
        try {
            setIsLoading(true);
            const dados = await listarMaquinas();
            setMaquinas(dados);
        } catch (error) {
            console.error('Erro ao carregar máquinas:', error);
            Alert.alert('Erro', 'Não foi possível carregar as máquinas. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewDetails = (maquina) => {
        navigation.navigate('NewMachine', {
            maquina,
            mode: 'view'
        });
    };

    const renderMaquina = (maquina) => (
        <TouchableOpacity
            key={maquina.id}
            style={[styles.maquinaContainer, { backgroundColor: theme.cardBackground }]}
            onPress={() => handleViewDetails(maquina)}
            activeOpacity={0.7}
        >
            <View style={styles.maquinaInfo}>
                <View style={styles.maquinaHeader}>
                    <View style={styles.maquinaNomeContainer}>
                        <MaterialIcons
                            name="build"
                            size={20}
                            color={theme.primaryColor}
                            style={styles.maquinaIcon}
                        />
                        <Text style={[styles.maquinaNome, { color: theme.textColor }]}>
                            {maquina.nome}
                        </Text>
                    </View>
                    <View style={[
                        styles.statusContainer,
                        { backgroundColor: maquina.status === 'ativo' ? '#4caf50' : '#f44336' }
                    ]}>
                        <Text style={styles.statusText}>
                            {maquina.status === 'ativo' ? 'Ativo' : 'Inativo'}
                        </Text>
                    </View>
                </View>
                <View style={styles.maquinaDetalhes}>
                    <View style={styles.detalheItem}>
                        <MaterialIcons
                            name="category"
                            size={16}
                            color={theme.textSecondaryColor}
                        />
                        <Text style={[styles.maquinaLabel, { color: theme.textSecondaryColor }]}>
                            Tipo:
                        </Text>
                        <Text style={[styles.maquinaValor, { color: theme.primaryColor }]}>
                            {maquina.tipo}
                        </Text>
                    </View>
                    <View style={styles.detalheItem}>
                        <MaterialIcons
                            name="description"
                            size={16}
                            color={theme.textSecondaryColor}
                        />
                        <Text style={[styles.maquinaLabel, { color: theme.textSecondaryColor }]}>
                            Descrição:
                        </Text>
                        <Text style={[styles.maquinaValor, { color: theme.primaryColor }]}>
                            {maquina.descricao || 'Sem descrição'}
                        </Text>
                    </View>
                </View>
            </View>
            <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.textSecondaryColor}
            />
        </TouchableOpacity>
    );

    return (
        <DefaultPage title="Máquinas">
            <View style={styles.container}>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <TouchableOpacity
                            style={styles.filterButton}
                            onPress={() => navigation.navigate('FilterMachine', { filtros })}
                        >
                            <MaterialIcons
                                name="filter-list"
                                size={20}
                                color={theme.primaryColor}
                            />
                            <Text style={[styles.filterButtonText, { color: theme.primaryColor }]}>
                                Filtros
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        style={styles.maquinasScroll}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="large" color={theme.primaryColor} />
                        ) : (
                            maquinas.map(renderMaquina)
                        )}
                    </ScrollView>
                </View>

                <TouchableOpacity
                    style={[styles.fab, { backgroundColor: theme.primaryColor }]}
                    onPress={() => navigation.navigate('NewMachine')}
                >
                    <MaterialIcons
                        name="add"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        </DefaultPage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
    },
    section: {
        flex: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 16,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    filterButtonText: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '500',
    },
    maquinasScroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 80,
    },
    maquinaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    maquinaInfo: {
        flex: 1,
    },
    maquinaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    maquinaNomeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    maquinaIcon: {
        marginRight: 8,
    },
    maquinaNome: {
        fontSize: 16,
        fontWeight: '600',
    },
    statusContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    maquinaDetalhes: {
        gap: 8,
        marginBottom: 12,
    },
    detalheItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    maquinaLabel: {
        fontSize: 14,
    },
    maquinaValor: {
        fontSize: 14,
        fontWeight: '500',
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
}); 