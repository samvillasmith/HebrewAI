import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReviewPromptProps {
  onSelectReview: (type: 'flashcards' | 'listening' | 'writing' | 'speaking') => void;
  onSkip: () => void;
}

export default function ReviewPrompt({ onSelectReview, onSkip }: ReviewPromptProps) {
  const reviewTypes = [
    {
      type: 'flashcards' as const,
      icon: 'albums-outline',
      title: 'Flashcards',
      description: 'Quick vocabulary review',
      duration: '3-5 min',
      color: '#dbeafe'
    },
    {
      type: 'listening' as const,
      icon: 'headset-outline',
      title: 'Listening Drills',
      description: 'Practice listening',
      duration: '3-5 min',
      color: '#dcfce7'
    },
    {
      type: 'writing' as const,
      icon: 'create-outline',
      title: 'Writing Practice',
      description: 'Test your spelling',
      duration: '3-5 min',
      color: '#f3e8ff'
    },
    {
      type: 'speaking' as const,
      icon: 'chatbubbles-outline',
      title: 'Verbal Practice',
      description: 'Practice pronunciation',
      duration: '5 min',
      color: '#ffedd5'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📚</Text>
      <Text style={styles.title}>Quick Review Session</Text>
      <Text style={styles.description}>
        Reinforce what you just learned with a 3-5 minute review.
      </Text>
      <Text style={styles.tip}>
        Studies show that reviewing immediately after learning improves retention by 80%!
      </Text>

      <View style={styles.optionsContainer}>
        {reviewTypes.map((review) => (
          <TouchableOpacity
            key={review.type}
            style={[styles.reviewOption, { backgroundColor: review.color }]}
            onPress={() => onSelectReview(review.type)}
            activeOpacity={0.7}
          >
            <Ionicons name={review.icon as any} size={32} color="#6366f1" />
            <View style={styles.reviewInfo}>
              <Text style={styles.reviewTitle}>{review.title}</Text>
              <Text style={styles.reviewDescription}>{review.description}</Text>
              <Text style={styles.reviewDuration}>⏱ {review.duration}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => onSelectReview('flashcards')}
        >
          <Text style={styles.startButtonText}>Start Quick Review</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.bottomTip}>
        💡 Tip: Regular review sessions help move vocabulary into long-term memory
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  emoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 8,
  },
  tip: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6366f1',
    fontWeight: '600',
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  reviewOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    gap: 16,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  reviewDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  reviewDuration: {
    fontSize: 12,
    color: '#9ca3af',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  skipButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  skipButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  startButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#6366f1',
  },
  startButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomTip: {
    fontSize: 12,
    textAlign: 'center',
    color: '#9ca3af',
  },
});
