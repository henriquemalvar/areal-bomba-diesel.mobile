import React, { createContext, useContext } from 'react';
import Toast from 'react-native-toast-message';

const FeedbackContext = createContext({});

export const FeedbackProvider = ({ children }) => {
    const showSuccess = (message, title = '') => {
        Toast.show({
            type: 'success',
            text1: title,
            text2: message,
            position: 'top',
            visibilityTime: 3000,
        });
    };

    const showError = (message, title = 'Ops!') => {
        Toast.show({
            type: 'error',
            text1: title,
            text2: message,
            position: 'top',
            visibilityTime: 3000,
        });
    };

    const showInfo = (message, title = '') => {
        Toast.show({
            type: 'info',
            text1: title,
            text2: message,
            position: 'top',
            visibilityTime: 3000,
        });
    };

    return (
        <FeedbackContext.Provider value={{ showSuccess, showError, showInfo }}>
            {children}
            <Toast />
        </FeedbackContext.Provider>
    );
};

export const useFeedback = () => {
    const context = useContext(FeedbackContext);
    if (!context) {
        throw new Error('useFeedback deve ser usado dentro de um FeedbackProvider');
    }
    return context;
}; 