import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface LessonCompleteScreenProps {
  title: string;
  newWordsCount: number;
  timeSpent: number;
  streakDays: number;
  vocabularyLearned: string[];
  onContinue: () => void;
  onReview?: () => void;
}

export default function LessonCompleteScreen({
  title,
  newWordsCount,
  timeSpent,
  streakDays,
  vocabularyLearned,
  onContinue,
  onReview,
}: LessonCompleteScreenProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🎉</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Lesson Complete!</Text>
        <Text style={styles.subtitle}>{title}</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📚</Text>
            <Text style={styles.statNumber}>{newWordsCount}</Text>
            <Text style={styles.statLabel}>New Words</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⏱️</Text>
            <Text style={styles.statNumber}>{timeSpent}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statNumber}>{streakDays}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Vocabulary Learned */}
        {vocabularyLearned.length > 0 && (
          <View style={styles.vocabularyContainer}>
            <Text style={styles.vocabularyTitle}>Words You Learned:</Text>
            <View style={styles.vocabularyList}>
              {vocabularyLearned.map((word, index) => (
                <View key={index} style={styles.vocabularyChip}>
                  <Text style={styles.vocabularyWord}>{word}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: 40,
    marginBottom: 24,
  },
  icon: {
    fontSize: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 32,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
    width: '100%',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  vocabularyContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    marginBottom: 32,
  },
  vocabularyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  vocabularyList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  vocabularyChip: {
    backgroundColor: '#ede9fe',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  vocabularyWord: {
    fontSize: 18,
    color: '#6366f1',
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: '100%',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
