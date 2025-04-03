import React, { createContext, useContext, useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const FeedbackContext = createContext({});

export function FeedbackProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: insets.top + 10,
      bottomOffset: insets.bottom + 10,
      props: {
        style: {
          marginTop: insets.top,
        },
      },
    });
  };

  const showSuccess = (title, message) => {
    showToast('success', title, message);
  };

  const showError = (title, message) => {
    showToast('error', title, message);
  };

  const showInfo = (title, message) => {
    showToast('info', title, message);
  };

  return (
    <FeedbackContext.Provider
      value={{
        loading,
        setLoading,
        showSuccess,
        showError,
        showInfo,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {children}
        <Toast />
      </SafeAreaView>
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}