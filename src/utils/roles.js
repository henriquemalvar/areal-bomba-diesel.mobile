import { colors } from '../styles/theme';

export const roles = {
    ADMIN: {
        label: 'ADMIN',
        color: colors.primary,
        icon: 'security',
        description: 'Administrador'
    },
    MANAGER: {
        label: 'GERENTE',
        color: colors.primary,
        icon: 'supervisor-account',
        description: 'Gerente'
    },
    OPERATOR: {
        label: 'OPERADOR',
        color: colors.primary,
        icon: 'engineering',
        description: 'Operador'
    },
    USER: {
        label: 'USUÁRIO',
        color: colors.primary,
        icon: 'person',
        description: 'Usuário'
    },
};

export const getRoleInfo = (role) => {
    return roles[role?.toUpperCase()] || roles.USER;
};

export const getRoleDescription = (role) => {
    return getRoleInfo(role).description;
};

export const getRoleBadge = (role) => {
    const roleInfo = getRoleInfo(role);
    return {
        label: roleInfo.label,
        color: roleInfo.color,
        icon: roleInfo.icon
    };
}; 