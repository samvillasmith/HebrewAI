import { InteractiveLessonData } from '@/types/interactive-lesson'

export const alefBetPart1: InteractiveLessonData = {
  id: 'alef-bet-part-1',
  title: 'The Alef-Bet Part 1',
  level: 'A1 Beginner',
  lessonNumber: 1,
  description: 'Learn the 22 letters of the Hebrew alphabet',
  duration: '~15 minutes',
  newVocabularyCount: 22,
  reviewWordsCount: 0,
  objectives: [
    'Recognize all 22 Hebrew letters',
    'Pronounce each letter correctly',
    'Distinguish between similar-looking letters'
  ],
  exercises: [
    // First 5 letters introduction
    {
      id: '1',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'א',
        transliteration: 'Alef',
        english: 'Silent letter (like a gentle breath)',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
        note: 'Alef is usually silent but can carry vowel sounds'
      }
    },
    {
      id: '2',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ב',
        transliteration: 'Bet',
        english: '"B" sound (like "book")',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
        note: 'Can also sound like "V" when without a dot (dagesh)'
      }
    },
    {
      id: '3',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ג',
        transliteration: 'Gimel',
        english: '"G" sound (like "good")',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop'
      }
    },
    {
      id: '4',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ד',
        transliteration: 'Dalet',
        english: '"D" sound (like "door")',
        image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&h=300&fit=crop'
      }
    },
    {
      id: '5',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ה',
        transliteration: 'Hey',
        english: '"H" sound (like "hello")',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
        note: 'Often silent at the end of words'
      }
    },

    // Quick review - Match pairs
    {
      id: '6',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: 'א', right: 'Alef' },
          { left: 'ב', right: 'Bet' },
          { left: 'ג', right: 'Gimel' },
          { left: 'ד', right: 'Dalet' },
          { left: 'ה', right: 'Hey' }
        ]
      }
    },

    // Next 5 letters
    {
      id: '7',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ו',
        transliteration: 'Vav',
        english: '"V" sound (like "vine")',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        note: 'Also used as a vowel marker'
      }
    },
    {
      id: '8',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ז',
        transliteration: 'Zayin',
        english: '"Z" sound (like "zoo")',
        image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=400&h=300&fit=crop'
      }
    },
    {
      id: '9',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ח',
        transliteration: 'Chet',
        english: 'Guttural "CH" (like Scottish "loch")',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=300&fit=crop',
        note: 'Similar to clearing your throat gently'
      }
    },
    {
      id: '10',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ט',
        transliteration: 'Tet',
        english: '"T" sound (like "table")',
        image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop'
      }
    },
    {
      id: '11',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'י',
        transliteration: 'Yod',
        english: '"Y" sound (like "yes")',
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop',
        note: 'Also used as a vowel marker'
      }
    },

    // Listen and select - recognize letters by sound
    {
      id: '12',
      type: 'listen_and_select',
      data: {
        audio: 'ב',
        text: 'ב',
        options: [
          { image: '', label: 'ב (Bet)', value: 'bet' },
          { image: '', label: 'ד (Dalet)', value: 'dalet' },
          { image: '', label: 'ה (Hey)', value: 'hey' }
        ],
        correctAnswer: 'bet'
      }
    },

    // More letters
    {
      id: '13',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'כ / ך',
        transliteration: 'Kaf / Final Kaf',
        english: '"K" sound (like "kite")',
        image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400&h=300&fit=crop',
        note: 'ך is used only at the end of words'
      }
    },
    {
      id: '14',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ל',
        transliteration: 'Lamed',
        english: '"L" sound (like "love")',
        image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop'
      }
    },
    {
      id: '15',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'מ / ם',
        transliteration: 'Mem / Final Mem',
        english: '"M" sound (like "mother")',
        image: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=400&h=300&fit=crop',
        note: 'ם is used only at the end of words'
      }
    },
    {
      id: '16',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'נ / ן',
        transliteration: 'Nun / Final Nun',
        english: '"N" sound (like "nice")',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
        note: 'ן is used only at the end of words'
      }
    },
    {
      id: '17',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ס',
        transliteration: 'Samech',
        english: '"S" sound (like "sun")',
        image: 'https://images.unsplash.com/photo-1420593248178-d88870618ca0?w=400&h=300&fit=crop'
      }
    },

    // Match pairs review
    {
      id: '18',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: 'ו', right: 'Vav' },
          { left: 'ז', right: 'Zayin' },
          { left: 'ח', right: 'Chet' },
          { left: 'ט', right: 'Tet' },
          { left: 'י', right: 'Yod' }
        ]
      }
    },

    // Final letters
    {
      id: '19',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ע',
        transliteration: 'Ayin',
        english: 'Guttural sound (from the throat)',
        image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop',
        note: 'Often sounds silent to non-native speakers'
      }
    },
    {
      id: '20',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'פ / ף',
        transliteration: 'Peh / Final Peh',
        english: '"P" sound (like "peace")',
        image: 'https://images.unsplash.com/photo-1520792532857-293bd046307a?w=400&h=300&fit=crop',
        note: 'Can also sound like "F". ף is used at the end of words'
      }
    },
    {
      id: '21',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'צ / ץ',
        transliteration: 'Tzadi / Final Tzadi',
        english: '"TZ" sound (like "pizza")',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
        note: 'ץ is used only at the end of words'
      }
    },
    {
      id: '22',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ק',
        transliteration: 'Qof',
        english: '"K" sound from throat (like "kite" but deeper)',
        image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=400&h=300&fit=crop'
      }
    },
    {
      id: '23',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ר',
        transliteration: 'Resh',
        english: '"R" sound (guttural, like French "R")',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop'
      }
    },
    {
      id: '24',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ש',
        transliteration: 'Shin/Sin',
        english: '"SH" or "S" sound',
        image: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=400&h=300&fit=crop',
        note: 'Dot on right = "SH", dot on left = "S"'
      }
    },
    {
      id: '25',
      type: 'vocabulary_intro',
      data: {
        hebrew: 'ת',
        transliteration: 'Tav',
        english: '"T" sound (like "tall")',
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop'
      }
    },

    // Final comprehensive review
    {
      id: '26',
      type: 'match_pairs',
      data: {
        pairs: [
          { left: 'ל', right: 'Lamed' },
          { left: 'מ', right: 'Mem' },
          { left: 'נ', right: 'Nun' },
          { left: 'ס', right: 'Samech' },
          { left: 'ע', right: 'Ayin' }
        ]
      }
    },

    // Fill in blank - identify letter by description
    {
      id: '27',
      type: 'fill_in_blank',
      data: {
        sentence: 'The letter that sounds like "SH" is ___',
        translation: 'Which letter sounds like "SH"?',
        blankIndex: 1,
        options: ['ש', 'ס', 'צ'],
        correctAnswer: 'ש'
      }
    },

    // Speaking practice - encourage pronunciation
    {
      id: '28',
      type: 'speaking_practice',
      data: {
        hebrew: 'אָלֶף־בֵּית',
        transliteration: 'Alef-Bet',
        english: 'Alphabet'
      }
    }
  ],
  postLessonOptions: {
    nextLesson: {
      id: 'vowels-final-forms',
      title: 'Vowels & Final Forms',
      duration: '12 min'
    },
    practiceVocabulary: {
      wordCount: 22,
      duration: '5-7 min'
    },
    podcast: {
      title: 'History of the Hebrew Alphabet',
      duration: '10 min'
    }
  }
}
