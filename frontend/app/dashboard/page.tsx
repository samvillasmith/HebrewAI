'use client'

import { UserButton } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { a1Curriculum } from '@/data/curriculum/a1-curriculum'
import { BookOpen, Clock, Award, ChevronRight, Sparkles } from 'lucide-react'

export default function DashboardPage() {
  const { userId, isLoaded } = useAuth()
  const [expandedCourse, setExpandedCourse] = React.useState<string | null>(null)
  const [userProgress, setUserProgress] = React.useState({
    currentLevel: 'A1',
    lessonsCompleted: 0,
    totalLessons: a1Curriculum.totalLessons,
    wordsLearned: 0,
    totalWords: a1Curriculum.totalWords,
    streakDays: 0,
    xpPoints: 0,
  })
  const [completedLessons, setCompletedLessons] = React.useState<Set<string>>(new Set())
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (userId) {
      fetchUserProgress()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const fetchUserProgress = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

      // Fetch user progress
      const progressRes = await fetch(`${apiUrl}/api/users/${userId}`)
      if (progressRes.ok) {
        const progressData = await progressRes.json()

        // Fetch vocabulary stats
        const vocabRes = await fetch(`${apiUrl}/api/vocabulary/stats?user_id=${userId}`)
        const vocabData = await vocabRes.json()

        // Get completed lesson IDs
        if (progressData.lesson_progress) {
          const completed = new Set(
            progressData.lesson_progress
              .filter((lp: any) => lp.is_completed)
              .map((lp: any) => lp.lesson_id)
          )
          setCompletedLessons(completed)
        }

        setUserProgress({
          currentLevel: progressData.current_level || 'A1',
          lessonsCompleted: progressData.lessons_complete || 0,
          totalLessons: a1Curriculum.totalLessons,
          wordsLearned: vocabData.total_words || 0,
          totalWords: a1Curriculum.totalWords,
          streakDays: progressData.streak_days || 0,
          xpPoints: progressData.xp_points || 0,
        })
      }
    } catch (error) {
      console.error('Error fetching user progress:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!userId) {
    redirect('/sign-in')
    return null
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
            <Link href="/vocabulary">
              <Button variant="ghost">Vocabulary</Button>
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
              <CardDescription>Words Learned</CardDescription>
              <CardTitle className="text-3xl">
                {userProgress.wordsLearned}/{userProgress.totalWords}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Day Streak 🔥</CardDescription>
              <CardTitle className="text-3xl">{userProgress.streakDays}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Learning Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Courses */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Interactive Lesson */}
            <Card className="border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <CardTitle>Featured Lesson</CardTitle>
                </div>
                <CardDescription>Try our enhanced interactive lesson!</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/interactive-lesson/cafe-1">
                  <div className="p-6 border-2 border-white rounded-lg hover:bg-white/50 transition-colors cursor-pointer bg-white/30 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-xl mb-1">☕ At the Café</h3>
                        <p className="text-sm text-gray-700 mb-2">Course 7: Food & Dining • ~18 minutes</p>
                        <p className="text-sm text-gray-600 mb-3">Order drinks, learn food vocabulary, and practice polite expressions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-indigo-700 font-medium mb-3">
                      <span>✨ 22 exercises</span>
                      <span>•</span>
                      <span>🎤 Speaking</span>
                      <span>•</span>
                      <span>🔊 TTS Audio</span>
                      <span>•</span>
                      <span>💬 Dialogue</span>
                    </div>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Start Lesson →
                    </Button>
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* A1 Curriculum Courses */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{a1Curriculum.title}</CardTitle>
                    <CardDescription className="mt-1">{a1Curriculum.description}</CardDescription>
                  </div>
                  <Award className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <p className="text-2xl font-bold text-indigo-600">{a1Curriculum.totalLessons}</p>
                    <p className="text-xs text-gray-600">Lessons</p>
                  </div>
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <p className="text-2xl font-bold text-indigo-600">{a1Curriculum.totalWords}</p>
                    <p className="text-xs text-gray-600">Words</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {a1Curriculum.courses.slice(0, 5).map((course) => {
                  // Calculate course progress
                  const completedInCourse = course.lessons.filter(lesson =>
                    completedLessons.has(lesson.id)
                  ).length
                  const courseProgress = course.totalLessons > 0
                    ? Math.round((completedInCourse / course.totalLessons) * 100)
                    : 0

                  return (
                  <div key={course.id}>
                    <div
                      onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                      className="p-4 border-2 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-lg font-bold text-indigo-600">{course.courseNumber}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{course.title}</h4>
                            <p className="text-xs text-gray-600">{course.description}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {completedInCourse}/{course.totalLessons} lessons
                              </span>
                              <span>{course.totalWords} words</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ${
                            expandedCourse === course.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                      {/* Progress bar */}
                      <div className="mt-3">
                        <Progress value={courseProgress} className="h-1.5" />
                      </div>
                    </div>

                    {/* Expanded Lessons */}
                    {expandedCourse === course.id && (
                      <div className="mt-2 ml-4 space-y-2 animate-in slide-in-from-top">
                        {course.lessons.map((lesson, idx) => {
                          const isCompleted = completedLessons.has(lesson.id)
                          return (
                            <Link key={lesson.id} href={`/interactive-lesson/${lesson.id}`}>
                              <div className={`p-3 border rounded-lg hover:bg-indigo-50 transition-colors ${isCompleted ? 'bg-green-50 border-green-300' : 'bg-white'}`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded flex items-center justify-center ${isCompleted ? 'bg-green-500 text-white' : 'bg-indigo-50'}`}>
                                      {isCompleted ? (
                                        <span className="text-sm">✓</span>
                                      ) : (
                                        <span className="text-xs font-bold text-indigo-600">
                                          {lesson.lessonNumber}
                                        </span>
                                      )}
                                    </div>
                                    <div>
                                      <h5 className="font-medium text-sm">{lesson.title}</h5>
                                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                        <Clock className="w-3 h-3" />
                                        {lesson.duration}
                                        <span>•</span>
                                        <span>{lesson.vocabularyCount} words</span>
                                      </div>
                                    </div>
                                  </div>
                                  <Button size="sm" variant="ghost">
                                    {isCompleted ? 'Review' : 'Start'}
                                  </Button>
                                </div>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                  )
                })}

                <Link href="/courses">
                  <Button variant="outline" className="w-full mt-4">
                    View All {a1Curriculum.courses.length} Courses →
                  </Button>
                </Link>
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
