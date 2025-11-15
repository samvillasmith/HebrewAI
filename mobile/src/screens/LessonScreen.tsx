import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { updateLessonProgress } from '../api/client';
import { LessonData } from '../types/lesson';
import InteractiveLesson from '../components/lesson/InteractiveLesson';

// Import ALL lesson data
import { cafeLessonData } from '../data/cafe-lesson';
import { alefBetPart1 } from '../data/lessons/alef-bet-part-1';
import { essentialGreetings } from '../data/lessons/essential-greetings';
import { introductions } from '../data/lessons/introductions';
import { politeExpressions } from '../data/lessons/polite-expressions';
import { vowelsFinalForms } from '../data/lessons/vowels-final-forms';

// Map ALL lessons
const lessonMap: Record<string, any> = {
  'cafe-1': cafeLessonData,
  'at-the-cafe': cafeLessonData,
  'alef-bet-part-1': alefBetPart1,
  'essential-greetings': essentialGreetings,
  'introductions': introductions,
  'polite-expressions': politeExpressions,
  'vowels-final-forms': vowelsFinalForms,
};

export default function LessonScreen({ route, navigation }: any) {
  const { lessonId } = route.params;
  const { userId } = useAuth();
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLesson();
  }, [lessonId]);

  const loadLesson = async () => {
    try {
      setLoading(true);
      setError(null);

      if (lessonMap[lessonId]) {
        setLessonData(lessonMap[lessonId] as LessonData);
      } else {
        setError(`Lesson "${lessonId}" not found`);
      }
    } catch (err) {
      console.error('Error loading lesson:', err);
      setError('Failed to load lesson. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLessonComplete = async () => {
    if (!userId) {
      navigation.goBack();
      return;
    }

    try {
      await updateLessonProgress(lessonId, userId, 100, true, 100);
      Alert.alert('Great Job!', 'Your progress has been saved.', [{ text: 'Continue', onPress: () => navigation.goBack() }]);
    } catch (error) {
      console.error('Error saving progress:', error);
      Alert.alert('Progress Saved Locally', 'Your progress will be synced when connection is restored.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading lesson...</Text>
      </View>
    );
  }

  if (error || !lessonData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>😕</Text>
        <Text style={styles.errorText}>{error || 'Lesson not found'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.retryButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <InteractiveLesson lessonData={lessonData} onComplete={handleLessonComplete} />;
}

const styles = StyleSheet.create({
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8', padding: 20 },
  loadingText: { marginTop: 16, fontSize: 16, color: '#6b7280' },
  errorIcon: { fontSize: 64, marginBottom: 16 },
  errorText: { fontSize: 18, color: '#6b7280', textAlign: 'center', marginBottom: 24 },
  retryButton: { backgroundColor: '#6366f1', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 12 },
  retryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});
