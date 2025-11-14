'use client'

import { useState, useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface LessonData {
  id: string
  title: string
  description: string
  level: string
  objectives: string[]
  vocabulary: any
  grammar?: any
  content: any
}

export default function LessonPage({ params }: { params: { id: string } }) {
  const [lesson, setLesson] = useState<LessonData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    fetchLesson()
  }, [params.id])

  const fetchLesson = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/lessons/${params.id}`)
      const data = await response.json()
      setLesson(data)
    } catch (error) {
      console.error('Error fetching lesson:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const speakText = async (text: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/tts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          language: 'he',
        }),
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        await audio.play()
      } else {
        console.error('TTS API error:', await response.text())
      }
    } catch (error) {
      console.error('Error with text-to-speech:', error)
      // Fallback to browser speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'he-IL'
        window.speechSynthesis.speak(utterance)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl">Loading lesson...</div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Lesson Not Found</CardTitle>
            <CardDescription>The lesson you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard">
              <Button>← Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const vocabularyItems = Array.isArray(lesson.vocabulary?.words) ? lesson.vocabulary.words
    : Array.isArray(lesson.vocabulary?.letters) ? lesson.vocabulary.letters
    : Array.isArray(lesson.vocabulary?.numbers) ? lesson.vocabulary.numbers
    : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <div className="text-2xl font-bold text-primary cursor-pointer">
              Hebrew<span className="text-indigo-600">AI</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">← Back to Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Lesson Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                      Level {lesson.level}
                    </span>
                    <CardTitle className="text-3xl">{lesson.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{lesson.description}</CardDescription>
                </div>
              </div>

              {/* Learning Objectives */}
              {lesson.objectives && Array.isArray(lesson.objectives) && lesson.objectives.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-3 text-lg">📚 Learning Objectives</h3>
                  <ul className="space-y-2">
                    {lesson.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">✓</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardHeader>
          </Card>

          {/* Main Lesson Content */}
          <Tabs defaultValue="learn" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="learn">📖 Learn</TabsTrigger>
              <TabsTrigger value="vocabulary">📝 Vocabulary</TabsTrigger>
              <TabsTrigger value="practice">💪 Practice</TabsTrigger>
            </TabsList>

            {/* Learn Tab */}
            <TabsContent value="learn" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {lesson.content?.introduction && (
                    <div className="prose max-w-none">
                      <p className="text-lg leading-relaxed">{lesson.content.introduction}</p>
                    </div>
                  )}

                  {lesson.content?.note && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <p className="text-sm font-medium text-yellow-800">
                        💡 Note: {lesson.content.note}
                      </p>
                    </div>
                  )}

                  {lesson.content?.examples && Array.isArray(lesson.content.examples) && lesson.content.examples.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Examples</h3>
                      <div className="space-y-3">
                        {lesson.content.examples.map((example: any, index: number) => (
                          <div key={index} className="bg-white border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="hebrew-text text-2xl font-semibold text-indigo-600">
                                {example.hebrew}
                              </p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => speakText(example.hebrew)}
                              >
                                🔊
                              </Button>
                            </div>
                            <p className="text-gray-600">{example.english}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {lesson.grammar && (
                    <Card className="bg-blue-50">
                      <CardHeader>
                        <CardTitle className="text-lg">Grammar Point</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{JSON.stringify(lesson.grammar)}</p>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vocabulary Tab */}
            <TabsContent value="vocabulary" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vocabulary List</CardTitle>
                  <CardDescription>
                    Click the speaker icon to hear pronunciation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {vocabularyItems.map((item: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-accent transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="hebrew-text text-3xl font-bold text-indigo-600">
                            {item.hebrew}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => speakText(item.hebrew)}
                          >
                            🔊
                          </Button>
                        </div>
                        <div className="space-y-1">
                          {item.name && (
                            <p className="text-sm font-medium text-gray-700">Name: {item.name}</p>
                          )}
                          {item.sound && (
                            <p className="text-sm text-gray-600">Sound: {item.sound}</p>
                          )}
                          {item.english && (
                            <p className="text-base font-medium">{item.english}</p>
                          )}
                          {item.transliteration && (
                            <p className="text-sm text-gray-500 italic">{item.transliteration}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Practice Tab */}
            <TabsContent value="practice" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Exercises</CardTitle>
                  <CardDescription>
                    Test your knowledge of this lesson
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <div className="text-6xl mb-4">🎯</div>
                      <h3 className="text-xl font-semibold mb-2">Interactive Exercises Coming Soon!</h3>
                      <p className="text-gray-600 mb-6">
                        We're building interactive quizzes, flashcards, and writing exercises.
                      </p>
                      <div className="flex gap-3 justify-center">
                        <Link href={`/lesson/${params.id}/chat`}>
                          <Button>
                            💬 Practice with AI Tutor
                          </Button>
                        </Link>
                        <Link href="/dashboard">
                          <Button variant="outline">
                            Continue Learning
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Bottom Navigation */}
          <div className="flex justify-between mt-8">
            <Link href="/dashboard">
              <Button variant="outline" size="lg">
                ← Back to Dashboard
              </Button>
            </Link>
            <Link href={`/lesson/${parseInt(params.id) + 1}`}>
              <Button size="lg">
                Next Lesson →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
