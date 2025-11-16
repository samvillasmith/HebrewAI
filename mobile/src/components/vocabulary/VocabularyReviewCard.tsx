import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { VocabularyItem } from '../../types';

interface VocabularyReviewCardProps {
  word: VocabularyItem;
  onRate: (quality: number) => void;
  currentIndex: number;
  totalWords: number;
}

export default function VocabularyReviewCard({
  word,
  onRate,
  currentIndex,
  totalWords,
}: VocabularyReviewCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  const qualityOptions = [
    { value: 1, label: 'Forgot', sublabel: 'Review soon', color: '#ef4444' },
    { value: 3, label: 'Hard', sublabel: 'Needs work', color: '#f59e0b' },
    { value: 4, label: 'Good', sublabel: 'Got it!', color: '#10b981' },
    { value: 5, label: 'Easy', sublabel: 'Too easy', color: '#3b82f6' },
  ];

  const handleRate = (quality: number) => {
    setShowAnswer(false);
    onRate(quality);
  };

  return (
    <View style={styles.container}>
      {/* Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {totalWords}
        </Text>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBar,
              { width: `${((currentIndex + 1) / totalWords) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {word.category} • {word.level}
            </Text>
          </View>
          <Text style={styles.repetitionsText}>
            {word.repetitions} {word.repetitions === 1 ? 'review' : 'reviews'}
          </Text>
        </View>

        {/* Hebrew Word */}
        <View style={styles.wordContainer}>
          <Text style={styles.hebrewText}>{word.hebrew}</Text>
          {word.transliteration && (
            <Text style={styles.transliterationText}>{word.transliteration}</Text>
          )}
        </View>

        {/* Question/Answer */}
        {!showAnswer ? (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              Can you remember what this word means?
            </Text>
            <TouchableOpacity
              style={styles.showAnswerButton}
              onPress={() => setShowAnswer(true)}
            >
              <Text style={styles.showAnswerButtonText}>Show Answer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.answerContainer}>
            {/* Translation */}
            <View style={styles.translationContainer}>
              <Text style={styles.translationLabel}>Translation:</Text>
              <Text style={styles.translationText}>{word.english}</Text>
            </View>

            {/* Example Sentence */}
            {word.exampleSentence && (
              <View style={styles.exampleContainer}>
                <Text style={styles.exampleLabel}>Example:</Text>
                <Text style={styles.exampleText}>{word.exampleSentence}</Text>
              </View>
            )}

            {/* Quality Buttons */}
            <View style={styles.qualityContainer}>
              <Text style={styles.qualityLabel}>How well did you know it?</Text>
              <View style={styles.qualityButtons}>
                {qualityOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[styles.qualityButton, { borderColor: option.color }]}
                    onPress={() => handleRate(option.value)}
                  >
                    <Text style={[styles.qualityButtonLabel, { color: option.color }]}>
                      {option.label}
                    </Text>
                    <Text style={styles.qualityButtonSublabel}>{option.sublabel}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  badge: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
  },
  repetitionsText: {
    fontSize: 12,
    color: '#6b7280',
  },
  wordContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  hebrewText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 8,
  },
  transliterationText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#6b7280',
  },
  questionContainer: {
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 20,
    textAlign: 'center',
  },
  showAnswerButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 10,
  },
  showAnswerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  answerContainer: {},
  translationContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  translationLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  translationText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  exampleContainer: {
    backgroundColor: '#f0f4f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  exampleLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  qualityContainer: {
    marginTop: 8,
  },
  qualityLabel: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 12,
    textAlign: 'center',
  },
  qualityButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  qualityButton: {
    flex: 1,
    minWidth: '48%',
    maxWidth: '48%',
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  qualityButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  qualityButtonSublabel: {
    fontSize: 11,
    color: '#6b7280',
  },
});
