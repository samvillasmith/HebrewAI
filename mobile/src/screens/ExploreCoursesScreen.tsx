import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { fetchCurriculumLevels } from '../api/client';

interface CurriculumLevel {
  level: string;
  title: string;
  description: string;
  totalWords: number;
  totalLessons: number;
  courses: any[];
  progress?: number;
}

export default function ExploreCoursesScreen({ navigation }: any) {
  const { userId } = useAuth();
  const [levels, setLevels] = useState<CurriculumLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCurriculumLevels();
  }, [userId]);

  const loadCurriculumLevels = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCurriculumLevels(userId || undefined);
      setLevels(data);
    } catch (err: any) {
      console.error('Error loading curriculum:', err);
      setError('Failed to load curriculum. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Define which levels are available and coming soon dates
  const comingSoonLevels: { [key: string]: string } = {
    'A2': 'May 2026',
    'B1': 'December 2026',
    'B2': 'ETA 2027',
  };

  const isLevelAvailable = (level: string) => {
    return level === 'TOURIST' || level === 'A1';
  };

  const handleLevelPress = (level: string) => {
    if (!isLevelAvailable(level)) {
      return; // Don't navigate for coming soon levels
    }
    // Navigate to Dashboard with the selected level
    navigation.navigate('DashboardTab', { selectedLevel: level });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading curriculum...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadCurriculumLevels}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Courses</Text>
        <Text style={styles.headerSubtitle}>
          Choose your learning level and start your Hebrew journey
        </Text>
      </View>

      <View style={styles.levelsContainer}>
        {levels.map((curriculum) => {
          const progressPercentage = curriculum.progress || 0;
          const available = isLevelAvailable(curriculum.level);
          const comingSoonDate = comingSoonLevels[curriculum.level];

          return (
            <TouchableOpacity
              key={curriculum.level}
              style={[styles.levelCard, !available && styles.levelCardDisabled]}
              onPress={() => handleLevelPress(curriculum.level)}
              activeOpacity={available ? 0.9 : 1}
              disabled={!available}
            >
              {/* Level Badge */}
              <View style={[styles.levelBadge, !available && styles.levelBadgeDisabled]}>
                <Text style={styles.levelBadgeText}>{curriculum.level}</Text>
                {comingSoonDate && (
                  <Text style={styles.comingSoonBadgeText}>Coming {comingSoonDate}</Text>
                )}
              </View>

              {/* Level Content */}
              <View style={styles.levelContent}>
                <Text style={[styles.levelTitle, !available && styles.textDisabled]}>
                  {curriculum.title}
                </Text>
                <Text style={[styles.levelDescription, !available && styles.textDisabled]}>
                  {curriculum.description}
                </Text>

                {/* Stats */}
                <View style={[styles.statsRow, !available && styles.statsRowDisabled]}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, !available && styles.statValueDisabled]}>
                      {curriculum.courses.length}
                    </Text>
                    <Text style={styles.statLabel}>Courses</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, !available && styles.statValueDisabled]}>
                      {curriculum.totalLessons}
                    </Text>
                    <Text style={styles.statLabel}>Lessons</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, !available && styles.statValueDisabled]}>
                      {curriculum.totalWords}
                    </Text>
                    <Text style={styles.statLabel}>Words</Text>
                  </View>
                </View>

                {/* Progress Bar - only show for available levels */}
                {available && progressPercentage > 0 && (
                  <View style={styles.progressSection}>
                    <Text style={styles.progressText}>
                      {Math.round(progressPercentage)}% Complete
                    </Text>
                    <View style={styles.progressBarContainer}>
                      <View
                        style={[styles.progressBar, { width: `${progressPercentage}%` }]}
                      />
                    </View>
                  </View>
                )}

                {/* Action Button */}
                {available ? (
                  <View style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>
                      {progressPercentage > 0 ? 'Continue Learning' : 'Start Learning'} →
                    </Text>
                  </View>
                ) : (
                  <View style={styles.comingSoonButton}>
                    <Text style={styles.comingSoonButtonText}>
                      Coming Soon!
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
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
  loadingContainer: {
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    padding: 20,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 22,
  },
  levelsContainer: {
    padding: 16,
    gap: 16,
  },
  levelCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  levelCardDisabled: {
    opacity: 0.85,
  },
  levelBadge: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  levelBadgeDisabled: {
    backgroundColor: '#9ca3af',
  },
  levelBadgeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  comingSoonBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 4,
    opacity: 0.9,
  },
  textDisabled: {
    color: '#9ca3af',
  },
  statsRowDisabled: {
    backgroundColor: '#f3f4f6',
  },
  statValueDisabled: {
    color: '#9ca3af',
  },
  levelContent: {
    padding: 20,
  },
  levelTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  levelDescription: {
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 22,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  actionButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  comingSoonButton: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  comingSoonButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '700',
  },
  comingSoonSection: {
    padding: 20,
    paddingTop: 8,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  comingSoonCards: {
    flexDirection: 'row',
    gap: 12,
  },
  comingSoonCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  comingSoonLevel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9ca3af',
    marginBottom: 4,
  },
  comingSoonText: {
    fontSize: 14,
    color: '#9ca3af',
  },
});
