'use client'

import { UserButton } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Brain, TrendingUp, Check, X, RefreshCw } from 'lucide-react'
import VocabularyReviewCard from '@/components/vocabulary/VocabularyReviewCard'

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

interface ReviewStats {
  total_words: number
  due_for_review: number
  learning: number
  mastered: number
}

export default function VocabularyPage() {
  const { userId, isLoaded } = useAuth()
  const [reviewWords, setReviewWords] = useState<VocabularyItem[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isReviewing, setIsReviewing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    if (userId) {
      fetchVocabularyData()
    }
  }, [userId])

  const fetchVocabularyData = async () => {
    try {
      setLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

      // Fetch stats
      const statsRes = await fetch(`${apiUrl}/api/vocabulary/stats?user_id=${userId}`)
      const statsData = await statsRes.json()
      setStats(statsData)

      // Fetch review words
      const reviewRes = await fetch(`${apiUrl}/api/vocabulary/review?user_id=${userId}&limit=20`)
      const reviewData = await reviewRes.json()
      setReviewWords(reviewData)
    } catch (error) {
      console.error('Error fetching vocabulary data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReviewResponse = async (quality: number) => {
    if (!reviewWords[currentWordIndex]) return

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      await fetch(`${apiUrl}/api/vocabulary/review/${reviewWords[currentWordIndex].id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quality }),
      })

      // Move to next word
      if (currentWordIndex < reviewWords.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1)
        setShowAnswer(false)
      } else {
        // Review session complete
        setIsReviewing(false)
        setCurrentWordIndex(0)
        fetchVocabularyData() // Refresh data
      }
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!userId) {
    redirect('/sign-in')
    return null
  }

  const currentWord = reviewWords[currentWordIndex]

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
          <h1 className="text-4xl font-bold mb-2">Vocabulary Review 📚</h1>
          <p className="text-gray-600">Practice your Hebrew vocabulary with spaced repetition</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            {stats && (
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Total Words
                    </CardDescription>
                    <CardTitle className="text-3xl">{stats.total_words}</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader className="pb-3">
                    <CardDescription className="flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Due for Review
                    </CardDescription>
                    <CardTitle className="text-3xl text-orange-600">{stats.due_for_review}</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardDescription className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Learning
                    </CardDescription>
                    <CardTitle className="text-3xl text-blue-600">{stats.learning}</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <CardDescription className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Mastered
                    </CardDescription>
                    <CardTitle className="text-3xl text-green-600">{stats.mastered}</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            )}

            {/* Review Interface */}
            {!isReviewing && reviewWords.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Ready to Review?</CardTitle>
                  <CardDescription>
                    You have {reviewWords.length} word{reviewWords.length !== 1 ? 's' : ''} ready for review
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setIsReviewing(true)}
                    className="w-full"
                    size="lg"
                  >
                    Start Review Session
                  </Button>
                </CardContent>
              </Card>
            )}

            {isReviewing && currentWord && (
              <VocabularyReviewCard
                word={currentWord}
                currentIndex={currentWordIndex}
                totalWords={reviewWords.length}
                showAnswer={showAnswer}
                onShowAnswer={() => setShowAnswer(true)}
                onResponse={handleReviewResponse}
              />
            )}

            {!isReviewing && reviewWords.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Check className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-2xl font-bold mb-2">All Caught Up!</h3>
                  <p className="text-gray-600 mb-4">
                    You don't have any words due for review right now.
                  </p>
                  <p className="text-sm text-gray-500">
                    Complete more courses to add new vocabulary to your review queue.
                  </p>
                  <Link href="/dashboard">
                    <Button className="mt-6">
                      Back to Dashboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}
