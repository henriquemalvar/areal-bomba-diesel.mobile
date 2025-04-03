import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';

export default function PrivacyPage() {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <Text style={[styles.title, { color: colors.text }]}>Política de Privacidade</Text>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>1. Coleta de Dados</Text>
                        <Text style={[styles.text, { color: colors.textSecondary }]}>
                            Coletamos informações necessárias para o funcionamento do aplicativo, incluindo dados de usuário e informações de uso.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>2. Uso das Informações</Text>
                        <Text style={[styles.text, { color: colors.textSecondary }]}>
                            Utilizamos suas informações para fornecer e melhorar nossos serviços, além de garantir a segurança da plataforma.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>3. Proteção de Dados</Text>
                        <Text style={[styles.text, { color: colors.textSecondary }]}>
                            Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>4. Compartilhamento</Text>
                        <Text style={[styles.text, { color: colors.textSecondary }]}>
                            Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para o funcionamento do serviço.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
}); 