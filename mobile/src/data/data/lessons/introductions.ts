import { InteractiveLessonData } from '@/types/interactive-lesson'

export const introductions: InteractiveLessonData = {
  id: 'introductions',
  title: 'Introductions',
  level: 'A1 Beginner',
  lessonNumber: 4,
  description: 'Learn how to introduce yourself and ask about others',
  duration: '~15 minutes',
  newVocabularyCount: 20,
  reviewWordsCount: 5,
  objectives: [
    'Introduce yourself in Hebrew',
    'Ask and answer "What\'s your name?"',
    'Say where you\'re from'
  ],
  exercises: [
    // Core introduction phrases
    {
      id: '1',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'שֵׁם',
        transliteration: 'shem',
        english: 'name',
        image: 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?w=400&h=300&fit=crop',
        note: 'A fundamental word for introductions!'
      }
    },
    {
      id: '2',
      type: 'vocabulary_intro',
      data: {
        hebrew: {
          male: 'שְׁמִי',
          female: 'שְׁמִי'
        },
        transliteration: 'shmi',
        english: 'my name',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        note: 'Used to introduce yourself: שמי דוד (My name is David)'
      }
    },
    {
      id: '3',
      type: 'vocabulary_intro',
      data: {
        hebrew: {
          male: 'מָה שִׁמְךָ?',
          female: 'מָה שְׁמֵךְ?'
        },
        transliteration: {
          male: 'ma shimcha?',
          female: 'ma shmech?'
        },
        english: 'what\'s your name?',
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop',
        note: 'Changes based on who you\'re asking!'
      }
    },
    {
      id: '4',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'נָעִים מְאוֹד',
        transliteration: 'naim meod',
        english: 'nice to meet you / pleased to meet you',
        image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop',
        note: 'Literally means "very pleasant"'
      }
    },

    // Dialogue - First meeting
    {
      id: '5',
      type: 'dialogue_completion',
      data: {
        scenario: 'Meeting someone new',
        image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&fit=crop',
        speakerLine: {
          speaker: 'Person',
          hebrew: {
            male: 'מָה שִׁמְךָ?',
            female: 'מָה שְׁמֵךְ?'
          },
          english: 'What\'s your name?'
        },
        options: [
          {
            hebrew: {
              male: 'שְׁמִי דָּוִד',
              female: 'שְׁמִי שָׂרָה'
            },
            english: 'My name is David / Sarah'
          },
          {
            hebrew: 'שָׁלוֹם',
            english: 'Hello'
          },
          {
            hebrew: 'תּוֹדָה',
            english: 'Thank you'
          }
        ],
        correctAnswer: 0
      }
    },

    // Pronouns
    {
      id: '6',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'אֲנִי',
        transliteration: 'ani',
        english: 'I',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        note: 'Used for both male and female'
      }
    },
    {
      id: '7',
      type: 'vocabulary_intro',
      data: {
        hebrew: {
          male: 'אַתָּה',
          female: 'אַתְּ'
        },
        transliteration: {
          male: 'ata',
          female: 'at'
        },
        english: 'you (singular)',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop',
        note: 'Different forms for male/female'
      }
    },
    {
      id: '8',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'הוּא',
        transliteration: 'hu',
        english: 'he',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop'
      }
    },
    {
      id: '9',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'הִיא',
        transliteration: 'hi',
        english: 'she',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop'
      }
    },

    // Match pairs - pronouns
    {
      id: '10',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: 'אֲנִי', right: 'I' },
          { left: { male: 'אַתָּה', female: 'אַתְּ' }, right: 'you' },
          { left: 'הוּא', right: 'he' },
          { left: 'הִיא', right: 'she' }
        ]
      }
    },

    // Origin/location
    {
      id: '11',
      type: 'vocabulary_intro',
      data: {
        hebrew: {
          male: 'מֵאֵיפֹה אַתָּה?',
          female: 'מֵאֵיפֹה אַתְּ?'
        },
        transliteration: 'meifo ata/at?',
        english: 'where are you from?',
        image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&h=300&fit=crop',
        note: 'Literally "from where are you?"'
      }
    },
    {
      id: '12',
      type: 'vocabulary_intro',
      data: {
        hebrew: {
          male: 'אֲנִי מֵ...',
          female: 'אֲנִי מֵ...'
        },
        transliteration: 'ani me...',
        english: 'I\'m from...',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
        note: 'Follow with a country name'
      }
    },

    // Countries
    {
      id: '13',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'אָמֶרִיקָה',
        transliteration: 'amerika',
        english: 'America',
        image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop'
      }
    },
    {
      id: '14',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'יִשְׂרָאֵל',
        transliteration: 'yisrael',
        english: 'Israel',
        image: 'https://images.unsplash.com/photo-1566571997813-e2d69d04043b?w=400&h=300&fit=crop'
      }
    },
    {
      id: '15',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'אַנְגְּלִיָּה',
        transliteration: 'anglia',
        english: 'England',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop'
      }
    },
    {
      id: '16',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'צָרְפַת',
        transliteration: 'tzarfat',
        english: 'France',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop'
      }
    },
    {
      id: '17',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'קָנָדָה',
        transliteration: 'kanada',
        english: 'Canada',
        image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400&h=300&fit=crop'
      }
    },

    // Listen and select - country
    {
      id: '18',
      type: 'listen_and_select',
      data: {
        audio: 'yisrael',
        text: 'יִשְׂרָאֵל',
        options: [
          { image: 'https://images.unsplash.com/photo-1566571997813-e2d69d04043b?w=200&h=200&fit=crop', label: 'Israel', value: 'israel' },
          { image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=200&h=200&fit=crop', label: 'America', value: 'america' },
          { image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=200&h=200&fit=crop', label: 'England', value: 'england' }
        ],
        correctAnswer: 'israel'
      }
    },

    // Additional vocabulary
    {
      id: '19',
      type: 'vocabulary_intro',
      data: {
        hebrew: {
          male: 'סְלִיחָה, אֵיךְ קוֹרְאִים לְךָ?',
          female: 'סְלִיחָה, אֵיךְ קוֹרְאִים לָךְ?'
        },
        transliteration: 'slicha, eich korim lecha/lach?',
        english: 'excuse me, what do they call you? (informal)',
        image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop',
        note: 'Another way to ask someone\'s name'
      }
    },
    {
      id: '20',
      type: 'vocabulary_intro',
      data: {
        hebrew: {
          male: 'גַּם אֲנִי',
          female: 'גַּם אֲנִי'
        },
        transliteration: 'gam ani',
        english: 'me too / I also',
        image: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=300&fit=crop'
      }
    },
    {
      id: '21',
      type: 'vocabulary_intro',
      data: {
        hebrew: {
          male: 'גָּר',
          female: 'גָּרָה'
        },
        transliteration: {
          male: 'gar',
          female: 'gara'
        },
        english: 'lives / living',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
        note: 'אני גר בתל אביב (I live in Tel Aviv)'
      }
    },
    {
      id: '22',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'בְּ',
        transliteration: 'be',
        english: 'in',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop',
        note: 'Preposition: בתל אביב (in Tel Aviv)'
      }
    },

    // Fill in blank
    {
      id: '23',
      type: 'fill_in_blank',
      data: {
        sentence: 'To ask someone\'s name, you say: ___',
        translation: 'What\'s your name?',
        blankIndex: 1,
        options: [
          { male: 'מָה שִׁמְךָ?', female: 'מָה שְׁמֵךְ?' },
          'שָׁלוֹם',
          'תּוֹדָה'
        ],
        correctAnswer: { male: 'מָה שִׁמְךָ?', female: 'מָה שְׁמֵךְ?' },
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop'
      }
    },

    // Match pairs - countries
    {
      id: '24',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: 'אָמֶרִיקָה', right: 'America' },
          { left: 'יִשְׂרָאֵל', right: 'Israel' },
          { left: 'אַנְגְּלִיָּה', right: 'England' },
          { left: 'צָרְפַת', right: 'France' },
          { left: 'קָנָדָה', right: 'Canada' }
        ]
      }
    },

    // Dialogue completion - origin
    {
      id: '25',
      type: 'dialogue_completion',
      data: {
        scenario: 'Asking where someone is from',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop',
        speakerLine: {
          speaker: 'Friend',
          hebrew: { male: 'מֵאֵיפֹה אַתָּה?', female: 'מֵאֵיפֹה אַתְּ?' },
          english: 'Where are you from?'
        },
        options: [
          {
            hebrew: { male: 'אֲנִי מֵאָמֶרִיקָה', female: 'אֲנִי מֵאָמֶרִיקָה' },
            english: 'I\'m from America'
          },
          {
            hebrew: 'שָׁלוֹם',
            english: 'Hello'
          },
          {
            hebrew: 'נָעִים מְאוֹד',
            english: 'Nice to meet you'
          }
        ],
        correctAnswer: 0
      }
    },

    // Build sentence
    {
      id: '26',
      type: 'build_sentence',
      data: {
        audio: { male: 'shmi david', female: 'shmi sarah' },
        text: { male: 'שְׁמִי דָּוִד', female: 'שְׁמִי שָׂרָה' },
        translation: 'My name is David / Sarah',
        words: [
          { male: 'שְׁמִי', female: 'שְׁמִי' },
          { male: 'דָּוִד', female: 'שָׂרָה' }
        ],
        correctOrder: [
          { male: 'שְׁמִי', female: 'שְׁמִי' },
          { male: 'דָּוִד', female: 'שָׂרָה' }
        ]
      }
    },

    // Speaking practice
    {
      id: '27',
      type: 'speaking_practice',
      data: {
        hebrew: { male: 'שְׁמִי דָּוִד. נָעִים מְאוֹד.', female: 'שְׁמִי שָׂרָה. נָעִים מְאוֹד.' },
        transliteration: 'shmi david/sarah. naim meod.',
        english: 'My name is David/Sarah. Nice to meet you.'
      }
    },

    // Final review
    {
      id: '28',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: 'שֵׁם', right: 'name' },
          { left: { male: 'שְׁמִי', female: 'שְׁמִי' }, right: 'my name' },
          { left: 'נָעִים מְאוֹד', right: 'nice to meet you' },
          { left: { male: 'מֵאֵיפֹה אַתָּה?', female: 'מֵאֵיפֹה אַתְּ?' }, right: 'where are you from?' },
          { left: { male: 'אֲנִי מֵ...', female: 'אֲנִי מֵ...' }, right: 'I\'m from...' }
        ]
      }
    }
  ],
  postLessonOptions: {
    nextLesson: {
      id: 'polite-expressions',
      title: 'Polite Expressions',
      duration: '12 min'
    },
    practiceVocabulary: {
      wordCount: 20,
      duration: '5-7 min'
    },
    podcast: {
      title: 'Hebrew Introductions in Context',
      duration: '10 min'
    }
  }
}
