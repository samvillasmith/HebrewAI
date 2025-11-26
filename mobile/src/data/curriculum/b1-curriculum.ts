import { CurriculumLevel, Course } from '../../types/curriculum'

export const b1Curriculum: CurriculumLevel = {
  level: 'B1',
  title: 'B1 Level - Intermediate',
  description: 'Develop fluency with complex grammar, advanced vocabulary, and confident conversation skills for real-world situations',
  totalWords: 1000,
  totalLessons: 135,
  courses: [
    {
      id: 'course-24-complex-verbs',
      level: 'B1',
      courseNumber: 24,
      title: 'Complex Verb Structures',
      description: 'Master advanced verb conjugations and multi-verb constructions',
      totalLessons: 10,
      totalWords: 80,
      lessons: [
        {
          id: 'binyanim-intro-1',
          courseId: 'course-24-complex-verbs',
          lessonNumber: '24.1',
          title: 'Introduction to Binyanim System',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Verb pattern basics',
          objectives: [
            'Understand the binyan concept',
            'Learn root patterns'
          ]
        },
        {
          id: 'binyanim-intro-2',
          courseId: 'course-24-complex-verbs',
          lessonNumber: '24.2',
          title: 'Root Letters & Patterns',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Three-letter roots'
        },
        {
          id: 'paal-basics',
          courseId: 'course-24-complex-verbs',
          lessonNumber: '24.3',
          title: 'Pa\'al Binyan Basics',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Simple verb pattern'
        },
        {
          id: 'paal-verbs',
          courseId: 'course-24-complex-verbs',
          lessonNumber: '24.4',
          title: 'Common Pa\'al Verbs',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Everyday actions'
        },
        {
          id: 'piel-basics',
          courseId: 'course-24-complex-verbs',
          lessonNumber: '24.5',
          title: 'Pi\'el Binyan Basics',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Intensive pattern'
        },
        {
          id: 'piel-verbs',
          courseId: 'course-24-complex-verbs',
          lessonNumber: '24.6',
          title: 'Common Pi\'el Verbs',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Intensive actions'
        },
        {
          id: 'hifil-basics',
          courseId: 'course-24-complex-verbs',
          lessonNumber: '24.7',
          title: 'Hif\'il Binyan Basics',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Causative pattern'
        },
        {
          id: 'hifil-verbs',
          courseId: 'course-24-complex-verbs',
          lessonNumber: '24.8',
          title: 'Common Hif\'il Verbs',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Causative actions'
        },
        {
          id: 'hitpael-basics',
          courseId: 'course-24-complex-verbs',
          lessonNumber: '24.9',
          title: 'Hitpa\'el Binyan Basics',
          duration: '12 min',
          vocabularyCount: 9,
          theme: 'Reflexive pattern'
        },
        {
          id: 'verb-combinations',
          courseId: 'course-24-complex-verbs',
          lessonNumber: '24.10',
          title: 'Multi-Verb Constructions',
          duration: '12 min',
          vocabularyCount: 10,
          theme: 'Complex sentences'
        }
      ]
    },
    {
      id: 'course-25-conditional',
      level: 'B1',
      courseNumber: 25,
      title: 'Conditional & Subjunctive',
      description: 'Express hypothetical situations and conditions',
      totalLessons: 8,
      totalWords: 64,
      lessons: [
        {
          id: 'if-clauses-basic',
          courseId: 'course-25-conditional',
          lessonNumber: '25.1',
          title: 'Basic If Clauses',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Simple conditions'
        },
        {
          id: 'if-clauses-advanced',
          courseId: 'course-25-conditional',
          lessonNumber: '25.2',
          title: 'Complex If Clauses',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Advanced conditions'
        },
        {
          id: 'hypothetical-present',
          courseId: 'course-25-conditional',
          lessonNumber: '25.3',
          title: 'Hypothetical Present',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Present unreal'
        },
        {
          id: 'hypothetical-past',
          courseId: 'course-25-conditional',
          lessonNumber: '25.4',
          title: 'Hypothetical Past',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Past unreal'
        },
        {
          id: 'wishes-hopes',
          courseId: 'course-25-conditional',
          lessonNumber: '25.5',
          title: 'Wishes & Hopes',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Expressing desires'
        },
        {
          id: 'would-should',
          courseId: 'course-25-conditional',
          lessonNumber: '25.6',
          title: 'Would & Should',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Modal verbs'
        },
        {
          id: 'could-might',
          courseId: 'course-25-conditional',
          lessonNumber: '25.7',
          title: 'Could & Might',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Possibility modals'
        },
        {
          id: 'conditional-practice',
          courseId: 'course-25-conditional',
          lessonNumber: '25.8',
          title: 'Conditional Practice',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Real-world scenarios'
        }
      ]
    },
    {
      id: 'course-26-conversation',
      level: 'B1',
      courseNumber: 26,
      title: 'Advanced Conversation',
      description: 'Engage in extended discussions on various topics',
      totalLessons: 10,
      totalWords: 80,
      lessons: [
        {
          id: 'expressing-opinions-1',
          courseId: 'course-26-conversation',
          lessonNumber: '26.1',
          title: 'Expressing Your Opinion',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Personal views'
        },
        {
          id: 'expressing-opinions-2',
          courseId: 'course-26-conversation',
          lessonNumber: '26.2',
          title: 'Supporting Your Views',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Arguments & reasoning'
        },
        {
          id: 'agreeing-politely',
          courseId: 'course-26-conversation',
          lessonNumber: '26.3',
          title: 'Agreeing Politely',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Agreement phrases'
        },
        {
          id: 'disagreeing-politely',
          courseId: 'course-26-conversation',
          lessonNumber: '26.4',
          title: 'Disagreeing Politely',
          duration: '10 min',
          vocabularyCount: 7,
          theme: 'Respectful disagreement'
        },
        {
          id: 'debate-vocabulary',
          courseId: 'course-26-conversation',
          lessonNumber: '26.5',
          title: 'Debate Vocabulary',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Discussion terms'
        },
        {
          id: 'persuasion-basics',
          courseId: 'course-26-conversation',
          lessonNumber: '26.6',
          title: 'Persuasion Basics',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Convincing others'
        },
        {
          id: 'making-arguments',
          courseId: 'course-26-conversation',
          lessonNumber: '26.7',
          title: 'Making Strong Arguments',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Logical reasoning'
        },
        {
          id: 'storytelling-structure',
          courseId: 'course-26-conversation',
          lessonNumber: '26.8',
          title: 'Storytelling Structure',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Narrative flow'
        },
        {
          id: 'descriptive-storytelling',
          courseId: 'course-26-conversation',
          lessonNumber: '26.9',
          title: 'Descriptive Language',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Vivid descriptions'
        },
        {
          id: 'personal-anecdotes',
          courseId: 'course-26-conversation',
          lessonNumber: '26.10',
          title: 'Sharing Personal Stories',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Personal experiences'
        }
      ]
    },
    {
      id: 'course-27-media',
      level: 'B1',
      courseNumber: 27,
      title: 'Media & News',
      description: 'Understand and discuss news, media, and current events',
      totalLessons: 9,
      totalWords: 72,
      lessons: [
        {
          id: 'news-headlines',
          courseId: 'course-27-media',
          lessonNumber: '27.1',
          title: 'Understanding Headlines',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'News format'
        },
        {
          id: 'news-vocabulary-1',
          courseId: 'course-27-media',
          lessonNumber: '27.2',
          title: 'News Vocabulary Part 1',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Journalism terms'
        },
        {
          id: 'news-vocabulary-2',
          courseId: 'course-27-media',
          lessonNumber: '27.3',
          title: 'News Vocabulary Part 2',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Media terminology'
        },
        {
          id: 'politics-news',
          courseId: 'course-27-media',
          lessonNumber: '27.4',
          title: 'Political News',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Government & politics'
        },
        {
          id: 'world-affairs',
          courseId: 'course-27-media',
          lessonNumber: '27.5',
          title: 'World Affairs',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'International news'
        },
        {
          id: 'economy-business',
          courseId: 'course-27-media',
          lessonNumber: '27.6',
          title: 'Economy & Business News',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Financial terms'
        },
        {
          id: 'social-media-vocab',
          courseId: 'course-27-media',
          lessonNumber: '27.7',
          title: 'Social Media Vocabulary',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Digital platforms'
        },
        {
          id: 'online-discussions',
          courseId: 'course-27-media',
          lessonNumber: '27.8',
          title: 'Online Discussions',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Internet communication'
        },
        {
          id: 'fake-news',
          courseId: 'course-27-media',
          lessonNumber: '27.9',
          title: 'Critical Media Literacy',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Fact-checking'
        }
      ]
    },
    {
      id: 'course-28-business',
      level: 'B1',
      courseNumber: 28,
      title: 'Business Hebrew',
      description: 'Professional communication and business vocabulary',
      totalLessons: 10,
      totalWords: 80,
      lessons: [
        {
          id: 'business-meetings-prep',
          courseId: 'course-28-business',
          lessonNumber: '28.1',
          title: 'Meeting Preparation',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Professional planning'
        },
        {
          id: 'business-meetings-conduct',
          courseId: 'course-28-business',
          lessonNumber: '28.2',
          title: 'Conducting Meetings',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Meeting vocabulary'
        },
        {
          id: 'email-basics',
          courseId: 'course-28-business',
          lessonNumber: '28.3',
          title: 'Business Email Basics',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Email structure'
        },
        {
          id: 'formal-letters',
          courseId: 'course-28-business',
          lessonNumber: '28.4',
          title: 'Formal Business Letters',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Written correspondence'
        },
        {
          id: 'negotiation-basics',
          courseId: 'course-28-business',
          lessonNumber: '28.5',
          title: 'Negotiation Basics',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Deal-making language'
        },
        {
          id: 'negotiation-advanced',
          courseId: 'course-28-business',
          lessonNumber: '28.6',
          title: 'Advanced Negotiation',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Complex deals'
        },
        {
          id: 'presentation-structure',
          courseId: 'course-28-business',
          lessonNumber: '28.7',
          title: 'Presentation Structure',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Public speaking'
        },
        {
          id: 'presentation-delivery',
          courseId: 'course-28-business',
          lessonNumber: '28.8',
          title: 'Delivering Presentations',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Speaking skills'
        },
        {
          id: 'business-terms-1',
          courseId: 'course-28-business',
          lessonNumber: '28.9',
          title: 'Business Terminology Part 1',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Corporate vocabulary'
        },
        {
          id: 'business-terms-2',
          courseId: 'course-28-business',
          lessonNumber: '28.10',
          title: 'Business Terminology Part 2',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Industry terms'
        }
      ]
    },
    {
      id: 'course-29-politics-society',
      level: 'B1',
      courseNumber: 29,
      title: 'Politics & Society',
      description: 'Discuss social issues and political topics',
      totalLessons: 9,
      totalWords: 72,
      lessons: [
        {
          id: 'government-structure',
          courseId: 'course-29-politics-society',
          lessonNumber: '29.1',
          title: 'Government Structure',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Political system'
        },
        {
          id: 'political-parties',
          courseId: 'course-29-politics-society',
          lessonNumber: '29.2',
          title: 'Political Parties',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Party politics'
        },
        {
          id: 'elections-voting',
          courseId: 'course-29-politics-society',
          lessonNumber: '29.3',
          title: 'Elections & Voting',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Democratic process'
        },
        {
          id: 'citizenship-rights',
          courseId: 'course-29-politics-society',
          lessonNumber: '29.4',
          title: 'Citizenship & Rights',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Civic participation'
        },
        {
          id: 'social-justice',
          courseId: 'course-29-politics-society',
          lessonNumber: '29.5',
          title: 'Social Justice Issues',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Equality topics'
        },
        {
          id: 'immigration-diversity',
          courseId: 'course-29-politics-society',
          lessonNumber: '29.6',
          title: 'Immigration & Diversity',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Multicultural society'
        },
        {
          id: 'education-system',
          courseId: 'course-29-politics-society',
          lessonNumber: '29.7',
          title: 'Education System',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Schools & learning'
        },
        {
          id: 'environmental-policy',
          courseId: 'course-29-politics-society',
          lessonNumber: '29.8',
          title: 'Environmental Policy',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Green initiatives'
        },
        {
          id: 'community-activism',
          courseId: 'course-29-politics-society',
          lessonNumber: '29.9',
          title: 'Community Activism',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Grassroots movements'
        }
      ]
    },
    {
      id: 'course-30-literature',
      level: 'B1',
      courseNumber: 30,
      title: 'Literature & Poetry',
      description: 'Explore Hebrew literature and poetic expressions',
      totalLessons: 8,
      totalWords: 64,
      lessons: [
        {
          id: 'literary-genres',
          courseId: 'course-30-literature',
          lessonNumber: '30.1',
          title: 'Literary Genres',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Types of literature'
        },
        {
          id: 'reading-comprehension',
          courseId: 'course-30-literature',
          lessonNumber: '30.2',
          title: 'Reading Comprehension',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Understanding texts'
        },
        {
          id: 'short-stories',
          courseId: 'course-30-literature',
          lessonNumber: '30.3',
          title: 'Short Story Vocabulary',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Narrative language'
        },
        {
          id: 'poetry-basics',
          courseId: 'course-30-literature',
          lessonNumber: '30.4',
          title: 'Poetry Basics',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Poetic forms'
        },
        {
          id: 'poetic-devices',
          courseId: 'course-30-literature',
          lessonNumber: '30.5',
          title: 'Poetic Devices',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Literary techniques'
        },
        {
          id: 'famous-authors-1',
          courseId: 'course-30-literature',
          lessonNumber: '30.6',
          title: 'Classic Israeli Authors',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Literary tradition'
        },
        {
          id: 'famous-authors-2',
          courseId: 'course-30-literature',
          lessonNumber: '30.7',
          title: 'Contemporary Writers',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Modern literature'
        },
        {
          id: 'literary-analysis',
          courseId: 'course-30-literature',
          lessonNumber: '30.8',
          title: 'Literary Analysis',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Critical reading'
        }
      ]
    },
    {
      id: 'course-31-science-tech',
      level: 'B1',
      courseNumber: 31,
      title: 'Science & Technology',
      description: 'Technical vocabulary for science and innovation',
      totalLessons: 10,
      totalWords: 80,
      lessons: [
        {
          id: 'scientific-method',
          courseId: 'course-31-science-tech',
          lessonNumber: '31.1',
          title: 'Scientific Method',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Research basics'
        },
        {
          id: 'lab-equipment',
          courseId: 'course-31-science-tech',
          lessonNumber: '31.2',
          title: 'Laboratory Equipment',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Science tools'
        },
        {
          id: 'biology-terms',
          courseId: 'course-31-science-tech',
          lessonNumber: '31.3',
          title: 'Biology Terminology',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Life sciences'
        },
        {
          id: 'chemistry-physics',
          courseId: 'course-31-science-tech',
          lessonNumber: '31.4',
          title: 'Chemistry & Physics',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Physical sciences'
        },
        {
          id: 'computers-basics',
          courseId: 'course-31-science-tech',
          lessonNumber: '31.5',
          title: 'Computer Basics',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Computing terms'
        },
        {
          id: 'programming-software',
          courseId: 'course-31-science-tech',
          lessonNumber: '31.6',
          title: 'Programming & Software',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Development vocabulary'
        },
        {
          id: 'startup-culture',
          courseId: 'course-31-science-tech',
          lessonNumber: '31.7',
          title: 'Startup Culture',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Israeli tech scene'
        },
        {
          id: 'innovation-vocabulary',
          courseId: 'course-31-science-tech',
          lessonNumber: '31.8',
          title: 'Innovation Vocabulary',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Entrepreneurship'
        },
        {
          id: 'environment-vocab',
          courseId: 'course-31-science-tech',
          lessonNumber: '31.9',
          title: 'Environmental Vocabulary',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Nature & ecology'
        },
        {
          id: 'climate-change',
          courseId: 'course-31-science-tech',
          lessonNumber: '31.10',
          title: 'Climate Change Discussion',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Environmental issues'
        }
      ]
    },
    {
      id: 'course-32-history',
      level: 'B1',
      courseNumber: 32,
      title: 'History & Heritage',
      description: 'Discuss historical events and cultural heritage',
      totalLessons: 8,
      totalWords: 64,
      lessons: [
        {
          id: 'ancient-periods',
          courseId: 'course-32-history',
          lessonNumber: '32.1',
          title: 'Ancient Periods',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Early history'
        },
        {
          id: 'biblical-times',
          courseId: 'course-32-history',
          lessonNumber: '32.2',
          title: 'Biblical Times',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Religious history'
        },
        {
          id: 'diaspora',
          courseId: 'course-32-history',
          lessonNumber: '32.3',
          title: 'Jewish Diaspora',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Global communities'
        },
        {
          id: 'zionism-movement',
          courseId: 'course-32-history',
          lessonNumber: '32.4',
          title: 'Zionist Movement',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'National revival'
        },
        {
          id: 'state-founding',
          courseId: 'course-32-history',
          lessonNumber: '32.5',
          title: 'Founding of the State',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Independence'
        },
        {
          id: 'modern-decades',
          courseId: 'course-32-history',
          lessonNumber: '32.6',
          title: 'Modern Decades',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Recent history'
        },
        {
          id: 'archaeological-terms',
          courseId: 'course-32-history',
          lessonNumber: '32.7',
          title: 'Archaeological Terminology',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Excavation vocabulary'
        },
        {
          id: 'historical-sites',
          courseId: 'course-32-history',
          lessonNumber: '32.8',
          title: 'Historical Sites',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Landmarks & monuments'
        }
      ]
    },
    {
      id: 'course-33-idioms',
      level: 'B1',
      courseNumber: 33,
      title: 'Idioms & Expressions',
      description: 'Master common Hebrew idioms and colloquialisms',
      totalLessons: 9,
      totalWords: 72,
      lessons: [
        {
          id: 'everyday-idioms-1',
          courseId: 'course-33-idioms',
          lessonNumber: '33.1',
          title: 'Everyday Idioms Part 1',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Common expressions'
        },
        {
          id: 'everyday-idioms-2',
          courseId: 'course-33-idioms',
          lessonNumber: '33.2',
          title: 'Everyday Idioms Part 2',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'More expressions'
        },
        {
          id: 'body-idioms',
          courseId: 'course-33-idioms',
          lessonNumber: '33.3',
          title: 'Body Part Idioms',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Physical metaphors'
        },
        {
          id: 'slang-basics',
          courseId: 'course-33-idioms',
          lessonNumber: '33.4',
          title: 'Israeli Slang Basics',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Informal speech'
        },
        {
          id: 'slang-advanced',
          courseId: 'course-33-idioms',
          lessonNumber: '33.5',
          title: 'Advanced Slang',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Street language'
        },
        {
          id: 'proverbs',
          courseId: 'course-33-idioms',
          lessonNumber: '33.6',
          title: 'Hebrew Proverbs',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Traditional wisdom'
        },
        {
          id: 'biblical-phrases',
          courseId: 'course-33-idioms',
          lessonNumber: '33.7',
          title: 'Biblical Expressions',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Classical phrases'
        },
        {
          id: 'modern-expressions',
          courseId: 'course-33-idioms',
          lessonNumber: '33.8',
          title: 'Modern Expressions',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Contemporary idioms'
        },
        {
          id: 'cultural-references',
          courseId: 'course-33-idioms',
          lessonNumber: '33.9',
          title: 'Cultural References',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Pop culture sayings'
        }
      ]
    },
    {
      id: 'course-34-military-service',
      level: 'B1',
      courseNumber: 34,
      title: 'Military & Service',
      description: 'Understand Israeli military culture and national service',
      totalLessons: 6,
      totalWords: 48,
      lessons: [
        {
          id: 'military-structure',
          courseId: 'course-34-military-service',
          lessonNumber: '34.1',
          title: 'Military Structure',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'IDF organization'
        },
        {
          id: 'ranks-positions',
          courseId: 'course-34-military-service',
          lessonNumber: '34.2',
          title: 'Ranks & Positions',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Military hierarchy'
        },
        {
          id: 'military-life',
          courseId: 'course-34-military-service',
          lessonNumber: '34.3',
          title: 'Military Life Vocabulary',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Daily service'
        },
        {
          id: 'service-types',
          courseId: 'course-34-military-service',
          lessonNumber: '34.4',
          title: 'Types of Service',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Different roles'
        },
        {
          id: 'reserves-duty',
          courseId: 'course-34-military-service',
          lessonNumber: '34.5',
          title: 'Reserve Duty',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Miluim system'
        },
        {
          id: 'national-service',
          courseId: 'course-34-military-service',
          lessonNumber: '34.6',
          title: 'National Service',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Civic alternatives'
        }
      ]
    },
    {
      id: 'course-35-medical',
      level: 'B1',
      courseNumber: 35,
      title: 'Medical & Healthcare',
      description: 'Advanced medical vocabulary and healthcare discussions',
      totalLessons: 9,
      totalWords: 72,
      lessons: [
        {
          id: 'body-systems',
          courseId: 'course-35-medical',
          lessonNumber: '35.1',
          title: 'Body Systems',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Anatomy basics'
        },
        {
          id: 'common-conditions',
          courseId: 'course-35-medical',
          lessonNumber: '35.2',
          title: 'Common Conditions',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Illnesses & diseases'
        },
        {
          id: 'chronic-conditions',
          courseId: 'course-35-medical',
          lessonNumber: '35.3',
          title: 'Chronic Conditions',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Long-term health'
        },
        {
          id: 'medical-treatments',
          courseId: 'course-35-medical',
          lessonNumber: '35.4',
          title: 'Medical Treatments',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Therapies & cures'
        },
        {
          id: 'medications',
          courseId: 'course-35-medical',
          lessonNumber: '35.5',
          title: 'Medications & Prescriptions',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Pharmaceutical terms'
        },
        {
          id: 'medical-procedures',
          courseId: 'course-35-medical',
          lessonNumber: '35.6',
          title: 'Medical Procedures',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Surgery & tests'
        },
        {
          id: 'hospital-vocabulary',
          courseId: 'course-35-medical',
          lessonNumber: '35.7',
          title: 'Hospital Vocabulary',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Medical facilities'
        },
        {
          id: 'healthcare-system',
          courseId: 'course-35-medical',
          lessonNumber: '35.8',
          title: 'Healthcare System',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Kupat Holim'
        },
        {
          id: 'health-insurance',
          courseId: 'course-35-medical',
          lessonNumber: '35.9',
          title: 'Health Insurance',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Coverage & benefits'
        }
      ]
    },
    {
      id: 'course-36-legal',
      level: 'B1',
      courseNumber: 36,
      title: 'Legal & Administrative',
      description: 'Navigate legal situations and bureaucracy',
      totalLessons: 8,
      totalWords: 64,
      lessons: [
        {
          id: 'legal-system',
          courseId: 'course-36-legal',
          lessonNumber: '36.1',
          title: 'Legal System Overview',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Court structure'
        },
        {
          id: 'rights-laws',
          courseId: 'course-36-legal',
          lessonNumber: '36.2',
          title: 'Rights & Laws',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Legal rights'
        },
        {
          id: 'contracts-basics',
          courseId: 'course-36-legal',
          lessonNumber: '36.3',
          title: 'Contract Basics',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Legal agreements'
        },
        {
          id: 'rental-agreements',
          courseId: 'course-36-legal',
          lessonNumber: '36.4',
          title: 'Rental Agreements',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Housing contracts'
        },
        {
          id: 'government-offices',
          courseId: 'course-36-legal',
          lessonNumber: '36.5',
          title: 'Government Offices',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Bureaucracy navigation'
        },
        {
          id: 'official-documents',
          courseId: 'course-36-legal',
          lessonNumber: '36.6',
          title: 'Official Documents',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Paperwork vocabulary'
        },
        {
          id: 'tax-terminology',
          courseId: 'course-36-legal',
          lessonNumber: '36.7',
          title: 'Tax Terminology',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Financial obligations'
        },
        {
          id: 'immigration-procedures',
          courseId: 'course-36-legal',
          lessonNumber: '36.8',
          title: 'Immigration Procedures',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Visa & residency'
        }
      ]
    },
    {
      id: 'course-37-arts',
      level: 'B1',
      courseNumber: 37,
      title: 'Arts & Entertainment',
      description: 'Discuss music, film, theater, and visual arts',
      totalLessons: 10,
      totalWords: 80,
      lessons: [
        {
          id: 'music-genres',
          courseId: 'course-37-arts',
          lessonNumber: '37.1',
          title: 'Music Genres',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Musical styles'
        },
        {
          id: 'israeli-music',
          courseId: 'course-37-arts',
          lessonNumber: '37.2',
          title: 'Israeli Music Scene',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Local musicians'
        },
        {
          id: 'musical-instruments',
          courseId: 'course-37-arts',
          lessonNumber: '37.3',
          title: 'Musical Instruments',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Instrument vocabulary'
        },
        {
          id: 'film-vocabulary',
          courseId: 'course-37-arts',
          lessonNumber: '37.4',
          title: 'Film Vocabulary',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Cinema terms'
        },
        {
          id: 'israeli-cinema',
          courseId: 'course-37-arts',
          lessonNumber: '37.5',
          title: 'Israeli Cinema',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Local film industry'
        },
        {
          id: 'tv-series',
          courseId: 'course-37-arts',
          lessonNumber: '37.6',
          title: 'TV Series & Shows',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Television vocabulary'
        },
        {
          id: 'theater-vocabulary',
          courseId: 'course-37-arts',
          lessonNumber: '37.7',
          title: 'Theater Vocabulary',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Stage arts'
        },
        {
          id: 'visual-arts-vocab',
          courseId: 'course-37-arts',
          lessonNumber: '37.8',
          title: 'Visual Arts Vocabulary',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Art terminology'
        },
        {
          id: 'museums-galleries',
          courseId: 'course-37-arts',
          lessonNumber: '37.9',
          title: 'Museums & Galleries',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Art institutions'
        },
        {
          id: 'art-criticism',
          courseId: 'course-37-arts',
          lessonNumber: '37.10',
          title: 'Art Criticism',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Discussing art'
        }
      ]
    },
    {
      id: 'course-38-philosophy',
      level: 'B1',
      courseNumber: 38,
      title: 'Philosophy & Abstract Concepts',
      description: 'Express complex and abstract ideas',
      totalLessons: 9,
      totalWords: 72,
      lessons: [
        {
          id: 'abstract-vocabulary',
          courseId: 'course-38-philosophy',
          lessonNumber: '38.1',
          title: 'Abstract Vocabulary',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Conceptual language'
        },
        {
          id: 'philosophical-terms',
          courseId: 'course-38-philosophy',
          lessonNumber: '38.2',
          title: 'Philosophical Terms',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Philosophy basics'
        },
        {
          id: 'logic-reasoning',
          courseId: 'course-38-philosophy',
          lessonNumber: '38.3',
          title: 'Logic & Reasoning',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Analytical thinking'
        },
        {
          id: 'ethics-basics',
          courseId: 'course-38-philosophy',
          lessonNumber: '38.4',
          title: 'Ethics Basics',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Moral concepts'
        },
        {
          id: 'moral-dilemmas',
          courseId: 'course-38-philosophy',
          lessonNumber: '38.5',
          title: 'Moral Dilemmas',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Ethical questions'
        },
        {
          id: 'values-beliefs',
          courseId: 'course-38-philosophy',
          lessonNumber: '38.6',
          title: 'Values & Beliefs',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Personal philosophy'
        },
        {
          id: 'jewish-thought',
          courseId: 'course-38-philosophy',
          lessonNumber: '38.7',
          title: 'Jewish Thought',
          duration: '12 min',
          vocabularyCount: 8,
          theme: 'Religious philosophy'
        },
        {
          id: 'existential-themes',
          courseId: 'course-38-philosophy',
          lessonNumber: '38.8',
          title: 'Existential Themes',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Life & meaning'
        },
        {
          id: 'philosophical-debate',
          courseId: 'course-38-philosophy',
          lessonNumber: '38.9',
          title: 'Philosophical Debate',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Discussion skills'
        }
      ]
    }
  ]
}
