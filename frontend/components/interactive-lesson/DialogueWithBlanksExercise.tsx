'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DialogueWithBlanksItem } from '@/types/interactive-lesson'
import { Check, X, Volume2 } from 'lucide-react'
import { useGender } from '@/contexts/GenderContext'
import { resolveGenderedText } from '@/lib/gender-utils'
import { playGenderedAudio } from '@/lib/tts-utils'

interface DialogueWithBlanksExerciseProps {
  item: DialogueWithBlanksItem
  onCorrect: () => void
}

export default function DialogueWithBlanksExercise({
  item,
  onCorrect
}: DialogueWithBlanksExerciseProps) {
  const { gender } = useGender()
  const [currentBlankIndex, setCurrentBlankIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Find all blank indices
  const blankIndices = item.dialogue
    .map((d, i) => (d.isBlank ? i : -1))
    .filter(i => i !== -1)

  // Initialize selected answers array
  if (selectedAnswers.length === 0) {
    setSelectedAnswers(new Array(blankIndices.length).fill(null))
  }

  const currentDialogueItem = item.dialogue[blankIndices[currentBlankIndex]]

  const handleSelect = async (optionIndex: number) => {
    if (showFeedback) return

    const newAnswers = [...selectedAnswers]
    newAnswers[currentBlankIndex] = optionIndex
    setSelectedAnswers(newAnswers)

    const correct = optionIndex === currentDialogueItem.correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct && currentDialogueItem.options) {
      // Play the selected answer with TTS
      const selectedOption = currentDialogueItem.options[optionIndex]
      await playSelectedOption(selectedOption)

      // Move to next blank or complete
      setTimeout(() => {
        if (currentBlankIndex < blankIndices.length - 1) {
          setCurrentBlankIndex(currentBlankIndex + 1)
          setShowFeedback(false)
        } else {
          // All blanks filled correctly
          setTimeout(() => {
            onCorrect()
          }, 1500)
        }
      }, 2000)
    }
  }

  const playSelectedOption = async (text: string | { male: string; female: string }) => {
    try {
      // Abort any previous fetch
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }

      // Create new AbortController for this request
      const abortController = new AbortController()
      abortControllerRef.current = abortController

      // Use the gender-aware audio playback
      const audio = await playGenderedAudio({
        text,
        gender,
        language: 'he',
        abortSignal: abortController.signal
      })

      audioRef.current = audio
    } catch (error) {
      // Ignore abort errors
      if (error instanceof Error && error.name === 'AbortError') {
        return
      }
      console.error('Error playing audio:', error)
    }
  }

  const handleReset = () => {
    setShowFeedback(false)
    setIsCorrect(false)
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8">
      {/* Instruction */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">Complete the dialogue</h3>
        <p className="text-gray-600">{item.scenario}</p>
        <p className="text-sm text-indigo-600">
          Blank {currentBlankIndex + 1} of {blankIndices.length}
        </p>
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

      {/* Dialogue Display */}
      <Card className="w-full max-w-2xl bg-gray-50">
        <CardContent className="p-6 space-y-4">
          {item.dialogue.map((dialogueItem, index) => {
            const isCurrentBlank = index === blankIndices[currentBlankIndex]
            const blankIndexInArray = blankIndices.indexOf(index)
            const hasBeenFilled = blankIndexInArray !== -1 && blankIndexInArray < currentBlankIndex

            return (
              <div key={index} className="space-y-2">
                <p className="font-semibold text-sm text-gray-600">
                  {dialogueItem.speaker}:
                </p>
                <div
                  className={`bg-white p-4 rounded-lg ${
                    isCurrentBlank ? 'ring-2 ring-indigo-500' : ''
                  }`}
                >
                  {dialogueItem.isBlank ? (
                    <div className="space-y-2">
                      {hasBeenFilled ? (
                        <div className="flex items-center gap-2">
                          <p className="text-2xl hebrew-text font-medium text-green-600">
                            {resolveGenderedText(
                              dialogueItem.options![selectedAnswers[blankIndexInArray]!],
                              gender
                            )}
                          </p>
                          <Check className="w-6 h-6 text-green-600" />
                        </div>
                      ) : isCurrentBlank ? (
                        <p className="text-gray-400 italic text-lg">Select your response below</p>
                      ) : (
                        <p className="text-gray-300 italic text-lg">_______________</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-2xl hebrew-text font-medium text-indigo-600">
                      {resolveGenderedText(dialogueItem.line, gender)}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Options for current blank */}
      {!showFeedback && currentDialogueItem.options && (
        <div className="w-full max-w-2xl space-y-3">
          <p className="text-sm text-gray-600 text-center">Choose the correct response:</p>
          {currentDialogueItem.options.map((option, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-all hover:bg-gray-50"
              onClick={() => handleSelect(index)}
            >
              <CardContent className="p-4">
                <p className="text-xl hebrew-text font-medium">
                  {resolveGenderedText(option, gender)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div
          className={`text-center space-y-2 ${
            isCorrect ? 'text-green-600' : 'text-red-600'
          }`}
        >
          <div className="text-3xl">
            {isCorrect ? <Check className="w-12 h-12 mx-auto" /> : <X className="w-12 h-12 mx-auto" />}
          </div>
          <p className="text-xl font-semibold">
            {isCorrect ? '✓ Perfect! Listen to your response' : '✗ Try another option'}
          </p>
        </div>
      )}

      {/* Try Again button if incorrect */}
      {showFeedback && !isCorrect && (
        <Button variant="outline" onClick={handleReset}>
          Try Again
        </Button>
      )}
    </div>
  )
}
