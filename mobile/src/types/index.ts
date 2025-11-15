export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  vocabularyCount: number;
  lessonNumber: string;
}

export interface Course {
  id: string;
  courseNumber: number;
  title: string;
  description: string;
  totalLessons: number;
  totalWords: number;
  lessons: Lesson[];
}

export interface UserProgress {
  currentLevel: string;
  lessonsCompleted: number;
  totalLessons: number;
  wordsLearned: number;
  totalWords: number;
  streakDays: number;
  xpPoints: number;
}

export interface VocabularyItem {
  hebrew: string;
  english: string;
  transliteration?: string;
}
