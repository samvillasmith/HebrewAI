import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface LessonIntroScreenProps {
  title: string;
  level: string;
  lessonNumber: number;
  objectives: string[];
  onStart: () => void;
}

export default function LessonIntroScreen({
  title,
  level,
  lessonNumber,
  objectives,
  onStart,
}: LessonIntroScreenProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.level}>{level} · Lesson {lessonNumber}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Objectives */}
        <View style={styles.objectivesContainer}>
          <Text style={styles.objectivesTitle}>📚 What you'll learn:</Text>
          {objectives.map((objective, index) => (
            <View key={index} style={styles.objectiveItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.objectiveText}>{objective}</Text>
            </View>
          ))}
        </View>

        {/* Estimated Time */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>⏱️</Text>
          <View>
            <Text style={styles.infoTitle}>Estimated Time</Text>
            <Text style={styles.infoText}>10-15 minutes</Text>
          </View>
        </View>

        {/* Start Button */}
        <TouchableOpacity style={styles.startButton} onPress={onStart}>
          <Text style={styles.startButtonText}>Start Lesson</Text>
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
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    marginBottom: 20,
  },
  level: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  objectivesContainer: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    marginBottom: 20,
  },
  objectivesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  objectiveItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bullet: {
    fontSize: 16,
    color: '#6366f1',
    marginRight: 12,
    fontWeight: 'bold',
  },
  objectiveText: {
    fontSize: 16,
    color: '#4b5563',
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  infoIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  infoTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  startButton: {
    backgroundColor: '#6366f1',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
