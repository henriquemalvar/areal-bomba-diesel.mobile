import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AvatarWithInitials({ name, size = 120, fontSize = 48 }) {
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Text style={[styles.initials, { fontSize }]}>
                {getInitials(name)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 60,
        backgroundColor: '#1a237e',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    initials: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
}); 