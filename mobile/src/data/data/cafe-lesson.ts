import { InteractiveLessonData } from '@/types/interactive-lesson'

export const cafeLessonData: InteractiveLessonData = {
  id: 'cafe-1',
  title: 'At the Café',
  level: 'A1 Beginner',
  lessonNumber: 4,
  description: 'Learn how to order drinks and use polite expressions',
  duration: '~18 minutes',
  newVocabularyCount: 9,
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
        hebrew: {
          male: 'אֲנִי רוֹצֶה',
          female: 'אֲנִי רוֹצָה'
        },
        transliteration: {
          male: 'ani rotze',
          female: 'ani rotzá'
        },
        english: 'I want',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
        note: 'The verb "want" changes based on gender in Hebrew'
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

    // Screen 8: Vocabulary Introduction - Milk
    {
      id: '7',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'חָלָב',
        transliteration: 'khaláv',
        english: 'milk',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop',
      }
    },

    // Screen 9: Vocabulary Introduction - Thank you
    {
      id: '8',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'תּוֹדָה',
        transliteration: 'todá',
        english: 'thank you',
        image: 'https://images.unsplash.com/photo-1450609283058-0ec52fa7eac4?w=400&h=300&fit=crop',
      }
    },

    // Screen 10: Vocabulary Introduction - Hot
    {
      id: '9',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'חַם',
        transliteration: 'kham',
        english: 'hot',
        image: 'https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=400&h=300&fit=crop',
      }
    },

    // Screen 11: Vocabulary Introduction - Cold
    {
      id: '10',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'קַר',
        transliteration: 'kar',
        english: 'cold',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
      }
    },

    // Screen 12: Listen and Select (reviewing new vocab)
    {
      id: '11',
      type: 'listen_and_select',
      data: {
        audio: 'khaláv',
        text: 'חָלָב',
        options: [
          {
            image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop',
            label: 'Milk',
            value: 'milk'
          },
          {
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop',
            label: 'Coffee',
            value: 'coffee'
          },
          {
            image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop',
            label: 'Water',
            value: 'water'
          }
        ],
        correctAnswer: 'milk'
      }
    },

    // Screen 13: Match Pairs
    {
      id: '12',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: 'קָפֶה', right: 'coffee' },
          { left: 'מַיִם', right: 'water' },
          { left: 'תֵּה', right: 'tea' },
          { left: 'חָלָב', right: 'milk' },
          { left: 'תּוֹדָה', right: 'thank you' }
        ]
      }
    },

    // Screen 14: Build a Sentence
    {
      id: '13',
      type: 'build_sentence',
      data: {
        audio: 'ani rotze kafé, bevakashá',
        text: {
          male: 'אֲנִי רוֹצֶה קָפֶה, בְּבַקָּשָׁה',
          female: 'אֲנִי רוֹצָה קָפֶה, בְּבַקָּשָׁה'
        },
        translation: 'I want coffee, please',
        words: [
          'אֲנִי',
          { male: 'רוֹצֶה', female: 'רוֹצָה' },
          'קָפֶה',
          'בְּבַקָּשָׁה'
        ],
        correctOrder: [
          'אֲנִי',
          { male: 'רוֹצֶה', female: 'רוֹצָה' },
          'קָפֶה',
          'בְּבַקָּשָׁה'
        ]
      }
    },

    // Screen 15: Fill in the Blank
    {
      id: '14',
      type: 'fill_in_blank',
      data: {
        sentence: {
          male: 'אֲנִי רוֹצֶה ___',
          female: 'אֲנִי רוֹצָה ___'
        },
        translation: 'I want ________',
        blankIndex: 2,
        options: ['מַיִם', 'קָפֶה', 'תֵּה'],
        correctAnswer: 'מַיִם',
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop'
      }
    },

    // Screen 16: Fill in the Blank - Hot or Cold
    {
      id: '15',
      type: 'fill_in_blank',
      data: {
        sentence: 'קָפֶה ___',
        translation: '________ coffee',
        blankIndex: 1,
        options: ['חַם', 'קַר'],
        correctAnswer: 'חַם',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop'
      }
    },

    // Screen 17: Speaking Practice
    {
      id: '16',
      type: 'speaking_practice',
      data: {
        hebrew: 'קָפֶה, בְּבַקָּשָׁה',
        transliteration: 'kafé, bevakashá',
        english: 'Coffee, please'
      }
    },

    // Screen 18: Speaking Practice - Thank you
    {
      id: '17',
      type: 'speaking_practice',
      data: {
        hebrew: 'תּוֹדָה רַבָּה',
        transliteration: 'todá rabá',
        english: 'Thank you very much'
      }
    },

    // Screen 19: Dialogue Completion
    {
      id: '18',
      type: 'dialogue_completion',
      data: {
        scenario: 'Customer at café counter with barista',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
        speakerLine: {
          speaker: 'Barista',
          hebrew: {
            male: 'מָה אַתָּה רוֹצֶה?',
            female: 'מָה אַתְּ רוֹצָה?'
          },
          english: 'What do you want?'
        },
        options: [
          {
            hebrew: {
              male: 'אֲנִי רוֹצֶה קָפֶה',
              female: 'אֲנִי רוֹצָה קָפֶה'
            },
            english: 'I want coffee'
          },
          {
            hebrew: {
              male: 'אֲנִי רוֹצֶה מַיִם',
              female: 'אֲנִי רוֹצָה מַיִם'
            },
            english: 'I want water'
          }
        ],
        correctAnswer: 0
      }
    },

    // Screen 20: Build a Sentence - With Milk
    {
      id: '19',
      type: 'build_sentence',
      data: {
        audio: 'kafé im khaláv',
        text: 'קָפֶה עִם חָלָב',
        translation: 'Coffee with milk',
        words: ['קָפֶה', 'עִם', 'חָלָב'],
        correctOrder: ['קָפֶה', 'עִם', 'חָלָב']
      }
    },

    // Screen 21: Dialogue with Blanks - Ordering at Café
    {
      id: '21',
      type: 'dialogue_with_blanks',
      data: {
        scenario: 'You are ordering at a café',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
        dialogue: [
          {
            speaker: 'Barista',
            line: 'שָׁלוֹם! מָה אַתָּה רוֹצֶה?',
            isBlank: false
          },
          {
            speaker: 'You',
            line: '',
            isBlank: true,
            options: [
              { male: 'אֲנִי רוֹצֶה קָפֶה עִם חָלָב', female: 'אֲנִי רוֹצָה קָפֶה עִם חָלָב' },
              { male: 'אֲנִי רוֹצֶה תֵּה', female: 'אֲנִי רוֹצָה תֵּה' },
              { male: 'אֲנִי רוֹצֶה מַיִם', female: 'אֲנִי רוֹצָה מַיִם' }
            ],
            correctAnswer: 0
          },
          {
            speaker: 'Barista',
            line: 'חַם אוֹ קַר?',
            isBlank: false
          },
          {
            speaker: 'You',
            line: '',
            isBlank: true,
            options: ['חַם, בְּבַקָּשָׁה', 'קַר, בְּבַקָּשָׁה'],
            correctAnswer: 0
          },
          {
            speaker: 'Barista',
            line: 'בְּבַקָּשָׁה!',
            isBlank: false
          },
          {
            speaker: 'You',
            line: '',
            isBlank: true,
            options: ['תּוֹדָה רַבָּה!', 'שָׁלוֹם!'],
            correctAnswer: 0
          }
        ]
      }
    },

    // Screen 22: Listen and Type
    {
      id: '22',
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
      wordCount: 9,
      duration: '5-7 min'
    },
    podcast: {
      title: 'Coffee Culture in Israel',
      duration: '8 min'
    }
  }
}
