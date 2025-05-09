import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContext';
import Page from '../../components/common/Page';
import { updateProfile } from '../../services/auth';

const COLORS = {
  primary: '#0a2c63',
  error: '#F44336',
  background: '#fff',
  cardBackground: '#fff',
  inputBackground: '#f7f9fb',
  text: '#222',
  textSecondary: '#757575',
  border: '#ddd',
  avatar: '#0a2c63',
};

const getUserInitials = (nameOrEmail) => {
  if (!nameOrEmail) return '';
  const parts = nameOrEmail.split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const Avatar = ({ name, email }) => {
  const initials = getUserInitials(name || email);
  const displayName = name || email?.split('@')[0];

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <Text style={styles.name}>{displayName}</Text>
    </View>
  );
};

Avatar.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};

const PersonalInfo = ({ user, isEditing, name, setName, isSaving, onSave, onCancel, setIsEditing }) => {
  const [error, setError] = useState('');

  const validateName = (text) => {
    if (!text.trim()) {
      setError('O nome não pode estar vazio');
      return false;
    }
    if (text.length < 3) {
      setError('O nome deve ter pelo menos 3 caracteres');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Informações Pessoais</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Nome Completo</Text>
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Feather name="edit" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>
      {isEditing ? (
        <View style={styles.editRow}>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            value={name}
            onChangeText={(text) => {
              setName(text);
              validateName(text);
            }}
            placeholder="Digite seu nome completo"
            editable={!isSaving}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity onPress={onCancel} disabled={isSaving} style={styles.iconButton}>
            <Feather name="x" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              if (validateName(name)) {
                onSave();
              }
            }} 
            disabled={isSaving || !!error} 
            style={styles.iconButton}
          >
            {isSaving ? (
              <ActivityIndicator size={18} color={COLORS.primary} />
            ) : (
              <Feather name="check" size={20} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.infoBox}>
          <Text>{user?.user_metadata?.nome || 'Nome não informado'}</Text>
        </View>
      )}
      <Text style={[styles.label, { marginTop: 16 }]}>E-mail</Text>
      <View style={styles.infoBox}>
        <Text>{user?.email || 'E-mail não informado'}</Text>
      </View>
    </View>
  );
};

PersonalInfo.propTypes = {
  user: PropTypes.shape({
    user_metadata: PropTypes.shape({
      nome: PropTypes.string,
    }),
    email: PropTypes.string,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
};

const AccountInfo = ({ user }) => (
  <View style={styles.card}>
    <Text style={styles.sectionTitle}>Informações da Conta</Text>
    <View style={styles.infoRow}>
      <Text style={styles.label}>Último acesso:</Text>
      <Text style={styles.infoValue}>
        {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('pt-BR') : 'Nunca acessado'}
      </Text>
    </View>
  </View>
);

AccountInfo.propTypes = {
  user: PropTypes.shape({
    last_sign_in_at: PropTypes.string,
  }).isRequired,
};

export default function ProfilePage() {
  const { user, signOut, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.user_metadata?.nome || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSaveName = async () => {
    setIsSaving(true);
    try {
      const updatedUser = await updateProfile({ nome: name });
      setIsEditing(false);
      Alert.alert('Sucesso', 'Seu nome foi atualizado com sucesso!');
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível atualizar seu nome. Por favor, tente novamente.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sair do aplicativo',
      'Tem certeza que deseja sair? Você precisará fazer login novamente para acessar.',
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
  };

  return (
    <Page subtitle="Gerencie suas informações pessoais e preferências">
      <Avatar name={user?.user_metadata?.nome} email={user?.email} />

      <PersonalInfo
        user={{
          ...user,
          name: user?.user_metadata?.nome
        }}
        isEditing={isEditing}
        name={name}
        setName={setName}
        isSaving={isSaving}
        onSave={handleSaveName}
        onCancel={() => setIsEditing(false)}
        setIsEditing={setIsEditing}
      />

      <AccountInfo user={user} />

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleSignOut} 
        disabled={isLoggingOut}
      >
        <MaterialIcons name="logout" size={20} color={COLORS.background} style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>
          {isLoggingOut ? 'Saindo...' : 'Sair do Aplicativo'}
        </Text>
      </TouchableOpacity>
    </Page>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.avatar,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 32,
    color: COLORS.background,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    color: COLORS.text,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
    color: COLORS.primary,
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
    alignSelf: 'flex-start',
    color: COLORS.text,
  },
  infoBox: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 6,
    padding: 10,
    width: '100%',
    marginTop: 2,
  },
  infoValue: {
    fontSize: 13,
    color: COLORS.text,
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
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 8,
    marginRight: 8,
    backgroundColor: COLORS.background,
    color: COLORS.text,
  },
  iconButton: {
    padding: 4,
    marginLeft: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.error,
    padding: 14,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 16,
  },
  logoutText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
}); 