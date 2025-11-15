'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface VocabularyItem {
  id: string
  hebrew: string
  english: string
  transliteration?: string
  category: string
  level: string
  exampleSentence?: string
  repetitions: number
  nextReview: string
}

interface VocabularyReviewCardProps {
  word: VocabularyItem
  currentIndex: number
  totalWords: number
  showAnswer: boolean
  onShowAnswer: () => void
  onResponse: (quality: number) => void
}

export default function VocabularyReviewCard({
  word,
  currentIndex,
  totalWords,
  showAnswer,
  onShowAnswer,
  onResponse,
}: VocabularyReviewCardProps) {
  const progressPercentage = ((currentIndex + 1) / totalWords) * 100

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>
            {currentIndex + 1} / {totalWords}
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Word Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardDescription className="mb-1">
                {word.category} • {word.level}
              </CardDescription>
              <CardTitle className="text-5xl font-bold text-indigo-600 mb-2 leading-tight">
                {word.hebrew}
              </CardTitle>
              {word.transliteration && (
                <p className="text-lg text-gray-500 italic">{word.transliteration}</p>
              )}
            </div>
            <div className="text-sm text-gray-400">
              Rep: {word.repetitions}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {!showAnswer ? (
            <div className="py-8 text-center">
              <p className="text-gray-500 mb-6">Can you remember what this word means?</p>
              <Button onClick={onShowAnswer} size="lg" className="w-full">
                Show Answer
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Translation</h3>
                <p className="text-2xl font-semibold text-gray-900">{word.english}</p>
              </div>

              {word.exampleSentence && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Example</h3>
                  <p className="text-gray-700 italic">{word.exampleSentence}</p>
                </div>
              )}

              {/* Quality Rating Buttons */}
              <div className="pt-6 border-t">
                <p className="text-sm font-semibold text-gray-700 mb-3">How well did you know this?</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={() => onResponse(1)}
                    variant="outline"
                    className="border-red-300 hover:bg-red-50 hover:border-red-400"
                  >
                    <div className="text-center">
                      <div className="font-semibold">Forgot</div>
                      <div className="text-xs text-gray-500">Review soon</div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => onResponse(3)}
                    variant="outline"
                    className="border-yellow-300 hover:bg-yellow-50 hover:border-yellow-400"
                  >
                    <div className="text-center">
                      <div className="font-semibold">Hard</div>
                      <div className="text-xs text-gray-500">Needs work</div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => onResponse(4)}
                    variant="outline"
                    className="border-green-300 hover:bg-green-50 hover:border-green-400"
                  >
                    <div className="text-center">
                      <div className="font-semibold">Good</div>
                      <div className="text-xs text-gray-500">Got it!</div>
                    </div>
                  </Button>
                </div>

                <Button
                  onClick={() => onResponse(5)}
                  variant="outline"
                  className="w-full mt-2 border-blue-300 hover:bg-blue-50 hover:border-blue-400"
                >
                  <div className="text-center">
                    <div className="font-semibold">Easy</div>
                    <div className="text-xs text-gray-500">Too easy, review later</div>
                  </div>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info */}
      <div className="text-center text-sm text-gray-500">
        <p>Spaced repetition helps you remember vocabulary more effectively</p>
      </div>
    </div>
  )
}
