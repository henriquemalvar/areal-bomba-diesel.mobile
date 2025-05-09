import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

function getUserInitials(nameOrEmail) {
  if (!nameOrEmail) return '';
  const parts = nameOrEmail.split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Simulação de update (substitua por chamada real à API se necessário)
  async function saveName() {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      // Aqui você pode atualizar o contexto do usuário se necessário
    }, 1000);
  }

  function handleSignOut() {
    Alert.alert(
      'Sair do aplicativo?',
      'Tem certeza que deseja sair do aplicativo? Você precisará fazer login novamente para acessar.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            setIsLoggingOut(true);
            await signOut();
            setIsLoggingOut(false);
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>Gerencie suas informações e configurações</Text>

      {/* Avatar e nome */}
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getUserInitials(user?.name || user?.email)}</Text>
        </View>
        <Text style={styles.name}>{user?.name || user?.email?.split('@')[0]}</Text>
      </View>

      {/* Informações pessoais */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nome</Text>
          {!isEditing ? (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Feather name="edit" size={18} color="#1a237e" />
            </TouchableOpacity>
          ) : null}
        </View>
        {isEditing ? (
          <View style={styles.editRow}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
              editable={!isSaving}
            />
            <TouchableOpacity onPress={() => setIsEditing(false)} disabled={isSaving} style={styles.iconButton}>
              <Feather name="x" size={20} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity onPress={saveName} disabled={isSaving} style={styles.iconButton}>
              {isSaving ? (
                <ActivityIndicator size={18} color="#1a237e" />
              ) : (
                <Feather name="check" size={20} color="#1a237e" />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoBox}>
            <Text>{user?.name || 'Não informado'}</Text>
          </View>
        )}
        <Text style={[styles.label, { marginTop: 16 }]}>E-mail</Text>
        <View style={styles.infoBox}>
          <Text>{user?.email}</Text>
        </View>
      </View>

      {/* Informações da conta */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Informações da Conta</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.infoValue}>{user?.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Último login:</Text>
          <Text style={styles.infoValue}>{user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}</Text>
        </View>
      </View>

      {/* Botão sair */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut} disabled={isLoggingOut}>
        <MaterialIcons name="logout" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>{isLoggingOut ? 'Saindo...' : 'Sair do Aplicativo'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#888',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD600',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    padding: 10,
    width: '100%',
    marginTop: 2,
  },
  infoValue: {
    fontSize: 13,
    color: '#444',
    marginLeft: 8,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    width: '100%',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  iconButton: {
    padding: 4,
    marginLeft: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F44336',
    padding: 14,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 16,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 