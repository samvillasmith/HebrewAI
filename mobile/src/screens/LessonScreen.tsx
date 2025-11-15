import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { updateLessonProgress } from '../api/client';

export default function LessonScreen({ route, navigation }: any) {
  const { lessonId } = route.params;
  const { userId } = useAuth();
  const [completing, setCompleting] = useState(false);

  const handleCompleteLesson = async () => {
    if (!userId) return;

    setCompleting(true);
    try {
      await updateLessonProgress(lessonId, userId, 100, true, 100);
      Alert.alert(
        'Lesson Complete!',
        'Great job! Your progress has been saved.',
        [
          {
            text: 'Continue',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error completing lesson:', error);
      Alert.alert('Error', 'Failed to save progress. Please try again.');
    } finally {
      setCompleting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Lesson: {lessonId}</Text>
          <Text style={styles.subtitle}>Hebrew Learning</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📚 Lesson Content</Text>
          <Text style={styles.cardText}>
            This is where the interactive lesson content will be displayed.
          </Text>
          <Text style={styles.cardText}>
            Exercises, vocabulary, and interactive elements go here.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Learning Objectives</Text>
          <Text style={styles.cardText}>• Learn new vocabulary</Text>
          <Text style={styles.cardText}>• Practice pronunciation</Text>
          <Text style={styles.cardText}>• Complete exercises</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📝 Vocabulary</Text>
          <View style={styles.vocabularyItem}>
            <Text style={styles.hebrewText}>שָׁלוֹם</Text>
            <Text style={styles.transliteration}>shalom</Text>
            <Text style={styles.englishText}>hello/peace</Text>
          </View>
          <View style={styles.vocabularyItem}>
            <Text style={styles.hebrewText}>תּוֹדָה</Text>
            <Text style={styles.transliteration}>toda</Text>
            <Text style={styles.englishText}>thank you</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleCompleteLesson}
          disabled={completing}
        >
          <Text style={styles.completeButtonText}>
            {completing ? 'Saving...' : 'Complete Lesson'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  card: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  vocabularyItem: {
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 8,
  },
  hebrewText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  transliteration: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  englishText: {
    fontSize: 16,
    color: '#374151',
  },
  footer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  completeButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
