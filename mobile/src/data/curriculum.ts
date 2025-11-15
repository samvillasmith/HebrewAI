import { Course } from '../types';

export const a1Curriculum: Course[] = [
  {
    id: 'course-1-alphabet',
    courseNumber: 1,
    title: 'Hebrew Alphabet & Pronunciation',
    description: 'Learn the Alef-Bet, vowels, and pronunciation basics',
    totalLessons: 2,
    totalWords: 35,
    lessons: [
      {
        id: 'alef-bet-part-1',
        lessonNumber: '1.1',
        title: 'The Alef-Bet Part 1',
        description: 'Learn the Hebrew alphabet',
        duration: '15 min',
        vocabularyCount: 22,
      },
      {
        id: 'vowels-final-forms',
        lessonNumber: '1.2',
        title: 'Vowels & Final Forms',
        description: 'Master Hebrew vowels',
        duration: '12 min',
        vocabularyCount: 13,
      },
    ],
  },
  {
    id: 'course-2-greetings',
    courseNumber: 2,
    title: 'Greetings & First Words',
    description: 'Essential greetings, introductions, and polite expressions',
    totalLessons: 3,
    totalWords: 55,
    lessons: [
      {
        id: 'essential-greetings',
        lessonNumber: '2.1',
        title: 'Essential Greetings',
        description: 'Daily greetings in Hebrew',
        duration: '15 min',
        vocabularyCount: 15,
      },
      {
        id: 'introductions',
        lessonNumber: '2.2',
        title: 'Introductions',
        description: 'Introduce yourself',
        duration: '15 min',
        vocabularyCount: 20,
      },
      {
        id: 'polite-expressions',
        lessonNumber: '2.3',
        title: 'Polite Expressions',
        description: 'Courtesy phrases',
        duration: '12 min',
        vocabularyCount: 20,
      },
    ],
  },
];
