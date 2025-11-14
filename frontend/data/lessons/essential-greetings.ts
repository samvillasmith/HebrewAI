import { InteractiveLessonData } from '@/types/interactive-lesson'

export const essentialGreetings: InteractiveLessonData = {
  id: 'essential-greetings',
  title: 'Essential Greetings',
  level: 'A1 Beginner',
  lessonNumber: 3,
  description: 'Learn essential Hebrew greetings for daily life',
  duration: '~15 minutes',
  newVocabularyCount: 15,
  reviewWordsCount: 3,
  objectives: [
    'Greet people at different times of day',
    'Say thank you and please',
    'Use basic yes/no responses'
  ],
  exercises: [
    // Core greetings
    {
      id: '1',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'שָׁלוֹם',
        transliteration: 'shalom',
        english: 'hello / peace / goodbye',
        image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop',
        note: 'The most versatile Hebrew greeting!'
      }
    },
    {
      id: '2',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'בּוֹקֶר טוֹב',
        transliteration: 'boker tov',
        english: 'good morning',
        image: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=400&h=300&fit=crop'
      }
    },
    {
      id: '3',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'עֶרֶב טוֹב',
        transliteration: 'erev tov',
        english: 'good evening',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
      }
    },
    {
      id: '4',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'לַיְלָה טוֹב',
        transliteration: 'laila tov',
        english: 'good night',
        image: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400&h=300&fit=crop'
      }
    },

    // Listen and select - time-appropriate greeting
    {
      id: '5',
      type: 'listen_and_select',
      data: {
        audio: 'boker tov',
        text: 'בּוֹקֶר טוֹב',
        options: [
          { image: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=200&h=200&fit=crop', label: 'Good morning', value: 'morning' },
          { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop', label: 'Good evening', value: 'evening' },
          { image: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=200&h=200&fit=crop', label: 'Good night', value: 'night' }
        ],
        correctAnswer: 'morning'
      }
    },

    // Casual greetings
    {
      id: '6',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'הַי',
        transliteration: 'hai',
        english: 'hi',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop',
        note: 'Informal greeting, borrowed from English'
      }
    },
    {
      id: '7',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'מָה נִשְׁמָע?',
        transliteration: 'ma nishma?',
        english: 'what\'s up? / how are you?',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop',
        note: 'Literally means "what is heard?"'
      }
    },

    // Polite expressions
    {
      id: '8',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'תּוֹדָה',
        transliteration: 'toda',
        english: 'thank you',
        image: 'https://images.unsplash.com/photo-1450609283058-0ec52fa7eac4?w=400&h=300&fit=crop'
      }
    },
    {
      id: '9',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'תּוֹדָה רַבָּה',
        transliteration: 'toda raba',
        english: 'thank you very much',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop'
      }
    },
    {
      id: '10',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'בְּבַקָּשָׁה',
        transliteration: 'bevakasha',
        english: 'please / you\'re welcome',
        image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop',
        note: 'This word has two meanings!'
      }
    },
    {
      id: '11',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'סְלִיחָה',
        transliteration: 'slicha',
        english: 'excuse me / sorry',
        image: 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400&h=300&fit=crop'
      }
    },

    // Match pairs review
    {
      id: '12',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: 'שָׁלוֹם', right: 'hello/peace/goodbye' },
          { left: 'תּוֹדָה', right: 'thank you' },
          { left: 'בְּבַקָּשָׁה', right: 'please/you\'re welcome' },
          { left: 'סְלִיחָה', right: 'excuse me/sorry' },
          { left: 'בּוֹקֶר טוֹב', right: 'good morning' }
        ]
      }
    },

    // Yes/No
    {
      id: '13',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'כֵּן',
        transliteration: 'ken',
        english: 'yes',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
      }
    },
    {
      id: '14',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'לֹא',
        transliteration: 'lo',
        english: 'no',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop'
      }
    },

    // Additional expressions
    {
      id: '15',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'טוֹב',
        transliteration: 'tov',
        english: 'good',
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop'
      }
    },
    {
      id: '16',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'נֶהְדָּר',
        transliteration: 'nehdar',
        english: 'wonderful / excellent',
        image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop'
      }
    },
    {
      id: '17',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'לְהִתְרָאוֹת',
        transliteration: 'lehitraot',
        english: 'see you / goodbye',
        image: 'https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?w=400&h=300&fit=crop',
        note: 'Literally means "to see each other"'
      }
    },

    // Dialogue completion - greeting scenario
    {
      id: '18',
      type: 'dialogue_completion',
      data: {
        scenario: 'Meeting a friend in the morning',
        image: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=600&h=400&fit=crop',
        speakerLine: {
          speaker: 'Friend',
          hebrew: 'בּוֹקֶר טוֹב!',
          english: 'Good morning!'
        },
        options: [
          {
            hebrew: 'בּוֹקֶר טוֹב! מָה נִשְׁמָע?',
            english: 'Good morning! What\'s up?'
          },
          {
            hebrew: 'לַיְלָה טוֹב',
            english: 'Good night'
          },
          {
            hebrew: 'סְלִיחָה',
            english: 'Sorry'
          }
        ],
        correctAnswer: 0
      }
    },

    // Fill in blank
    {
      id: '19',
      type: 'fill_in_blank',
      data: {
        sentence: 'When someone says תּוֹדָה, you respond: ___',
        translation: 'What do you say when someone thanks you?',
        blankIndex: 1,
        options: ['בְּבַקָּשָׁה', 'סְלִיחָה', 'שָׁלוֹם'],
        correctAnswer: 'בְּבַקָּשָׁה',
        image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop'
      }
    },

    // Build sentence
    {
      id: '20',
      type: 'build_sentence',
      data: {
        audio: 'toda raba',
        text: 'תּוֹדָה רַבָּה',
        translation: 'Thank you very much',
        words: ['תּוֹדָה', 'רַבָּה'],
        correctOrder: ['תּוֹדָה', 'רַבָּה']
      }
    },

    // Speaking practice
    {
      id: '21',
      type: 'speaking_practice',
      data: {
        hebrew: 'שָׁלוֹם, מָה נִשְׁמָע?',
        transliteration: 'shalom, ma nishma?',
        english: 'Hello, what\'s up?'
      }
    },

    // Final review
    {
      id: '22',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: 'כֵּן', right: 'yes' },
          { left: 'לֹא', right: 'no' },
          { left: 'טוֹב', right: 'good' },
          { left: 'נֶהְדָּר', right: 'wonderful' },
          { left: 'לְהִתְרָאוֹת', right: 'see you' }
        ]
      }
    }
  ],
  postLessonOptions: {
    nextLesson: {
      id: 'introductions',
      title: 'Introductions',
      duration: '15 min'
    },
    practiceVocabulary: {
      wordCount: 15,
      duration: '5-7 min'
    },
    podcast: {
      title: 'Hebrew Greetings in Context',
      duration: '10 min'
    }
  }
}
