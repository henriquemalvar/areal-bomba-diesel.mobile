import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import DefaultPage from '../../components/common/DefaultPage';
import { UserInfoCard } from '../../components/UserInfoCard';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { ActivityIndicator } from 'react-native';

const editProfileSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().optional(),
  empresa: z.string().optional(),
});

export default function EditProfilePage() {
  const navigation = useNavigation();
  const { user, updateProfile } = useAuth();
  const { theme } = useTheme();
  const [loading, setLoading] = React.useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      nome: user?.nome || '',
      email: user?.email || '',
      telefone: user?.telefone || '',
      empresa: user?.empresa || '',
    }
  });

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}
    >
      <DefaultPage title="Editar Perfil" backButton={true}>
        <UserInfoCard user={user} />
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={24} color={theme.primaryColor} style={styles.icon} />
            <Controller
              control={control}
              name="nome"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: theme.textColor }]}
                  placeholder="Nome completo"
                  placeholderTextColor={theme.placeholderColor}
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
            <MaterialIcons name="email" size={24} color={theme.primaryColor} style={styles.icon} />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: theme.textColor }]}
                  placeholder="E-mail"
                  placeholderTextColor={theme.placeholderColor}
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
            <MaterialIcons name="phone" size={24} color={theme.primaryColor} style={styles.icon} />
            <Controller
              control={control}
              name="telefone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: theme.textColor }]}
                  placeholder="Telefone"
                  placeholderTextColor={theme.placeholderColor}
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
            <MaterialIcons name="business" size={24} color={theme.primaryColor} style={styles.icon} />
            <Controller
              control={control}
              name="empresa"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: theme.textColor }]}
                  placeholder="Empresa"
                  placeholderTextColor={theme.placeholderColor}
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
            style={[styles.saveButton, { backgroundColor: theme.primaryColor }]}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={'white'} />
            ) : (
              <Text style={styles.saveButtonText}>
                Salvar alterações
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </DefaultPage>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
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
  },
  errorText: {
    color: '#d32f2f',
    alignSelf: 'flex-start',
    marginBottom: 10,
    fontSize: 12,
  },
  saveButton: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
