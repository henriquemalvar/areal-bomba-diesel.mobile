import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';

const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

export default function ForgotPasswordPage() {
  const navigation = useNavigation();
  const { forgotPassword } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = React.useState(false);

  const handleForgotPassword = async (data) => {
    try {
      setLoading(true);
      await forgotPassword(data.email);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro na recuperação de senha:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f5f5f5']}
        style={styles.gradient}
      >
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
                <Image
                  source={{ uri: 'https://api.a0.dev/assets/image?text=construction%20machinery%20management%20app%20logo&aspect=1:1' }}
                  style={styles.logo}
                />
                <View style={styles.logoOverlay} />
              </View>

              <Text style={styles.title}>Recuperar Senha</Text>
              <Text style={styles.subtitle}>Digite seu e-mail para receber as instruções</Text>

              <View style={styles.formContainer}>
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

                <TouchableOpacity
                  style={[styles.resetButton, loading && styles.resetButtonDisabled]}
                  onPress={handleSubmit(handleForgotPassword)}
                  disabled={loading}
                >
                  <Text style={styles.resetButtonText}>
                    {loading ? 'Enviando...' : 'Enviar instruções'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.backButtonText}>Voltar ao login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
  },
  logoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
  resetButton: {
    backgroundColor: '#1a237e',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resetButtonDisabled: {
    backgroundColor: '#9fa8da',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 15,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#1a237e',
    fontSize: 16,
    fontWeight: '500',
  },
});
