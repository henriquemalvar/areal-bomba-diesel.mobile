import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { InputField } from '../../components/InputField';
import logoImg from '../../../assets/areal-ilha-rio-doce.webp';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = React.useState(false);

  async function onSubmit({ email }) {
    setLoading(true);
    try {
      // await forgotPassword(email); // Chame sua função real aqui
      // Mostre feedback de sucesso se quiser
    } catch (e) {
      // Trate o erro conforme sua lógica
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.title}>Recuperar Senha</Text>
            <Text style={styles.subtitle}>
              Informe seu email para receber um link de redefinição de senha
            </Text>

            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'Informe seu e-mail',
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: 'E-mail inválido',
                  },
                }}
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

              <TouchableOpacity
                style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
              >
                <Text style={styles.submitButtonText}>
                  {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Login')}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <MaterialIcons name="arrow-back" size={18} color="#0a2c63" style={{ marginRight: 4 }} />
                  <Text style={styles.backButtonText}>Voltar para o login</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb',
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
  submitButton: {
    backgroundColor: '#0a2c63',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#0a2c63',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
