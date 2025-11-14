'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface MCQuestion {
  question: string
  options: string[]
  correct: number
  feedback: string
}

interface MultipleChoiceExerciseProps {
  title: string
  questions: MCQuestion[]
  onComplete: (score: number) => void
}

export default function MultipleChoiceExercise({ title, questions, onComplete }: MultipleChoiceExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [score, setScore] = useState(0)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + (isChecked ? 1 : 0)) / questions.length) * 100

  const handleCheck = () => {
    if (selectedOption === currentQuestion.correct) {
      setScore(score + 1)
    }
    setIsChecked(true)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedOption(null)
      setIsChecked(false)
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
          <div>
            <p className="text-xl font-medium mb-6">{currentQuestion.question}</p>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !isChecked && setSelectedOption(index)}
                  disabled={isChecked}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedOption === index && !isChecked
                      ? 'border-indigo-500 bg-indigo-50'
                      : isChecked && index === currentQuestion.correct
                      ? 'border-green-500 bg-green-50'
                      : isChecked && selectedOption === index && index !== currentQuestion.correct
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${isChecked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === index && !isChecked
                        ? 'border-indigo-500 bg-indigo-500'
                        : isChecked && index === currentQuestion.correct
                        ? 'border-green-500 bg-green-500'
                        : isChecked && selectedOption === index
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedOption === index && <span className="text-white text-sm">✓</span>}
                      {isChecked && index === currentQuestion.correct && <span className="text-white text-sm">✓</span>}
                      {isChecked && selectedOption === index && index !== currentQuestion.correct && <span className="text-white text-sm">✗</span>}
                    </div>
                    <span className="hebrew-text text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {isChecked && (
            <div className={`p-4 rounded-lg ${
              selectedOption === currentQuestion.correct ? 'bg-green-50' : 'bg-blue-50'
            }`}>
              <p className="text-sm font-medium">{currentQuestion.feedback}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        {!isChecked ? (
          <Button onClick={handleCheck} disabled={selectedOption === null}>
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
