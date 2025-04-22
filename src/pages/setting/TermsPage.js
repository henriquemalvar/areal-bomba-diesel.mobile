import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DefaultPage from '../../components/common/DefaultPage';
import { useTheme } from '../../contexts/ThemeContext';

export default function TermsPage() {
    const { theme } = useTheme();

    return (
        <DefaultPage title="Termos de Uso" backButton={true}>
            <View style={styles.textContainer}>
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                    1. Aceitação dos Termos
                </Text>
                <Text style={[styles.text, { color: theme.textColor }]}>
                    Ao acessar e usar o aplicativo Areal Bomba Diesel, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso.
                </Text>

                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                    2. Uso do Aplicativo
                </Text>
                <Text style={[styles.text, { color: theme.textColor }]}>
                    O aplicativo é destinado ao gerenciamento de abastecimento e manutenção de veículos. Você concorda em usar o aplicativo apenas para fins legais e de acordo com estes termos.
                </Text>

                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                    3. Conta do Usuário
                </Text>
                <Text style={[styles.text, { color: theme.textColor }]}>
                    Você é responsável por manter a confidencialidade de suas credenciais de login e por todas as atividades que ocorrem em sua conta.
                </Text>

                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                    4. Privacidade
                </Text>
                <Text style={[styles.text, { color: theme.textColor }]}>
                    Nós respeitamos sua privacidade. Consulte nossa Política de Privacidade para entender como coletamos e usamos suas informações.
                </Text>

                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                    5. Limitação de Responsabilidade
                </Text>
                <Text style={[styles.text, { color: theme.textColor }]}>
                    O aplicativo é fornecido "como está". Não garantimos que o aplicativo será ininterrupto ou livre de erros.
                </Text>

                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                    6. Alterações nos Termos
                </Text>
                <Text style={[styles.text, { color: theme.textColor }]}>
                    Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no aplicativo.
                </Text>

                <Text style={[styles.lastUpdated, { color: theme.textColor }]}>
                    Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </Text>
            </View>
        </DefaultPage>
    );
}

const styles = StyleSheet.create({
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