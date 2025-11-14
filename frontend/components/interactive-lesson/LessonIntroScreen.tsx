'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

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
