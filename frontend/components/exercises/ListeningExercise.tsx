'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Volume2, RotateCcw, Check, X } from 'lucide-react'

interface ListeningItem {
  hebrew: string
  english: string
  transliteration?: string
  audioUrl?: string
}

interface ListeningExerciseProps {
  title: string
  items: ListeningItem[]
  onComplete: (score: number) => void
}

export default function ListeningExercise({ title, items, onComplete }: ListeningExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [hasPlayed, setHasPlayed] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentItem = items[currentIndex]
  const progress = ((currentIndex + (showFeedback ? 1 : 0)) / items.length) * 100

  // Normalize answer for comparison (remove extra spaces, case-insensitive)
  const normalizeAnswer = (text: string) => {
    return text.trim().toLowerCase().replace(/\s+/g, ' ')
  }

  const playAudio = async () => {
    setHasPlayed(true)

    // If there's a custom audio URL, use it
    if (currentItem.audioUrl) {
      if (audioRef.current) {
        audioRef.current.src = currentItem.audioUrl
        audioRef.current.play()
      }
      return
    }

    // Otherwise, use TTS
    try {
      // Try backend TTS first
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: currentItem.hebrew, language: 'he' })
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        if (audioRef.current) {
          audioRef.current.src = url
          audioRef.current.play()
        }
      } else {
        // Fallback to browser TTS
        const utterance = new SpeechSynthesisUtterance(currentItem.hebrew)
        utterance.lang = 'he-IL'
        utterance.rate = 0.8 // Slower for learning
        window.speechSynthesis.speak(utterance)
      }
    } catch (error) {
      // Fallback to browser TTS
      const utterance = new SpeechSynthesisUtterance(currentItem.hebrew)
      utterance.lang = 'he-IL'
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleSubmit = () => {
    const normalizedAnswer = normalizeAnswer(userAnswer)
    const normalizedCorrect = normalizeAnswer(currentItem.hebrew)
    const normalizedTranslit = currentItem.transliteration
      ? normalizeAnswer(currentItem.transliteration)
      : ''

    // Accept either Hebrew or transliteration
    const correct = normalizedAnswer === normalizedCorrect ||
                   normalizedAnswer === normalizedTranslit

    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setUserAnswer('')
      setShowFeedback(false)
      setHasPlayed(false)
    } else {
      const finalScore = Math.round((score / items.length) * 100)
      onComplete(finalScore)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showFeedback && userAnswer.trim()) {
      handleSubmit()
    }
  }

  return (
    <div className="space-y-6">
      <audio ref={audioRef} />

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">
              Listen to the audio and type what you hear
            </p>

            <div className="flex justify-center gap-3">
              <Button
                size="lg"
                onClick={playAudio}
                className="gap-2"
              >
                <Volume2 className="w-5 h-5" />
                {hasPlayed ? 'Play Again' : 'Play Audio'}
              </Button>

              {hasPlayed && !showFeedback && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={playAudio}
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Replay
                </Button>
              )}
            </div>
          </div>

          {hasPlayed && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Your answer:</label>
                <Input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type what you heard..."
                  disabled={showFeedback}
                  className="text-lg p-4"
                  autoFocus
                />
                {currentItem.transliteration && (
                  <p className="text-xs text-muted-foreground">
                    You can answer in Hebrew or transliteration
                  </p>
                )}
              </div>

              {showFeedback && (
                <div className={`p-4 rounded-lg ${
                  isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
                }`}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    )}

                    <div className="flex-1 space-y-2">
                      <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {isCorrect ? 'Correct!' : 'Not quite right'}
                      </p>

                      {!isCorrect && (
                        <div className="space-y-1">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Correct answer:</span>{' '}
                            <span className="hebrew-text text-2xl">{currentItem.hebrew}</span>
                          </p>
                          {currentItem.transliteration && (
                            <p className="text-sm text-gray-600">
                              Transliteration: {currentItem.transliteration}
                            </p>
                          )}
                        </div>
                      )}

                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Translation:</span> {currentItem.english}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={playAudio}
          disabled={!hasPlayed}
          className="gap-2"
        >
          <Volume2 className="w-4 h-4" />
          Listen Again
        </Button>

        {!showFeedback ? (
          <Button
            onClick={handleSubmit}
            disabled={!userAnswer.trim() || !hasPlayed}
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {currentIndex === items.length - 1 ? 'Complete ✓' : 'Next →'}
          </Button>
        )}
      </div>

      {showFeedback && (
        <div className="text-center text-sm text-muted-foreground">
          Score: {score} / {currentIndex + 1}
        </div>
      )}
    </div>
  )
}
