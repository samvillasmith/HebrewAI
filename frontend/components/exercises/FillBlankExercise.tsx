'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface FillBlankQuestion {
  sentence: string
  answer: string
  translation: string
}

interface FillBlankExerciseProps {
  title: string
  questions: FillBlankQuestion[]
  onComplete: (score: number) => void
}

export default function FillBlankExercise({ title, questions, onComplete }: FillBlankExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + (isChecked ? 1 : 0)) / questions.length) * 100

  const handleCheck = () => {
    const correct = userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()
    setIsCorrect(correct)
    setIsChecked(true)
    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setUserAnswer('')
      setIsChecked(false)
      setIsCorrect(false)
    } else {
      const finalScore = Math.round((score / questions.length) * 100)
      onComplete(finalScore)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{currentQuestion.translation}</p>
            <div className="text-center">
              <p className="text-3xl hebrew-text leading-relaxed">
                {currentQuestion.sentence.replace('_____', '')}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Fill in the blank:</label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={isChecked}
                className={`w-full px-4 py-3 text-xl hebrew-text text-center border-2 rounded-lg focus:outline-none focus:ring-2 ${
                  isChecked
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
                placeholder="Type your answer..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !isChecked && userAnswer.trim()) {
                    handleCheck()
                  }
                }}
              />
            </div>

            {isChecked && (
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? '✓ Correct!' : '✗ Not quite right'}
                </p>
                {!isCorrect && (
                  <p className="text-sm mt-2">
                    Correct answer: <span className="hebrew-text font-semibold">{currentQuestion.answer}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        {!isChecked ? (
          <Button onClick={handleCheck} disabled={!userAnswer.trim()}>
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {currentIndex === questions.length - 1 ? `Complete (${score}/${questions.length})` : 'Next →'}
          </Button>
        )}
      </div>
    </div>
  )
}
