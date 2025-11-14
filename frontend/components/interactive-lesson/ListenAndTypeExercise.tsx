'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ListenAndTypeItem } from '@/types/interactive-lesson'
import { Volume2, RotateCw, Check, X } from 'lucide-react'

interface ListenAndTypeExerciseProps {
  item: ListenAndTypeItem
  onCorrect: () => void
}

export default function ListenAndTypeExercise({
  item,
  onCorrect
}: ListenAndTypeExerciseProps) {
  const [answer, setAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    playAudio()
  }, [])

  const playAudio = async () => {
    try {
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

  const handleCheck = () => {
    const correct = answer.trim() === item.text.trim()
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
              <p className="text-2xl hebrew-text font-medium text-gray-800">{item.text}</p>
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
