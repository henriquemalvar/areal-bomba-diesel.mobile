import React from 'react';
import {
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export default function CustomModal({
  visible,
  onClose,
  children,
  animationType = 'slide',
  transparent = true,
}) {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackgroundColor }]}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
}); 