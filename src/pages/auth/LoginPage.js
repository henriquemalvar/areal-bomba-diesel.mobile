import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { useFeedback } from '../../components/FeedbackProvider';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { PasswordInput } from '../../components/PasswordInput';
import { InputField } from '../../components/InputField';
import logoImg from '../../../assets/areal-ilha-rio-doce.webp';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export default function LoginScreen() {
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const { showError } = useFeedback();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      await signIn(data.email, data.password);
    } catch (error) {
      showError('Erro no login', error.message);
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
        <View style={styles.card}>
          <View style={styles.logoBox}>
            <Image
              source={logoImg}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Areal Ilha do Rio Doce</Text>
          <Text style={styles.subtitle}>Entre com suas credenciais para acessar o sistema</Text>

          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="E-mail"
                  iconLeft={<MaterialIcons name="email" size={22} color="#1a237e" />}
                  value={value}
                  onChangeText={onChange}
                  placeholder="seu@email.com"
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
                  value={value}
                  onChangeText={onChange}
                  placeholder="Digite sua senha"
                  error={errors.password?.message}
                  editable={!loading}
                />
              )}
            />

            <TouchableOpacity
              style={styles.forgotPasswordBtn}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleSubmit(handleLogin)}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerBox}>
            <Text style={styles.footerText}>
              Não tem uma conta?{' '}
              <Text style={styles.footerLink} onPress={() => navigation.navigate('Register')}>
                Cadastre-se
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  gradient: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
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
  forgotPasswordBtn: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#0a2c63',
    fontSize: 13,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#0a2c63',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerBox: {
    marginTop: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#222',
  },
  footerLink: {
    color: '#0a2c63',
    fontWeight: 'bold',
  },
});