'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ListenAndSelectItem } from '@/types/interactive-lesson'
import { Volume2, RotateCw, Check, X } from 'lucide-react'

interface ListenAndSelectExerciseProps {
  item: ListenAndSelectItem
  onCorrect: () => void
}

export default function ListenAndSelectExercise({
  item,
  onCorrect
}: ListenAndSelectExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    playAudio()
  }, [])

  const playAudio = async () => {
    try {
      // Play audio from TTS or audioUrl
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/tts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: item.text, language: 'he' }),
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        await audio.play()
      }
    } catch (error) {
      console.error('Error playing audio:', error)
    }
  }

  const handleSelect = (value: string) => {
    if (showFeedback) return

    setSelectedAnswer(value)
    const correct = value === item.correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setTimeout(() => {
        onCorrect()
      }, 1500)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8">
      {/* Instruction */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold">🔊 Listen and select what you hear</h3>

        <Button
          variant="outline"
          size="lg"
          onClick={playAudio}
          className="gap-2"
        >
          <RotateCw className="w-5 h-5" />
          Replay audio
        </Button>
      </div>

      {/* Options */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
        {item.options.map((option, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedAnswer === option.value
                ? showFeedback
                  ? isCorrect
                    ? 'border-green-500 border-2 bg-green-50'
                    : 'border-red-500 border-2 bg-red-50'
                  : 'border-indigo-500 border-2'
                : ''
            }`}
            onClick={() => handleSelect(option.value)}
          >
            <CardContent className="p-6 text-center space-y-4">
              {/* Image */}
              <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded-lg">
                {option.image ? (
                  <img
                    src={option.image}
                    alt={option.label}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-4xl">{option.label.charAt(0)}</div>
                )}
              </div>

              {/* Label */}
              <p className="font-medium text-lg">{option.label}</p>

              {/* Feedback icon */}
              {showFeedback && selectedAnswer === option.value && (
                <div className="flex justify-center">
                  {isCorrect ? (
                    <Check className="w-8 h-8 text-green-600" />
                  ) : (
                    <X className="w-8 h-8 text-red-600" />
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feedback message */}
      {showFeedback && (
        <div className={`text-center text-xl font-semibold ${
          isCorrect ? 'text-green-600' : 'text-red-600'
        }`}>
          {isCorrect ? '✓ Correct!' : '✗ Try again'}
        </div>
      )}
    </div>
  )
}
