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

export type Gender = 'male' | 'female'

// Gendered text can be a simple string (gender-neutral) or an object with male/female variants
export type GenderedText = string | {
  male: string
  female: string
}

export interface VocabularyItem {
  hebrew: GenderedText
  transliteration: GenderedText
  english: string
  image?: string
  audioUrl?: string
  note?: string
}

export interface ListenAndSelectItem {
  audio: string
  text: GenderedText
  options: {
    image: string
    label: string
    value: string
  }[]
  correctAnswer: string
}

export interface MatchPairItem {
  left: GenderedText
  right: string
}

export interface BuildSentenceItem {
  audio: string
  text: GenderedText
  translation: GenderedText
  words: GenderedText[]
  correctOrder: GenderedText[]
}

export interface FillInBlankItem {
  sentence: GenderedText
  translation: GenderedText
  blankIndex: number
  options: GenderedText[]
  correctAnswer: GenderedText
  image?: string
}

export interface SpeakingPracticeItem {
  hebrew: GenderedText
  transliteration: GenderedText
  english: string
  audioUrl?: string
}

export interface DialogueCompletionItem {
  scenario: string
  image?: string
  speakerLine: {
    speaker: string
    hebrew: GenderedText
    english: string
  }
  options: {
    hebrew: GenderedText
    english: string
  }[]
  correctAnswer: number
}

export interface ListenAndTypeItem {
  audio: string
  text: GenderedText
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
