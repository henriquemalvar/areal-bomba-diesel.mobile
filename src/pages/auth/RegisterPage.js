import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { z } from 'zod';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Container from '../../components/common/Container';
import Input from '../../components/common/Input';
import { useAuth } from '../../contexts/AuthContext';
import { colors, typography } from '../../styles/theme';

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
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  const handleRegister = async (data) => {
    try {
      setLoading(true);
      setDebugInfo(null);
      const response = await register(data.name, data.email, data.password);

      if (__DEV__) {
        setDebugInfo({
          success: true,
          user: response.user,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      if (__DEV__) {
        setDebugInfo({
          success: false,
          error: error.message,
          timestamp: new Date().toISOString(),
        });
      }
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
            <View style={styles.logoContainer}>
              <Avatar size={120} icon="person-add" />
            </View>

            <Text style={[typography.h1, styles.title]}>Criar Conta</Text>
            <Text style={[typography.body2, styles.subtitle]}>Preencha os dados para se registrar</Text>

            <Card>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Nome"
                    icon="person"
                    placeholder="Digite seu nome"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="words"
                    error={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="E-mail"
                    icon="email"
                    placeholder="Digite seu e-mail"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Senha"
                    icon="lock"
                    placeholder="Digite sua senha"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={!showPassword}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    error={errors.password?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Confirmar Senha"
                    icon="lock"
                    placeholder="Confirme sua senha"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={!showConfirmPassword}
                    showPassword={showConfirmPassword}
                    onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    error={errors.confirmPassword?.message}
                  />
                )}
              />

              <Button
                title={loading ? 'Criando conta...' : 'Criar Conta'}
                onPress={handleSubmit(handleRegister)}
                loading={loading}
                style={styles.registerButton}
              />

              <Button
                title="Já tem uma conta? Faça login"
                onPress={() => navigation.navigate('Login')}
                variant="secondary"
              />
            </Card>

            {__DEV__ && debugInfo && (
              <View style={styles.debugContainer}>
                <Text style={styles.debugTitle}>Debug Info:</Text>
                <Text style={styles.debugText}>
                  {JSON.stringify(debugInfo, null, 2)}
                </Text>
              </View>
            )}
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
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 40,
    textAlign: 'center',
  },
  registerButton: {
    marginBottom: 10,
  },
  debugContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.background.dark,
    borderRadius: 8,
  },
  debugTitle: {
    ...typography.body2,
    marginBottom: 5,
  },
  debugText: {
    ...typography.caption,
  },
});
