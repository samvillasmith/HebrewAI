import { InteractiveLessonData } from '@/types/interactive-lesson'

export const politeExpressions: InteractiveLessonData = {
  id: 'polite-expressions',
  title: 'Polite Expressions',
  level: 'A1 Beginner',
  lessonNumber: 5,
  description: 'Essential polite phrases and courtesy expressions',
  duration: '~12 minutes',
  newVocabularyCount: 20,
  reviewWordsCount: 4,
  objectives: [
    'Use polite expressions in daily situations',
    'Ask for help and clarification',
    'Understand and respond to common phrases'
  ],
  exercises: [
    // Review from previous lessons
    {
      id: '1',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'תּוֹדָה',
        transliteration: 'toda',
        english: 'thank you',
        image: 'https://images.unsplash.com/photo-1450609283058-0ec52fa7eac4?w=400&h=300&fit=crop',
        note: 'Essential polite expression!'
      }
    },
    {
      id: '2',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'תּוֹדָה רַבָּה',
        transliteration: 'toda raba',
        english: 'thank you very much',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop'
      }
    },
    {
      id: '3',
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
      id: '4',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'סְלִיחָה',
        transliteration: 'slicha',
        english: 'excuse me / sorry',
        image: 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400&h=300&fit=crop',
        note: 'Used both for apologies and getting attention'
      }
    },

    // Dialogue - Thank you response
    {
      id: '5',
      type: 'dialogue_completion',
      data: {
        scenario: 'Someone thanks you',
        image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop',
        speakerLine: {
          speaker: 'Person',
          hebrew: 'תּוֹדָה רַבָּה!',
          english: 'Thank you very much!'
        },
        options: [
          {
            hebrew: 'בְּבַקָּשָׁה',
            english: 'You\'re welcome'
          },
          {
            hebrew: 'שָׁלוֹם',
            english: 'Hello'
          },
          {
            hebrew: 'סְלִיחָה',
            english: 'Sorry'
          }
        ],
        correctAnswer: 0
      }
    },

    // Communication phrases
    {
      id: '6',
      type: 'vocabulary_intro',
      data: {
        hebrew: {
          male: 'אֲנִי לֹא מֵבִין',
          female: 'אֲנִי לֹא מְבִינָה'
        },
        transliteration: {
          male: 'ani lo mevin',
          female: 'ani lo mevina'
        },
        english: 'I don\'t understand',
        image: 'https://images.unsplash.com/photo-1524514587686-e2909d726e9b?w=400&h=300&fit=crop',
        note: 'Very useful when learning!'
      }
    },
    {
      id: '7',
      type: 'vocabulary_intro',
      data: {
        hebrew: {
          male: 'אַתָּה מֵבִין?',
          female: 'אַתְּ מְבִינָה?'
        },
        transliteration: {
          male: 'ata mevin?',
          female: 'at mevina?'
        },
        english: 'do you understand?',
        image: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=300&fit=crop'
      }
    },
    {
      id: '8',
      type: 'vocabulary_intro',
      data: {
        hebrew: {
          male: 'אַתָּה מְדַבֵּר אַנְגְלִית?',
          female: 'אַתְּ מְדַבֶּרֶת אַנְגְלִית?'
        },
        transliteration: {
          male: 'ata medaber anglit?',
          female: 'at medaberet anglit?'
        },
        english: 'do you speak English?',
        image: 'https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=400&h=300&fit=crop',
        note: 'Helpful when traveling!'
      }
    },
    {
      id: '9',
      type: 'vocabulary_intro',
      data: {
        hebrew: {
          male: 'אֲנִי מְדַבֵּר קְצָת עִבְרִית',
          female: 'אֲנִי מְדַבֶּרֶת קְצָת עִבְרִית'
        },
        transliteration: {
          male: 'ani medaber ktzat ivrit',
          female: 'ani medaberet ktzat ivrit'
        },
        english: 'I speak a little Hebrew',
        image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop'
      }
    },

    // Key vocabulary
    {
      id: '10',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'עִבְרִית',
        transliteration: 'ivrit',
        english: 'Hebrew',
        image: 'https://images.unsplash.com/photo-1461838239441-8714a3214d23?w=400&h=300&fit=crop'
      }
    },
    {
      id: '11',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'אַנְגְלִית',
        transliteration: 'anglit',
        english: 'English',
        image: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=400&h=300&fit=crop'
      }
    },
    {
      id: '12',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'קְצָת',
        transliteration: 'ktzat',
        english: 'a little / a bit',
        image: 'https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?w=400&h=300&fit=crop'
      }
    },

    // Match pairs
    {
      id: '13',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: 'תּוֹדָה', right: 'thank you' },
          { left: 'בְּבַקָּשָׁה', right: 'please/you\'re welcome' },
          { left: 'סְלִיחָה', right: 'excuse me/sorry' },
          { left: 'עִבְרִית', right: 'Hebrew' },
          { left: 'אַנְגְלִית', right: 'English' }
        ]
      }
    },

    // More useful phrases
    {
      id: '14',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'רֶגַע',
        transliteration: 'rega',
        english: 'wait / one moment',
        image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&h=300&fit=crop',
        note: 'Literally means "moment"'
      }
    },
    {
      id: '15',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'לְאַט',
        transliteration: 'le\'at',
        english: 'slowly',
        image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400&h=300&fit=crop',
        note: 'לאט לאט (le\'at le\'at) = slowly, slowly'
      }
    },
    {
      id: '16',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'שׁוּב',
        transliteration: 'shuv',
        english: 'again',
        image: 'https://images.unsplash.com/photo-1557053908-4793c484d06f?w=400&h=300&fit=crop',
        note: 'Used to ask someone to repeat'
      }
    },
    {
      id: '17',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'עֶזְרָה',
        transliteration: 'ezra',
        english: 'help',
        image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=400&h=300&fit=crop'
      }
    },

    // Fill in blank
    {
      id: '18',
      type: 'fill_in_blank',
      data: {
        sentence: 'When you don\'t understand, you say: ___',
        translation: 'I don\'t understand',
        blankIndex: 1,
        options: [
          { male: 'אֲנִי לֹא מֵבִין', female: 'אֲנִי לֹא מְבִינָה' },
          'תּוֹדָה',
          'שָׁלוֹם'
        ],
        correctAnswer: { male: 'אֲנִי לֹא מֵבִין', female: 'אֲנִי לֹא מְבִינָה' },
        image: 'https://images.unsplash.com/photo-1524514587686-e2909d726e9b?w=400&h=300&fit=crop'
      }
    },

    // Dialogue completion - asking for help
    {
      id: '19',
      type: 'dialogue_completion',
      data: {
        scenario: 'You need someone to speak slower',
        image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=600&h=400&fit=crop',
        speakerLine: {
          speaker: 'You',
          hebrew: { male: 'אֲנִי לֹא מֵבִין', female: 'אֲנִי לֹא מְבִינָה' },
          english: 'I don\'t understand'
        },
        options: [
          {
            hebrew: 'לְאַט, בְּבַקָּשָׁה',
            english: 'Slowly, please'
          },
          {
            hebrew: 'תּוֹדָה רַבָּה',
            english: 'Thank you very much'
          },
          {
            hebrew: 'שָׁלוֹם',
            english: 'Hello'
          }
        ],
        correctAnswer: 0
      }
    },

    // More vocabulary
    {
      id: '20',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'מָה?',
        transliteration: 'ma?',
        english: 'what? / pardon?',
        image: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=300&fit=crop',
        note: 'Can be used to ask someone to repeat'
      }
    },
    {
      id: '21',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'אֵיךְ?',
        transliteration: 'eich?',
        english: 'how?',
        image: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=300&fit=crop'
      }
    },
    {
      id: '22',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'אֵיךְ אוֹמְרִים...?',
        transliteration: 'eich omrim...?',
        english: 'how do you say...?',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
        note: 'Super useful for learning new words!'
      }
    },

    // Build sentence
    {
      id: '23',
      type: 'build_sentence',
      data: {
        audio: 'toda raba',
        text: 'תּוֹדָה רַבָּה',
        translation: 'Thank you very much',
        words: ['תּוֹדָה', 'רַבָּה'],
        correctOrder: ['תּוֹדָה', 'רַבָּה']
      }
    },

    // Match pairs - useful phrases
    {
      id: '24',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: 'רֶגַע', right: 'wait/moment' },
          { left: 'לְאַט', right: 'slowly' },
          { left: 'שׁוּב', right: 'again' },
          { left: 'עֶזְרָה', right: 'help' },
          { left: 'קְצָת', right: 'a little' }
        ]
      }
    },

    // Speaking practice
    {
      id: '25',
      type: 'speaking_practice',
      data: {
        hebrew: { male: 'סְלִיחָה, אֲנִי לֹא מֵבִין. לְאַט, בְּבַקָּשָׁה.', female: 'סְלִיחָה, אֲנִי לֹא מְבִינָה. לְאַט, בְּבַקָּשָׁה.' },
        transliteration: 'slicha, ani lo mevin/mevina. le\'at, bevakasha.',
        english: 'Excuse me, I don\'t understand. Slowly, please.'
      }
    },

    // Final review
    {
      id: '26',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: { male: 'אֲנִי לֹא מֵבִין', female: 'אֲנִי לֹא מְבִינָה' }, right: 'I don\'t understand' },
          { left: { male: 'אַתָּה מְדַבֵּר אַנְגְלִית?', female: 'אַתְּ מְדַבֶּרֶת אַנְגְלִית?' }, right: 'do you speak English?' },
          { left: 'אֵיךְ אוֹמְרִים...?', right: 'how do you say...?' },
          { left: 'מָה?', right: 'what?/pardon?' },
          { left: 'אֵיךְ?', right: 'how?' }
        ]
      }
    }
  ],
  postLessonOptions: {
    nextLesson: {
      id: 'numbers-1-10',
      title: 'Numbers 1-10',
      duration: '10 min'
    },
    practiceVocabulary: {
      wordCount: 20,
      duration: '5-7 min'
    },
    podcast: {
      title: 'Polite Hebrew Conversations',
      duration: '8 min'
    }
  }
}
