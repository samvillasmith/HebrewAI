import { CurriculumLevel, Course } from '../../types/curriculum'

export const a2Curriculum: CurriculumLevel = {
  level: 'A2',
  title: 'A2 Level - Elementary',
  description: 'Build on your foundation with intermediate grammar, expanded vocabulary, and practical conversation skills',
  totalWords: 500,
  totalLessons: 67,
  courses: [
    {
      id: 'course-12-past-tense',
      level: 'A2',
      courseNumber: 12,
      title: 'Past Tense Basics',
      description: 'Learn to talk about past events',
      totalLessons: 6,
      totalWords: 48,
      lessons: [
        {
          id: 'past-tense-intro',
          courseId: 'course-12-past-tense',
          lessonNumber: '12.1',
          title: 'Introduction to Past Tense',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Past concepts'
        },
        {
          id: 'past-i-you',
          courseId: 'course-12-past-tense',
          lessonNumber: '12.2',
          title: 'Past: I, You',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'First & second person'
        },
        {
          id: 'past-he-she',
          courseId: 'course-12-past-tense',
          lessonNumber: '12.3',
          title: 'Past: He, She',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Third person singular'
        },
        {
          id: 'past-we-they',
          courseId: 'course-12-past-tense',
          lessonNumber: '12.4',
          title: 'Past: We, They',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Plural forms'
        },
        {
          id: 'yesterday-last-week',
          courseId: 'course-12-past-tense',
          lessonNumber: '12.5',
          title: 'Yesterday, Last Week',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Time expressions'
        },
        {
          id: 'past-practice',
          courseId: 'course-12-past-tense',
          lessonNumber: '12.6',
          title: 'Past Tense Practice',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Using past tense'
        }
      ]
    },
    {
      id: 'course-13-future-tense',
      level: 'A2',
      courseNumber: 13,
      title: 'Future Tense Basics',
      description: 'Express plans and intentions',
      totalLessons: 5,
      totalWords: 40,
      lessons: [
        {
          id: 'future-intro',
          courseId: 'course-13-future-tense',
          lessonNumber: '13.1',
          title: 'Introduction to Future',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Future concepts'
        },
        {
          id: 'future-i-you',
          courseId: 'course-13-future-tense',
          lessonNumber: '13.2',
          title: 'Future: I, You',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'First & second person'
        },
        {
          id: 'future-he-she-we',
          courseId: 'course-13-future-tense',
          lessonNumber: '13.3',
          title: 'Future: He, She, We',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Third person'
        },
        {
          id: 'tomorrow-next-week',
          courseId: 'course-13-future-tense',
          lessonNumber: '13.4',
          title: 'Tomorrow, Next Week',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Future time words'
        },
        {
          id: 'making-plans',
          courseId: 'course-13-future-tense',
          lessonNumber: '13.5',
          title: 'Making Plans',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Planning activities'
        }
      ]
    },
    {
      id: 'course-14-adjectives',
      level: 'A2',
      courseNumber: 14,
      title: 'Descriptive Adjectives',
      description: 'Describe people, places, and things',
      totalLessons: 7,
      totalWords: 56,
      lessons: [
        {
          id: 'size-adjectives',
          courseId: 'course-14-adjectives',
          lessonNumber: '14.1',
          title: 'Size & Dimensions',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Big, small, tall, short'
        },
        {
          id: 'color-adjectives',
          courseId: 'course-14-adjectives',
          lessonNumber: '14.2',
          title: 'More Colors',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Advanced colors'
        },
        {
          id: 'appearance-adjectives',
          courseId: 'course-14-adjectives',
          lessonNumber: '14.3',
          title: 'Physical Appearance',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'How people look'
        },
        {
          id: 'personality-positive',
          courseId: 'course-14-adjectives',
          lessonNumber: '14.4',
          title: 'Positive Traits',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Good qualities'
        },
        {
          id: 'personality-negative',
          courseId: 'course-14-adjectives',
          lessonNumber: '14.5',
          title: 'Negative Traits',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Challenging qualities'
        },
        {
          id: 'quality-adjectives',
          courseId: 'course-14-adjectives',
          lessonNumber: '14.6',
          title: 'Quality & Condition',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Good, bad, new, old'
        },
        {
          id: 'comparisons-intro',
          courseId: 'course-14-adjectives',
          lessonNumber: '14.7',
          title: 'Basic Comparisons',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'More than, less than'
        }
      ]
    },
    {
      id: 'course-15-weather',
      level: 'A2',
      courseNumber: 15,
      title: 'Weather & Nature',
      description: 'Talk about weather and the environment',
      totalLessons: 5,
      totalWords: 40,
      lessons: [
        {
          id: 'weather-conditions',
          courseId: 'course-15-weather',
          lessonNumber: '15.1',
          title: 'Weather Conditions',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Sun, rain, clouds'
        },
        {
          id: 'temperature',
          courseId: 'course-15-weather',
          lessonNumber: '15.2',
          title: 'Temperature',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Hot, cold, warm'
        },
        {
          id: 'seasons-detailed',
          courseId: 'course-15-weather',
          lessonNumber: '15.3',
          title: 'Seasons in Detail',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Seasonal vocabulary'
        },
        {
          id: 'nature-landscape',
          courseId: 'course-15-weather',
          lessonNumber: '15.4',
          title: 'Landscape & Nature',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Mountains, sea, desert'
        },
        {
          id: 'plants-trees',
          courseId: 'course-15-weather',
          lessonNumber: '15.5',
          title: 'Plants & Trees',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Natural vegetation'
        }
      ]
    },
    {
      id: 'course-16-hobbies',
      level: 'A2',
      courseNumber: 16,
      title: 'Hobbies & Free Time',
      description: 'Talk about your interests and activities',
      totalLessons: 6,
      totalWords: 48,
      lessons: [
        {
          id: 'indoor-hobbies',
          courseId: 'course-16-hobbies',
          lessonNumber: '16.1',
          title: 'Indoor Hobbies',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Reading, cooking, crafts'
        },
        {
          id: 'outdoor-activities',
          courseId: 'course-16-hobbies',
          lessonNumber: '16.2',
          title: 'Outdoor Activities',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Hiking, swimming, biking'
        },
        {
          id: 'sports-team',
          courseId: 'course-16-hobbies',
          lessonNumber: '16.3',
          title: 'Team Sports',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Soccer, basketball'
        },
        {
          id: 'sports-individual',
          courseId: 'course-16-hobbies',
          lessonNumber: '16.4',
          title: 'Individual Sports',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Running, yoga, tennis'
        },
        {
          id: 'music-instruments',
          courseId: 'course-16-hobbies',
          lessonNumber: '16.5',
          title: 'Music & Instruments',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Playing music'
        },
        {
          id: 'arts-creativity',
          courseId: 'course-16-hobbies',
          lessonNumber: '16.6',
          title: 'Arts & Creativity',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Drawing, painting'
        }
      ]
    },
    {
      id: 'course-17-health',
      level: 'A2',
      courseNumber: 17,
      title: 'Health & Wellness',
      description: 'Discuss health and medical situations',
      totalLessons: 6,
      totalWords: 48,
      lessons: [
        {
          id: 'common-illnesses',
          courseId: 'course-17-health',
          lessonNumber: '17.1',
          title: 'Common Illnesses',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Cold, flu, headache'
        },
        {
          id: 'symptoms',
          courseId: 'course-17-health',
          lessonNumber: '17.2',
          title: 'Symptoms',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Fever, cough, pain'
        },
        {
          id: 'doctor-visit',
          courseId: 'course-17-health',
          lessonNumber: '17.3',
          title: 'At the Doctor',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Medical visit'
        },
        {
          id: 'pharmacy',
          courseId: 'course-17-health',
          lessonNumber: '17.4',
          title: 'At the Pharmacy',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Medicine'
        },
        {
          id: 'staying-healthy',
          courseId: 'course-17-health',
          lessonNumber: '17.5',
          title: 'Staying Healthy',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Exercise, diet, sleep'
        },
        {
          id: 'emergency',
          courseId: 'course-17-health',
          lessonNumber: '17.6',
          title: 'Emergencies',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Urgent situations'
        }
      ]
    },
    {
      id: 'course-18-work',
      level: 'A2',
      courseNumber: 18,
      title: 'Work & Professions',
      description: 'Talk about jobs and workplace',
      totalLessons: 6,
      totalWords: 48,
      lessons: [
        {
          id: 'common-jobs-1',
          courseId: 'course-18-work',
          lessonNumber: '18.1',
          title: 'Common Jobs 1',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Teacher, doctor, engineer'
        },
        {
          id: 'common-jobs-2',
          courseId: 'course-18-work',
          lessonNumber: '18.2',
          title: 'Common Jobs 2',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Nurse, lawyer, chef'
        },
        {
          id: 'workplace-vocab',
          courseId: 'course-18-work',
          lessonNumber: '18.3',
          title: 'Workplace Vocabulary',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Office, desk, computer'
        },
        {
          id: 'work-actions',
          courseId: 'course-18-work',
          lessonNumber: '18.4',
          title: 'Work Actions',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Work, write, meet'
        },
        {
          id: 'schedule',
          courseId: 'course-18-work',
          lessonNumber: '18.5',
          title: 'Work Schedule',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Hours, shifts, breaks'
        },
        {
          id: 'colleagues',
          courseId: 'course-18-work',
          lessonNumber: '18.6',
          title: 'Colleagues & Teams',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Working together'
        }
      ]
    },
    {
      id: 'course-19-education',
      level: 'A2',
      courseNumber: 19,
      title: 'Education & Learning',
      description: 'School and academic vocabulary',
      totalLessons: 5,
      totalWords: 40,
      lessons: [
        {
          id: 'school-subjects',
          courseId: 'course-19-education',
          lessonNumber: '19.1',
          title: 'School Subjects',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Math, history, science'
        },
        {
          id: 'classroom',
          courseId: 'course-19-education',
          lessonNumber: '19.2',
          title: 'In the Classroom',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Desk, board, book'
        },
        {
          id: 'studying',
          courseId: 'course-19-education',
          lessonNumber: '19.3',
          title: 'Studying & Learning',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Study, read, practice'
        },
        {
          id: 'tests-grades',
          courseId: 'course-19-education',
          lessonNumber: '19.4',
          title: 'Tests & Grades',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Exam, grade, pass'
        },
        {
          id: 'university',
          courseId: 'course-19-education',
          lessonNumber: '19.5',
          title: 'University Life',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Campus, degree, major'
        }
      ]
    },
    {
      id: 'course-20-technology',
      level: 'A2',
      courseNumber: 20,
      title: 'Technology & Digital Life',
      description: 'Modern technology vocabulary',
      totalLessons: 5,
      totalWords: 40,
      lessons: [
        {
          id: 'devices',
          courseId: 'course-20-technology',
          lessonNumber: '20.1',
          title: 'Electronic Devices',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Phone, tablet, laptop'
        },
        {
          id: 'internet',
          courseId: 'course-20-technology',
          lessonNumber: '20.2',
          title: 'Internet & Apps',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Website, app, email'
        },
        {
          id: 'social-media',
          courseId: 'course-20-technology',
          lessonNumber: '20.3',
          title: 'Social Media',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Post, share, like'
        },
        {
          id: 'tech-actions',
          courseId: 'course-20-technology',
          lessonNumber: '20.4',
          title: 'Tech Actions',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Download, upload, click'
        },
        {
          id: 'problems',
          courseId: 'course-20-technology',
          lessonNumber: '20.5',
          title: 'Tech Problems',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Broken, slow, error'
        }
      ]
    },
    {
      id: 'course-21-travel',
      level: 'A2',
      courseNumber: 21,
      title: 'Travel & Tourism',
      description: 'Vocabulary for traveling',
      totalLessons: 6,
      totalWords: 48,
      lessons: [
        {
          id: 'planning-trip',
          courseId: 'course-21-travel',
          lessonNumber: '21.1',
          title: 'Planning a Trip',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Book, reserve, plan'
        },
        {
          id: 'at-airport',
          courseId: 'course-21-travel',
          lessonNumber: '21.2',
          title: 'At the Airport',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Flight, gate, luggage'
        },
        {
          id: 'at-hotel',
          courseId: 'course-21-travel',
          lessonNumber: '21.3',
          title: 'At the Hotel',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Room, key, reception'
        },
        {
          id: 'sightseeing',
          courseId: 'course-21-travel',
          lessonNumber: '21.4',
          title: 'Sightseeing',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Museum, tour, monument'
        },
        {
          id: 'souvenirs',
          courseId: 'course-21-travel',
          lessonNumber: '21.5',
          title: 'Buying Souvenirs',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Gift, souvenir, postcard'
        },
        {
          id: 'travel-problems',
          courseId: 'course-21-travel',
          lessonNumber: '21.6',
          title: 'Travel Problems',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Lost, late, cancelled'
        }
      ]
    },
    {
      id: 'course-22-culture',
      level: 'A2',
      courseNumber: 22,
      title: 'Israeli Culture',
      description: 'Cultural traditions and customs',
      totalLessons: 5,
      totalWords: 40,
      lessons: [
        {
          id: 'holidays-1',
          courseId: 'course-22-culture',
          lessonNumber: '22.1',
          title: 'Major Holidays 1',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Rosh Hashanah, Yom Kippur'
        },
        {
          id: 'holidays-2',
          courseId: 'course-22-culture',
          lessonNumber: '22.2',
          title: 'Major Holidays 2',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Passover, Hanukkah'
        },
        {
          id: 'celebrations',
          courseId: 'course-22-culture',
          lessonNumber: '22.3',
          title: 'Celebrations',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Wedding, birthday, party'
        },
        {
          id: 'traditions',
          courseId: 'course-22-culture',
          lessonNumber: '22.4',
          title: 'Traditions',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Customs and practices'
        },
        {
          id: 'israeli-life',
          courseId: 'course-22-culture',
          lessonNumber: '22.5',
          title: 'Daily Israeli Life',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Culture and lifestyle'
        }
      ]
    },
    {
      id: 'course-23-advanced-conversation',
      level: 'A2',
      courseNumber: 23,
      title: 'Conversation Skills',
      description: 'Express opinions and have discussions',
      totalLessons: 5,
      totalWords: 44,
      lessons: [
        {
          id: 'expressing-opinion',
          courseId: 'course-23-advanced-conversation',
          lessonNumber: '23.1',
          title: 'Expressing Opinions',
          duration: '10 min',
          vocabularyCount: 9,
          theme: 'I think, I believe'
        },
        {
          id: 'agreeing',
          courseId: 'course-23-advanced-conversation',
          lessonNumber: '23.2',
          title: 'Agreeing',
          duration: '10 min',
          vocabularyCount: 9,
          theme: 'Yes, exactly, right'
        },
        {
          id: 'disagreeing',
          courseId: 'course-23-advanced-conversation',
          lessonNumber: '23.3',
          title: 'Politely Disagreeing',
          duration: '10 min',
          vocabularyCount: 9,
          theme: 'But, however, maybe'
        },
        {
          id: 'asking-clarification',
          courseId: 'course-23-advanced-conversation',
          lessonNumber: '23.4',
          title: 'Asking for Clarification',
          duration: '10 min',
          vocabularyCount: 9,
          theme: 'What do you mean?'
        },
        {
          id: 'telling-stories',
          courseId: 'course-23-advanced-conversation',
          lessonNumber: '23.5',
          title: 'Telling Stories',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'First, then, finally'
        }
      ]
    }
  ]
}
