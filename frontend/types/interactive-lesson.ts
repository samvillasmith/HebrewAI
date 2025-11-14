// Type definitions for interactive lesson flow

export type InteractiveExerciseType =
  | 'vocabulary_intro'
  | 'listen_and_select'
  | 'match_pairs'
  | 'build_sentence'
  | 'fill_in_blank'
  | 'speaking_practice'
  | 'dialogue_completion'
  | 'listen_and_type'

export interface VocabularyItem {
  hebrew: string
  transliteration: string
  english: string
  image?: string
  audioUrl?: string
  note?: string
}

export interface ListenAndSelectItem {
  audio: string
  text: string
  options: {
    image: string
    label: string
    value: string
  }[]
  correctAnswer: string
}

export interface MatchPairItem {
  left: string
  right: string
}

export interface BuildSentenceItem {
  audio: string
  text: string
  translation: string
  words: string[]
  correctOrder: string[]
}

export interface FillInBlankItem {
  sentence: string
  translation: string
  blankIndex: number
  options: string[]
  correctAnswer: string
  image?: string
}

export interface SpeakingPracticeItem {
  hebrew: string
  transliteration: string
  english: string
  audioUrl?: string
}

export interface DialogueCompletionItem {
  scenario: string
  image?: string
  speakerLine: {
    speaker: string
    hebrew: string
    english: string
  }
  options: {
    hebrew: string
    english: string
  }[]
  correctAnswer: number
}

export interface ListenAndTypeItem {
  audio: string
  text: string
  translationHint: string
}

export interface InteractiveExercise {
  id: string
  type: InteractiveExerciseType
  data:
    | VocabularyItem
    | ListenAndSelectItem
    | { pairs: MatchPairItem[] }
    | BuildSentenceItem
    | FillInBlankItem
    | SpeakingPracticeItem
    | DialogueCompletionItem
    | ListenAndTypeItem
}

export interface InteractiveLessonData {
  id: string
  title: string
  level: string
  lessonNumber: number
  description: string
  duration: string
  objectives: string[]
  newVocabularyCount: number
  reviewWordsCount?: number
  exercises: InteractiveExercise[]
  postLessonOptions: {
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
}
