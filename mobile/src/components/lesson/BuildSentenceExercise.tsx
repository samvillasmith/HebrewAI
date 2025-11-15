import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { speak } from '../../utils/tts';
import { Ionicons } from '@expo/vector-icons';

interface BuildSentenceExerciseProps {
  item: {
    text: string | { male: string; female: string };
    translation: string;
    words: (string | { male: string; female: string })[];
    correctOrder: (string | { male: string; female: string })[];
  };
  onCorrect: () => void;
}

export default function BuildSentenceExercise({ item, onCorrect }: BuildSentenceExerciseProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const text = typeof item.text === 'string' ? item.text : item.text.male;
  const words = item.words.map(w => typeof w === 'string' ? w : w.male);
  const correctOrder = item.correctOrder.map(w => typeof w === 'string' ? w : w.male);

  useEffect(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    playAudio();
  }, []);

  const playAudio = async () => {
    try {
      await speak(text, 'he-IL');
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleWordClick = (word: string) => {
    if (showFeedback) return;
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter(w => w !== word));
  };

  const handleRemoveWord = (index: number) => {
    if (showFeedback) return;
    const word = selectedWords[index];
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
    setAvailableWords([...availableWords, word]);
  };

  const handleCheck = () => {
    const correct = JSON.stringify(selectedWords) === JSON.stringify(correctOrder);
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setTimeout(() => onCorrect(), 2000);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔊 Listen and build the sentence</Text>
      <TouchableOpacity style={styles.replayButton} onPress={playAudio}>
        <Ionicons name="refresh" size={20} color="#6366f1" />
        <Text style={styles.replayText}>Replay audio</Text>
      </TouchableOpacity>
      <Text style={styles.translation}>Translation: {item.translation}</Text>

      <View style={[styles.answerArea, showFeedback && (isCorrect ? styles.correctArea : styles.incorrectArea)]}>
        <Text style={styles.label}>Your answer:</Text>
        <View style={styles.wordsContainer}>
          {selectedWords.length === 0 ? (
            <Text style={styles.placeholder}>Tap words below to build the sentence</Text>
          ) : (
            selectedWords.map((word, index) => (
              <TouchableOpacity key={index} style={styles.selectedWord} onPress={() => handleRemoveWord(index)}>
                <Text style={styles.selectedWordText}>{word}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>

      <View style={styles.availableWords}>
        {availableWords.map((word, index) => (
          <TouchableOpacity key={index} style={styles.availableWord} onPress={() => handleWordClick(word)}>
            <Text style={styles.availableWordText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {!showFeedback && selectedWords.length > 0 && (
        <TouchableOpacity style={styles.checkButton} onPress={handleCheck}>
          <Text style={styles.checkButtonText}>Check Answer</Text>
        </TouchableOpacity>
      )}

      {showFeedback && (
        <View style={[styles.feedback, isCorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
          <Text style={styles.feedbackText}>{isCorrect ? '✓ Perfect!' : '✗ Try again'}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  replayButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, backgroundColor: '#ede9fe', borderRadius: 8, marginBottom: 16 },
  replayText: { color: '#6366f1', fontWeight: '600' },
  translation: { fontSize: 16, color: '#6b7280', textAlign: 'center', marginBottom: 24 },
  answerArea: { backgroundColor: '#f9fafb', borderWidth: 2, borderColor: '#e5e7eb', borderStyle: 'dashed', borderRadius: 12, padding: 16, marginBottom: 20, minHeight: 100 },
  correctArea: { backgroundColor: '#d1fae5', borderColor: '#10b981', borderStyle: 'solid' },
  incorrectArea: { backgroundColor: '#fee2e2', borderColor: '#ef4444', borderStyle: 'solid' },
  label: { fontSize: 14, color: '#6b7280', marginBottom: 8 },
  wordsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  placeholder: { color: '#9ca3af', fontStyle: 'italic' },
  selectedWord: { backgroundColor: '#6366f1', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  selectedWordText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  availableWords: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  availableWord: { backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, borderWidth: 2, borderColor: '#e5e7eb' },
  availableWordText: { fontSize: 18, fontWeight: '500' },
  checkButton: { backgroundColor: '#6366f1', padding: 16, borderRadius: 12 },
  checkButtonText: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
  feedback: { marginTop: 16, padding: 16, borderRadius: 12 },
  correctFeedback: { backgroundColor: '#d1fae5' },
  incorrectFeedback: { backgroundColor: '#fee2e2' },
  feedbackText: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
});
