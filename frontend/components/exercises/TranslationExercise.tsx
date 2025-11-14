'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, XCircle } from 'lucide-react'

interface TranslationQuestion {
  english: string
  correct: string
  alternatives?: string[]
}

interface TranslationExerciseProps {
  title: string
  questions: TranslationQuestion[]
  onComplete: (score: number) => void
}

export default function TranslationExercise({ title, questions, onComplete }: TranslationExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const currentQuestion = questions[currentIndex]

  const checkAnswer = () => {
    const normalizedAnswer = userAnswer.trim()
    const correct = normalizedAnswer === currentQuestion.correct ||
                   (currentQuestion.alternatives?.includes(normalizedAnswer) ?? false)

    setIsCorrect(correct)
    setShowFeedback(true)
    if (correct) {
      setCorrectCount(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setUserAnswer('')
      setShowFeedback(false)
      setIsCorrect(false)
    } else {
      const score = Math.round((correctCount / questions.length) * 100)
      onComplete(score)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showFeedback) {
      checkAnswer()
    } else if (e.key === 'Enter' && showFeedback) {
      handleNext()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="text-sm text-muted-foreground">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="text-lg font-medium">
            Translate to Hebrew:
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-xl text-center">{currentQuestion.english}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Your answer:</label>
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type in Hebrew..."
              className="text-xl hebrew-text text-right"
              dir="rtl"
              disabled={showFeedback}
              autoFocus
            />
          </div>

          {showFeedback && (
            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-700">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-700">Not quite</span>
                  </>
                )}
              </div>
              {!isCorrect && (
                <div className="space-y-1">
                  <p className="text-sm text-gray-700">
                    Correct answer: <span className="hebrew-text font-semibold">{currentQuestion.correct}</span>
                  </p>
                  {currentQuestion.alternatives && currentQuestion.alternatives.length > 0 && (
                    <p className="text-xs text-gray-600">
                      Also accepted: {currentQuestion.alternatives.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="text-sm text-muted-foreground">
            Score: {correctCount} / {questions.length}
          </div>
          {!showFeedback ? (
            <Button onClick={checkAnswer} disabled={!userAnswer.trim()}>
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {currentIndex < questions.length - 1 ? 'Next Question' : 'Complete'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
