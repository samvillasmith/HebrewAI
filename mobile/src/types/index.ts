export interface UserProgress {
  currentLevel: string;
  lessonsCompleted: number;
  totalLessons: number;
  wordsLearned: number;
  totalWords: number;
  streakDays: number;
  xpPoints: number;
}

export interface Lesson {
  id: string;
  lessonNumber: number;
  title: string;
  duration: string;
  vocabularyCount: number;
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
