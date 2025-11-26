import { CurriculumLevel, Course } from '@/types/curriculum'

export const a1Curriculum: CurriculumLevel = {
  level: 'A1',
  title: 'A1 Level - Newcomer/Beginner',
  description: 'Master the fundamentals of Hebrew - alphabet, basic vocabulary, and essential grammar',
  totalWords: 610,
  totalLessons: 74,
  courses: [
    {
      id: 'course-1-foundations',
      level: 'A1',
      courseNumber: 1,
      title: 'Hebrew Foundations',
      description: 'Learn the Hebrew alphabet, pronunciation, and essential greetings',
      totalLessons: 6,
      totalWords: 71,
      lessons: [
        {
          id: 'alef-bet-part-1',
          courseId: 'course-1-foundations',
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
          courseId: 'course-1-foundations',
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
        },
        {
          id: 'essential-greetings',
          courseId: 'course-1-foundations',
          lessonNumber: '1.3',
          title: 'Essential Greetings',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Daily greetings',
          objectives: [
            'Greet people at different times of day',
            'Say thank you and please',
            'Use basic yes/no responses'
          ]
        },
        {
          id: 'introductions',
          courseId: 'course-1-foundations',
          lessonNumber: '1.4',
          title: 'Introductions & Meeting People',
          duration: '12 min',
          vocabularyCount: 12,
          theme: 'Meeting people',
          objectives: [
            'Introduce yourself',
            'Ask and answer "What\'s your name?"',
            'Say where you\'re from',
            'Ask about others'
          ],
          grammarNotes: ['Gender in Hebrew - masculine/feminine forms']
        },
        {
          id: 'polite-expressions',
          courseId: 'course-1-foundations',
          lessonNumber: '1.5',
          title: 'Polite Expressions',
          duration: '12 min',
          vocabularyCount: 10,
          theme: 'Courtesy',
          objectives: [
            'Apologize and respond to apologies',
            'Use holiday greetings',
            'Ask someone to speak slowly'
          ]
        },
        {
          id: 'farewells',
          courseId: 'course-1-foundations',
          lessonNumber: '1.6',
          title: 'Saying Goodbye',
          duration: '10 min',
          vocabularyCount: 6,
          theme: 'Farewells'
        }
      ]
    },
    {
      id: 'course-2-essential-verbs',
      level: 'A1',
      courseNumber: 2,
      title: 'Essential Verbs',
      description: 'Master the most common Hebrew verbs for basic communication',
      totalLessons: 7,
      totalWords: 60,
      lessons: [
        {
          id: 'to-be-present',
          courseId: 'course-2-essential-verbs',
          lessonNumber: '2.1',
          title: 'To Be (Present)',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Existence',
          objectives: [
            'Use present tense of "to be"',
            'Describe states and conditions',
            'Form basic sentences'
          ]
        },
        {
          id: 'to-have',
          courseId: 'course-2-essential-verbs',
          lessonNumber: '2.2',
          title: 'To Have',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Possession',
          objectives: [
            'Express possession',
            'Talk about what you have',
            'Use "yesh" and "ein"'
          ]
        },
        {
          id: 'want-need',
          courseId: 'course-2-essential-verbs',
          lessonNumber: '2.3',
          title: 'Want & Need',
          duration: '10 min',
          vocabularyCount: 9,
          theme: 'Desires',
          objectives: [
            'Express wants and needs',
            'Make requests',
            'Ask for things'
          ]
        },
        {
          id: 'can-able',
          courseId: 'course-2-essential-verbs',
          lessonNumber: '2.4',
          title: 'Can & Able To',
          duration: '10 min',
          vocabularyCount: 9,
          theme: 'Ability',
          objectives: [
            'Express ability',
            'Ask about capabilities',
            'Give and deny permission'
          ]
        },
        {
          id: 'like-love',
          courseId: 'course-2-essential-verbs',
          lessonNumber: '2.5',
          title: 'Like & Love',
          duration: '10 min',
          vocabularyCount: 9,
          theme: 'Preferences',
          objectives: [
            'Express likes and dislikes',
            'Talk about preferences',
            'Share opinions'
          ]
        },
        {
          id: 'action-verbs',
          courseId: 'course-2-essential-verbs',
          lessonNumber: '2.6',
          title: 'Do, Make, Go, Come',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Basic actions',
          objectives: [
            'Use common action verbs',
            'Describe daily activities',
            'Talk about movement'
          ]
        },
        {
          id: 'communication-verbs',
          courseId: 'course-2-essential-verbs',
          lessonNumber: '2.7',
          title: 'Talk, Say, Speak',
          duration: '10 min',
          vocabularyCount: 9,
          theme: 'Communication',
          objectives: [
            'Use communication verbs',
            'Ask and answer questions',
            'Describe conversations'
          ]
        }
      ]
    },
    {
      id: 'course-3-numbers',
      level: 'A1',
      courseNumber: 3,
      title: 'Numbers & Money',
      description: 'Count and use numbers in daily life',
      totalLessons: 6,
      totalWords: 50,
      lessons: [
        {
          id: 'numbers-1-10',
          courseId: 'course-3-numbers',
          lessonNumber: '3.1',
          title: 'Numbers 1-10',
          duration: '10 min',
          vocabularyCount: 10,
          theme: 'Basic counting'
        },
        {
          id: 'numbers-11-20',
          courseId: 'course-3-numbers',
          lessonNumber: '3.2',
          title: 'Numbers 11-20',
          duration: '10 min',
          vocabularyCount: 10,
          theme: 'Teens'
        },
        {
          id: 'numbers-tens',
          courseId: 'course-3-numbers',
          lessonNumber: '3.3',
          title: 'Tens (20, 30, 40...)',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Counting by tens'
        },
        {
          id: 'numbers-practice',
          courseId: 'course-3-numbers',
          lessonNumber: '3.4',
          title: 'Number Practice',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Using numbers'
        },
        {
          id: 'age-phone',
          courseId: 'course-3-numbers',
          lessonNumber: '3.5',
          title: 'Age & Phone Numbers',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Personal information'
        },
        {
          id: 'prices-money',
          courseId: 'course-3-numbers',
          lessonNumber: '3.6',
          title: 'Prices & Money',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Currency'
        }
      ]
    },
    {
      id: 'course-4-time',
      level: 'A1',
      courseNumber: 4,
      title: 'Time & Calendar',
      description: 'Tell time and talk about dates',
      totalLessons: 7,
      totalWords: 55,
      lessons: [
        {
          id: 'days-week',
          courseId: 'course-4-time',
          lessonNumber: '4.1',
          title: 'Days of the Week',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Weekly schedule'
        },
        {
          id: 'today-tomorrow',
          courseId: 'course-4-time',
          lessonNumber: '4.2',
          title: 'Today, Tomorrow, Yesterday',
          duration: '10 min',
          vocabularyCount: 6,
          theme: 'Time references'
        },
        {
          id: 'telling-time-1',
          courseId: 'course-4-time',
          lessonNumber: '4.3',
          title: 'Telling Time - Hours',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Clock time'
        },
        {
          id: 'telling-time-2',
          courseId: 'course-4-time',
          lessonNumber: '4.4',
          title: 'Telling Time - Minutes',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Precise time'
        },
        {
          id: 'time-of-day',
          courseId: 'course-4-time',
          lessonNumber: '4.5',
          title: 'Morning, Afternoon, Evening',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Parts of day'
        },
        {
          id: 'months-seasons',
          courseId: 'course-4-time',
          lessonNumber: '4.6',
          title: 'Months & Seasons',
          duration: '12 min',
          vocabularyCount: 10,
          theme: 'Calendar'
        },
        {
          id: 'shabbat',
          courseId: 'course-4-time',
          lessonNumber: '4.7',
          title: 'Shabbat & Holidays',
          duration: '10 min',
          vocabularyCount: 9,
          theme: 'Jewish calendar'
        }
      ]
    },
    {
      id: 'course-5-family',
      level: 'A1',
      courseNumber: 5,
      title: 'Family & Relationships',
      description: 'Talk about family members and relationships',
      totalLessons: 6,
      totalWords: 50,
      lessons: [
        {
          id: 'immediate-family-1',
          courseId: 'course-5-family',
          lessonNumber: '5.1',
          title: 'Parents & Siblings',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Close family'
        },
        {
          id: 'immediate-family-2',
          courseId: 'course-5-family',
          lessonNumber: '5.2',
          title: 'Children & Spouse',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Nuclear family'
        },
        {
          id: 'extended-family-1',
          courseId: 'course-5-family',
          lessonNumber: '5.3',
          title: 'Grandparents & Aunts/Uncles',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Extended family'
        },
        {
          id: 'extended-family-2',
          courseId: 'course-5-family',
          lessonNumber: '5.4',
          title: 'Cousins & In-Laws',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Relatives'
        },
        {
          id: 'family-descriptions',
          courseId: 'course-5-family',
          lessonNumber: '5.5',
          title: 'Describing Family',
          duration: '10 min',
          vocabularyCount: 9,
          theme: 'Family traits'
        },
        {
          id: 'life-stages',
          courseId: 'course-5-family',
          lessonNumber: '5.6',
          title: 'Life Stages',
          duration: '10 min',
          vocabularyCount: 9,
          theme: 'Ages and stages'
        }
      ]
    },
    {
      id: 'course-6-body-feelings',
      level: 'A1',
      courseNumber: 6,
      title: 'Body & Feelings',
      description: 'Name body parts and express emotions',
      totalLessons: 8,
      totalWords: 65,
      lessons: [
        {
          id: 'face-head',
          courseId: 'course-6-body-feelings',
          lessonNumber: '6.1',
          title: 'Face & Head',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Facial features'
        },
        {
          id: 'body-parts-1',
          courseId: 'course-6-body-feelings',
          lessonNumber: '6.2',
          title: 'Upper Body',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Torso and arms'
        },
        {
          id: 'body-parts-2',
          courseId: 'course-6-body-feelings',
          lessonNumber: '6.3',
          title: 'Lower Body',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Legs and feet'
        },
        {
          id: 'basic-feelings',
          courseId: 'course-6-body-feelings',
          lessonNumber: '6.4',
          title: 'Happy, Sad, Angry',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Basic emotions'
        },
        {
          id: 'more-feelings',
          courseId: 'course-6-body-feelings',
          lessonNumber: '6.5',
          title: 'Tired, Excited, Worried',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'More emotions'
        },
        {
          id: 'physical-states-1',
          courseId: 'course-6-body-feelings',
          lessonNumber: '6.6',
          title: 'Hungry, Thirsty, Cold',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Physical sensations'
        },
        {
          id: 'physical-states-2',
          courseId: 'course-6-body-feelings',
          lessonNumber: '6.7',
          title: 'Sick, Healthy, Pain',
          duration: '10 min',
          vocabularyCount: 9,
          theme: 'Health states'
        },
        {
          id: 'expressing-feelings',
          courseId: 'course-6-body-feelings',
          lessonNumber: '6.8',
          title: 'Expressing How You Feel',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Emotion expressions'
        }
      ]
    },
    {
      id: 'course-7-home',
      level: 'A1',
      courseNumber: 7,
      title: 'Home & House',
      description: 'Learn vocabulary for rooms, furniture, and household items',
      totalLessons: 5,
      totalWords: 40,
      lessons: [
        {
          id: 'rooms-house',
          courseId: 'course-7-home',
          lessonNumber: '7.1',
          title: 'Rooms of the House',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Home spaces'
        },
        {
          id: 'furniture-living',
          courseId: 'course-7-home',
          lessonNumber: '7.2',
          title: 'Living Room Furniture',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Living room'
        },
        {
          id: 'furniture-bedroom',
          courseId: 'course-7-home',
          lessonNumber: '7.3',
          title: 'Bedroom & Bathroom',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Private rooms'
        },
        {
          id: 'kitchen-items',
          courseId: 'course-7-home',
          lessonNumber: '7.4',
          title: 'Kitchen Items',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Kitchen'
        },
        {
          id: 'household-chores',
          courseId: 'course-7-home',
          lessonNumber: '7.5',
          title: 'Cleaning & Chores',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Housework'
        }
      ]
    },
    {
      id: 'course-8-daily-routines',
      level: 'A1',
      courseNumber: 8,
      title: 'Daily Routines',
      description: 'Talk about your daily schedule and activities',
      totalLessons: 5,
      totalWords: 40,
      lessons: [
        {
          id: 'morning-routine',
          courseId: 'course-8-daily-routines',
          lessonNumber: '8.1',
          title: 'Morning Activities',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Wake up routines'
        },
        {
          id: 'hygiene',
          courseId: 'course-8-daily-routines',
          lessonNumber: '8.2',
          title: 'Personal Hygiene',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Self-care'
        },
        {
          id: 'meals-routine',
          courseId: 'course-8-daily-routines',
          lessonNumber: '8.3',
          title: 'Meal Times',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Eating schedule'
        },
        {
          id: 'evening-routine',
          courseId: 'course-8-daily-routines',
          lessonNumber: '8.4',
          title: 'Evening Activities',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Night routines'
        },
        {
          id: 'sleep',
          courseId: 'course-8-daily-routines',
          lessonNumber: '8.5',
          title: 'Sleep & Rest',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Bedtime'
        }
      ]
    },
    {
      id: 'course-9-food',
      level: 'A1',
      courseNumber: 9,
      title: 'Food & Dining',
      description: 'Learn about different types of food and drinks',
      totalLessons: 8,
      totalWords: 58,
      lessons: [
        {
          id: 'bread-grains',
          courseId: 'course-9-food',
          lessonNumber: '9.1',
          title: 'Bread & Grains',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Carbohydrates'
        },
        {
          id: 'meat-protein',
          courseId: 'course-9-food',
          lessonNumber: '9.2',
          title: 'Meat & Protein',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Protein foods'
        },
        {
          id: 'dairy',
          courseId: 'course-9-food',
          lessonNumber: '9.3',
          title: 'Dairy Products',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Milk products'
        },
        {
          id: 'vegetables',
          courseId: 'course-9-food',
          lessonNumber: '9.4',
          title: 'Vegetables',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Veggies'
        },
        {
          id: 'fruits',
          courseId: 'course-9-food',
          lessonNumber: '9.5',
          title: 'Fruits',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Fresh fruit'
        },
        {
          id: 'drinks-hot',
          courseId: 'course-9-food',
          lessonNumber: '9.6',
          title: 'Hot Drinks',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Coffee & tea'
        },
        {
          id: 'drinks-cold',
          courseId: 'course-9-food',
          lessonNumber: '9.7',
          title: 'Cold Drinks',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Beverages'
        },
        {
          id: 'taste-preferences',
          courseId: 'course-9-food',
          lessonNumber: '9.8',
          title: 'Tastes & Preferences',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Food opinions'
        }
      ]
    },
    {
      id: 'course-10-shopping',
      level: 'A1',
      courseNumber: 10,
      title: 'Shopping & Clothing',
      description: 'Shop for items and describe clothing',
      totalLessons: 7,
      totalWords: 52,
      lessons: [
        {
          id: 'stores',
          courseId: 'course-10-shopping',
          lessonNumber: '10.1',
          title: 'Types of Stores',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Where to shop'
        },
        {
          id: 'colors',
          courseId: 'course-10-shopping',
          lessonNumber: '10.2',
          title: 'Colors',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Rainbow colors'
        },
        {
          id: 'clothing-top',
          courseId: 'course-10-shopping',
          lessonNumber: '10.3',
          title: 'Tops & Shirts',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Upper clothing'
        },
        {
          id: 'clothing-bottom',
          courseId: 'course-10-shopping',
          lessonNumber: '10.4',
          title: 'Pants & Skirts',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Lower clothing'
        },
        {
          id: 'accessories',
          courseId: 'course-10-shopping',
          lessonNumber: '10.5',
          title: 'Shoes & Accessories',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Completing outfits'
        },
        {
          id: 'sizes',
          courseId: 'course-10-shopping',
          lessonNumber: '10.6',
          title: 'Sizes & Fitting',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Size vocabulary'
        },
        {
          id: 'shopping-dialogue',
          courseId: 'course-10-shopping',
          lessonNumber: '10.7',
          title: 'Shopping Conversations',
          duration: '12 min',
          vocabularyCount: 7,
          theme: 'Store interactions'
        }
      ]
    },
    {
      id: 'course-11-places',
      level: 'A1',
      courseNumber: 11,
      title: 'Places & Directions',
      description: 'Navigate the city and get around',
      totalLessons: 7,
      totalWords: 52,
      lessons: [
        {
          id: 'places-city-1',
          courseId: 'course-11-places',
          lessonNumber: '11.1',
          title: 'Basic City Places',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Where to go'
        },
        {
          id: 'places-city-2',
          courseId: 'course-11-places',
          lessonNumber: '11.2',
          title: 'More City Places',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Public spaces'
        },
        {
          id: 'directions-1',
          courseId: 'course-11-places',
          lessonNumber: '11.3',
          title: 'Basic Directions',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Left, right, straight'
        },
        {
          id: 'directions-2',
          courseId: 'course-11-places',
          lessonNumber: '11.4',
          title: 'More Directions',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Near, far, next to'
        },
        {
          id: 'asking-directions',
          courseId: 'course-11-places',
          lessonNumber: '11.5',
          title: 'Asking for Directions',
          duration: '10 min',
          vocabularyCount: 6,
          theme: 'How to get there'
        },
        {
          id: 'transportation-1',
          courseId: 'course-11-places',
          lessonNumber: '11.6',
          title: 'Public Transportation',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Bus, train, taxi'
        },
        {
          id: 'transportation-2',
          courseId: 'course-11-places',
          lessonNumber: '11.7',
          title: 'Personal Transport',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Car, bike, walking'
        }
      ]
    },
    {
      id: 'course-12-eating-out',
      level: 'A1',
      courseNumber: 12,
      title: 'Eating Out',
      description: 'Order at cafés and restaurants',
      totalLessons: 2,
      totalWords: 17,
      lessons: [
        {
          id: 'cafe-1',
          courseId: 'course-12-eating-out',
          lessonNumber: '12.1',
          title: 'At the Café',
          duration: '18 min',
          vocabularyCount: 9,
          theme: 'Ordering at cafés'
        },
        {
          id: 'restaurant',
          courseId: 'course-12-eating-out',
          lessonNumber: '12.2',
          title: 'At the Restaurant',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Dining out'
        }
      ]
    }
  ]
}
