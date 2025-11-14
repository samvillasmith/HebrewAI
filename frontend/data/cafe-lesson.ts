import { InteractiveLessonData } from '@/types/interactive-lesson'

export const cafeLessonData: InteractiveLessonData = {
  id: 'cafe-1',
  title: 'At the Café',
  level: 'A1 Beginner',
  lessonNumber: 4,
  description: 'Learn how to order drinks and use polite expressions',
  duration: '~12 minutes',
  newVocabularyCount: 6,
  reviewWordsCount: 5,
  objectives: [
    'Order drinks and food',
    'Use basic politeness expressions',
    'Make simple requests'
  ],
  exercises: [
    // Screen 2: Vocabulary Introduction - Coffee
    {
      id: '1',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'קָפֶה',
        transliteration: 'kafé',
        english: 'coffee',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
      }
    },

    // Screen 3: Vocabulary Introduction - Water
    {
      id: '2',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'מַיִם',
        transliteration: 'mayim',
        english: 'water',
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop',
      }
    },

    // Screen 4: Vocabulary Introduction - Tea
    {
      id: '3',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'תֵּה',
        transliteration: 'te',
        english: 'tea',
        image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&h=300&fit=crop',
      }
    },

    // Screen 5: Listen and Select
    {
      id: '4',
      type: 'listen_and_select',
      data: {
        audio: 'mayim',
        text: 'מַיִם',
        options: [
          {
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop',
            label: 'Coffee',
            value: 'coffee'
          },
          {
            image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=200&h=200&fit=crop',
            label: 'Tea',
            value: 'tea'
          },
          {
            image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop',
            label: 'Water',
            value: 'water'
          }
        ],
        correctAnswer: 'water'
      }
    },

    // Screen 6: Vocabulary Introduction - I want
    {
      id: '5',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'אֲנִי רוֹצֶה',
        transliteration: 'ani rotze (m) / rotzá (f)',
        english: 'I want',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
        note: 'Use רוֹצֶה (rotze) if you\'re male, רוֹצָה (rotzá) if you\'re female'
      }
    },

    // Screen 7: Vocabulary Introduction - Please
    {
      id: '6',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'בְּבַקָּשָׁה',
        transliteration: 'bevakashá',
        english: 'please / you\'re welcome',
        image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop',
        note: 'This word has two meanings! Use it when asking AND when giving.'
      }
    },

    // Screen 8: Match Pairs
    {
      id: '7',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: 'קָפֶה', right: 'coffee' },
          { left: 'מַיִם', right: 'water' },
          { left: 'תֵּה', right: 'tea' }
        ]
      }
    },

    // Screen 9: Build a Sentence
    {
      id: '8',
      type: 'build_sentence',
      data: {
        audio: 'ani rotze kafé, bevakashá',
        text: 'אֲנִי רוֹצֶה קָפֶה, בְּבַקָּשָׁה',
        translation: 'I want coffee, please',
        words: ['אֲנִי', 'רוֹצֶה', 'קָפֶה', 'בְּבַקָּשָׁה'],
        correctOrder: ['אֲנִי', 'רוֹצֶה', 'קָפֶה', 'בְּבַקָּשָׁה']
      }
    },

    // Screen 10: Fill in the Blank
    {
      id: '9',
      type: 'fill_in_blank',
      data: {
        sentence: 'אֲנִי רוֹצֶה ___',
        translation: 'I want ________',
        blankIndex: 2,
        options: ['מַיִם', 'קָפֶה', 'תֵּה'],
        correctAnswer: 'מַיִם',
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop'
      }
    },

    // Screen 11: Speaking Practice
    {
      id: '10',
      type: 'speaking_practice',
      data: {
        hebrew: 'קָפֶה, בְּבַקָּשָׁה',
        transliteration: 'kafé, bevakashá',
        english: 'Coffee, please'
      }
    },

    // Screen 12: Dialogue Completion
    {
      id: '11',
      type: 'dialogue_completion',
      data: {
        scenario: 'Customer at café counter with barista',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
        speakerLine: {
          speaker: 'Barista',
          hebrew: 'מָה אַתָּה רוֹצֶה?',
          english: 'What do you want?'
        },
        options: [
          {
            hebrew: 'אֲנִי רוֹצֶה קָפֶה',
            english: 'I want coffee'
          },
          {
            hebrew: 'אֲנִי רוֹצֶה מַיִם',
            english: 'I want water'
          }
        ],
        correctAnswer: 0
      }
    },

    // Screen 13: Listen and Type
    {
      id: '12',
      type: 'listen_and_type',
      data: {
        audio: 'bevakashá',
        text: 'בְּבַקָּשָׁה',
        translationHint: 'please'
      }
    }
  ],
  postLessonOptions: {
    nextLesson: {
      id: 'ordering-food-1',
      title: 'Ordering Food',
      duration: '10-15 min'
    },
    practiceVocabulary: {
      wordCount: 6,
      duration: '3-5 min'
    },
    podcast: {
      title: 'Coffee Culture in Israel',
      duration: '8 min'
    }
  }
}
