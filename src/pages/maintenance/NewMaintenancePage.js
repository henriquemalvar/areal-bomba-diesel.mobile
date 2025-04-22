import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DefaultPage from '../../components/common/DefaultPage';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const tiposManutencao = [
  { id: 'preventiva', label: 'Preventiva', icon: 'build' },
  { id: 'corretiva', label: 'Corretiva', icon: 'warning' },
];

const statusManutencao = [
  { id: 'pendente', label: 'Pendente', icon: 'schedule' },
  { id: 'concluida', label: 'Concluída', icon: 'check-circle' },
  { id: 'cancelada', label: 'Cancelada', icon: 'cancel' },
];

export default function NewMaintenancePage() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { manutencao, mode = 'new' } = route.params || {};

  const [formData, setFormData] = useState({
    maquina: '',
    tipo: '',
    status: 'pendente',
    data: new Date(),
    descricao: '',
    observacoes: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (manutencao) {
      setFormData({
        maquina: manutencao.maquina || '',
        tipo: manutencao.tipo || '',
        status: manutencao.status || 'pendente',
        data: manutencao.data ? new Date(manutencao.data) : new Date(),
        descricao: manutencao.descricao || '',
        observacoes: manutencao.observacoes || '',
      });
    }
  }, [manutencao]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.maquina) {
      newErrors.maquina = 'Selecione uma máquina';
    }

    if (!formData.tipo) {
      newErrors.tipo = 'Selecione o tipo de manutenção';
    }

    if (!formData.descricao) {
      newErrors.descricao = 'Informe uma descrição';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implementar chamada à API
      const dataToSave = {
        ...formData,
        responsavel: user?.nome,
      };

      console.log('Dados a serem salvos:', dataToSave);

      // Simulando chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));

      Alert.alert(
        'Sucesso',
        mode === 'new'
          ? 'Manutenção registrada com sucesso!'
          : 'Manutenção atualizada com sucesso!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Erro ao salvar manutenção:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao salvar a manutenção. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Excluir Manutenção',
      'Tem certeza que deseja excluir esta manutenção? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => { },
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              // TODO: Implementar chamada à API para exclusão
              await new Promise(resolve => setTimeout(resolve, 1000));
              Alert.alert(
                'Sucesso',
                'Manutenção excluída com sucesso!',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                  }
                ]
              );
            } catch (error) {
              console.error('Erro ao excluir manutenção:', error);
              Alert.alert(
                'Erro',
                'Ocorreu um erro ao excluir a manutenção. Tente novamente.',
                [
                  {
                    text: 'OK',
                    style: 'cancel',
                  }
                ]
              );
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const isViewMode = mode === 'view';
  const title = isViewMode
    ? 'Detalhes'
    : mode === 'edit'
      ? 'Editar'
      : 'Nova';

  return (
    <DefaultPage title={title} backButton>
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.textColor }]}>
          Máquina *
        </Text>
        <TouchableOpacity
          style={[styles.inputContainer, {
            backgroundColor: theme.inputBackgroundColor,
            borderColor: errors.maquina ? '#d32f2f' : theme.borderColor,
            opacity: isViewMode ? 0.7 : 1,
          }]}
          onPress={() => {
            if (isViewMode) return;
            // TODO: Implementar busca de máquinas
          }}
        >
          <MaterialIcons name="build" size={24} color={theme.textSecondaryColor} style={styles.inputIcon} />
          <Text style={[styles.inputText, { color: formData.maquina ? theme.textColor : theme.placeholderColor }]}>
            {formData.maquina || 'Selecione a máquina'}
          </Text>
          {!isViewMode && (
            <MaterialIcons name="arrow-drop-down" size={24} color={theme.textSecondaryColor} />
          )}
        </TouchableOpacity>
        {errors.maquina && <Text style={styles.errorText}>{errors.maquina}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.textColor }]}>
          Tipo de Manutenção *
        </Text>
        <View style={styles.tipoContainer}>
          {tiposManutencao.map((tipo) => (
            <TouchableOpacity
              key={tipo.id}
              style={[
                styles.tipoButton,
                formData.tipo === tipo.id && styles.tipoButtonSelected,
                { borderColor: theme.primaryColor },
                isViewMode && { opacity: 0.7 },
              ]}
              onPress={() => {
                if (isViewMode) return;
                setFormData({ ...formData, tipo: tipo.id });
              }}
            >
              <MaterialIcons
                name={tipo.icon}
                size={24}
                color={formData.tipo === tipo.id ? '#fff' : theme.primaryColor}
                style={styles.tipoIcon}
              />
              <Text
                style={[
                  styles.tipoText,
                  formData.tipo === tipo.id && styles.tipoTextSelected,
                  { color: formData.tipo === tipo.id ? '#fff' : theme.primaryColor },
                ]}
              >
                {tipo.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.tipo && <Text style={styles.errorText}>{errors.tipo}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.textColor }]}>
          Status
        </Text>
        <View style={styles.tipoContainer}>
          {statusManutencao.map((status) => (
            <TouchableOpacity
              key={status.id}
              style={[
                styles.tipoButton,
                formData.status === status.id && styles.tipoButtonSelected,
                { borderColor: theme.primaryColor },
                isViewMode && { opacity: 0.7 },
              ]}
              onPress={() => {
                if (isViewMode) return;
                setFormData({ ...formData, status: status.id });
              }}
            >
              <MaterialIcons
                name={status.icon}
                size={24}
                color={formData.status === status.id ? '#fff' : theme.primaryColor}
                style={styles.tipoIcon}
              />
              <Text
                style={[
                  styles.tipoText,
                  formData.status === status.id && styles.tipoTextSelected,
                  { color: formData.status === status.id ? '#fff' : theme.primaryColor },
                ]}
              >
                {status.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.textColor }]}>
          Data e Hora
        </Text>
        <View style={[styles.inputContainer, {
          backgroundColor: theme.inputBackgroundColor,
          borderColor: theme.borderColor,
          opacity: isViewMode ? 0.7 : 1,
        }]}>
          <MaterialIcons name="event" size={24} color={theme.textSecondaryColor} style={styles.inputIcon} />
          <Text style={[styles.inputText, { color: theme.textColor }]}>
            {format(formData.data, "dd/MM/yyyy HH:mm")}
          </Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.textColor }]}>
          Descrição *
        </Text>
        <View style={[styles.inputContainer, {
          backgroundColor: theme.inputBackgroundColor,
          borderColor: errors.descricao ? '#d32f2f' : theme.borderColor,
          height: 100,
          opacity: isViewMode ? 0.7 : 1,
        }]}>
          <MaterialIcons name="description" size={24} color={theme.textSecondaryColor} style={styles.inputIcon} />
          {isViewMode ? (
            <Text style={[styles.inputText, { color: theme.textColor }]}>
              {formData.descricao || 'Nenhuma descrição'}
            </Text>
          ) : (
            <TextInput
              style={[styles.input, {
                color: theme.textColor,
                height: '100%',
                textAlignVertical: 'top',
              }]}
              placeholder="Descreva a manutenção realizada"
              placeholderTextColor={theme.placeholderColor}
              multiline
              value={formData.descricao}
              onChangeText={(text) => setFormData({ ...formData, descricao: text })}
            />
          )}
        </View>
        {errors.descricao && <Text style={styles.errorText}>{errors.descricao}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.textColor }]}>
          Observações
        </Text>
        <View style={[styles.inputContainer, {
          backgroundColor: theme.inputBackgroundColor,
          borderColor: theme.borderColor,
          height: 100,
          opacity: isViewMode ? 0.7 : 1,
        }]}>
          <MaterialIcons name="note" size={24} color={theme.textSecondaryColor} style={styles.inputIcon} />
          {isViewMode ? (
            <Text style={[styles.inputText, { color: theme.textColor }]}>
              {formData.observacoes || 'Nenhuma observação'}
            </Text>
          ) : (
            <TextInput
              style={[styles.input, {
                color: theme.textColor,
                height: '100%',
                textAlignVertical: 'top',
              }]}
              placeholder="Adicione observações relevantes"
              placeholderTextColor={theme.placeholderColor}
              multiline
              value={formData.observacoes}
              onChangeText={(text) => setFormData({ ...formData, observacoes: text })}
            />
          )}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.textColor }]}>
          Responsável
        </Text>
        <View style={[styles.inputContainer, {
          backgroundColor: theme.inputBackgroundColor,
          borderColor: theme.borderColor,
          opacity: 0.7,
        }]}>
          <MaterialIcons name="person" size={24} color={theme.textSecondaryColor} style={styles.inputIcon} />
          <Text style={[styles.inputText, { color: theme.textColor }]}>
            {user?.nome || 'Usuário não identificado'}
          </Text>
        </View>
      </View>

      {!isViewMode && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
            disabled={isLoading}
          >
            <MaterialIcons name="close" size={20} color="#666" />
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#1a237e' }]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <MaterialIcons name="check" size={20} color="white" />
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isViewMode && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={20} color="#666" />
            <Text style={styles.cancelButtonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#1a237e' }]}
            onPress={() => navigation.navigate('NewMaintenance', {
              manutencao,
              mode: 'edit'
            })}
          >
            <MaterialIcons name="edit" size={20} color="white" />
            <Text style={styles.submitButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#d32f2f' }]}
            onPress={handleDelete}
            disabled={isLoading}
          >
            <MaterialIcons name="delete" size={20} color="white" />
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Excluindo...' : 'Excluir'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </DefaultPage>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
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
    padding: 0,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 4,
  },
  tipoContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tipoButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tipoIcon: {
    marginRight: 8,
  },
  tipoButtonSelected: {
    backgroundColor: '#1a237e',
  },
  tipoText: {
    fontSize: 16,
    fontWeight: '500',
  },
  tipoTextSelected: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 