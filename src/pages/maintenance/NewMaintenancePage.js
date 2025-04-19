import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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
import Card from '../../components/common/Card';
import Container from '../../components/common/Container';
import { useTheme } from '../../contexts/ThemeContext';

export default function NewMaintenancePage() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    maquina: '',
    tipo: '',
    data: new Date(),
    descricao: '',
    responsavel: 'Usuário Logado',
    proximaRevisao: null,
    custo: '',
  });

  const handleSubmit = () => {
    if (!formData.maquina) {
      Alert.alert('Erro', 'Selecione uma máquina');
      return;
    }
    if (!formData.tipo) {
      Alert.alert('Erro', 'Selecione o tipo de manutenção');
      return;
    }
    if (!formData.descricao) {
      Alert.alert('Erro', 'Descreva a manutenção realizada');
      return;
    }

    Alert.alert(
      'Sucesso',
      'Manutenção registrada com sucesso!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const renderInput = (label, value, onChange, placeholder, keyboardType = 'default', icon) => (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <MaterialIcons name={icon} size={20} color={theme.textSecondaryColor} />
        <Text style={[styles.label, { color: theme.textSecondaryColor }]}>{label}</Text>
      </View>
      <TextInput
        style={[styles.input, {
          backgroundColor: theme.backgroundColor,
          color: theme.textColor,
          borderColor: theme.borderColor,
        }]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondaryColor}
        keyboardType={keyboardType}
      />
    </View>
  );

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
          Nova Manutenção
        </Text>
      </View>

      <ScrollView style={styles.form}>
        <Card style={styles.formCard}>
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <MaterialIcons name="build" size={20} color={theme.textSecondaryColor} />
              <Text style={[styles.label, { color: theme.textSecondaryColor }]}>Máquina</Text>
            </View>
            <TouchableOpacity
              style={[styles.select, {
                backgroundColor: theme.backgroundColor,
                borderColor: theme.borderColor,
              }]}
              onPress={() => {/* Implementar seleção de máquina */ }}
            >
              <Text style={[styles.selectText, { color: formData.maquina ? theme.textColor : theme.textSecondaryColor }]}>
                {formData.maquina || 'Selecione uma máquina'}
              </Text>
              <MaterialIcons name="arrow-drop-down" size={24} color={theme.textColor} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <MaterialIcons name="settings" size={20} color={theme.textSecondaryColor} />
              <Text style={[styles.label, { color: theme.textSecondaryColor }]}>Tipo de Manutenção</Text>
            </View>
            <TouchableOpacity
              style={[styles.select, {
                backgroundColor: theme.backgroundColor,
                borderColor: theme.borderColor,
              }]}
              onPress={() => {/* Implementar seleção de tipo */ }}
            >
              <Text style={[styles.selectText, { color: formData.tipo ? theme.textColor : theme.textSecondaryColor }]}>
                {formData.tipo || 'Selecione o tipo'}
              </Text>
              <MaterialIcons name="arrow-drop-down" size={24} color={theme.textColor} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <MaterialIcons name="event" size={20} color={theme.textSecondaryColor} />
              <Text style={[styles.label, { color: theme.textSecondaryColor }]}>Data da Manutenção</Text>
            </View>
            <TextInput
              style={[styles.select, {
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
                borderColor: theme.borderColor,
              }]}
              value={formData.data.toLocaleDateString('pt-BR')}
              editable={false}
            />
          </View>

          {renderInput(
            'Descrição',
            formData.descricao,
            (text) => setFormData({ ...formData, descricao: text }),
            'Descreva a manutenção realizada',
            'default',
            'description'
          )}

          {renderInput(
            'Responsável',
            formData.responsavel,
            (text) => setFormData({ ...formData, responsavel: text }),
            'Responsável pela manutenção',
            'default',
            'person'
          )}

          {formData.tipo === 'preventiva' && (
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="schedule" size={20} color={theme.textSecondaryColor} />
                <Text style={[styles.label, { color: theme.textSecondaryColor }]}>Próxima Revisão</Text>
              </View>
              <TextInput
                style={[styles.select, {
                  backgroundColor: theme.backgroundColor,
                  color: theme.textColor,
                  borderColor: theme.borderColor,
                }]}
                value={formData.proximaRevisao ? formData.proximaRevisao.toLocaleDateString('pt-BR') : ''}
                placeholder="Selecione a data"
                placeholderTextColor={theme.textSecondaryColor}
                editable={false}
              />
            </View>
          )}

          {renderInput(
            'Custo (opcional)',
            formData.custo,
            (text) => setFormData({ ...formData, custo: text }),
            'R$ 0,00',
            'numeric',
            'attach-money'
          )}
        </Card>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.cancelButton, { backgroundColor: theme.backgroundColor, borderColor: theme.borderColor }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.cancelButtonText, { color: theme.textColor }]}>
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.primaryColor }]}
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
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    padding: 20,
  },
  formCard: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    fontSize: 16,
  },
  select: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 