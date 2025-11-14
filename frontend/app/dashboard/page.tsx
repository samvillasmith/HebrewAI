'use client'

import { UserButton } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { userId, isLoaded } = useAuth()

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!userId) {
    redirect('/sign-in')
    return null
  }

  const [lessons, setLessons] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetchLessons()
  }, [])

  const fetchLessons = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/lessons/`)
      const data = await response.json()
      setLessons(data)
    } catch (error) {
      console.error('Error fetching lessons:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // This will be fetched from your API
  const userProgress = {
    currentLevel: 'A1',
    lessonsCompleted: 0,
    totalLessons: lessons.length,
    streakDays: 1,
    xpPoints: 0,
  }

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
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-gray-600">Continue your Hebrew learning journey</p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Current Level</CardDescription>
              <CardTitle className="text-3xl">{userProgress.currentLevel}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Lessons Completed</CardDescription>
              <CardTitle className="text-3xl">
                {userProgress.lessonsCompleted}/{userProgress.totalLessons}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Day Streak 🔥</CardDescription>
              <CardTitle className="text-3xl">{userProgress.streakDays}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>XP Points</CardDescription>
              <CardTitle className="text-3xl">{userProgress.xpPoints}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Learning Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Interactive Lesson */}
            <Card className="border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold">NEW</span>
                  <CardTitle>Interactive Lesson</CardTitle>
                </div>
                <CardDescription>Experience our new engaging lesson format!</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/interactive-lesson/cafe-1">
                  <div className="p-6 border-2 border-white rounded-lg hover:bg-white/50 transition-colors cursor-pointer bg-white/30 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-xl mb-1">📚 At the Café</h3>
                        <p className="text-sm text-gray-700 mb-2">A1 Beginner • Lesson 4 • ~12 minutes</p>
                        <p className="text-sm text-gray-600 mb-3">Learn how to order drinks and use polite expressions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-indigo-700 font-medium">
                      <span>✨ Interactive exercises</span>
                      <span>•</span>
                      <span>🎤 Speaking practice</span>
                      <span>•</span>
                      <span>🔊 Audio lessons</span>
                    </div>
                    <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">
                      Start Lesson →
                    </Button>
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* Regular Lessons */}
            <Card>
              <CardHeader>
                <CardTitle>Your Lessons</CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-8 text-gray-500">Loading lessons...</div>
                ) : lessons.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No lessons available yet.</div>
                ) : (
                  lessons.map((lesson: any) => (
                    <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
                      <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">Level {lesson.level} • Lesson {lesson.order}</p>
                          </div>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                            {lesson.level}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{lesson.description}</p>
                      </div>
                    </Link>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* AI Tutor Chat */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>AI Hebrew Tutor 🤖</CardTitle>
                <CardDescription>Ask me anything about Hebrew!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">
                      <strong>Tutor:</strong> שלום! Ready to practice today?
                    </p>
                  </div>
                  <Link href="/lesson/chat">
                    <Button className="w-full">Start Conversation</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Daily Goal */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Daily Goal</CardTitle>
                <CardDescription>Keep your streak alive!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>15 min / 30 min</span>
                    <span className="font-medium">50%</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
