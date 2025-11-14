'use client'

import { useEffect, useState } from 'react'
import InteractiveLesson from '@/components/interactive-lesson/InteractiveLesson'
import { InteractiveLessonData } from '@/types/interactive-lesson'
import { cafeLessonData } from '@/data/cafe-lesson'
import { GenderProvider } from '@/contexts/GenderContext'

export default function InteractiveLessonPage({ params }: { params: { id: string } }) {
  const [lessonData, setLessonData] = useState<InteractiveLessonData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadLesson()
  }, [params.id])

  const loadLesson = async () => {
    try {
      // For now, we'll use the hardcoded cafe lesson data
      // In the future, you can fetch from API based on params.id
      if (params.id === 'cafe-1' || params.id === 'at-the-cafe') {
        setLessonData(cafeLessonData)
      } else {
        // Try to fetch from API
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        const response = await fetch(`${apiUrl}/api/interactive-lessons/${params.id}`)

        if (response.ok) {
          const data = await response.json()
          setLessonData(data)
        } else {
          setError('Lesson not found')
        }
      }
    } catch (err) {
      console.error('Error loading lesson:', err)
      setError('Failed to load lesson')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl">Loading lesson...</div>
      </div>
    )
  }

  if (error || !lessonData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Lesson Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The lesson you are looking for does not exist.'}</p>
          <a href="/dashboard" className="text-indigo-600 hover:underline">
            ← Back to Dashboard
          </a>
        </div>
      </div>
    )
  }

  return (
    <GenderProvider>
      <InteractiveLesson lessonData={lessonData} showPreReview={true} />
    </GenderProvider>
  )
}
