import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { compareHebrewText, resolveGenderedText } from '../../utils/hebrewUtils';
import { useGender } from '../../contexts/GenderContext';

interface FillInBlankProps {
  item: {
    sentence: string | { male: string; female: string };
    translation: string;
    blankIndex?: number;
    options?: string[];
    correctAnswer: string;
    image?: string;
  };
  onCorrect: () => void;
}

export default function FillInBlankExercise({ item, onCorrect }: FillInBlankProps) {
  const { gender } = useGender();
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const sentence = resolveGenderedText(item.sentence, gender);

  const handleSubmit = () => {
    // Compare without niqqud since mobile keyboards don't have it
    const correct = compareHebrewText(answer, item.correctAnswer);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => onCorrect(), 1500);
    }
  };

  const sentenceParts = sentence.split('___');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fill in the Blank</Text>

      <View style={styles.sentenceContainer}>
        <Text style={styles.sentenceText}>
          {sentenceParts[0]}
          <Text style={styles.blankPlaceholder}>___</Text>
          {sentenceParts[1]}
        </Text>
        <Text style={styles.translation}>{item.translation}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Type your answer..."
        value={answer}
        onChangeText={setAnswer}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!showFeedback}
      />

      {!showFeedback && (
        <TouchableOpacity
          style={[styles.submitButton, !answer && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!answer}
        >
          <Text style={styles.submitButtonText}>Check Answer</Text>
        </TouchableOpacity>
      )}

      {showFeedback && (
        <View style={[styles.feedbackContainer, isCorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
          <Text style={styles.feedbackText}>
            {isCorrect ? '✓ Correct!' : `✗ The correct answer is: ${item.correctAnswer}`}
          </Text>
          {!isCorrect && (
            <TouchableOpacity
              style={styles.tryAgainButton}
              onPress={() => {
                setShowFeedback(false);
                setAnswer('');
              }}
            >
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 24 },
  sentenceContainer: { backgroundColor: '#f9fafb', padding: 24, borderRadius: 12, marginBottom: 24 },
  sentenceText: { fontSize: 20, color: '#1f2937', lineHeight: 32, marginBottom: 12 },
  blankPlaceholder: { color: '#6366f1', fontWeight: 'bold' },
  translation: { fontSize: 16, color: '#6b7280', fontStyle: 'italic' },
  input: { backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 12, padding: 16, fontSize: 18, marginBottom: 16 },
  submitButton: { backgroundColor: '#6366f1', padding: 16, borderRadius: 12 },
  submitButtonDisabled: { backgroundColor: '#9ca3af' },
  submitButtonText: { color: '#ffffff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
  feedbackContainer: { marginTop: 20, padding: 16, borderRadius: 12 },
  correctFeedback: { backgroundColor: '#d1fae5' },
  incorrectFeedback: { backgroundColor: '#fee2e2' },
  feedbackText: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  tryAgainButton: { marginTop: 12, backgroundColor: '#6366f1', padding: 12, borderRadius: 8 },
  tryAgainText: { color: '#ffffff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
});
