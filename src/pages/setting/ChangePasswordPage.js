import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { z } from 'zod';
import DefaultPage from '../../components/common/DefaultPage';
import { useFeedback } from '../../components/FeedbackProvider';
import { UserInfoCard } from '../../components/UserInfoCard';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: z.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
  confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export default function ChangePasswordPage() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { showSuccess, showError } = useFeedback();
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateProfile({
        senhaAtual: data.currentPassword,
        novaSenha: data.newPassword
      });
      showSuccess('Senha alterada com sucesso!');
      navigation.goBack();
    } catch (error) {
      showError('Não foi possível alterar a senha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}
    >
      <DefaultPage title="Alterar Senha" backButton={true}>
        <UserInfoCard user={user} />
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color={theme.primaryColor} style={styles.icon} />
            <Controller
              control={control}
              name="currentPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: theme.textColor }]}
                  placeholder="Digite sua senha atual"
                  placeholderTextColor={theme.placeholderColor}
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!loading}
                />
              )}
            />
          </View>
          {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword.message}</Text>}

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock-outline" size={24} color={theme.primaryColor} style={styles.icon} />
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: theme.textColor }]}
                  placeholder="Digite a nova senha"
                  placeholderTextColor={theme.placeholderColor}
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!loading}
                />
              )}
            />
          </View>
          {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword.message}</Text>}

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock-outline" size={24} color={theme.primaryColor} style={styles.icon} />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: theme.textColor }]}
                  placeholder="Confirme a nova senha"
                  placeholderTextColor={theme.placeholderColor}
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!loading}
                />
              )}
            />
          </View>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primaryColor }]}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={theme.textColor} />
            ) : (
              <Text style={styles.buttonText}>
                Alterar Senha
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
  button: {
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 