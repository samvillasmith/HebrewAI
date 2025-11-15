import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LessonData, Exercise } from '../../types/lesson';
import { GenderProvider } from '../../contexts/GenderContext';
import GenderToggle from '../GenderToggle';
import LessonIntroScreen from './LessonIntroScreen';
import LessonCompleteScreen from './LessonCompleteScreen';
import VocabularyIntro from './VocabularyIntro';
import ListenAndSelectExercise from './ListenAndSelectExercise';
import FillInBlankExercise from './FillInBlankExercise';
import MatchPairsExercise from './MatchPairsExercise';
import BuildSentenceExercise from './BuildSentenceExercise';
import SpeakingPracticeExercise from './SpeakingPracticeExercise';
import DialogueCompletionExercise from './DialogueCompletionExercise';
import DialogueWithBlanksExercise from './DialogueWithBlanksExercise';
import ListenAndTypeExercise from './ListenAndTypeExercise';

type LessonStage = 'intro' | 'lesson' | 'complete';

interface InteractiveLessonProps {
  lessonData: LessonData;
  onComplete?: () => void;
}

function InteractiveLessonContent({ lessonData, onComplete }: InteractiveLessonProps) {
  const [stage, setStage] = useState<LessonStage>('intro');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [startTime] = useState(Date.now());
  const [completedVocabulary, setCompletedVocabulary] = useState<string[]>([]);

  const currentExercise = lessonData.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / lessonData.exercises.length) * 100;

  const handleStartLesson = () => setStage('lesson');

  const handleExerciseComplete = () => {
    if (currentExercise.type === 'vocabulary_intro') {
      const vocabData = currentExercise.data;
      const hebrew = typeof vocabData.hebrew === 'string' ? vocabData.hebrew : vocabData.hebrew.male;
      if (hebrew && !completedVocabulary.includes(hebrew)) {
        setCompletedVocabulary([...completedVocabulary, hebrew]);
      }
    }

    if (currentExerciseIndex < lessonData.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      setStage('complete');
    }
  };

  const handleLessonComplete = () => onComplete?.();

  const getTimeSpent = () => Math.round((Date.now() - startTime) / 1000 / 60);

  if (stage === 'intro') {
    return <LessonIntroScreen title={lessonData.title} level={lessonData.level} lessonNumber={lessonData.lessonNumber} objectives={lessonData.objectives} onStart={handleStartLesson} />;
  }

  if (stage === 'complete') {
    return <LessonCompleteScreen title={lessonData.title} newWordsCount={lessonData.newVocabularyCount || completedVocabulary.length} timeSpent={getTimeSpent()} streakDays={5} vocabularyLearned={completedVocabulary} onContinue={handleLessonComplete} />;
  }

  return (
    <View style={styles.container}>
      <GenderToggle />
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <View style={styles.exerciseContainer}>{renderExercise(currentExercise, handleExerciseComplete)}</View>
    </View>
  );
}

export default function InteractiveLesson(props: InteractiveLessonProps) {
  return (
    <GenderProvider>
      <InteractiveLessonContent {...props} />
    </GenderProvider>
  );
}

function renderExercise(exercise: Exercise, onComplete: () => void) {
  switch (exercise.type) {
    case 'vocabulary_intro':
      return <VocabularyIntro item={exercise.data} onContinue={onComplete} />;
    case 'listen_and_select':
      return <ListenAndSelectExercise item={exercise.data} onCorrect={onComplete} />;
    case 'fill_in_blank':
      return <FillInBlankExercise item={exercise.data} onCorrect={onComplete} />;
    case 'match_pairs':
      return <MatchPairsExercise pairs={exercise.data.pairs} onComplete={onComplete} />;
    case 'build_sentence':
      return <BuildSentenceExercise item={exercise.data} onCorrect={onComplete} />;
    case 'speaking_practice':
      return <SpeakingPracticeExercise item={exercise.data} onComplete={onComplete} />;
    case 'dialogue_completion':
      return <DialogueCompletionExercise item={exercise.data} onCorrect={onComplete} />;
    case 'dialogue_with_blanks':
      return <DialogueWithBlanksExercise item={exercise.data} onCorrect={onComplete} />;
    case 'listen_and_type':
      return <ListenAndTypeExercise item={exercise.data} onCorrect={onComplete} />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  progressContainer: { height: 4, backgroundColor: '#e5e7eb' },
  progressBar: { height: '100%', backgroundColor: '#6366f1' },
  exerciseContainer: { flex: 1 },
});
