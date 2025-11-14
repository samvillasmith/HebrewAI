'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FillInBlankItem } from '@/types/interactive-lesson'
import { Check, X } from 'lucide-react'

interface FillInBlankExerciseProps {
  item: FillInBlankItem
  onCorrect: () => void
}

export default function FillInBlankExercise({
  item,
  onCorrect
}: FillInBlankExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Split sentence into parts around the blank
  const sentenceParts = item.sentence.split('___')

  const handleSelect = (answer: string) => {
    if (showFeedback) return

    setSelectedAnswer(answer)
    const correct = answer === item.correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setTimeout(() => {
        onCorrect()
      }, 2000)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8">
      {/* Instruction */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">Fill in the missing word</h3>
      </div>

      {/* Image (if provided) */}
      {item.image && (
        <div className="w-full max-w-md">
          <img
            src={item.image}
            alt="Context"
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Sentence with Blank */}
      <Card className={`w-full max-w-2xl ${
        showFeedback
          ? isCorrect
            ? 'border-green-500 border-2 bg-green-50'
            : 'border-red-500 border-2 bg-red-50'
          : 'border-2'
      }`}>
        <CardContent className="p-8">
          <div className="space-y-4">
            {/* Hebrew Sentence */}
            <div className="flex items-center justify-center gap-2 text-3xl hebrew-text font-medium">
              <span>{sentenceParts[0]}</span>
              <span className={`px-4 py-1 rounded ${
                selectedAnswer
                  ? showFeedback
                    ? isCorrect
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                    : 'bg-indigo-200 text-indigo-800'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {selectedAnswer || '______'}
              </span>
              <span>{sentenceParts[1]}</span>
            </div>

            {/* English Translation */}
            <p className="text-center text-gray-600">
              ({item.translation})
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Options */}
      <div className="flex gap-4 justify-center flex-wrap max-w-2xl">
        {item.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            size="lg"
            onClick={() => handleSelect(option)}
            disabled={showFeedback}
            className={`text-2xl hebrew-text px-8 py-6 ${
              selectedAnswer === option
                ? showFeedback
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-indigo-500 bg-indigo-50'
                : ''
            }`}
          >
            {option}
          </Button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`text-center space-y-2 ${
          isCorrect ? 'text-green-600' : 'text-red-600'
        }`}>
          <div className="text-3xl">
            {isCorrect ? <Check className="w-12 h-12 mx-auto" /> : <X className="w-12 h-12 mx-auto" />}
          </div>
          <p className="text-xl font-semibold">
            {isCorrect ? '✓ Correct!' : '✗ Try another word'}
          </p>
          {isCorrect && (
            <p className="text-sm text-gray-600 mt-2">
              The complete sentence will be played
            </p>
          )}
        </div>
      )}
    </div>
  )
}
