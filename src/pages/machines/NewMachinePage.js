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
import { useTheme } from '../../contexts/ThemeContext';
import {
    atualizarMaquina,
    criarMaquina,
    removerMaquina,
} from '../../services/maquinas';

const tiposMaquina = [
    { id: 'DRAGA', label: 'Draga', icon: 'construction' },
    { id: 'CAMINHAO', label: 'Caminhão', icon: 'local-shipping' },
    { id: 'PA_CARREGADEIRA', label: 'Pá Carregadeira', icon: 'construction' },
    { id: 'OUTRO', label: 'Outro', icon: 'build' },
];

export default function NewMachinePage() {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(false);
    const [maquina, setMaquina] = useState({
        nome: '',
        tipo: 'DRAGA',
        codigoBomba: '',
        dataFabricacao: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        if (route.params?.maquina) {
            setMaquina(route.params.maquina);
        }
    }, [route.params]);

    const handleSalvar = async () => {
        try {
            setIsLoading(true);

            // Converter a data para o formato ISO antes de enviar
            const dadosParaEnviar = {
                ...maquina,
                dataFabricacao: new Date(maquina.dataFabricacao).toISOString()
            };

            if (route.params?.maquina) {
                await atualizarMaquina(maquina.id, dadosParaEnviar);
                Alert.alert('Sucesso', 'Máquina atualizada com sucesso!');
            } else {
                await criarMaquina(dadosParaEnviar);
                Alert.alert('Sucesso', 'Máquina criada com sucesso!');
            }
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao salvar máquina:', error);
            Alert.alert('Erro', 'Não foi possível salvar a máquina. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleExcluir = async () => {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja excluir esta máquina?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setIsLoading(true);
                            await removerMaquina(maquina.id);
                            Alert.alert('Sucesso', 'Máquina excluída com sucesso!');
                            navigation.goBack();
                        } catch (error) {
                            console.error('Erro ao excluir máquina:', error);
                            Alert.alert('Erro', 'Não foi possível excluir a máquina. Tente novamente.');
                        } finally {
                            setIsLoading(false);
                        }
                    },
                },
            ]
        );
    };

    return (
        <DefaultPage title={route.params?.maquina ? 'Editar Máquina' : 'Nova Máquina'}>
            <ScrollView style={styles.container}>
                <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.textColor }]}>Nome</Text>
                    <TextInput
                        style={[styles.input, { color: theme.textColor, borderColor: theme.borderColor }]}
                        value={maquina.nome}
                        onChangeText={(text) => setMaquina({ ...maquina, nome: text })}
                        placeholder="Digite o nome da máquina"
                        placeholderTextColor={theme.textSecondaryColor}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.textColor }]}>Tipo</Text>
                    <View style={[styles.tipoContainer, { borderColor: theme.borderColor }]}>
                        {tiposMaquina.map((tipo) => (
                            <TouchableOpacity
                                key={tipo.id}
                                style={[
                                    styles.tipoButton,
                                    {
                                        backgroundColor: maquina.tipo === tipo.id ? theme.primaryColor : 'transparent',
                                        borderColor: theme.borderColor,
                                    },
                                ]}
                                onPress={() => setMaquina({ ...maquina, tipo: tipo.id })}
                            >
                                <MaterialIcons
                                    name={tipo.icon}
                                    size={20}
                                    color={maquina.tipo === tipo.id ? 'white' : theme.textColor}
                                />
                                <Text
                                    style={[
                                        styles.tipoButtonText,
                                        { color: maquina.tipo === tipo.id ? 'white' : theme.textColor },
                                    ]}
                                >
                                    {tipo.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.textColor }]}>Código da Bomba</Text>
                    <TextInput
                        style={[styles.input, { color: theme.textColor, borderColor: theme.borderColor }]}
                        value={maquina.codigoBomba}
                        onChangeText={(text) => setMaquina({ ...maquina, codigoBomba: text })}
                        placeholder="Digite o código da bomba"
                        placeholderTextColor={theme.textSecondaryColor}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.textColor }]}>Data de Fabricação</Text>
                    <TextInput
                        style={[styles.input, { color: theme.textColor, borderColor: theme.borderColor }]}
                        value={maquina.dataFabricacao}
                        onChangeText={(text) => setMaquina({ ...maquina, dataFabricacao: text })}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor={theme.textSecondaryColor}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.primaryColor }]}
                        onPress={handleSalvar}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.buttonText}>Salvar</Text>
                        )}
                    </TouchableOpacity>

                    {route.params?.maquina && (
                        <TouchableOpacity
                            style={[styles.button, styles.deleteButton, { backgroundColor: '#dc3545' }]}
                            onPress={handleExcluir}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.buttonText}>Excluir</Text>
                            )}
                        </TouchableOpacity>
                    )}
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
    tipoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tipoButton: {
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
    tipoButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        gap: 16,
        marginTop: 24,
    },
    button: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 