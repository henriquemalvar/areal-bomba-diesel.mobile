import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import logoImg from '../../../assets/areal-ilha-rio-doce.webp';
import { useFeedback } from '../../components/FeedbackProvider';
import { InputField } from '../../components/InputField';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../contexts/AuthContext';

const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { register } = useAuth();
  const { showError, showSuccess } = useFeedback();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async (data) => {
    try {
      setLoading(true);
      await register(data.name, data.email, data.password);
      showSuccess('Conta criada', 'Sua conta foi criada com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      showError('Erro no registro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.logoBox}>
            <Image
              source={logoImg}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Preencha os dados abaixo para criar sua conta no sistema</Text>

          <View style={styles.form}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Nome"
                  placeholder="Seu nome completo"
                  iconLeft={<MaterialIcons name="person" size={22} color="#1a237e" />}
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                  autoCapitalize="words"
                  editable={!loading}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="E-mail"
                  placeholder="seu@email.com"
                  iconLeft={<MaterialIcons name="email" size={22} color="#1a237e" />}
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  label="Senha"
                  placeholder="Mínimo 6 caracteres"
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                  editable={!loading}
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  label="Confirmar Senha"
                  placeholder="Digite a senha novamente"
                  value={value}
                  onChangeText={onChange}
                  error={errors.confirmPassword?.message}
                  editable={!loading}
                />
              )}
            />
            <TouchableOpacity
              style={[styles.registerButton, loading && styles.registerButtonDisabled]}
              onPress={handleSubmit(handleRegister)}
              disabled={loading}
            >
              <Text style={styles.registerButtonText}>{loading ? 'Criando conta...' : 'Criar Conta'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons name="arrow-back" size={18} color="#0a2c63" style={{ marginRight: 4 }} />
                <Text style={styles.loginButtonText}>Voltar para o login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    maxWidth: 400,
    padding: 28,
    alignItems: 'center',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 160,
    height: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 4,
  },
  form: {
    width: '100%',
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: '#0a2c63',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#0a2c63',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
