import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Senha atual deve ter no mínimo 6 caracteres'),
  newPassword: z.string().min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"],
});

export default function ChangePasswordPage() {
  const navigation = useNavigation();
  const { changePassword } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleChangePassword = async (data) => {
    try {
      setLoading(true);
      await changePassword(data.currentPassword, data.newPassword);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
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

              <Text style={styles.title}>Alterar Senha</Text>
              <Text style={styles.subtitle}>Digite sua senha atual e a nova senha</Text>

              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="lock" size={24} color="#1a237e" style={styles.icon} />
                  <Controller
                    control={control}
                    name="currentPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Senha atual"
                        placeholderTextColor="#666"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={!showCurrentPassword}
                        editable={!loading}
                      />
                    )}
                  />
                  <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                    <MaterialIcons
                      name={showCurrentPassword ? "visibility" : "visibility-off"}
                      size={24}
                      color="#1a237e"
                    />
                  </TouchableOpacity>
                </View>
                {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword.message}</Text>}

                <View style={styles.inputContainer}>
                  <MaterialIcons name="lock" size={24} color="#1a237e" style={styles.icon} />
                  <Controller
                    control={control}
                    name="newPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Nova senha"
                        placeholderTextColor="#666"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={!showNewPassword}
                        editable={!loading}
                      />
                    )}
                  />
                  <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                    <MaterialIcons
                      name={showNewPassword ? "visibility" : "visibility-off"}
                      size={24}
                      color="#1a237e"
                    />
                  </TouchableOpacity>
                </View>
                {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword.message}</Text>}

                <View style={styles.inputContainer}>
                  <MaterialIcons name="lock" size={24} color="#1a237e" style={styles.icon} />
                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Confirmar nova senha"
                        placeholderTextColor="#666"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={!showConfirmPassword}
                        editable={!loading}
                      />
                    )}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <MaterialIcons
                      name={showConfirmPassword ? "visibility" : "visibility-off"}
                      size={24}
                      color="#1a237e"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

                <TouchableOpacity
                  style={[styles.changeButton, loading && styles.changeButtonDisabled]}
                  onPress={handleSubmit(handleChangePassword)}
                  disabled={loading}
                >
                  <Text style={styles.changeButtonText}>
                    {loading ? 'Alterando...' : 'Alterar senha'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.backButtonText}>Voltar</Text>
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
  changeButton: {
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
  changeButtonDisabled: {
    backgroundColor: '#9fa8da',
  },
  changeButtonText: {
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
