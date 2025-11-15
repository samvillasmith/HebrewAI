import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { speak } from '../../utils/tts';
import { Ionicons } from '@expo/vector-icons';
import { useGender } from '../../contexts/GenderContext';

interface Option {
  image?: string;
  label: string;
  value: string;
}

interface ListenAndSelectProps {
  item: {
    audio?: string;
    text: string;
    options: Option[];
    correctAnswer: string;
  };
  onCorrect: () => void;
}

export default function ListenAndSelectExercise({ item, onCorrect }: ListenAndSelectProps) {
  const { gender } = useGender();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    playAudio();
  }, []);

  const playAudio = async () => {
    try {
      await speak(item.text, 'he-IL', gender);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleSelect = (value: string) => {
    setSelectedAnswer(value);
    const correct = value === item.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => onCorrect(), 1500);
    }
  };

  const getButtonStyle = (value: string) => {
    if (!showFeedback) return styles.optionButton;

    if (value === selectedAnswer) {
      return isCorrect
        ? [styles.optionButton, styles.correctButton]
        : [styles.optionButton, styles.incorrectButton];
    }

    if (value === item.correctAnswer) {
      return [styles.optionButton, styles.correctButton];
    }

    return styles.optionButton;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Listen and Select</Text>
      <Text style={styles.instruction}>What did you hear? Tap to listen again.</Text>

      <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
        <Ionicons name="volume-high" size={48} color="#6366f1" />
      </TouchableOpacity>

      <View style={styles.optionsContainer}>
        {item.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getButtonStyle(option.value)}
            onPress={() => !showFeedback && handleSelect(option.value)}
            disabled={showFeedback}
          >
            {option.image && (
              <Image source={{ uri: option.image }} style={styles.optionImage} />
            )}
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {showFeedback && (
        <View style={[styles.feedbackContainer, isCorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
          <Text style={styles.feedbackText}>{isCorrect ? '✓ Correct!' : '✗ Try again'}</Text>
          {!isCorrect && (
            <TouchableOpacity
              style={styles.tryAgainButton}
              onPress={() => {
                setShowFeedback(false);
                setSelectedAnswer(null);
              }}
            >
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 },
  instruction: { fontSize: 16, color: '#6b7280', marginBottom: 32 },
  audioButton: { alignSelf: 'center', backgroundColor: '#ede9fe', padding: 24, borderRadius: 60, marginBottom: 40 },
  optionsContainer: { gap: 12 },
  optionButton: { backgroundColor: '#ffffff', padding: 20, borderRadius: 12, borderWidth: 2, borderColor: '#e5e7eb', alignItems: 'center' },
  correctButton: { backgroundColor: '#d1fae5', borderColor: '#10b981' },
  incorrectButton: { backgroundColor: '#fee2e2', borderColor: '#ef4444' },
  optionImage: { width: 120, height: 120, borderRadius: 8, marginBottom: 12 },
  optionText: { fontSize: 18, color: '#1f2937', textAlign: 'center', fontWeight: '500' },
  feedbackContainer: { marginTop: 20, padding: 16, borderRadius: 12 },
  correctFeedback: { backgroundColor: '#d1fae5' },
  incorrectFeedback: { backgroundColor: '#fee2e2' },
  feedbackText: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  tryAgainButton: { marginTop: 12, backgroundColor: '#6366f1', padding: 12, borderRadius: 8 },
  tryAgainText: { color: '#ffffff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
});
