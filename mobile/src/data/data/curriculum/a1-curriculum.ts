import { CurriculumLevel, Course } from '../../../types/curriculum'

export const a1Curriculum: CurriculumLevel = {
  level: 'A1',
  title: 'A1 Level - Newcomer/Beginner',
  description: 'Master the fundamentals of Hebrew - alphabet, basic vocabulary, and essential grammar',
  totalWords: 580,
  totalLessons: 34,
  courses: [
    {
      id: 'course-1-alphabet',
      level: 'A1',
      courseNumber: 1,
      title: 'Hebrew Alphabet & Pronunciation',
      description: 'Learn the Alef-Bet, vowels, and pronunciation basics',
      totalLessons: 2,
      totalWords: 35,
      lessons: [
        {
          id: 'alef-bet-part-1',
          courseId: 'course-1-alphabet',
          lessonNumber: '1.1',
          title: 'The Alef-Bet Part 1',
          duration: '15 min',
          vocabularyCount: 22,
          theme: 'Foundation',
          objectives: [
            'Recognize all 22 Hebrew letters',
            'Pronounce each letter correctly',
            'Write basic letter forms'
          ]
        },
        {
          id: 'vowels-final-forms',
          courseId: 'course-1-alphabet',
          lessonNumber: '1.2',
          title: 'Vowels & Final Forms',
          duration: '12 min',
          vocabularyCount: 13,
          theme: 'Vowels and Special Forms',
          objectives: [
            'Read Hebrew vowels (nikud)',
            'Recognize final letter forms',
            'Read simple Hebrew words'
          ],
          prerequisite: 'alef-bet-part-1'
        }
      ]
    },
    {
      id: 'course-2-greetings',
      level: 'A1',
      courseNumber: 2,
      title: 'Greetings & First Words',
      description: 'Essential greetings, introductions, and polite expressions',
      totalLessons: 3,
      totalWords: 55,
      lessons: [
        {
          id: 'essential-greetings',
          courseId: 'course-2-greetings',
          lessonNumber: '2.1',
          title: 'Essential Greetings',
          duration: '15 min',
          vocabularyCount: 15,
          theme: 'Daily greetings',
          objectives: [
            'Greet people at different times of day',
            'Say thank you and please',
            'Use basic yes/no responses'
          ]
        },
        {
          id: 'introductions',
          courseId: 'course-2-greetings',
          lessonNumber: '2.2',
          title: 'Introductions',
          duration: '15 min',
          vocabularyCount: 20,
          theme: 'Meeting people',
          objectives: [
            'Introduce yourself',
            'Ask and answer "What\'s your name?"',
            'Say where you\'re from'
          ],
          grammarNotes: ['Gender in Hebrew - masculine/feminine forms']
        },
        {
          id: 'polite-expressions',
          courseId: 'course-2-greetings',
          lessonNumber: '2.3',
          title: 'Polite Expressions',
          duration: '12 min',
          vocabularyCount: 20,
          theme: 'Courtesy',
          objectives: [
            'Apologize and respond to apologies',
            'Use holiday and special occasion greetings',
            'Ask someone to speak slowly'
          ]
        }
      ]
    },
    {
      id: 'course-3-numbers-time',
      level: 'A1',
      courseNumber: 3,
      title: 'Numbers, Time & Dates',
      description: 'Count, tell time, and discuss dates in Hebrew',
      totalLessons: 4,
      totalWords: 70,
      lessons: [
        {
          id: 'numbers-1-20',
          courseId: 'course-3-numbers-time',
          lessonNumber: '3.1',
          title: 'Numbers 1-20',
          duration: '15 min',
          vocabularyCount: 20,
          theme: 'Counting',
          objectives: [
            'Count from 1 to 20',
            'Understand number gender',
            'Give phone numbers and ages'
          ],
          grammarNotes: ['Numbers have gender in Hebrew, matching the noun they count']
        },
        {
          id: 'numbers-20-1000',
          courseId: 'course-3-numbers-time',
          lessonNumber: '3.2',
          title: 'Numbers 20-1000',
          duration: '12 min',
          vocabularyCount: 15,
          theme: 'Large numbers',
          objectives: [
            'Count by tens to 100',
            'Say prices and quantities',
            'Use hundreds and thousands'
          ]
        },
        {
          id: 'time-clock',
          courseId: 'course-3-numbers-time',
          lessonNumber: '3.3',
          title: 'Time & Clock',
          duration: '15 min',
          vocabularyCount: 20,
          theme: 'Telling time',
          objectives: [
            'Tell time on the clock',
            'Discuss times of day',
            'Make appointments'
          ]
        },
        {
          id: 'days-months-seasons',
          courseId: 'course-3-numbers-time',
          lessonNumber: '3.4',
          title: 'Days, Months, Seasons',
          duration: '12 min',
          vocabularyCount: 15,
          theme: 'Calendar',
          objectives: [
            'Name days of the week',
            'Talk about today and tomorrow',
            'Understand Shabbat'
          ]
        }
      ]
    },
    {
      id: 'course-4-family',
      level: 'A1',
      courseNumber: 4,
      title: 'Family & Relationships',
      description: 'Describe your family and talk about relationships',
      totalLessons: 3,
      totalWords: 50,
      lessons: [
        {
          id: 'immediate-family',
          courseId: 'course-4-family',
          lessonNumber: '4.1',
          title: 'Immediate Family',
          duration: '15 min',
          vocabularyCount: 20,
          theme: 'Family members'
        },
        {
          id: 'extended-family',
          courseId: 'course-4-family',
          lessonNumber: '4.2',
          title: 'Extended Family',
          duration: '12 min',
          vocabularyCount: 15,
          theme: 'Relatives'
        },
        {
          id: 'life-stages-relationships',
          courseId: 'course-4-family',
          lessonNumber: '4.3',
          title: 'Life Stages & Relationships',
          duration: '12 min',
          vocabularyCount: 15,
          theme: 'Describing people'
        }
      ]
    },
    {
      id: 'course-5-body-feelings',
      level: 'A1',
      courseNumber: 5,
      title: 'Body & Feelings',
      description: 'Name body parts and express emotions',
      totalLessons: 3,
      totalWords: 55,
      lessons: [
        {
          id: 'body-parts',
          courseId: 'course-5-body-feelings',
          lessonNumber: '5.1',
          title: 'Body Parts',
          duration: '15 min',
          vocabularyCount: 20,
          theme: 'Human body'
        },
        {
          id: 'feelings-emotions',
          courseId: 'course-5-body-feelings',
          lessonNumber: '5.2',
          title: 'Feelings & Emotions',
          duration: '15 min',
          vocabularyCount: 20,
          theme: 'How you feel'
        },
        {
          id: 'physical-states',
          courseId: 'course-5-body-feelings',
          lessonNumber: '5.3',
          title: 'Physical States & Sensations',
          duration: '12 min',
          vocabularyCount: 15,
          theme: 'Physical conditions'
        }
      ]
    },
    {
      id: 'course-6-daily-life',
      level: 'A1',
      courseNumber: 6,
      title: 'Daily Life & Activities',
      description: 'Talk about your daily routine and home',
      totalLessons: 4,
      totalWords: 65,
      lessons: [
        {
          id: 'daily-routine-verbs',
          courseId: 'course-6-daily-life',
          lessonNumber: '6.1',
          title: 'Daily Routine Verbs',
          duration: '15 min',
          vocabularyCount: 20,
          theme: 'What you do every day',
          grammarNotes: ['Present tense conjugation - masculine forms shown']
        },
        {
          id: 'home-house',
          courseId: 'course-6-daily-life',
          lessonNumber: '6.2',
          title: 'Home & House',
          duration: '12 min',
          vocabularyCount: 15,
          theme: 'Where you live'
        },
        {
          id: 'furniture-objects',
          courseId: 'course-6-daily-life',
          lessonNumber: '6.3',
          title: 'Furniture & Objects',
          duration: '12 min',
          vocabularyCount: 15,
          theme: 'Things in the house'
        },
        {
          id: 'actions-movements',
          courseId: 'course-6-daily-life',
          lessonNumber: '6.4',
          title: 'Actions & Movements',
          duration: '12 min',
          vocabularyCount: 15,
          theme: 'What you can do'
        }
      ]
    },
    {
      id: 'course-7-food',
      level: 'A1',
      courseNumber: 7,
      title: 'Food & Dining',
      description: 'Order food and drinks at restaurants and cafés',
      totalLessons: 4,
      totalWords: 70,
      lessons: [
        {
          id: 'basic-foods',
          courseId: 'course-7-food',
          lessonNumber: '7.1',
          title: 'Basic Foods',
          duration: '15 min',
          vocabularyCount: 20,
          theme: 'What we eat'
        },
        {
          id: 'drinks-beverages',
          courseId: 'course-7-food',
          lessonNumber: '7.2',
          title: 'Drinks & Beverages',
          duration: '12 min',
          vocabularyCount: 15,
          theme: 'What we drink'
        },
        {
          id: 'cafe-1',
          courseId: 'course-7-food',
          lessonNumber: '7.3',
          title: 'At the Café',
          duration: '18 min',
          vocabularyCount: 9,
          theme: 'Ordering at cafés'
        },
        {
          id: 'fruits-vegetables',
          courseId: 'course-7-food',
          lessonNumber: '7.4',
          title: 'Fruits & Vegetables',
          duration: '12 min',
          vocabularyCount: 15,
          theme: 'Healthy eating'
        }
      ]
    },
    {
      id: 'course-8-shopping',
      level: 'A1',
      courseNumber: 8,
      title: 'Shopping & Money',
      description: 'Shop for items and handle money transactions',
      totalLessons: 3,
      totalWords: 50,
      lessons: [
        {
          id: 'shopping-vocabulary',
          courseId: 'course-8-shopping',
          lessonNumber: '8.1',
          title: 'Shopping Vocabulary',
          duration: '15 min',
          vocabularyCount: 20,
          theme: 'Buying things'
        },
        {
          id: 'clothing-colors',
          courseId: 'course-8-shopping',
          lessonNumber: '8.2',
          title: 'Clothing & Colors',
          duration: '15 min',
          vocabularyCount: 20,
          theme: 'What to wear'
        },
        {
          id: 'sizes-quantities',
          courseId: 'course-8-shopping',
          lessonNumber: '8.3',
          title: 'Sizes & Quantities',
          duration: '12 min',
          vocabularyCount: 10,
          theme: 'How much?'
        }
      ]
    },
    {
      id: 'course-9-places',
      level: 'A1',
      courseNumber: 9,
      title: 'Places & Directions',
      description: 'Navigate the city and ask for directions',
      totalLessons: 3,
      totalWords: 50,
      lessons: [
        {
          id: 'places-in-city',
          courseId: 'course-9-places',
          lessonNumber: '9.1',
          title: 'Places in the City',
          duration: '15 min',
          vocabularyCount: 20,
          theme: 'Where to go'
        },
        {
          id: 'directions',
          courseId: 'course-9-places',
          lessonNumber: '9.2',
          title: 'Directions',
          duration: '15 min',
          vocabularyCount: 20,
          theme: 'How to get there'
        },
        {
          id: 'transportation',
          courseId: 'course-9-places',
          lessonNumber: '9.3',
          title: 'Transportation',
          duration: '12 min',
          vocabularyCount: 10,
          theme: 'Getting around'
        }
      ]
    },
    {
      id: 'course-10-verbs',
      level: 'A1',
      courseNumber: 10,
      title: 'Basic Verbs & Actions',
      description: 'Master essential Hebrew verbs and sentence structure',
      totalLessons: 5,
      totalWords: 80,
      lessons: [
        {
          id: 'to-be-to-have',
          courseId: 'course-10-verbs',
          lessonNumber: '10.1',
          title: 'To Be & To Have (Present)',
          duration: '15 min',
          vocabularyCount: 15,
          theme: 'Essential verbs',
          grammarNotes: ['Hebrew doesn\'t have "to be" in present tense for existence']
        },
        {
          id: 'want-need-can',
          courseId: 'course-10-verbs',
          lessonNumber: '10.2',
          title: 'Want, Need, Can',
          duration: '15 min',
          vocabularyCount: 15,
          theme: 'Modal expressions'
        },
        {
          id: 'movement-verbs',
          courseId: 'course-10-verbs',
          lessonNumber: '10.3',
          title: 'Movement Verbs',
          duration: '15 min',
          vocabularyCount: 20,
          theme: 'Getting around'
        },
        {
          id: 'communication-verbs',
          courseId: 'course-10-verbs',
          lessonNumber: '10.4',
          title: 'Communication Verbs',
          duration: '15 min',
          vocabularyCount: 15,
          theme: 'Talking & expressing'
        },
        {
          id: 'daily-activity-verbs',
          courseId: 'course-10-verbs',
          lessonNumber: '10.5',
          title: 'Daily Activity Verbs',
          duration: '15 min',
          vocabularyCount: 15,
          theme: 'What you do'
        }
      ]
    }
  ]
}
