import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { speak } from '../../utils/tts';
import { Ionicons } from '@expo/vector-icons';
import { useGender } from '../../contexts/GenderContext';

interface ListenAndTypeExerciseProps {
  item: {
    text: string;
    translationHint: string;
  };
  onCorrect: () => void;
}

export default function ListenAndTypeExercise({ item, onCorrect }: ListenAndTypeExerciseProps) {
  const { gender } = useGender();
  const [answer, setAnswer] = useState('');
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

  const handleCheck = () => {
    const correct = answer.trim() === item.text.trim();
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setTimeout(() => onCorrect(), 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎧 Listen and Type</Text>
      <Text style={styles.instruction}>Listen carefully and type what you hear</Text>

      <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
        <Ionicons name="volume-high" size={48} color="#6366f1" />
        <Text style={styles.replayText}>Tap to replay</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>Hint: {item.translationHint}</Text>

      <TextInput
        style={styles.input}
        placeholder="Type here..."
        value={answer}
        onChangeText={setAnswer}
        editable={!showFeedback}
        multiline
        autoCorrect={false}
      />

      {!showFeedback && (
        <TouchableOpacity
          style={[styles.checkButton, !answer && styles.checkButtonDisabled]}
          onPress={handleCheck}
          disabled={!answer}
        >
          <Text style={styles.checkButtonText}>Check Answer</Text>
        </TouchableOpacity>
      )}

      {showFeedback && (
        <View style={[styles.feedback, isCorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
          <Text style={styles.feedbackText}>
            {isCorrect ? '✓ Perfect!' : `✗ Correct answer: ${item.text}`}
          </Text>
          {!isCorrect && (
            <TouchableOpacity style={styles.tryAgainButton} onPress={() => { setShowFeedback(false); setAnswer(''); }}>
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  instruction: { fontSize: 16, color: '#6b7280', textAlign: 'center', marginBottom: 32 },
  audioButton: { alignItems: 'center', backgroundColor: '#ede9fe', padding: 24, borderRadius: 16, marginBottom: 8 },
  replayText: { color: '#6366f1', fontWeight: '600', marginTop: 8 },
  hint: { fontSize: 14, color: '#6b7280', fontStyle: 'italic', textAlign: 'center', marginBottom: 24 },
  input: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 12, padding: 16, fontSize: 24, textAlign: 'center', marginBottom: 16, minHeight: 80 },
  checkButton: { backgroundColor: '#6366f1', padding: 16, borderRadius: 12 },
  checkButtonDisabled: { backgroundColor: '#9ca3af' },
  checkButtonText: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
  feedback: { marginTop: 16, padding: 16, borderRadius: 12 },
  correctFeedback: { backgroundColor: '#d1fae5' },
  incorrectFeedback: { backgroundColor: '#fee2e2' },
  feedbackText: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  tryAgainButton: { marginTop: 12, backgroundColor: '#6366f1', padding: 12, borderRadius: 8 },
  tryAgainText: { color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
});
