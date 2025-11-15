'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface LessonCompleteScreenProps {
  title: string
  newWordsCount: number
  timeSpent: number
  streakDays: number
  vocabularyLearned: string[]
  onContinue: () => void
  onReviewLesson?: () => void
}

export default function LessonCompleteScreen({
  title,
  newWordsCount,
  timeSpent,
  streakDays,
  vocabularyLearned,
  onContinue,
  onReviewLesson
}: LessonCompleteScreenProps) {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    setShowAnimation(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl">
        <Card className={`border-2 transition-all duration-500 ${
          showAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          <CardContent className="p-12 text-center space-y-8">
            {/* Celebration Icon */}
            <div className="text-8xl animate-bounce">🎉</div>

            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">Lesson Complete!</h2>
              <p className="text-xl text-gray-600">{title}</p>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-2 text-5xl">
              <span className="animate-pulse" style={{ animationDelay: '0ms' }}>⭐</span>
              <span className="animate-pulse" style={{ animationDelay: '200ms' }}>⭐</span>
              <span className="animate-pulse" style={{ animationDelay: '400ms' }}>⭐</span>
              <span className="animate-pulse" style={{ animationDelay: '600ms' }}>⭐</span>
              <span className="animate-pulse" style={{ animationDelay: '800ms' }}>⭐</span>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Lesson Summary:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center justify-center gap-2">
                  <span className="text-2xl">📚</span>
                  <span>{newWordsCount} new words added to your vocabulary review</span>
                </li>
              </ul>
            </div>

            {/* Vocabulary Box */}
            <Card className="bg-indigo-50 border-indigo-200">
              <CardContent className="p-6">
                <p className="font-semibold mb-3 text-sm text-gray-600">
                  Words added to your vocabulary:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {vocabularyLearned.map((word, index) => (
                    <span key={index} className="text-2xl hebrew-text">
                      {word}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Time spent</p>
                <p className="text-2xl font-bold">{timeSpent} minutes</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Streak</p>
                <p className="text-2xl font-bold">🔥 {streakDays} days</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                size="lg"
                onClick={onContinue}
                className="px-8"
              >
                Continue
              </Button>
              {onReviewLesson && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onReviewLesson}
                  className="px-8"
                >
                  Review This Lesson
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
