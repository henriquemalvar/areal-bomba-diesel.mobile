import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import CustomModal from './Modal';

export default function FilterModal({
  visible,
  onClose,
  onApply,
  title,
  sections,
}) {
  const { theme } = useTheme();

  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={[styles.modalContent, { backgroundColor: theme.cardBackgroundColor }]}>
        <View style={styles.modalHeader}>
          <Text style={[styles.modalTitle, { color: theme.textColor }]}>
            {title}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons
              name="close"
              size={24}
              color={theme.textSecondaryColor}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalBody}>
          {sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                {section.title}
              </Text>
              <View style={styles.optionsContainer}>
                {section.options.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    style={[
                      styles.option,
                      {
                        backgroundColor: option.selected
                          ? theme.primaryColor
                          : theme.backgroundColor,
                        borderColor: theme.borderColor,
                      },
                    ]}
                    onPress={() => section.onSelect(option.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: option.selected ? '#fff' : theme.textColor,
                        },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={[styles.cancelButton, { borderColor: theme.borderColor }]}
            onPress={onClose}
          >
            <Text style={[styles.cancelButtonText, { color: theme.textColor }]}>
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.applyButton, { backgroundColor: theme.primaryColor }]}
            onPress={onApply}
          >
            <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalBody: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 14,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  applyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 