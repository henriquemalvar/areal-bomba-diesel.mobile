import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../styles/theme';
import { getRoleBadge } from '../../utils/roles';

export default function DefaultPage({ children, style, scrollable = true, edges = ['bottom'], title, subtitle, backButton = false, showRoleBadge = false }) {
    const navigation = useNavigation();
    const { user } = useAuth();
    const Container = scrollable ? ScrollView : View;
    const containerProps = scrollable ? {
        contentContainerStyle: styles.scrollContent,
        showsVerticalScrollIndicator: false,
    } : {};

    return (
        <SafeAreaView style={[styles.container, style]} edges={edges}>
            <Container {...containerProps}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        {backButton && (
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
                            </TouchableOpacity>
                        )}
                        <View style={styles.titleContainer}>
                            {title && (
                                <Text style={styles.pageTitle}>{title}</Text>
                            )}
                        </View>
                        {showRoleBadge && user && (
                            <View style={[styles.badge, { backgroundColor: getRoleBadge(user.funcao).color }]}>
                                <MaterialIcons
                                    name={getRoleBadge(user.funcao).icon}
                                    size={14}
                                    color={colors.white}
                                    style={styles.badgeIcon}
                                />
                                <Text style={styles.badgeText}>{getRoleBadge(user.funcao).label}</Text>
                            </View>
                        )}
                    </View>
                    {subtitle && (
                        <Text style={styles.pageSubtitle}>{subtitle}</Text>
                    )}
                    {children}
                </View>
            </Container>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 0,
        zIndex: 1,
        padding: 8,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
    },
    pageSubtitle: {
        fontSize: 16,
        color: colors.grey,
        marginBottom: 16,
        textAlign: 'center',
    },
    badge: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeIcon: {
        marginRight: 4,
    },
    badgeText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '600',
    },
}); 