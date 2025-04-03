import React, { createContext, useContext } from 'react';

const lightTheme = {
    backgroundColor: '#ffffff',
    textColor: '#333333',
    primaryColor: '#1a237e',
    secondaryColor: '#0d47a1',
    accentColor: '#2196f3',
    errorColor: '#d32f2f',
    successColor: '#2e7d32',
    warningColor: '#f57c00',
    borderColor: '#e0e0e0',
    cardBackground: '#ffffff',
    inputBackground: '#ffffff',
    placeholderColor: '#666666',
    shadowColor: '#000000',
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    return (
        <ThemeContext.Provider value={{ theme: lightTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
    }
    return context;
} 