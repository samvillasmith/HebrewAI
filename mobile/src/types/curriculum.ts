// Curriculum structure for A1 Hebrew course

export interface Course {
  id: string
  level: 'A1' | 'A2' | 'B1' | 'B2'
  courseNumber: number
  title: string
  description: string
  totalLessons: number
  totalWords: number
  lessons: LessonMetadata[]
}

export interface LessonMetadata {
  id: string
  courseId: string
  lessonNumber: string // e.g., "1.1", "2.3"
  title: string
  duration: string // e.g., "15 min"
  vocabularyCount: number
  theme: string
  objectives?: string[]
  grammarNotes?: string[]
  isLocked?: boolean
  prerequisite?: string // lesson id that must be completed first
}

export interface CurriculumLevel {
  level: 'A1' | 'A2' | 'B1' | 'B2'
  title: string
  description: string
  totalWords: number
  totalLessons: number
  courses: Course[]
}
