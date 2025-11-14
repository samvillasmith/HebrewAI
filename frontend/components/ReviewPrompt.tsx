'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Volume2, Edit, MessageSquare } from 'lucide-react'

interface ReviewPromptProps {
  onSelectReview: (type: 'flashcards' | 'listening' | 'writing' | 'speaking') => void
  onSkip: () => void
}

export default function ReviewPrompt({ onSelectReview, onSkip }: ReviewPromptProps) {
  const reviewTypes = [
    {
      type: 'flashcards' as const,
      icon: <Clock className="w-8 h-8" />,
      title: 'Flashcards',
      description: 'Quick vocabulary review with flashcards',
      duration: '3-5 min',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      type: 'listening' as const,
      icon: <Volume2 className="w-8 h-8" />,
      title: 'Listening Drills',
      description: 'Practice listening comprehension',
      duration: '3-5 min',
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      type: 'writing' as const,
      icon: <Edit className="w-8 h-8" />,
      title: 'Writing Practice',
      description: 'Test your spelling and writing',
      duration: '3-5 min',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    },
    {
      type: 'speaking' as const,
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Verbal Practice',
      description: 'Practice pronunciation with AI tutor',
      duration: '5 min',
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
    }
  ]

  return (
    <Card className="max-w-4xl mx-auto mt-8 border-2 border-indigo-200 shadow-lg">
      <CardHeader className="text-center bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex justify-center mb-4">
          <div className="text-6xl">📚</div>
        </div>
        <CardTitle className="text-2xl">Quick Review Session</CardTitle>
        <CardDescription className="text-base">
          Reinforce what you just learned with a 3-5 minute review.
          <br />
          Studies show that reviewing immediately after learning improves retention by 80%!
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {reviewTypes.map((review) => (
            <button
              key={review.type}
              onClick={() => onSelectReview(review.type)}
              className={`${review.color} border-2 rounded-lg p-6 text-left transition-all hover:scale-105 hover:shadow-md`}
            >
              <div className="flex items-start gap-4">
                <div className="text-indigo-600 flex-shrink-0">
                  {review.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{review.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{review.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{review.duration}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onSkip}>
            Skip for now
          </Button>
          <Button onClick={() => onSelectReview('flashcards')} className="bg-indigo-600 hover:bg-indigo-700">
            Start Quick Review
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            💡 Tip: Regular review sessions help move vocabulary into long-term memory
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
