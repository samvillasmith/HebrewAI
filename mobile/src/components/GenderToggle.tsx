import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGender } from '../contexts/GenderContext';

export default function GenderToggle() {
  const { gender, setGender } = useGender();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Learning as:</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.option, gender === 'male' && styles.activeOption]}
          onPress={() => setGender('male')}
        >
          <Text style={[styles.optionText, gender === 'male' && styles.activeText]}>
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, gender === 'female' && styles.activeOption]}
          onPress={() => setGender('female')}
        >
          <Text style={[styles.optionText, gender === 'female' && styles.activeText]}>
            Female
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 2,
  },
  option: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  activeOption: {
    backgroundColor: '#6366f1',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeText: {
    color: '#ffffff',
  },
});
