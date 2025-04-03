import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFeedback } from '../../components/FeedbackProvider';
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={theme.textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>Alterar Senha</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
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