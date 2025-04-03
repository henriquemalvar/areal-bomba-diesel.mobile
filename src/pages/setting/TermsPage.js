import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';

export default function TermsPage() {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <Text style={[styles.title, { color: colors.text }]}>Termos de Uso</Text>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>1. Aceitação dos Termos</Text>
                        <Text style={[styles.text, { color: colors.textSecondary }]}>
                            Ao acessar e usar o aplicativo Areal Bomba Diesel, você concorda em cumprir estes termos de uso.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>2. Uso do Aplicativo</Text>
                        <Text style={[styles.text, { color: colors.textSecondary }]}>
                            O aplicativo é destinado ao gerenciamento de bombas de diesel. Você concorda em usar o aplicativo apenas para fins legítimos e de acordo com todas as leis e regulamentos aplicáveis.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>3. Conta do Usuário</Text>
                        <Text style={[styles.text, { color: colors.textSecondary }]}>
                            Você é responsável por manter a confidencialidade de sua conta e senha. Todas as atividades que ocorrerem sob sua conta são de sua responsabilidade.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>4. Modificações</Text>
                        <Text style={[styles.text, { color: colors.textSecondary }]}>
                            Reservamos o direito de modificar estes termos a qualquer momento. As alterações entram em vigor imediatamente após a publicação.
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