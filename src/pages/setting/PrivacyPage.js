import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Container from '../../components/common/Container';
import { useTheme } from '../../contexts/ThemeContext';

export default function PrivacyPage() {
    const { theme } = useTheme();

    return (
        <Container>
            <ScrollView style={styles.content}>
                <Text style={styles.pageTitle}>Política de Privacidade</Text>
                <View style={styles.textContainer}>
                    <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                        1. Informações que Coletamos
                    </Text>
                    <Text style={[styles.text, { color: theme.textColor }]}>
                        Coletamos informações que você nos fornece diretamente, como nome, email e dados de veículos. Também coletamos dados de uso do aplicativo para melhorar nossa experiência.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                        2. Como Usamos suas Informações
                    </Text>
                    <Text style={[styles.text, { color: theme.textColor }]}>
                        Utilizamos suas informações para fornecer e melhorar nossos serviços, personalizar sua experiência e enviar comunicações importantes sobre o aplicativo.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                        3. Compartilhamento de Informações
                    </Text>
                    <Text style={[styles.text, { color: theme.textColor }]}>
                        Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para fornecer nossos serviços ou quando exigido por lei.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                        4. Segurança dos Dados
                    </Text>
                    <Text style={[styles.text, { color: theme.textColor }]}>
                        Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                        5. Seus Direitos
                    </Text>
                    <Text style={[styles.text, { color: theme.textColor }]}>
                        Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos, entre em contato conosco através dos canais de suporte.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                        6. Alterações na Política
                    </Text>
                    <Text style={[styles.text, { color: theme.textColor }]}>
                        Podemos atualizar esta política periodicamente. Notificaremos você sobre alterações significativas através do aplicativo ou por email.
                    </Text>

                    <Text style={[styles.lastUpdated, { color: theme.textColor }]}>
                        Última atualização: {new Date().toLocaleDateString('pt-BR')}
                    </Text>
                </View>
            </ScrollView>
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
    textContainer: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
    },
    lastUpdated: {
        fontSize: 14,
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center',
    },
}); 