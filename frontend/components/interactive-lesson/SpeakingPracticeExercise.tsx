'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SpeakingPracticeItem } from '@/types/interactive-lesson'
import { Volume2, Mic } from 'lucide-react'

interface SpeakingPracticeExerciseProps {
  item: SpeakingPracticeItem
  onComplete: () => void
}

export default function SpeakingPracticeExercise({
  item,
  onComplete
}: SpeakingPracticeExerciseProps) {
  const [isListening, setIsListening] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const playAudio = async () => {
    try {
      if (item.audioUrl) {
        const audio = new Audio(item.audioUrl)
        await audio.play()
      } else {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        const response = await fetch(`${apiUrl}/api/tts/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: item.hebrew, language: 'he' }),
        })

        if (response.ok) {
          const audioBlob = await response.blob()
          const audioUrl = URL.createObjectURL(audioBlob)
          const audio = new Audio(audioUrl)
          await audio.play()
        }
      }
    } catch (error) {
      console.error('Error playing audio:', error)
    }
  }

  const startSpeaking = () => {
    setIsListening(true)

    // Simulate speech recognition (in a real app, you'd use Web Speech API)
    setTimeout(() => {
      setIsListening(false)
      setFeedback('Great!')

      setTimeout(() => {
        onComplete()
      }, 1500)
    }, 2000)
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8">
      {/* Instruction */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">🎤 Say this phrase</h3>
      </div>

      {/* Phrase Display */}
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8 text-center space-y-4">
          <p className="text-5xl font-bold hebrew-text text-indigo-600">
            {item.hebrew}
          </p>
          <p className="text-2xl text-gray-600 italic">
            {item.transliteration}
          </p>
          <p className="text-xl text-gray-700">
            {item.english}
          </p>
        </CardContent>
      </Card>

      {/* Listen First Button */}
      <Button
        variant="outline"
        size="lg"
        onClick={playAudio}
        className="gap-2"
      >
        <Volume2 className="w-5 h-5" />
        Listen first
      </Button>

      {/* Speak Button */}
      <div className="text-center space-y-4">
        <button
          onClick={startSpeaking}
          disabled={isListening}
          className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
            isListening
              ? 'bg-red-500 animate-pulse'
              : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-110'
          }`}
        >
          <Mic className="w-16 h-16 text-white" />
        </button>
        <p className="text-sm text-gray-600">
          {isListening ? 'Listening...' : 'Tap to speak'}
        </p>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="text-center space-y-2">
          <div className="text-4xl">✓</div>
          <p className="text-2xl font-semibold text-green-600">{feedback}</p>
        </div>
      )}
    </div>
  )
}
