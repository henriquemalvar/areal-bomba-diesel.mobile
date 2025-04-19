import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Container from '../../components/common/Container';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const tiposAbastecimento = [
  { id: 'posto', label: 'Posto Direto' },
  { id: 'galao', label: 'Galão para Draga' },
];

export default function NewFuelPage() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    maquina: '',
    quantidade: '',
    data: new Date(),
    tipo: '',
    observacoes: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.maquina) {
      newErrors.maquina = 'Selecione uma máquina';
    }
    
    if (!formData.quantidade || parseFloat(formData.quantidade) <= 0) {
      newErrors.quantidade = 'Quantidade deve ser maior que zero';
    }
    
    if (!formData.tipo) {
      newErrors.tipo = 'Selecione o tipo de abastecimento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!formData.maquina) {
      Alert.alert('Erro', 'Selecione uma máquina');
      return;
    }
    if (!formData.quantidade || formData.quantidade <= 0) {
      Alert.alert('Erro', 'Informe uma quantidade válida');
      return;
    }

    Alert.alert(
      'Sucesso',
      'Abastecimento registrado com sucesso!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={theme.textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>
          Novo Abastecimento
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Máquina *
          </Text>
          <TouchableOpacity
            style={[styles.input, {
              backgroundColor: theme.inputBackgroundColor,
              borderColor: errors.maquina ? '#d32f2f' : theme.borderColor,
            }]}
            onPress={() => {
              // TODO: Implementar busca de máquinas
            }}
          >
            <Text style={[styles.inputText, { color: formData.maquina ? theme.textColor : theme.placeholderColor }]}>
              {formData.maquina || 'Selecione a máquina'}
            </Text>
          </TouchableOpacity>
          {errors.maquina && <Text style={styles.errorText}>{errors.maquina}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Quantidade (L) *
          </Text>
          <TextInput
            style={[styles.input, {
              backgroundColor: theme.inputBackgroundColor,
              color: theme.textColor,
              borderColor: errors.quantidade ? '#d32f2f' : theme.borderColor,
            }]}
            placeholder="Ex: 20.0"
            placeholderTextColor={theme.placeholderColor}
            keyboardType="numeric"
            value={formData.quantidade}
            onChangeText={(text) => setFormData({ ...formData, quantidade: text })}
          />
          {errors.quantidade && <Text style={styles.errorText}>{errors.quantidade}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Data e Hora
          </Text>
          <TextInput
            style={[styles.input, {
              backgroundColor: theme.inputBackgroundColor,
              color: theme.textColor,
              borderColor: theme.borderColor,
            }]}
            value={format(formData.data, "dd/MM/yyyy HH:mm")}
            editable={false}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Tipo de Abastecimento
          </Text>
          <View style={styles.tipoContainer}>
            {tiposAbastecimento.map((tipo) => (
              <TouchableOpacity
                key={tipo.id}
                style={[
                  styles.tipoButton,
                  formData.tipo === tipo.id && styles.tipoButtonSelected,
                ]}
                onPress={() => setFormData({ ...formData, tipo: tipo.id })}
              >
                <Text
                  style={[
                    styles.tipoText,
                    formData.tipo === tipo.id && styles.tipoTextSelected,
                  ]}
                >
                  {tipo.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Responsável
          </Text>
          <Text style={[styles.responsavel, { color: theme.textColor }]}>
            {user.nome}
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Observações
          </Text>
          <TextInput
            style={[styles.input, {
              backgroundColor: theme.inputBackgroundColor,
              color: theme.textColor,
              borderColor: theme.borderColor,
              height: 100,
              textAlignVertical: 'top',
            }]}
            placeholder="Ex: abastecido com galão reserva"
            placeholderTextColor={theme.placeholderColor}
            multiline
            value={formData.observacoes}
            onChangeText={(text) => setFormData({ ...formData, observacoes: text })}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primaryColor }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputText: {
    fontSize: 16,
    lineHeight: 48,
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
    borderColor: '#1a237e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipoButtonSelected: {
    backgroundColor: '#1a237e',
  },
  tipoText: {
    fontSize: 16,
    color: '#1a237e',
  },
  tipoTextSelected: {
    color: '#fff',
  },
  responsavel: {
    fontSize: 16,
    paddingVertical: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 