import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import AvatarWithInitials from '../../components/AvatarWithInitials';
import Container from '../../components/common/Container';
import { useAuth } from '../../contexts/AuthContext';

const editProfileSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().optional(),
  empresa: z.string().optional(),
});

export default function EditProfilePage() {
  const navigation = useNavigation();
  const { user, updateProfile } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      nome: user?.nome || '',
      email: user?.email || '',
      telefone: user?.telefone || '',
      empresa: user?.empresa || '',
    }
  });
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateProfile(data);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.pageTitle}>Editar Perfil</Text>
            <View style={styles.avatarContainer}>
              <AvatarWithInitials name={user?.nome || ''} />
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={24} color="#1a237e" style={styles.icon} />
                <Controller
                  control={control}
                  name="nome"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Nome completo"
                      placeholderTextColor="#666"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      editable={!loading}
                    />
                  )}
                />
              </View>
              {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}

              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={24} color="#1a237e" style={styles.icon} />
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="E-mail"
                      placeholderTextColor="#666"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      editable={!loading}
                    />
                  )}
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

              <View style={styles.inputContainer}>
                <MaterialIcons name="phone" size={24} color="#1a237e" style={styles.icon} />
                <Controller
                  control={control}
                  name="telefone"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Telefone"
                      placeholderTextColor="#666"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="phone-pad"
                      editable={!loading}
                    />
                  )}
                />
              </View>
              {errors.telefone && <Text style={styles.errorText}>{errors.telefone.message}</Text>}

              <View style={styles.inputContainer}>
                <MaterialIcons name="business" size={24} color="#1a237e" style={styles.icon} />
                <Controller
                  control={control}
                  name="empresa"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Empresa"
                      placeholderTextColor="#666"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      editable={!loading}
                    />
                  )}
                />
              </View>
              {errors.empresa && <Text style={styles.errorText}>{errors.empresa.message}</Text>}

              <TouchableOpacity
                style={[styles.saveButton, loading && styles.saveButtonDisabled]}
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
              >
                <Text style={styles.saveButtonText}>
                  {loading ? 'Salvando...' : 'Salvar alterações'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 20,
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  formContainer: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: '#d32f2f',
    alignSelf: 'flex-start',
    marginBottom: 10,
    fontSize: 12,
  },
  saveButton: {
    backgroundColor: '#1a237e',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonDisabled: {
    backgroundColor: '#9fa8da',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
