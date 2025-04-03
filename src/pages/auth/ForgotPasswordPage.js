import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Container from '../../components/common/Container';
import Input from '../../components/common/Input';
import { useAuth } from '../../contexts/AuthContext';
import { colors, typography } from '../../styles/theme';

const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const { forgotPassword } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  const handleForgotPassword = async (data) => {
    try {
      setLoading(true);
      setDebugInfo(null);
      await forgotPassword(data.email);

      if (__DEV__) {
        setDebugInfo({
          success: true,
          message: 'E-mail de recuperação enviado com sucesso',
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
              <Avatar size={120} icon="lock-reset" />
            </View>

            <Text style={[typography.h1, styles.title]}>Recuperar Senha</Text>
            <Text style={[typography.body2, styles.subtitle]}>
              Digite seu e-mail para receber as instruções de recuperação
            </Text>

            <Card>
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

              <Button
                title={loading ? 'Enviando...' : 'Enviar'}
                onPress={handleSubmit(handleForgotPassword)}
                loading={loading}
                style={styles.sendButton}
              />

              <Button
                title="Voltar para o login"
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
  sendButton: {
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
