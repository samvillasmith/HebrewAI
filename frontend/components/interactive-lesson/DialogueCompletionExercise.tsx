'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DialogueCompletionItem } from '@/types/interactive-lesson'
import { Check, X } from 'lucide-react'
import { useGender } from '@/contexts/GenderContext'
import { resolveGenderedText } from '@/lib/gender-utils'

interface DialogueCompletionExerciseProps {
  item: DialogueCompletionItem
  onCorrect: () => void
}

export default function DialogueCompletionExercise({
  item,
  onCorrect
}: DialogueCompletionExerciseProps) {
  const { gender } = useGender()
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Resolve gendered text
  const speakerHebrew = resolveGenderedText(item.speakerLine.hebrew, gender)
  const options = item.options.map(opt => ({
    hebrew: resolveGenderedText(opt.hebrew, gender),
    english: opt.english
  }))

  const handleSelect = (index: number) => {
    if (showFeedback) return

    setSelectedOption(index)
    const correct = index === item.correctAnswer
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
        <h3 className="text-2xl font-semibold">Complete the conversation</h3>
      </div>

      {/* Scenario Image */}
      {item.image && (
        <div className="w-full max-w-2xl">
          <img
            src={item.image}
            alt={item.scenario}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Dialogue */}
      <Card className="w-full max-w-2xl bg-gray-50">
        <CardContent className="p-6 space-y-4">
          {/* Speaker's Line */}
          <div className="space-y-2">
            <p className="font-semibold text-sm text-gray-600">{item.speakerLine.speaker}:</p>
            <div className="bg-white p-4 rounded-lg space-y-1">
              <p className="text-2xl hebrew-text font-medium text-indigo-600">
                {item.speakerLine.hebrew}
              </p>
              <p className="text-sm text-gray-600">({item.speakerLine.english})</p>
            </div>
          </div>

          {/* User's Response */}
          <div className="space-y-2">
            <p className="font-semibold text-sm text-gray-600">You:</p>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-400 italic">Select your response below</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Options */}
      <div className="w-full max-w-2xl space-y-3">
        {item.options.map((option, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all ${
              selectedOption === index
                ? showFeedback
                  ? isCorrect
                    ? 'border-green-500 border-2 bg-green-50'
                    : 'border-red-500 border-2 bg-red-50'
                  : 'border-indigo-500 border-2'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => handleSelect(index)}
          >
            <CardContent className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xl hebrew-text font-medium">
                    {option.hebrew}
                  </p>
                  <p className="text-sm text-gray-600">{option.english}</p>
                </div>
                {showFeedback && selectedOption === index && (
                  <div>
                    {isCorrect ? (
                      <Check className="w-6 h-6 text-green-600" />
                    ) : (
                      <X className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`text-center text-xl font-semibold ${
          isCorrect ? 'text-green-600' : 'text-red-600'
        }`}>
          {isCorrect ? '✓ Perfect!' : '✗ Try another option'}
        </div>
      )}
    </div>
  )
}
