'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { a1Curriculum } from '@/data/curriculum/a1-curriculum'
import Link from 'next/link'
import { BookOpen, Clock, Award, ChevronRight, Lock } from 'lucide-react'

export default function CoursesPage() {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{a1Curriculum.title}</h1>
              <p className="text-gray-600 mt-1">{a1Curriculum.description}</p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-indigo-600" />
                <div>
                  <p className="text-2xl font-bold">{a1Curriculum.totalLessons}</p>
                  <p className="text-sm text-gray-600">Lessons</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Award className="w-8 h-8 text-indigo-600" />
                <div>
                  <p className="text-2xl font-bold">{a1Curriculum.totalWords}</p>
                  <p className="text-sm text-gray-600">Words</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="w-8 h-8 text-indigo-600" />
                <div>
                  <p className="text-2xl font-bold">~8</p>
                  <p className="text-sm text-gray-600">Hours</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {a1Curriculum.courses.map((course, courseIndex) => (
            <Card key={course.id} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-indigo-600">{course.courseNumber}</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{course.totalLessons} lessons</p>
                      <p className="text-xs text-gray-500">{course.totalWords} words</p>
                    </div>
                    <ChevronRight
                      className={`w-6 h-6 transition-transform ${
                        expandedCourse === course.id ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>0/{course.totalLessons}</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </CardHeader>

              {/* Lessons */}
              {expandedCourse === course.id && (
                <CardContent className="pt-4 border-t">
                  <div className="space-y-3">
                    {course.lessons.map((lesson, lessonIndex) => {
                      const isLocked = lesson.isLocked || (lessonIndex > 0 && courseIndex === 0 && lessonIndex > 1)
                      const hasPrerequisite = lesson.prerequisite

                      return (
                        <Card
                          key={lesson.id}
                          className={`${isLocked ? 'opacity-60' : 'hover:shadow-md'} transition-all`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 flex-1">
                                <div className="w-10 h-10 rounded bg-indigo-50 flex items-center justify-center">
                                  <span className="text-sm font-bold text-indigo-600">
                                    {lesson.lessonNumber}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold">{lesson.title}</h4>
                                  <p className="text-sm text-gray-600">{lesson.theme}</p>
                                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {lesson.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <BookOpen className="w-3 h-3" />
                                      {lesson.vocabularyCount} words
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {isLocked ? (
                                <div className="flex items-center gap-2 text-gray-500">
                                  <Lock className="w-5 h-5" />
                                  <span className="text-sm">Locked</span>
                                </div>
                              ) : (
                                <Link href={`/interactive-lesson/${lesson.id}`}>
                                  <Button>Start Lesson</Button>
                                </Link>
                              )}
                            </div>

                            {/* Objectives */}
                            {lesson.objectives && lesson.objectives.length > 0 && (
                              <div className="mt-3 pt-3 border-t">
                                <p className="text-xs font-semibold text-gray-700 mb-1">
                                  Learning Objectives:
                                </p>
                                <ul className="text-xs text-gray-600 space-y-1">
                                  {lesson.objectives.map((obj, i) => (
                                    <li key={i}>• {obj}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Grammar notes */}
                            {lesson.grammarNotes && lesson.grammarNotes.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs font-semibold text-indigo-700 mb-1">
                                  Grammar Notes:
                                </p>
                                <ul className="text-xs text-indigo-600 space-y-1">
                                  {lesson.grammarNotes.map((note, i) => (
                                    <li key={i}>💡 {note}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
