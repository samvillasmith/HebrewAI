import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { VocabularyItem } from '../../types/lesson';
import { speak } from '../../utils/tts';
import { Ionicons } from '@expo/vector-icons';
import { useGender } from '../../contexts/GenderContext';
import { resolveGenderedText } from '../../utils/hebrewUtils';

interface VocabularyIntroProps {
  item: VocabularyItem;
  onContinue: () => void;
  autoPlay?: boolean;
}

export default function VocabularyIntro({ item, onContinue, autoPlay = true }: VocabularyIntroProps) {
  const { gender } = useGender();

  const hebrew = resolveGenderedText(item.hebrew, gender);
  const transliteration = resolveGenderedText(item.transliteration, gender);

  useEffect(() => {
    if (autoPlay) {
      playAudio();
    }
  }, [hebrew]);

  const playAudio = async () => {
    try {
      await speak(hebrew, 'he-IL', gender);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <View style={styles.container}>
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}

      <TouchableOpacity style={styles.audioButton} onPress={playAudio} activeOpacity={0.7}>
        <Ionicons name="volume-high" size={32} color="#6366f1" />
        <Text style={styles.hebrewText}>{hebrew}</Text>
      </TouchableOpacity>

      <Text style={styles.transliteration}>{transliteration}</Text>
      <Text style={styles.englishText}>{item.english}</Text>

      {item.note && (
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>💡 {item.note}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  image: { width: 300, height: 200, borderRadius: 12, marginBottom: 30 },
  audioButton: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  hebrewText: { fontSize: 56, fontWeight: 'bold', color: '#6366f1' },
  transliteration: { fontSize: 24, color: '#6b7280', fontStyle: 'italic', marginBottom: 8 },
  englishText: { fontSize: 28, fontWeight: '600', color: '#1f2937', marginBottom: 20 },
  noteContainer: { backgroundColor: '#fef3c7', borderLeftWidth: 4, borderLeftColor: '#fbbf24', padding: 16, borderRadius: 8, marginTop: 20, maxWidth: 350 },
  noteText: { fontSize: 14, color: '#78350f' },
  continueButton: { backgroundColor: '#6366f1', paddingVertical: 16, paddingHorizontal: 48, borderRadius: 12, marginTop: 32 },
  continueButtonText: { color: '#ffffff', fontSize: 18, fontWeight: '600' },
});
