import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useFocusEffect } from '@react-navigation/native';
import { fetchVocabularyStats, fetchReviewWords, submitReviewResponse } from '../api/client';
import { VocabularyItem, ReviewStats } from '../types';
import VocabularyReviewCard from '../components/vocabulary/VocabularyReviewCard';

export default function VocabularyScreen({ navigation }: any) {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ReviewStats>({
    total_words: 0,
    due_for_review: 0,
    learning: 0,
    mastered: 0,
  });
  const [reviewWords, setReviewWords] = useState<VocabularyItem[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const loadVocabularyData = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const statsData = await fetchVocabularyStats(userId);
      setStats(statsData);

      // Also fetch review words if there are any
      if (statsData.due_for_review > 0) {
        const words = await fetchReviewWords(userId, 20);
        setReviewWords(words);
      }
    } catch (error: any) {
      console.error('Error loading vocabulary data:', error);
      // If user not found (404), keep default empty stats
      // This happens for brand new users
      if (error?.response?.status === 404) {
        console.log('New user - no vocabulary data yet');
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      loadVocabularyData();
    }, [loadVocabularyData])
  );

  const startReviewSession = () => {
    setIsReviewing(true);
    setCurrentWordIndex(0);
  };

  const handleRating = async (quality: number) => {
    if (submitting) return;

    try {
      setSubmitting(true);
      const currentWord = reviewWords[currentWordIndex];
      await submitReviewResponse(currentWord.id, quality);

      // Move to next word or finish session
      if (currentWordIndex < reviewWords.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
      } else {
        // Session complete
        setIsReviewing(false);
        setCurrentWordIndex(0);
        // Refresh stats
        await loadVocabularyData();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  // Review Session View
  if (isReviewing && reviewWords.length > 0) {
    return (
      <View style={styles.container}>
        <VocabularyReviewCard
          word={reviewWords[currentWordIndex]}
          onRate={handleRating}
          currentIndex={currentWordIndex}
          totalWords={reviewWords.length}
        />
      </View>
    );
  }

  // Main Vocabulary Screen
  return (
    <ScrollView style={styles.container}>
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.total_words}</Text>
          <Text style={styles.statLabel}>Total Words</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#ef4444' }]}>
            {stats.due_for_review}
          </Text>
          <Text style={styles.statLabel}>Due for Review</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#f59e0b' }]}>
            {stats.learning}
          </Text>
          <Text style={styles.statLabel}>Learning</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#10b981' }]}>
            {stats.mastered}
          </Text>
          <Text style={styles.statLabel}>Mastered</Text>
        </View>
      </View>

      {/* Review Section */}
      <View style={styles.reviewSection}>
        {stats.due_for_review > 0 ? (
          <View style={styles.readyCard}>
            <Text style={styles.readyTitle}>Ready to Review?</Text>
            <Text style={styles.readyText}>
              You have {stats.due_for_review} {stats.due_for_review === 1 ? 'word' : 'words'} ready
              for review
            </Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={startReviewSession}
            >
              <Text style={styles.startButtonText}>Start Review Session</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.caughtUpCard}>
            <Text style={styles.caughtUpEmoji}>🎉</Text>
            <Text style={styles.caughtUpTitle}>All Caught Up!</Text>
            <Text style={styles.caughtUpText}>
              {stats.total_words === 0
                ? "You haven't learned any words yet. Complete some lessons to get started!"
                : 'No words are due for review right now. Great work!'}
            </Text>
            {stats.total_words > 0 && (
              <TouchableOpacity
                style={styles.dashboardButton}
                onPress={() => navigation.navigate('Dashboard')}
              >
                <Text style={styles.dashboardButtonText}>Back to Dashboard</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>How it works</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            📚 Words you learn in lessons are automatically added to your vocabulary
          </Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            🧠 Review words using spaced repetition for better retention
          </Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            ⭐ Rate yourself honestly to optimize your learning schedule
          </Text>
        </View>
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  reviewSection: {
    padding: 16,
  },
  readyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  readyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  readyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 10,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  caughtUpCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  caughtUpEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  caughtUpTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  caughtUpText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  dashboardButton: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  dashboardButtonText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
  },
  infoSection: {
    padding: 16,
    paddingTop: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
});
