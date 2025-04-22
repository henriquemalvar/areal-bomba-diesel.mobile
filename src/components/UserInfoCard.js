import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/theme';
import { getRoleBadge, getRoleDescription } from '../utils/roles';
import Avatar from './common/Avatar';

export function UserInfoCard({ user }) {
    const roleInfo = getRoleBadge(user?.funcao);
    const roleDescription = getRoleDescription(user?.funcao);

    return (
        <View style={styles.container}>
            <Avatar name={user?.nome} size={64} />
            <View style={styles.infoContainer}>
                <Text style={styles.userName}>{user?.nome}</Text>
                <Text style={styles.userEmail}>{user?.email}</Text>
                <View style={[styles.roleBadge, { backgroundColor: roleInfo.color }]}>
                    <MaterialIcons
                        name={roleInfo.icon}
                        size={16}
                        color={colors.white}
                        style={styles.roleIcon}
                    />
                    <Text style={styles.roleText}>{roleDescription}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 16,
    },
    userName: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 8,
    },
    roleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    roleIcon: {
        marginRight: 6,
    },
    roleText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '500',
    },
});
