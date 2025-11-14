'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ListenAndTypeItem } from '@/types/interactive-lesson'
import { Volume2, RotateCw, Check, X } from 'lucide-react'
import { useGender } from '@/contexts/GenderContext'
import { resolveGenderedText } from '@/lib/gender-utils'
import { playGenderedAudio } from '@/lib/tts-utils'

interface ListenAndTypeExerciseProps {
  item: ListenAndTypeItem
  onCorrect: () => void
}

export default function ListenAndTypeExercise({
  item,
  onCorrect
}: ListenAndTypeExerciseProps) {
  const { gender } = useGender()
  const [answer, setAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Resolve gendered text
  const text = resolveGenderedText(item.text, gender)

  useEffect(() => {
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
  }, [])

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

  const handleCheck = () => {
    const correct = answer.trim() === text.trim()
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setTimeout(() => {
        onCorrect()
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && answer.trim() !== '') {
      handleCheck()
    }
  }

  // Hebrew keyboard layout
  const hebrewKeys = [
    ['ב', 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
    ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
    ['ז', 'ס', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ'],
  ]

  const addLetter = (letter: string) => {
    setAnswer(answer + letter)
  }

  const removeLetter = () => {
    setAnswer(answer.slice(0, -1))
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8">
      {/* Instruction */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold">🔊 Listen and type what you hear</h3>

        <Button
          variant="outline"
          size="lg"
          onClick={playAudio}
          className="gap-2"
        >
          <RotateCw className="w-5 h-5" />
          Replay audio
        </Button>

        <p className="text-sm text-gray-600">
          Translation hint: <span className="font-medium">{item.translationHint}</span>
        </p>
      </div>

      {/* Input Field */}
      <div className="w-full max-w-2xl">
        <Input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type here..."
          className={`text-3xl hebrew-text text-center h-16 ${
            showFeedback
              ? isCorrect
                ? 'border-green-500 border-2 bg-green-50'
                : 'border-red-500 border-2 bg-red-50'
              : ''
          }`}
          disabled={showFeedback}
        />
      </div>

      {/* Hebrew Keyboard */}
      <Card className="w-full max-w-2xl">
        <CardContent className="p-4">
          <div className="space-y-2">
            {hebrewKeys.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1">
                {row.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => addLetter(letter)}
                    disabled={showFeedback}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded font-medium text-xl hebrew-text transition-colors disabled:opacity-50"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ))}
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={removeLetter}
                disabled={showFeedback}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded font-medium transition-colors disabled:opacity-50"
              >
                ⌫ Delete
              </button>
              <button
                onClick={() => setAnswer(answer + ' ')}
                disabled={showFeedback}
                className="px-12 py-3 bg-gray-100 hover:bg-gray-200 rounded font-medium transition-colors disabled:opacity-50"
              >
                Space
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Check Button */}
      {answer.trim() !== '' && !showFeedback && (
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
            {isCorrect ? '✓ Excellent!' : '✗ Not quite'}
          </p>
          {!isCorrect && (
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Correct answer:</p>
              <p className="text-2xl hebrew-text font-medium text-gray-800">{text}</p>
            </div>
          )}
        </div>
      )}

      {/* Try Again button if incorrect */}
      {showFeedback && !isCorrect && (
        <Button
          variant="outline"
          onClick={() => {
            setAnswer('')
            setShowFeedback(false)
            playAudio()
          }}
        >
          Try Again
        </Button>
      )}
    </div>
  )
}
