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
import { fetchUserProgress, fetchVocabularyStats, fetchCurriculumLevel } from '../api/client';
import { UserProgress } from '../types';

interface LessonData {
  id: string;
  courseId: string;
  lessonNumber: string;
  title: string;
  duration: number;
  vocabularyCount: number;
  theme: string;
  objectives: string[];
  isLocked: boolean;
  isCompleted?: boolean;
}

interface CourseData {
  id: string;
  level: string;
  courseNumber: number;
  title: string;
  description: string;
  totalLessons: number;
  totalWords: number;
  estimatedHours: number;
  isLocked: boolean;
  progress?: number;
  isCompleted?: boolean;
  lessons: LessonData[];
}

interface CurriculumLevelData {
  level: string;
  title: string;
  description: string;
  totalWords: number;
  totalLessons: number;
  courses: CourseData[];
  progress?: number;
}

export default function DashboardScreen({ navigation, route }: any) {
  const { userId } = useAuth();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [currentCurriculum, setCurrentCurriculum] = useState<CurriculumLevelData | null>(null);

  // Get selected level from route params, default to user's current level
  const selectedLevel = route?.params?.selectedLevel;

  const [userProgress, setUserProgress] = useState<UserProgress>({
    currentLevel: selectedLevel || 'A1',
    lessonsCompleted: 0,
    totalLessons: 77,
    wordsLearned: 0,
    totalWords: 580,
    streakDays: 0,
    xpPoints: 0,
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      // Determine which level to load
      const levelToLoad = selectedLevel || userProgress.currentLevel || 'A1';

      // Fetch curriculum level from API
      const curriculumData = await fetchCurriculumLevel(levelToLoad, userId || undefined);
      setCurrentCurriculum(curriculumData);

      // Update total lessons/words from API data
      const newTotalLessons = curriculumData.totalLessons;
      const newTotalWords = curriculumData.totalWords;

      if (userId) {
        const progressData = await fetchUserProgress(userId);
        const vocabData = await fetchVocabularyStats(userId);

        setUserProgress({
          currentLevel: progressData.current_level || levelToLoad,
          lessonsCompleted: progressData.lessons_complete || 0,
          totalLessons: newTotalLessons,
          wordsLearned: vocabData.total_words || 0,
          totalWords: newTotalWords,
          streakDays: progressData.streak_days || 0,
          xpPoints: progressData.xp_points || 0,
        });
      } else {
        setUserProgress(prev => ({
          ...prev,
          currentLevel: levelToLoad,
          totalLessons: newTotalLessons,
          totalWords: newTotalWords,
        }));
      }
    } catch (error: any) {
      console.error('Error loading data:', error);
      if (error?.response?.status === 404) {
        console.log('New user or data not found - using default values');
      }
    } finally {
      setLoading(false);
    }
  }, [userId, selectedLevel, userProgress.currentLevel]);

  // Refresh data whenever the screen comes into focus or level changes
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  // Reload when selected level changes
  useEffect(() => {
    if (selectedLevel) {
      loadData();
    }
  }, [selectedLevel]);

  // Calculate completion stats from curriculum data
  const displayLevel = selectedLevel || userProgress.currentLevel;

  const totalLessonsInLevel = currentCurriculum?.totalLessons || 0;
  const completedLessonsInLevel = currentCurriculum?.courses.reduce((sum, course) => {
    return sum + course.lessons.filter(lesson => lesson.isCompleted).length;
  }, 0) || 0;
  const isLevelComplete = completedLessonsInLevel === totalLessonsInLevel && totalLessonsInLevel > 0;

  const handleAdvanceLevel = async () => {
    // Update user progress to next level
    let newLevel = userProgress.currentLevel;
    let newTotalLessons = userProgress.totalLessons;
    let newTotalWords = userProgress.totalWords;

    if (userProgress.currentLevel === 'A1') {
      newLevel = 'A2';
      newTotalLessons = 67;
      newTotalWords = 500;
    } else if (userProgress.currentLevel === 'A2') {
      newLevel = 'B1';
      newTotalLessons = 135;
      newTotalWords = 1000;
    } else if (userProgress.currentLevel === 'B1') {
      newLevel = 'B2';
      newTotalLessons = 267;
      newTotalWords = 2000;
    }

    setUserProgress({
      ...userProgress,
      currentLevel: newLevel,
      totalLessons: newTotalLessons,
      totalWords: newTotalWords,
    });

    // Update backend
    if (userId) {
      try {
        // TODO: Implement backend API call to update user's current level
        // await updateUserLevel(userId, newLevel);
        console.log(`Advanced to level ${newLevel}`);
      } catch (error) {
        console.error('Error updating level:', error);
      }
    }
  };

  if (loading || !currentCurriculum) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading curriculum...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Progress Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Current Level</Text>
          <Text style={styles.statValue}>{displayLevel}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Lessons</Text>
          <Text style={styles.statValue}>
            {completedLessonsInLevel}/{totalLessonsInLevel}
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

      {/* Certificate & Level Advancement */}
      {isLevelComplete && (userProgress.currentLevel === 'A1' || userProgress.currentLevel === 'A2' || userProgress.currentLevel === 'B1') && !selectedLevel && (
        <View style={styles.certificateSection}>
          <View style={styles.certificateCard}>
            <Text style={styles.certificateEmoji}>🎓</Text>
            <Text style={styles.certificateTitle}>Congratulations!</Text>
            <Text style={styles.certificateMessage}>
              You've completed all {totalLessonsInLevel} lessons in {userProgress.currentLevel}!
            </Text>
            <TouchableOpacity
              style={styles.certificateButton}
              onPress={handleAdvanceLevel}
              activeOpacity={0.8}
            >
              <Text style={styles.certificateButtonText}>
                Get Certificate & Advance to {userProgress.currentLevel === 'A1' ? 'A2' : userProgress.currentLevel === 'A2' ? 'B1' : 'B2'} →
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Courses */}
      <View style={styles.coursesSection}>
        {selectedLevel && selectedLevel !== userProgress.currentLevel && (
          <View style={styles.levelNotice}>
            <Text style={styles.levelNoticeText}>
              You're viewing {displayLevel} courses
            </Text>
            <TouchableOpacity
              style={styles.backToMyLevelButton}
              onPress={() => navigation.setParams({ selectedLevel: undefined })}
            >
              <Text style={styles.backToMyLevelText}>Back to My Level ({userProgress.currentLevel})</Text>
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.sectionTitle}>{currentCurriculum.title}</Text>
        <Text style={styles.sectionDescription}>{currentCurriculum.description}</Text>
        {currentCurriculum.courses.map((course) => {
          const completedInCourse = course.lessons.filter((lesson) =>
            lesson.isCompleted
          ).length;
          const progress = course.totalLessons > 0 ? (completedInCourse / course.totalLessons) * 100 : 0;

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
                const isCompleted = lesson.isCompleted || false;
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
                          {lesson.duration} min • {lesson.vocabularyCount} words
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
    backgroundColor: '#f0f4f8',
  },
  loadingText: {
    marginTop: 12,
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
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
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
  certificateSection: {
    padding: 16,
    paddingTop: 0,
  },
  certificateCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#86efac',
    alignItems: 'center',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  certificateEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  certificateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#15803d',
    marginBottom: 8,
  },
  certificateMessage: {
    fontSize: 16,
    color: '#166534',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  certificateButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  certificateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  levelNotice: {
    backgroundColor: '#eef2ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#c7d2fe',
  },
  levelNoticeText: {
    fontSize: 14,
    color: '#4338ca',
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  backToMyLevelButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  backToMyLevelText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
