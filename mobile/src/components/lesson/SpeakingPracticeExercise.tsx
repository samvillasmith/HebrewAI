import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { speak } from '../../utils/tts';
import { Ionicons } from '@expo/vector-icons';

interface SpeakingPracticeExerciseProps {
  item: {
    hebrew: string;
    transliteration: string;
    english: string;
  };
  onComplete: () => void;
}

export default function SpeakingPracticeExercise({ item, onComplete }: SpeakingPracticeExerciseProps) {
  useEffect(() => {
    playAudio();
  }, []);

  const playAudio = async () => {
    try {
      await speak(item.hebrew, 'he-IL');
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎤 Speaking Practice</Text>
      <Text style={styles.instruction}>Listen and repeat out loud</Text>

      <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
        <Ionicons name="volume-high" size={48} color="#6366f1" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.hebrewText}>{item.hebrew}</Text>
        <Text style={styles.transliteration}>{item.transliteration}</Text>
        <Text style={styles.englishText}>{item.english}</Text>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={onComplete}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  instruction: { fontSize: 16, color: '#6b7280', marginBottom: 32 },
  audioButton: { backgroundColor: '#ede9fe', padding: 24, borderRadius: 60, marginBottom: 32 },
  card: { backgroundColor: '#fff', padding: 32, borderRadius: 16, alignItems: 'center', width: '100%', marginBottom: 32 },
  hebrewText: { fontSize: 48, fontWeight: 'bold', color: '#6366f1', marginBottom: 12 },
  transliteration: { fontSize: 20, color: '#6b7280', fontStyle: 'italic', marginBottom: 8 },
  englishText: { fontSize: 24, fontWeight: '600', color: '#1f2937' },
  continueButton: { backgroundColor: '#6366f1', paddingVertical: 16, paddingHorizontal: 48, borderRadius: 12 },
  continueButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
