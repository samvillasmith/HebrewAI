'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BuildSentenceItem } from '@/types/interactive-lesson'
import { Volume2, RotateCw, Check, X } from 'lucide-react'
import { useGender } from '@/contexts/GenderContext'
import { resolveGenderedText, resolveGenderedArray } from '@/lib/gender-utils'
import { playGenderedAudio } from '@/lib/tts-utils'

interface BuildSentenceExerciseProps {
  item: BuildSentenceItem
  onCorrect: () => void
}

export default function BuildSentenceExercise({
  item,
  onCorrect
}: BuildSentenceExerciseProps) {
  const { gender } = useGender()
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [availableWords, setAvailableWords] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Resolve gendered text
  const text = resolveGenderedText(item.text, gender)
  const translation = resolveGenderedText(item.translation, gender)
  const words = resolveGenderedArray(item.words, gender)
  const correctOrder = resolveGenderedArray(item.correctOrder, gender)

  useEffect(() => {
    // Shuffle available words
    const shuffled = [...words].sort(() => Math.random() - 0.5)
    setAvailableWords(shuffled)
    playAudio()

    // Cleanup function to stop audio when component unmounts
    return () => {
      // Abort any in-flight fetch requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      // Stop any playing audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [gender]) // Re-shuffle when gender changes

  const playAudio = async () => {
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
        text: item.text,
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

  const handleWordClick = (word: string) => {
    if (showFeedback) return

    setSelectedWords([...selectedWords, word])
    setAvailableWords(availableWords.filter(w => w !== word))
  }

  const handleRemoveWord = (index: number) => {
    if (showFeedback) return

    const word = selectedWords[index]
    setSelectedWords(selectedWords.filter((_, i) => i !== index))
    setAvailableWords([...availableWords, word])
  }

  const handleCheck = () => {
    const correct = JSON.stringify(selectedWords) === JSON.stringify(correctOrder)
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
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold">🔊 Listen and build the sentence</h3>

        <Button
          variant="outline"
          size="lg"
          onClick={playAudio}
          className="gap-2"
        >
          <RotateCw className="w-5 h-5" />
          Replay audio
        </Button>

        <p className="text-lg text-gray-600">
          Translation: <span className="font-medium">{translation}</span>
        </p>
      </div>

      {/* Answer Area */}
      <div className="w-full max-w-3xl">
        <p className="text-sm text-gray-600 mb-2">Your answer:</p>
        <Card className={`min-h-24 ${
          showFeedback
            ? isCorrect
              ? 'border-green-500 border-2 bg-green-50'
              : 'border-red-500 border-2 bg-red-50'
            : 'border-2 border-dashed border-gray-300'
        }`}>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2 min-h-16 items-center">
              {selectedWords.length === 0 ? (
                <p className="text-gray-400 w-full text-center">Tap words below to build your sentence</p>
              ) : (
                selectedWords.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleRemoveWord(index)}
                    className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg font-medium hover:bg-indigo-200 transition-colors"
                    disabled={showFeedback}
                  >
                    {word}
                  </button>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Words */}
      <div className="w-full max-w-3xl">
        <p className="text-sm text-gray-600 mb-2">Available words:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {availableWords.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordClick(word)}
              className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 hover:border-indigo-400 transition-all"
              disabled={showFeedback}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Check Button */}
      {selectedWords.length === item.correctOrder.length && !showFeedback && (
        <Button onClick={handleCheck} size="lg">
          Check Answer
        </Button>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div className={`text-center space-y-2 ${
          isCorrect ? 'text-green-600' : 'text-red-600'
        }`}>
          <div className="text-3xl">
            {isCorrect ? <Check className="w-12 h-12 mx-auto" /> : <X className="w-12 h-12 mx-auto" />}
          </div>
          <p className="text-xl font-semibold">
            {isCorrect ? '✓ Correct!' : '✗ Try again'}
          </p>
          {isCorrect && (
            <p className="text-sm text-gray-600">
              {correctOrder.join(' ')}
            </p>
          )}
        </div>
      )}

      {/* Reset button if incorrect */}
      {showFeedback && !isCorrect && (
        <Button
          variant="outline"
          onClick={() => {
            setSelectedWords([])
            setAvailableWords([...words].sort(() => Math.random() - 0.5))
            setShowFeedback(false)
          }}
        >
          Try Again
        </Button>
      )}
    </div>
  )
}
