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
    { id: 'draga', label: 'Draga', icon: 'dredger' },
    { id: 'caminhao', label: 'Caminhão', icon: 'local-shipping' },
    { id: 'pa', label: 'Pá Carregadeira', icon: 'construction' },
    { id: 'outro', label: 'Outro', icon: 'build' },
];

export default function NewMachinePage() {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { maquina, mode } = route.params || {};

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        tipo: '',
        descricao: '',
        status: 'ativo',
    });

    useEffect(() => {
        if (maquina) {
            setFormData({
                nome: maquina.nome,
                tipo: maquina.tipo,
                descricao: maquina.descricao,
                status: maquina.status,
            });
        }
    }, [maquina]);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            if (mode === 'edit' && maquina) {
                await atualizarMaquina(maquina.id, formData);
                Alert.alert('Sucesso', 'Máquina atualizada com sucesso!');
            } else {
                await criarMaquina(formData);
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

    const handleDelete = async () => {
        if (!maquina) return;

        Alert.alert(
            'Confirmar exclusão',
            'Tem certeza que deseja excluir esta máquina?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
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

    const isFormValid = () => {
        return formData.nome.trim() !== '' && formData.tipo.trim() !== '';
    };

    return (
        <DefaultPage title={mode === 'edit' ? 'Editar Máquina' : 'Nova Máquina'}>
            <View style={styles.container}>
                <ScrollView
                    style={styles.form}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.formContent}
                >
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.textColor }]}>Nome</Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: theme.inputBackground,
                                    color: theme.textColor,
                                    borderColor: theme.borderColor,
                                },
                            ]}
                            value={formData.nome}
                            onChangeText={(text) => setFormData({ ...formData, nome: text })}
                            placeholder="Digite o nome da máquina"
                            placeholderTextColor={theme.textSecondaryColor}
                            editable={mode !== 'view'}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.textColor }]}>Tipo</Text>
                        <View style={styles.tiposContainer}>
                            {tiposMaquina.map((tipo) => (
                                <TouchableOpacity
                                    key={tipo.id}
                                    style={[
                                        styles.tipoButton,
                                        {
                                            backgroundColor:
                                                formData.tipo === tipo.id
                                                    ? theme.primaryColor
                                                    : theme.inputBackground,
                                            borderColor: theme.borderColor,
                                        },
                                    ]}
                                    onPress={() => setFormData({ ...formData, tipo: tipo.id })}
                                    disabled={mode === 'view'}
                                >
                                    <MaterialIcons
                                        name={tipo.icon}
                                        size={24}
                                        color={formData.tipo === tipo.id ? '#fff' : theme.textColor}
                                    />
                                    <Text
                                        style={[
                                            styles.tipoText,
                                            {
                                                color:
                                                    formData.tipo === tipo.id ? '#fff' : theme.textColor,
                                            },
                                        ]}
                                    >
                                        {tipo.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.textColor }]}>Descrição</Text>
                        <TextInput
                            style={[
                                styles.input,
                                styles.textArea,
                                {
                                    backgroundColor: theme.inputBackground,
                                    color: theme.textColor,
                                    borderColor: theme.borderColor,
                                },
                            ]}
                            value={formData.descricao}
                            onChangeText={(text) => setFormData({ ...formData, descricao: text })}
                            placeholder="Digite uma descrição para a máquina"
                            placeholderTextColor={theme.textSecondaryColor}
                            multiline
                            numberOfLines={4}
                            editable={mode !== 'view'}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.textColor }]}>Status</Text>
                        <View style={styles.statusContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.statusButton,
                                    {
                                        backgroundColor:
                                            formData.status === 'ativo'
                                                ? theme.primaryColor
                                                : theme.inputBackground,
                                        borderColor: theme.borderColor,
                                    },
                                ]}
                                onPress={() => setFormData({ ...formData, status: 'ativo' })}
                                disabled={mode === 'view'}
                            >
                                <MaterialIcons
                                    name="check-circle"
                                    size={24}
                                    color={formData.status === 'ativo' ? '#fff' : theme.textColor}
                                />
                                <Text
                                    style={[
                                        styles.statusText,
                                        {
                                            color:
                                                formData.status === 'ativo' ? '#fff' : theme.textColor,
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
                                            formData.status === 'inativo'
                                                ? theme.primaryColor
                                                : theme.inputBackground,
                                        borderColor: theme.borderColor,
                                    },
                                ]}
                                onPress={() => setFormData({ ...formData, status: 'inativo' })}
                                disabled={mode === 'view'}
                            >
                                <Text
                                    style={[
                                        styles.statusButtonText,
                                        {
                                            color:
                                                formData.status === 'inativo' ? '#fff' : theme.textColor,
                                        },
                                    ]}
                                >
                                    Inativo
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {mode !== 'view' && (
                    <View style={styles.footer}>
                        {mode === 'edit' && (
                            <TouchableOpacity
                                style={[styles.button, styles.deleteButton]}
                                onPress={handleDelete}
                                disabled={isLoading}
                            >
                                <MaterialIcons name="delete" size={24} color="#fff" />
                                <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.saveButton,
                                { backgroundColor: theme.primaryColor },
                            ]}
                            onPress={handleSubmit}
                            disabled={isLoading || !isFormValid()}
                        >
                            <MaterialIcons name="save" size={24} color="#fff" />
                            <Text style={styles.buttonText}>
                                {mode === 'edit' ? 'Salvar' : 'Criar'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

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
    form: {
        flex: 1,
    },
    formContent: {
        paddingBottom: 80,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
        paddingTop: 12,
    },
    statusContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    statusButton: {
        flex: 1,
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
    footer: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        flexDirection: 'row',
        gap: 16,
    },
    button: {
        flex: 1,
        height: 56,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    deleteButton: {
        backgroundColor: '#f44336',
    },
    saveButton: {
        backgroundColor: '#2196f3',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 