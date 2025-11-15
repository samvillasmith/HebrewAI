import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

interface DialogueWithBlanksExerciseProps {
  item: {
    scenario: string;
    image?: string;
    dialogue: Array<{
      speaker: string;
      line: string;
      isBlank: boolean;
      options?: Array<string | { male: string; female: string }>;
      correctAnswer?: number;
    }>;
  };
  onCorrect: () => void;
}

export default function DialogueWithBlanksExercise({ item, onCorrect }: DialogueWithBlanksExerciseProps) {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const blankIndices = item.dialogue
    .map((d, i) => (d.isBlank ? i : -1))
    .filter(i => i !== -1);

  const handleSelect = (dialogueIndex: number, optionIndex: number) => {
    if (showFeedback) return;
    const newAnswers = { ...answers, [dialogueIndex]: optionIndex };
    setAnswers(newAnswers);

    // Check if all blanks are filled
    if (Object.keys(newAnswers).length === blankIndices.length) {
      // Auto-check
      const allCorrect = blankIndices.every(i => newAnswers[i] === item.dialogue[i].correctAnswer);
      setShowFeedback(true);
      if (allCorrect) {
        setTimeout(() => onCorrect(), 2000);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Complete the Dialogue</Text>
      <Text style={styles.scenario}>{item.scenario}</Text>

      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}

      {item.dialogue.map((turn, index) => (
        <View key={index} style={styles.turn}>
          <Text style={styles.speaker}>{turn.speaker}:</Text>

          {!turn.isBlank ? (
            <Text style={styles.line}>{turn.line}</Text>
          ) : (
            <View style={styles.blankOptions}>
              {turn.options?.map((option, optIdx) => {
                const text = typeof option === 'string' ? option : option.male;
                const isSelected = answers[index] === optIdx;
                const isCorrect = optIdx === turn.correctAnswer;
                const showCorrect = showFeedback && isCorrect;
                const showIncorrect = showFeedback && isSelected && !isCorrect;

                return (
                  <TouchableOpacity
                    key={optIdx}
                    style={[
                      styles.option,
                      isSelected && !showFeedback && styles.selectedOption,
                      showCorrect && styles.correctOption,
                      showIncorrect && styles.incorrectOption,
                    ]}
                    onPress={() => handleSelect(index, optIdx)}
                    disabled={showFeedback}
                  >
                    <Text style={styles.optionText}>{text}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  scenario: { fontSize: 16, color: '#6b7280', marginBottom: 16 },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  turn: { marginBottom: 20 },
  speaker: { fontSize: 16, fontWeight: '600', color: '#6366f1', marginBottom: 8 },
  line: { fontSize: 18, color: '#1f2937', backgroundColor: '#f9fafb', padding: 12, borderRadius: 8 },
  blankOptions: { gap: 8 },
  option: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 2, borderColor: '#e5e7eb' },
  selectedOption: { backgroundColor: '#ede9fe', borderColor: '#6366f1' },
  correctOption: { backgroundColor: '#d1fae5', borderColor: '#10b981' },
  incorrectOption: { backgroundColor: '#fee2e2', borderColor: '#ef4444' },
  optionText: { fontSize: 16, fontWeight: '500' },
});
