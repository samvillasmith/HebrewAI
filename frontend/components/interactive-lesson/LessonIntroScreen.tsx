'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Gender } from '@/types/interactive-lesson'
import { useGender } from '@/contexts/GenderContext'

interface LessonIntroScreenProps {
  title: string
  level: string
  lessonNumber: number
  objectives: string[]
  onStart: () => void
}

export default function LessonIntroScreen({
  title,
  level,
  lessonNumber,
  objectives,
  onStart
}: LessonIntroScreenProps) {
  const { gender, setGender } = useGender()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>

        <Card className="border-2">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="space-y-2">
              <div className="text-6xl mb-4">📚</div>
              <CardTitle className="text-4xl">{title}</CardTitle>
              <CardDescription className="text-lg">
                {level} • Lesson {lessonNumber}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Gender Selection */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
              <h3 className="font-semibold text-lg mb-3">Learning Preference</h3>
              <p className="text-sm text-gray-600 mb-4">
                Hebrew has gendered verb forms. Choose how you'd like to learn:
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setGender('male')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    gender === 'male'
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-400'
                  }`}
                >
                  Male Forms
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    gender === 'female'
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-400'
                  }`}
                >
                  Female Forms
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                This affects verb conjugations and pronouns used in lessons. You can change this anytime.
              </p>
            </div>

            {/* Objectives */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Learn how to:</h3>
              <ul className="space-y-3">
                {objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-indigo-600 mt-1 flex-shrink-0">•</span>
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Start Button */}
            <div className="flex justify-center pt-4">
              <Button
                size="lg"
                onClick={onStart}
                className="px-12 py-6 text-lg"
              >
                Start Lesson
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
