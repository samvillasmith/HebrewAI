import { InteractiveLessonData } from '@/types/interactive-lesson'

export const vowelsFinalForms: InteractiveLessonData = {
  id: 'vowels-final-forms',
  title: 'Vowels & Final Forms',
  level: 'A1 Beginner',
  lessonNumber: 2,
  description: 'Learn Hebrew vowels (nikud) and final letter forms',
  duration: '~12 minutes',
  newVocabularyCount: 13,
  reviewWordsCount: 5,
  objectives: [
    'Read Hebrew vowels (nikud)',
    'Recognize final letter forms',
    'Read simple Hebrew words'
  ],
  exercises: [
    // Vowel introductions
    {
      id: '1',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'קָמָץ (ah)',
        transliteration: 'Kamatz',
        english: 'Long "ah" sound (like "father")',
        image: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=400&h=300&fit=crop',
        note: 'Looks like a T under the letter: בָּ'
      }
    },
    {
      id: '2',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'פַּתָּח (ah)',
        transliteration: 'Patach',
        english: 'Short "ah" sound',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
        note: 'Looks like a dash under the letter: בַּ'
      }
    },
    {
      id: '3',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'צֵרֵי (ei)',
        transliteration: 'Tzerei',
        english: '"Ei" sound (like "day")',
        image: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400&h=300&fit=crop',
        note: 'Looks like two dots under the letter: בֵּ'
      }
    },
    {
      id: '4',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'סֶגּוֹל (eh)',
        transliteration: 'Segol',
        english: '"Eh" sound (like "bed")',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop',
        note: 'Looks like three dots forming a triangle: בֶּ'
      }
    },
    {
      id: '5',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'חִירִיק (ee)',
        transliteration: 'Chirik',
        english: '"Ee" sound (like "see")',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        note: 'Looks like a single dot under the letter: בִּ'
      }
    },

    // Practice reading with vowels
    {
      id: '6',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'אָב',
        transliteration: 'av',
        english: 'father',
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=400&h=300&fit=crop',
        note: 'First Hebrew word with vowels!'
      }
    },
    {
      id: '7',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'אֵם',
        transliteration: 'em',
        english: 'mother',
        image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=300&fit=crop'
      }
    },
    {
      id: '8',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'בֵּן',
        transliteration: 'ben',
        english: 'son',
        image: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=400&h=300&fit=crop'
      }
    },

    // Match pairs - words
    {
      id: '9',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: 'אָב', right: 'father' },
          { left: 'אֵם', right: 'mother' },
          { left: 'בֵּן', right: 'son' }
        ]
      }
    },

    // Final forms introduction
    {
      id: '10',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ך',
        transliteration: 'Final Kaf',
        english: 'Kaf at the end of a word',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
        note: 'Example: מֶלֶךְ (melech) = king'
      }
    },
    {
      id: '11',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ם',
        transliteration: 'Final Mem',
        english: 'Mem at the end of a word',
        image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=400&h=300&fit=crop',
        note: 'Example: יוֹם (yom) = day'
      }
    },
    {
      id: '12',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ן',
        transliteration: 'Final Nun',
        english: 'Nun at the end of a word',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop',
        note: 'Example: כֵּן (ken) = yes'
      }
    },
    {
      id: '13',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ף',
        transliteration: 'Final Peh',
        english: 'Peh at the end of a word',
        image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop',
        note: 'Example: כַּף (kaf) = spoon'
      }
    },
    {
      id: '14',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ץ',
        transliteration: 'Final Tzadi',
        english: 'Tzadi at the end of a word',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop',
        note: 'Example: קֵץ (ketz) = end'
      }
    },

    // Match final forms
    {
      id: '15',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: 'כ → ך', right: 'Kaf → Final Kaf' },
          { left: 'מ → ם', right: 'Mem → Final Mem' },
          { left: 'נ → ן', right: 'Nun → Final Nun' },
          { left: 'פ → ף', right: 'Peh → Final Peh' },
          { left: 'צ → ץ', right: 'Tzadi → Final Tzadi' }
        ]
      }
    },

    // Special concepts
    {
      id: '16',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'דָּגֵשׁ',
        transliteration: 'Dagesh',
        english: 'A dot inside a letter',
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop',
        note: 'Can change pronunciation: בּ = "b", ב = "v"'
      }
    },

    // Fill in blank
    {
      id: '17',
      type: 'fill_in_blank',
      data: {
        sentence: 'The word for "father" is ___',
        translation: 'Which word means father?',
        blankIndex: 1,
        options: ['אָב', 'אֵם', 'בֵּן'],
        correctAnswer: 'אָב'
      }
    },

    // Speaking practice
    {
      id: '18',
      type: 'speaking_practice',
      data: {
        hebrew: 'שָׁלוֹם',
        transliteration: 'shalom',
        english: 'Hello/Peace/Goodbye'
      }
    }
  ],
  postLessonOptions: {
    nextLesson: {
      id: 'essential-greetings',
      title: 'Essential Greetings',
      duration: '15 min'
    },
    practiceVocabulary: {
      wordCount: 13,
      duration: '3-5 min'
    },
    podcast: {
      title: 'Understanding Hebrew Vowels',
      duration: '8 min'
    }
  }
}
