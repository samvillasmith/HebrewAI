'use client'

import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { InteractiveLessonData, InteractiveExercise } from '@/types/interactive-lesson'
import Link from 'next/link'
import { useGender } from '@/contexts/GenderContext'
import { resolveGenderedText } from '@/lib/gender-utils'

// Screen components
import LessonIntroScreen from './LessonIntroScreen'
import LessonCompleteScreen from './LessonCompleteScreen'
import PostLessonOptionsScreen from './PostLessonOptionsScreen'

// Exercise components
import VocabularyIntro from './VocabularyIntro'
import ListenAndSelectExercise from './ListenAndSelectExercise'
import MatchPairsExercise from './MatchPairsExercise'
import BuildSentenceExercise from './BuildSentenceExercise'
import FillInBlankExercise from './FillInBlankExercise'
import SpeakingPracticeExercise from './SpeakingPracticeExercise'
import DialogueCompletionExercise from './DialogueCompletionExercise'
import ListenAndTypeExercise from './ListenAndTypeExercise'

// Review prompt
import ReviewPrompt from '../ReviewPrompt'

type LessonStage = 'pre-review' | 'intro' | 'lesson' | 'complete' | 'post-options'

interface InteractiveLessonProps {
  lessonData: InteractiveLessonData
  showPreReview?: boolean
  reviewWordsCount?: number
}

export default function InteractiveLesson({
  lessonData,
  showPreReview = true,
  reviewWordsCount = 5
}: InteractiveLessonProps) {
  const { gender } = useGender()
  const [stage, setStage] = useState<LessonStage>(showPreReview ? 'pre-review' : 'intro')
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [completedVocabulary, setCompletedVocabulary] = useState<string[]>([])

  const currentExercise = lessonData.exercises[currentExerciseIndex]
  const progress = ((currentExerciseIndex + 1) / lessonData.exercises.length) * 100

  const handleSkipReview = () => {
    setStage('intro')
  }

  const handleSelectReview = (type: 'flashcards' | 'listening' | 'writing' | 'speaking') => {
    // For now, just proceed to intro
    // TODO: Implement actual review session
    setStage('intro')
  }

  const handleStartLesson = () => {
    setStage('lesson')
    setStartTime(Date.now())
  }

  const handleExerciseComplete = () => {
    // Add vocabulary if it's a vocabulary intro
    if (currentExercise.type === 'vocabulary_intro') {
      const vocabData = currentExercise.data as any
      if (vocabData.hebrew) {
        // Resolve gendered text before storing
        const resolvedHebrew = resolveGenderedText(vocabData.hebrew, gender)
        if (!completedVocabulary.includes(resolvedHebrew)) {
          setCompletedVocabulary([...completedVocabulary, resolvedHebrew])
        }
      }
    }

    // Move to next exercise
    if (currentExerciseIndex < lessonData.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    } else {
      setStage('complete')
    }
  }

  const handleLessonComplete = () => {
    setStage('post-options')
  }

  const getTimeSpent = () => {
    return Math.round((Date.now() - startTime) / 1000 / 60)
  }

  // Pre-Review Screen
  if (stage === 'pre-review') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center space-y-6">
            <h2 className="text-2xl font-bold">Before your lesson...</h2>
            <div className="text-6xl">🔄</div>
            <p className="text-lg">
              You have <strong>{reviewWordsCount} words</strong> ready for review
            </p>
            <div className="flex gap-3 justify-center">
              <Button size="lg" onClick={() => handleSelectReview('flashcards')}>
                Review Now (3 min)
              </Button>
              <Button variant="outline" size="lg" onClick={handleSkipReview}>
                Skip to Lesson
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Lesson Intro Screen
  if (stage === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <LessonIntroScreen
          title={lessonData.title}
          level={lessonData.level}
          lessonNumber={lessonData.lessonNumber}
          objectives={lessonData.objectives}
          onStart={handleStartLesson}
        />
      </div>
    )
  }

  // Lesson Complete Screen
  if (stage === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <LessonCompleteScreen
          title={lessonData.title}
          newWordsCount={lessonData.newVocabularyCount}
          timeSpent={getTimeSpent()}
          streakDays={5} // TODO: Get from user data
          vocabularyLearned={completedVocabulary}
          onContinue={handleLessonComplete}
        />
      </div>
    )
  }

  // Post-Lesson Options Screen
  if (stage === 'post-options') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <PostLessonOptionsScreen
          nextLesson={lessonData.postLessonOptions.nextLesson}
          practiceVocabulary={lessonData.postLessonOptions.practiceVocabulary}
          podcast={lessonData.postLessonOptions.podcast}
        />
      </div>
    )
  }

  // Main Lesson Flow
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Progress */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="text-sm text-gray-600">
              Progress: {currentExerciseIndex + 1} of {lessonData.exercises.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Exercise Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {renderExercise(currentExercise, handleExerciseComplete)}
        </div>
      </div>
    </div>
  )
}

function renderExercise(exercise: InteractiveExercise, onComplete: () => void) {
  switch (exercise.type) {
    case 'vocabulary_intro':
      return (
        <VocabularyIntro
          item={exercise.data as any}
          onContinue={onComplete}
        />
      )

    case 'listen_and_select':
      return (
        <ListenAndSelectExercise
          item={exercise.data as any}
          onCorrect={onComplete}
        />
      )

    case 'match_pairs':
      const matchData = exercise.data as any
      return (
        <MatchPairsExercise
          pairs={matchData.pairs}
          onComplete={onComplete}
        />
      )

    case 'build_sentence':
      return (
        <BuildSentenceExercise
          item={exercise.data as any}
          onCorrect={onComplete}
        />
      )

    case 'fill_in_blank':
      return (
        <FillInBlankExercise
          item={exercise.data as any}
          onCorrect={onComplete}
        />
      )

    case 'speaking_practice':
      return (
        <SpeakingPracticeExercise
          item={exercise.data as any}
          onComplete={onComplete}
        />
      )

    case 'dialogue_completion':
      return (
        <DialogueCompletionExercise
          item={exercise.data as any}
          onCorrect={onComplete}
        />
      )

    case 'listen_and_type':
      return (
        <ListenAndTypeExercise
          item={exercise.data as any}
          onCorrect={onComplete}
        />
      )

    default:
      return (
        <div className="text-center py-12">
          <p className="text-gray-600">Unknown exercise type: {exercise.type}</p>
          <Button onClick={onComplete} className="mt-4">Skip</Button>
        </div>
      )
  }
}
