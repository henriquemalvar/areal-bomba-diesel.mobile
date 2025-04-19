import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFeedback } from '../../components/FeedbackProvider';
import Container from '../../components/common/Container';
import { useTheme } from '../../contexts/ThemeContext';

export default function ChangePasswordPage() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { showSuccess, showError } = useFeedback();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      showError('As senhas não coincidem');
      return;
    }

    if (newPassword.length < 6) {
      showError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);
      // TODO: Implementar chamada à API para alterar senha
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulação
      showSuccess('Senha alterada com sucesso!');
      navigation.goBack();
    } catch (error) {
      showError('Não foi possível alterar a senha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Alterar Senha</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.textColor }]}>Senha Atual</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.inputBackgroundColor,
                color: theme.textColor,
                borderColor: theme.borderColor
              }]}
              placeholder="Digite sua senha atual"
              placeholderTextColor={theme.placeholderColor}
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.textColor }]}>Nova Senha</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.inputBackgroundColor,
                color: theme.textColor,
                borderColor: theme.borderColor
              }]}
              placeholder="Digite a nova senha"
              placeholderTextColor={theme.placeholderColor}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.textColor }]}>Confirmar Nova Senha</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.inputBackgroundColor,
                color: theme.textColor,
                borderColor: theme.borderColor
              }]}
              placeholder="Confirme a nova senha"
              placeholderTextColor={theme.placeholderColor}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primaryColor }]}
            onPress={handleChangePassword}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Alterando...' : 'Alterar Senha'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
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
  formContainer: {
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 