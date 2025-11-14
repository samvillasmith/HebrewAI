'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, BookOpen, RotateCw, Headphones } from 'lucide-react'
import Link from 'next/link'

interface PostLessonOption {
  icon: React.ReactNode
  title: string
  description: string
  duration: string
  href?: string
  onClick?: () => void
}

interface PostLessonOptionsScreenProps {
  nextLesson?: {
    id: string
    title: string
    duration: string
  }
  practiceVocabulary: {
    wordCount: number
    duration: string
  }
  podcast?: {
    title: string
    duration: string
  }
}

export default function PostLessonOptionsScreen({
  nextLesson,
  practiceVocabulary,
  podcast
}: PostLessonOptionsScreenProps) {
  const options: PostLessonOption[] = []

  // Next Lesson
  if (nextLesson) {
    options.push({
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Next Lesson',
      description: nextLesson.title,
      duration: nextLesson.duration,
      href: `/interactive-lesson/${nextLesson.id}`
    })
  }

  // Practice Vocabulary
  options.push({
    icon: <RotateCw className="w-8 h-8" />,
    title: 'Practice Vocabulary',
    description: `Review ${practiceVocabulary.wordCount} words from today`,
    duration: practiceVocabulary.duration,
    onClick: () => {
      // TODO: Implement vocabulary practice
      console.log('Practice vocabulary clicked')
    }
  })

  // Podcast
  if (podcast) {
    options.push({
      icon: <Headphones className="w-8 h-8" />,
      title: 'Listen to Podcast',
      description: podcast.title,
      duration: podcast.duration,
      onClick: () => {
        // TODO: Implement podcast player
        console.log('Podcast clicked')
      }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl">
        {/* Back Button */}
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Course
          </Button>
        </Link>

        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-bold">What's next?</h2>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {options.map((option, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-indigo-300"
              >
                <CardContent
                  className="p-6"
                  onClick={option.onClick}
                >
                  {option.href ? (
                    <Link href={option.href} className="block">
                      <OptionContent option={option} />
                    </Link>
                  ) : (
                    <OptionContent option={option} />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function OptionContent({ option }: { option: PostLessonOption }) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex-shrink-0 w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
        {option.icon}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-1">{option.title}</h3>
        <p className="text-gray-600 mb-1">{option.description}</p>
        <p className="text-sm text-gray-500">{option.duration}</p>
      </div>
      <div className="flex-shrink-0">
        <ArrowLeft className="w-6 h-6 text-gray-400 rotate-180" />
      </div>
    </div>
  )
}
