import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Card from '../../components/common/Card';
import Container from '../../components/common/Container';
import Dialog from '../../components/common/Dialog';
import { useTheme } from '../../contexts/ThemeContext';

const mockMaquinas = [
  { id: '1', nome: 'Draga 01' },
  { id: '2', nome: 'Draga 02' },
  { id: '3', nome: 'Pá Carregadeira 01' },
  { id: '4', nome: 'Pá Carregadeira 02' },
];

export default function MaintenanceDetails() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { manutencao } = route.params || {};

  const [isEditing, setIsEditing] = useState(!manutencao);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState(manutencao || {
    maquina: '',
    tipo: 'preventiva',
    data: new Date(),
    status: 'pendente',
    responsavel: '',
    descricao: '',
    observacoes: '',
  });

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar no backend
    setShowSuccessDialog(true);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    // Aqui você implementaria a lógica para excluir no backend
    setShowDeleteDialog(false);
    navigation.goBack();
  };

  const renderField = (label, value, field, multiline = false) => (
    <View style={styles.field}>
      <Text style={[styles.label, { color: theme.textSecondaryColor }]}>
        {label}
      </Text>
      {isEditing ? (
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.backgroundColor,
              color: theme.textColor,
              borderColor: theme.borderColor,
            },
            multiline && styles.multilineInput,
          ]}
          value={value}
          onChangeText={(text) => setFormData(prev => ({ ...prev, [field]: text }))}
          multiline={multiline}
        />
      ) : (
        <Text style={[styles.value, { color: theme.textColor }]}>
          {value}
        </Text>
      )}
    </View>
  );

  const renderSelectField = (label, value, field, options) => (
    <View style={styles.field}>
      <Text style={[styles.label, { color: theme.textSecondaryColor }]}>
        {label}
      </Text>
      {isEditing ? (
        <View style={styles.selectContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.selectOption,
                value === option.value && { backgroundColor: theme.primaryColor },
              ]}
              onPress={() => setFormData(prev => ({ ...prev, [field]: option.value }))}
            >
              <Text
                style={[
                  styles.selectOptionText,
                  value === option.value && { color: '#fff' },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={[styles.value, { color: theme.textColor }]}>
          {options.find(opt => opt.value === value)?.label}
        </Text>
      )}
    </View>
  );

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={theme.textColor}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>
          {isEditing ? (manutencao ? 'Editar Manutenção' : 'Nova Manutenção') : 'Detalhes da Manutenção'}
        </Text>
        {!isEditing && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <MaterialIcons
              name="edit"
              size={24}
              color={theme.primaryColor}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          {renderSelectField(
            'Máquina',
            formData.maquina,
            'maquina',
            mockMaquinas.map(m => ({ label: m.nome, value: m.id }))
          )}

          {renderSelectField(
            'Tipo',
            formData.tipo,
            'tipo',
            [
              { label: 'Preventiva', value: 'preventiva' },
              { label: 'Corretiva', value: 'corretiva' },
            ]
          )}

          {renderSelectField(
            'Status',
            formData.status,
            'status',
            [
              { label: 'Pendente', value: 'pendente' },
              { label: 'Concluída', value: 'concluida' },
              { label: 'Cancelada', value: 'cancelada' },
            ]
          )}

          {renderField('Responsável', formData.responsavel, 'responsavel')}
          {renderField('Descrição', formData.descricao, 'descricao', true)}
          {renderField('Observações', formData.observacoes, 'observacoes', true)}
        </Card>

        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primaryColor }]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.deleteButton, { backgroundColor: theme.errorColor }]}
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>Excluir Manutenção</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Dialog
        visible={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir esta manutenção?"
        buttons={[
          {
            text: 'Cancelar',
            onPress: () => setShowDeleteDialog(false),
          },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: confirmDelete,
          },
        ]}
      />

      <Dialog
        visible={showSuccessDialog}
        onClose={() => {
          setShowSuccessDialog(false);
          navigation.goBack();
        }}
        title="Sucesso"
        message="Manutenção salva com sucesso!"
        buttons={[
          {
            text: 'OK',
            onPress: () => {
              setShowSuccessDialog(false);
              navigation.goBack();
            },
          },
        ]}
      />
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
    padding: 24,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 0,
  },
  card: {
    marginBottom: 24,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  value: {
    fontSize: 16,
    padding: 12,
  },
  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectOptionText: {
    fontSize: 14,
  },
  actions: {
    marginTop: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 