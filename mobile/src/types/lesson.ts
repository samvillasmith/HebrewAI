export interface VocabularyItem {
  hebrew: string;
  transliteration: string;
  english: string;
  image?: string;
  audioUrl?: string;
  note?: string;
}

export interface Exercise {
  type: string;
  data: any;
}

export interface LessonData {
  id: string;
  title: string;
  level: string;
  lessonNumber: number;
  objectives: string[];
  newVocabularyCount: number;
  exercises: Exercise[];
  postLessonOptions?: {
    nextLesson?: { id: string; title: string };
    practiceVocabulary?: boolean;
    podcast?: { id: string; title: string };
  };
}

export interface LessonProgress {
  lessonId: string;
  progress: number;
  isCompleted: boolean;
  score?: number;
}
