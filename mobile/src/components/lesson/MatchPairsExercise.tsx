import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MatchPair {
  left: string;
  right: string;
}

interface MatchPairsExerciseProps {
  pairs: MatchPair[];
  onComplete: () => void;
}

export default function MatchPairsExercise({ pairs, onComplete }: MatchPairsExerciseProps) {
  const [leftItems, setLeftItems] = useState<string[]>([]);
  const [rightItems, setRightItems] = useState<string[]>([]);
  const [selected, setSelected] = useState<{ side: 'left' | 'right'; index: number } | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const left = pairs.map(p => p.left);
    const shuffledRight = [...pairs.map(p => p.right)].sort(() => Math.random() - 0.5);
    setLeftItems(left);
    setRightItems(shuffledRight);
  }, []);

  const handleSelect = (side: 'left' | 'right', index: number) => {
    if (side === 'left' && Array.from(matches.keys()).includes(index)) return;
    if (side === 'right' && Array.from(matches.values()).includes(index)) return;

    if (!selected) {
      setSelected({ side, index });
    } else if (selected.side !== side) {
      const leftIdx = side === 'left' ? index : selected.index;
      const rightIdx = side === 'right' ? index : selected.index;

      const leftValue = leftItems[leftIdx];
      const rightValue = rightItems[rightIdx];

      const isCorrectPair = pairs.some(pair => pair.left === leftValue && pair.right === rightValue);

      if (isCorrectPair) {
        const newMatches = new Map(matches);
        newMatches.set(leftIdx, rightIdx);
        setMatches(newMatches);

        if (newMatches.size === pairs.length) {
          setIsComplete(true);
          setTimeout(() => onComplete(), 2000);
        }
      }
      setSelected(null);
    } else {
      setSelected({ side, index });
    }
  };

  const isMatched = (side: 'left' | 'right', index: number) => {
    if (side === 'left') return matches.has(index);
    return Array.from(matches.values()).includes(index);
  };

  const isSelected = (side: 'left' | 'right', index: number) => {
    return selected?.side === side && selected?.index === index;
  };

  const getCardStyle = (side: 'left' | 'right', index: number) => {
    if (isMatched(side, index)) return [styles.card, styles.matchedCard];
    if (isSelected(side, index)) return [styles.card, styles.selectedCard];
    return styles.card;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match the Hebrew with the English</Text>
      <Text style={styles.progress}>{matches.size} / {pairs.length} matched</Text>

      <View style={styles.columns}>
        <View style={styles.column}>
          {leftItems.map((item, index) => (
            <TouchableOpacity
              key={`left-${index}`}
              style={getCardStyle('left', index)}
              onPress={() => handleSelect('left', index)}
            >
              <Text style={styles.hebrewText}>{item}</Text>
              {isMatched('left', index) && <Ionicons name="checkmark-circle" size={24} color="#10b981" />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.column}>
          {rightItems.map((item, index) => (
            <TouchableOpacity
              key={`right-${index}`}
              style={getCardStyle('right', index)}
              onPress={() => handleSelect('right', index)}
            >
              <Text style={styles.englishText}>{item}</Text>
              {isMatched('right', index) && <Ionicons name="checkmark-circle" size={24} color="#10b981" />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {isComplete && (
        <View style={styles.completeMessage}>
          <Text style={styles.completeEmoji}>🎉</Text>
          <Text style={styles.completeText}>All correct!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  progress: { fontSize: 16, color: '#6b7280', textAlign: 'center', marginBottom: 24 },
  columns: { flexDirection: 'row', gap: 12, flex: 1 },
  column: { flex: 1, gap: 12 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 2, borderColor: '#e5e7eb', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  selectedCard: { backgroundColor: '#ede9fe', borderColor: '#6366f1' },
  matchedCard: { backgroundColor: '#d1fae5', borderColor: '#10b981' },
  hebrewText: { fontSize: 20, fontWeight: '600' },
  englishText: { fontSize: 16, fontWeight: '500' },
  completeMessage: { alignItems: 'center', marginTop: 20 },
  completeEmoji: { fontSize: 48 },
  completeText: { fontSize: 24, fontWeight: 'bold', color: '#10b981' },
});
