'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface FlashcardItem {
  front: string
  back: string
}

interface FlashcardExerciseProps {
  title: string
  items: FlashcardItem[]
  onComplete: (score: number) => void
}

export default function FlashcardExercise({ title, items, onComplete }: FlashcardExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [completed, setCompleted] = useState<boolean[]>(new Array(items.length).fill(false))

  const currentCard = items[currentIndex]
  const progress = (currentIndex / items.length) * 100

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    if (!completed[currentIndex]) {
      const newCompleted = [...completed]
      newCompleted[currentIndex] = true
      setCompleted(newCompleted)
    }
  }

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    } else {
      onComplete(100)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex justify-center">
        <div
          className="relative w-96 h-64 cursor-pointer perspective-1000"
          onClick={handleFlip}
        >
          <div
            className={`w-full h-full transition-transform duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front */}
            <Card className={`absolute w-full h-full backface-hidden ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
              <CardContent className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                  <p className="text-5xl hebrew-text mb-4">{currentCard.front}</p>
                  <p className="text-sm text-muted-foreground">Click to reveal</p>
                </div>
              </CardContent>
            </Card>

            {/* Back */}
            <Card className={`absolute w-full h-full backface-hidden rotate-y-180 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
              <CardContent className="flex items-center justify-center h-full p-8 bg-indigo-50">
                <div className="text-center">
                  <p className="text-3xl font-semibold mb-2">{currentCard.back}</p>
                  <p className="text-sm text-muted-foreground">Click to flip back</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          ← Previous
        </Button>
        <Button onClick={handleNext}>
          {currentIndex === items.length - 1 ? 'Complete ✓' : 'Next →'}
        </Button>
      </div>
    </div>
  )
}
