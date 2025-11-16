import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useGender } from '../../contexts/GenderContext';
import { resolveGenderedText } from '../../utils/genderUtils';

interface DialogueCompletionExerciseProps {
  item: {
    scenario: string;
    image?: string;
    speakerLine: {
      speaker: string;
      hebrew: string | { male: string; female: string };
      english: string;
    };
    options: Array<{
      hebrew: string | { male: string; female: string };
      english: string;
    }>;
    correctAnswer: number;
  };
  onCorrect: () => void;
}

export default function DialogueCompletionExercise({ item, onCorrect }: DialogueCompletionExerciseProps) {
  const { gender } = useGender();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const speakerHebrew = resolveGenderedText(item.speakerLine.hebrew, gender);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    const correct = index === item.correctAnswer;
    setShowFeedback(true);
    if (correct) {
      setTimeout(() => onCorrect(), 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete the Dialogue</Text>
      <Text style={styles.scenario}>{item.scenario}</Text>

      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}

      <View style={styles.dialogueBox}>
        <Text style={styles.speaker}>{item.speakerLine.speaker}:</Text>
        <Text style={styles.hebrew}>{speakerHebrew}</Text>
        <Text style={styles.english}>"{item.speakerLine.english}"</Text>
      </View>

      <Text style={styles.promptText}>You:</Text>

      {item.options.map((option, index) => {
        const hebrew = resolveGenderedText(option.hebrew, gender);
        const isSelected = selectedIndex === index;
        const isCorrect = index === item.correctAnswer;
        const showCorrect = showFeedback && isCorrect;
        const showIncorrect = showFeedback && isSelected && !isCorrect;

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              showCorrect && styles.correctOption,
              showIncorrect && styles.incorrectOption,
            ]}
            onPress={() => !showFeedback && handleSelect(index)}
            disabled={showFeedback}
          >
            <Text style={styles.optionHebrew}>{hebrew}</Text>
            <Text style={styles.optionEnglish}>"{option.english}"</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  scenario: { fontSize: 16, color: '#6b7280', marginBottom: 16 },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  dialogueBox: { backgroundColor: '#f9fafb', padding: 16, borderRadius: 12, marginBottom: 16 },
  speaker: { fontSize: 14, fontWeight: '600', color: '#6366f1', marginBottom: 8 },
  hebrew: { fontSize: 20, fontWeight: '600', marginBottom: 4 },
  english: { fontSize: 16, color: '#6b7280' },
  promptText: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  option: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 2, borderColor: '#e5e7eb' },
  correctOption: { backgroundColor: '#d1fae5', borderColor: '#10b981' },
  incorrectOption: { backgroundColor: '#fee2e2', borderColor: '#ef4444' },
  optionHebrew: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  optionEnglish: { fontSize: 14, color: '#6b7280' },
});
