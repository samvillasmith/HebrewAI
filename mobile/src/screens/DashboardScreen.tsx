import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useFocusEffect } from '@react-navigation/native';
import { fetchUserProgress, fetchVocabularyStats } from '../api/client';
import { a1Curriculum } from '../data/curriculum';
import { UserProgress, Course } from '../types';

export default function DashboardScreen({ navigation }: any) {
  const { userId } = useAuth();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    currentLevel: 'A1',
    lessonsCompleted: 0,
    totalLessons: 35,
    wordsLearned: 0,
    totalWords: 700,
    streakDays: 0,
    xpPoints: 0,
  });
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const loadUserProgress = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const progressData = await fetchUserProgress(userId);
      const vocabData = await fetchVocabularyStats(userId);

      if (progressData.lesson_progress) {
        const completed = new Set(
          progressData.lesson_progress
            .filter((lp: any) => lp.is_completed)
            .map((lp: any) => lp.lesson_id)
        );
        setCompletedLessons(completed);
      }

      setUserProgress({
        currentLevel: progressData.current_level || 'A1',
        lessonsCompleted: progressData.lessons_complete || 0,
        totalLessons: 35,
        wordsLearned: vocabData.total_words || 0,
        totalWords: 700,
        streakDays: progressData.streak_days || 0,
        xpPoints: progressData.xp_points || 0,
      });
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Refresh data whenever the screen comes into focus (e.g., after completing a lesson)
  useFocusEffect(
    useCallback(() => {
      loadUserProgress();
    }, [loadUserProgress])
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome back! 👋</Text>
        <Text style={styles.headerSubtitle}>Continue your Hebrew learning journey</Text>
      </View>

      {/* Progress Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Current Level</Text>
          <Text style={styles.statValue}>{userProgress.currentLevel}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Lessons</Text>
          <Text style={styles.statValue}>
            {userProgress.lessonsCompleted}/{userProgress.totalLessons}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Words</Text>
          <Text style={styles.statValue}>
            {userProgress.wordsLearned}/{userProgress.totalWords}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Streak 🔥</Text>
          <Text style={styles.statValue}>{userProgress.streakDays}</Text>
        </View>
      </View>

      {/* Featured Lesson - At the Cafe */}
      <View style={styles.featuredSection}>
        <View style={styles.featuredHeader}>
          <Text style={styles.featuredBadge}>✨ FEATURED LESSON</Text>
        </View>
        <TouchableOpacity
          style={styles.featuredCard}
          onPress={() => navigation.navigate('Lesson', { lessonId: 'cafe-1' })}
          activeOpacity={0.9}
        >
          <Text style={styles.featuredTitle}>☕ At the Café</Text>
          <Text style={styles.featuredMeta}>Course 7: Food & Dining • ~18 minutes</Text>
          <Text style={styles.featuredDescription}>
            Order drinks, learn food vocabulary, and practice polite expressions
          </Text>
          <View style={styles.featuredFeatures}>
            <Text style={styles.featuredFeature}>✨ 22 exercises</Text>
            <Text style={styles.featuredFeature}>🎤 Speaking</Text>
            <Text style={styles.featuredFeature}>🔊 TTS Audio</Text>
            <Text style={styles.featuredFeature}>💬 Dialogue</Text>
          </View>
          <View style={styles.featuredButton}>
            <Text style={styles.featuredButtonText}>Start Lesson →</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Courses */}
      <View style={styles.coursesSection}>
        <Text style={styles.sectionTitle}>A1 Level - Newcomer/Beginner</Text>
        {a1Curriculum.map((course) => {
          const completedInCourse = course.lessons.filter((lesson) =>
            completedLessons.has(lesson.id)
          ).length;
          const progress = (completedInCourse / course.totalLessons) * 100;

          return (
            <View key={course.id} style={styles.courseCard}>
              <View style={styles.courseHeader}>
                <View style={styles.courseNumberBadge}>
                  <Text style={styles.courseNumber}>{course.courseNumber}</Text>
                </View>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.courseDescription}>{course.description}</Text>
                  <Text style={styles.courseMeta}>
                    {completedInCourse}/{course.totalLessons} lessons • {course.totalWords} words
                  </Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
              </View>

              {/* Lessons */}
              {course.lessons.map((lesson) => {
                const isCompleted = completedLessons.has(lesson.id);
                return (
                  <TouchableOpacity
                    key={lesson.id}
                    style={[styles.lessonCard, isCompleted && styles.lessonCardCompleted]}
                    onPress={() => navigation.navigate('Lesson', { lessonId: lesson.id })}
                  >
                    <View style={styles.lessonContent}>
                      <View
                        style={[
                          styles.lessonBadge,
                          isCompleted && styles.lessonBadgeCompleted,
                        ]}
                      >
                        <Text style={styles.lessonBadgeText}>
                          {isCompleted ? '✓' : lesson.lessonNumber}
                        </Text>
                      </View>
                      <View style={styles.lessonInfo}>
                        <Text style={styles.lessonTitle}>{lesson.title}</Text>
                        <Text style={styles.lessonMeta}>
                          {lesson.duration} • {lesson.vocabularyCount} words
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.lessonButton}>
                      {isCompleted ? 'Review' : 'Start'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  coursesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  courseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  courseNumberBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  courseNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  courseDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  courseMeta: {
    fontSize: 12,
    color: '#9ca3af',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginTop: 8,
    backgroundColor: '#ffffff',
  },
  lessonCardCompleted: {
    backgroundColor: '#f0fdf4',
    borderColor: '#86efac',
  },
  lessonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonBadge: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonBadgeCompleted: {
    backgroundColor: '#22c55e',
  },
  lessonBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  lessonMeta: {
    fontSize: 12,
    color: '#6b7280',
  },
  lessonButton: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
  featuredSection: {
    padding: 16,
    paddingTop: 0,
  },
  featuredHeader: {
    marginBottom: 12,
  },
  featuredBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6366f1',
    letterSpacing: 0.5,
  },
  featuredCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#c7d2fe',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  featuredMeta: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 16,
    lineHeight: 20,
  },
  featuredFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  featuredFeature: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '600',
  },
  featuredButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  featuredButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
