import { CurriculumLevel, Course } from '@/types/curriculum'

export const b2Curriculum: CurriculumLevel = {
  level: 'B2',
  title: 'B2 Level - Upper Intermediate',
  description: 'Master advanced Hebrew with sophisticated grammar, specialized vocabulary, and fluent expression across professional and academic contexts',
  totalWords: 2000,
  totalLessons: 267,
  courses: [
    {
      id: 'course-39-advanced-grammar',
      level: 'B2',
      courseNumber: 39,
      title: 'Advanced Grammar Structures',
      description: 'Master complex grammatical constructions and nuanced language patterns',
      totalLessons: 14,
      totalWords: 112,
      lessons: [
        {
          id: 'relative-clauses-advanced',
          courseId: 'course-39-advanced-grammar',
          lessonNumber: '39.1',
          title: 'Advanced Relative Clauses',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Complex connections'
        },
        {
          id: 'participle-constructions',
          courseId: 'course-39-advanced-grammar',
          lessonNumber: '39.2',
          title: 'Participle Constructions',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Active & passive participles'
        },
        {
          id: 'infinitive-phrases',
          courseId: 'course-39-advanced-grammar',
          lessonNumber: '39.3',
          title: 'Infinitive Phrases',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Purpose & intention'
        },
        {
          id: 'temporal-clauses',
          courseId: 'course-39-advanced-grammar',
          lessonNumber: '39.4',
          title: 'Temporal Clauses',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Time relationships'
        },
        {
          id: 'causal-clauses',
          courseId: 'course-39-advanced-grammar',
          lessonNumber: '39.5',
          title: 'Causal Clauses',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Cause & effect'
        },
        {
          id: 'concessive-clauses',
          courseId: 'course-39-advanced-grammar',
          lessonNumber: '39.6',
          title: 'Concessive Clauses',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Despite & although'
        },
        {
          id: 'passive-voice-advanced',
          courseId: 'course-39-advanced-grammar',
          lessonNumber: '39.7',
          title: 'Advanced Passive Voice',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Formal constructions'
        },
        {
          id: 'reported-speech',
          courseId: 'course-39-advanced-grammar',
          lessonNumber: '39.8',
          title: 'Reported Speech',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Indirect quotation'
        },
        {
          id: 'ellipsis-substitution',
          courseId: 'course-39-advanced-grammar',
          lessonNumber: '39.9',
          title: 'Ellipsis & Substitution',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Avoiding repetition'
        },
        {
          id: 'emphasis-structures',
          courseId: 'course-39-advanced-grammar',
          lessonNumber: '39.10',
          title: 'Emphasis Structures',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Highlighting information'
        },
        {
          id: 'cleft-sentences',
          courseId: 'course-39-advanced-grammar',
          lessonNumber: '39.11',
          title: 'Cleft Sentences',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Focus & prominence'
        },
        {
          id: 'inversion-fronting',
          courseId: 'course-39-advanced-grammar',
          lessonNumber: '39.12',
          title: 'Inversion & Fronting',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Word order variation'
        },
        {
          id: 'compound-complex-sentences',
          courseId: 'course-39-advanced-grammar',
          lessonNumber: '39.13',
          title: 'Compound-Complex Sentences',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Multiple clauses'
        },
        {
          id: 'grammatical-metaphor',
          courseId: 'course-39-advanced-grammar',
          lessonNumber: '39.14',
          title: 'Grammatical Metaphor',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Abstract expression'
        }
      ]
    },
    {
      id: 'course-40-academic-hebrew',
      level: 'B2',
      courseNumber: 40,
      title: 'Academic Hebrew',
      description: 'Master the language of higher education and scholarly discourse',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'academic-vocab-1',
          courseId: 'course-40-academic-hebrew',
          lessonNumber: '40.1',
          title: 'Academic Vocabulary Part 1',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Research & study terms'
        },
        {
          id: 'academic-vocab-2',
          courseId: 'course-40-academic-hebrew',
          lessonNumber: '40.2',
          title: 'Academic Vocabulary Part 2',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Analysis & methodology'
        },
        {
          id: 'academic-vocab-3',
          courseId: 'course-40-academic-hebrew',
          lessonNumber: '40.3',
          title: 'Academic Vocabulary Part 3',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Theory & concepts'
        },
        {
          id: 'writing-abstracts',
          courseId: 'course-40-academic-hebrew',
          lessonNumber: '40.4',
          title: 'Writing Abstracts',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Summary writing'
        },
        {
          id: 'thesis-statements',
          courseId: 'course-40-academic-hebrew',
          lessonNumber: '40.5',
          title: 'Thesis Statements',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Arguments & claims'
        },
        {
          id: 'citations-references',
          courseId: 'course-40-academic-hebrew',
          lessonNumber: '40.6',
          title: 'Citations & References',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Attribution'
        },
        {
          id: 'literature-review',
          courseId: 'course-40-academic-hebrew',
          lessonNumber: '40.7',
          title: 'Literature Review',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Surveying scholarship'
        },
        {
          id: 'methodology-sections',
          courseId: 'course-40-academic-hebrew',
          lessonNumber: '40.8',
          title: 'Methodology Sections',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Research design'
        },
        {
          id: 'data-analysis-vocab',
          courseId: 'course-40-academic-hebrew',
          lessonNumber: '40.9',
          title: 'Data Analysis Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Statistics & findings'
        },
        {
          id: 'discussion-conclusions',
          courseId: 'course-40-academic-hebrew',
          lessonNumber: '40.10',
          title: 'Discussion & Conclusions',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Interpreting results'
        },
        {
          id: 'academic-presentations',
          courseId: 'course-40-academic-hebrew',
          lessonNumber: '40.11',
          title: 'Academic Presentations',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Conference speaking'
        },
        {
          id: 'seminar-discussions',
          courseId: 'course-40-academic-hebrew',
          lessonNumber: '40.12',
          title: 'Seminar Discussions',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Scholarly debate'
        },
        {
          id: 'critical-thinking-vocab',
          courseId: 'course-40-academic-hebrew',
          lessonNumber: '40.13',
          title: 'Critical Thinking Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Analysis & evaluation'
        }
      ]
    },
    {
      id: 'course-41-professional-communication',
      level: 'B2',
      courseNumber: 41,
      title: 'Professional Communication',
      description: 'Excel in sophisticated business and professional contexts',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'executive-communications',
          courseId: 'course-41-professional-communication',
          lessonNumber: '41.1',
          title: 'Executive Communications',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Leadership language'
        },
        {
          id: 'strategic-planning-vocab',
          courseId: 'course-41-professional-communication',
          lessonNumber: '41.2',
          title: 'Strategic Planning Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Vision & strategy'
        },
        {
          id: 'financial-reporting',
          courseId: 'course-41-professional-communication',
          lessonNumber: '41.3',
          title: 'Financial Reporting',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Fiscal terminology'
        },
        {
          id: 'market-analysis',
          courseId: 'course-41-professional-communication',
          lessonNumber: '41.4',
          title: 'Market Analysis',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Trends & forecasting'
        },
        {
          id: 'hr-management',
          courseId: 'course-41-professional-communication',
          lessonNumber: '41.5',
          title: 'HR Management Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Personnel & development'
        },
        {
          id: 'performance-reviews',
          courseId: 'course-41-professional-communication',
          lessonNumber: '41.6',
          title: 'Performance Reviews',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Evaluation language'
        },
        {
          id: 'conflict-resolution',
          courseId: 'course-41-professional-communication',
          lessonNumber: '41.7',
          title: 'Conflict Resolution',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Mediation vocabulary'
        },
        {
          id: 'project-management',
          courseId: 'course-41-professional-communication',
          lessonNumber: '41.8',
          title: 'Project Management',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Execution & delivery'
        },
        {
          id: 'stakeholder-engagement',
          courseId: 'course-41-professional-communication',
          lessonNumber: '41.9',
          title: 'Stakeholder Engagement',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Relationship management'
        },
        {
          id: 'corporate-governance',
          courseId: 'course-41-professional-communication',
          lessonNumber: '41.10',
          title: 'Corporate Governance',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Board & compliance'
        },
        {
          id: 'crisis-management',
          courseId: 'course-41-professional-communication',
          lessonNumber: '41.11',
          title: 'Crisis Management',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Emergency response'
        },
        {
          id: 'public-relations',
          courseId: 'course-41-professional-communication',
          lessonNumber: '41.12',
          title: 'Public Relations',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Media & messaging'
        },
        {
          id: 'networking-etiquette',
          courseId: 'course-41-professional-communication',
          lessonNumber: '41.13',
          title: 'Professional Networking',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Business relationships'
        }
      ]
    },
    {
      id: 'course-42-journalism-media',
      level: 'B2',
      courseNumber: 42,
      title: 'Journalism & Media Production',
      description: 'Master the language of journalism and media creation',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'investigative-journalism',
          courseId: 'course-42-journalism-media',
          lessonNumber: '42.1',
          title: 'Investigative Journalism',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Research & exposure'
        },
        {
          id: 'editorial-writing',
          courseId: 'course-42-journalism-media',
          lessonNumber: '42.2',
          title: 'Editorial Writing',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Opinion & analysis'
        },
        {
          id: 'feature-articles',
          courseId: 'course-42-journalism-media',
          lessonNumber: '42.3',
          title: 'Feature Articles',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Long-form journalism'
        },
        {
          id: 'broadcast-journalism',
          courseId: 'course-42-journalism-media',
          lessonNumber: '42.4',
          title: 'Broadcast Journalism',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'TV & radio reporting'
        },
        {
          id: 'digital-journalism',
          courseId: 'course-42-journalism-media',
          lessonNumber: '42.5',
          title: 'Digital Journalism',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Online media'
        },
        {
          id: 'photojournalism',
          courseId: 'course-42-journalism-media',
          lessonNumber: '42.6',
          title: 'Photojournalism Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Visual storytelling'
        },
        {
          id: 'documentary-production',
          courseId: 'course-42-journalism-media',
          lessonNumber: '42.7',
          title: 'Documentary Production',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Non-fiction film'
        },
        {
          id: 'media-ethics',
          courseId: 'course-42-journalism-media',
          lessonNumber: '42.8',
          title: 'Media Ethics',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Responsibility & standards'
        },
        {
          id: 'fact-checking',
          courseId: 'course-42-journalism-media',
          lessonNumber: '42.9',
          title: 'Fact-Checking Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Verification methods'
        },
        {
          id: 'source-attribution',
          courseId: 'course-42-journalism-media',
          lessonNumber: '42.10',
          title: 'Source Attribution',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Crediting information'
        },
        {
          id: 'interview-techniques',
          courseId: 'course-42-journalism-media',
          lessonNumber: '42.11',
          title: 'Advanced Interview Techniques',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Questioning skills'
        },
        {
          id: 'media-law',
          courseId: 'course-42-journalism-media',
          lessonNumber: '42.12',
          title: 'Media Law Basics',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Legal constraints'
        },
        {
          id: 'content-curation',
          courseId: 'course-42-journalism-media',
          lessonNumber: '42.13',
          title: 'Content Curation',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Selection & presentation'
        }
      ]
    },
    {
      id: 'course-43-literary-analysis',
      level: 'B2',
      courseNumber: 43,
      title: 'Literary Analysis & Criticism',
      description: 'Analyze and critique Hebrew literature with sophistication',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'literary-theory',
          courseId: 'course-43-literary-analysis',
          lessonNumber: '43.1',
          title: 'Literary Theory Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Critical frameworks'
        },
        {
          id: 'narrative-structure',
          courseId: 'course-43-literary-analysis',
          lessonNumber: '43.2',
          title: 'Narrative Structure Analysis',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Plot & composition'
        },
        {
          id: 'characterization',
          courseId: 'course-43-literary-analysis',
          lessonNumber: '43.3',
          title: 'Characterization Techniques',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Character development'
        },
        {
          id: 'symbolism-imagery',
          courseId: 'course-43-literary-analysis',
          lessonNumber: '43.4',
          title: 'Symbolism & Imagery',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Figurative language'
        },
        {
          id: 'theme-motif',
          courseId: 'course-43-literary-analysis',
          lessonNumber: '43.5',
          title: 'Theme & Motif',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Recurring elements'
        },
        {
          id: 'perspective-voice',
          courseId: 'course-43-literary-analysis',
          lessonNumber: '43.6',
          title: 'Perspective & Voice',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Narrative viewpoint'
        },
        {
          id: 'tone-mood',
          courseId: 'course-43-literary-analysis',
          lessonNumber: '43.7',
          title: 'Tone & Mood',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Atmosphere & attitude'
        },
        {
          id: 'intertextuality',
          courseId: 'course-43-literary-analysis',
          lessonNumber: '43.8',
          title: 'Intertextuality',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Literary connections'
        },
        {
          id: 'postmodern-hebrew-lit',
          courseId: 'course-43-literary-analysis',
          lessonNumber: '43.9',
          title: 'Postmodern Hebrew Literature',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Contemporary trends'
        },
        {
          id: 'feminist-criticism',
          courseId: 'course-43-literary-analysis',
          lessonNumber: '43.10',
          title: 'Feminist Literary Criticism',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Gender perspectives'
        },
        {
          id: 'postcolonial-criticism',
          courseId: 'course-43-literary-analysis',
          lessonNumber: '43.11',
          title: 'Postcolonial Criticism',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Power & identity'
        },
        {
          id: 'comparative-literature',
          courseId: 'course-43-literary-analysis',
          lessonNumber: '43.12',
          title: 'Comparative Literature',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Cross-cultural analysis'
        },
        {
          id: 'genre-conventions',
          courseId: 'course-43-literary-analysis',
          lessonNumber: '43.13',
          title: 'Genre Conventions',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Literary categories'
        }
      ]
    },
    {
      id: 'course-44-scientific-discourse',
      level: 'B2',
      courseNumber: 44,
      title: 'Scientific Discourse',
      description: 'Communicate complex scientific concepts with precision',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'research-terminology',
          courseId: 'course-44-scientific-discourse',
          lessonNumber: '44.1',
          title: 'Research Terminology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Scientific method'
        },
        {
          id: 'hypothesis-testing',
          courseId: 'course-44-scientific-discourse',
          lessonNumber: '44.2',
          title: 'Hypothesis Testing Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Experimental design'
        },
        {
          id: 'biochemistry-vocab',
          courseId: 'course-44-scientific-discourse',
          lessonNumber: '44.3',
          title: 'Biochemistry Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Molecular biology'
        },
        {
          id: 'genetics-genomics',
          courseId: 'course-44-scientific-discourse',
          lessonNumber: '44.4',
          title: 'Genetics & Genomics',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'DNA & heredity'
        },
        {
          id: 'neuroscience-vocab',
          courseId: 'course-44-scientific-discourse',
          lessonNumber: '44.5',
          title: 'Neuroscience Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Brain & cognition'
        },
        {
          id: 'physics-mechanics',
          courseId: 'course-44-scientific-discourse',
          lessonNumber: '44.6',
          title: 'Physics & Mechanics',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Forces & motion'
        },
        {
          id: 'quantum-theory',
          courseId: 'course-44-scientific-discourse',
          lessonNumber: '44.7',
          title: 'Quantum Theory Basics',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Subatomic particles'
        },
        {
          id: 'organic-chemistry',
          courseId: 'course-44-scientific-discourse',
          lessonNumber: '44.8',
          title: 'Organic Chemistry',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Carbon compounds'
        },
        {
          id: 'ecology-ecosystems',
          courseId: 'course-44-scientific-discourse',
          lessonNumber: '44.9',
          title: 'Ecology & Ecosystems',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Environmental systems'
        },
        {
          id: 'climate-science',
          courseId: 'course-44-scientific-discourse',
          lessonNumber: '44.10',
          title: 'Climate Science',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Global warming'
        },
        {
          id: 'astronomy-cosmology',
          courseId: 'course-44-scientific-discourse',
          lessonNumber: '44.11',
          title: 'Astronomy & Cosmology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Universe & space'
        },
        {
          id: 'biotechnology',
          courseId: 'course-44-scientific-discourse',
          lessonNumber: '44.12',
          title: 'Biotechnology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Applied biology'
        },
        {
          id: 'nanotechnology',
          courseId: 'course-44-scientific-discourse',
          lessonNumber: '44.13',
          title: 'Nanotechnology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Molecular engineering'
        }
      ]
    },
    {
      id: 'course-45-medical-specialties',
      level: 'B2',
      courseNumber: 45,
      title: 'Medical Specialties',
      description: 'Master specialized medical terminology across disciplines',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'cardiology-vocab',
          courseId: 'course-45-medical-specialties',
          lessonNumber: '45.1',
          title: 'Cardiology Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Heart & circulation'
        },
        {
          id: 'neurology-vocab',
          courseId: 'course-45-medical-specialties',
          lessonNumber: '45.2',
          title: 'Neurology Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Nervous system disorders'
        },
        {
          id: 'oncology-vocab',
          courseId: 'course-45-medical-specialties',
          lessonNumber: '45.3',
          title: 'Oncology Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Cancer treatment'
        },
        {
          id: 'orthopedics-vocab',
          courseId: 'course-45-medical-specialties',
          lessonNumber: '45.4',
          title: 'Orthopedics Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Bones & joints'
        },
        {
          id: 'psychiatry-vocab',
          courseId: 'course-45-medical-specialties',
          lessonNumber: '45.5',
          title: 'Psychiatry Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Mental health'
        },
        {
          id: 'pediatrics-vocab',
          courseId: 'course-45-medical-specialties',
          lessonNumber: '45.6',
          title: 'Pediatrics Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Child health'
        },
        {
          id: 'obstetrics-gynecology',
          courseId: 'course-45-medical-specialties',
          lessonNumber: '45.7',
          title: 'Obstetrics & Gynecology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Women\'s health'
        },
        {
          id: 'radiology-imaging',
          courseId: 'course-45-medical-specialties',
          lessonNumber: '45.8',
          title: 'Radiology & Imaging',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Diagnostic imaging'
        },
        {
          id: 'anesthesiology-vocab',
          courseId: 'course-45-medical-specialties',
          lessonNumber: '45.9',
          title: 'Anesthesiology Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Pain management'
        },
        {
          id: 'immunology-vocab',
          courseId: 'course-45-medical-specialties',
          lessonNumber: '45.10',
          title: 'Immunology Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Immune system'
        },
        {
          id: 'endocrinology-vocab',
          courseId: 'course-45-medical-specialties',
          lessonNumber: '45.11',
          title: 'Endocrinology Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Hormones & glands'
        },
        {
          id: 'pathology-vocab',
          courseId: 'course-45-medical-specialties',
          lessonNumber: '45.12',
          title: 'Pathology Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Disease processes'
        },
        {
          id: 'pharmacology-vocab',
          courseId: 'course-45-medical-specialties',
          lessonNumber: '45.13',
          title: 'Pharmacology Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Drug mechanisms'
        }
      ]
    },
    {
      id: 'course-46-legal-proceedings',
      level: 'B2',
      courseNumber: 46,
      title: 'Legal Proceedings',
      description: 'Navigate complex legal situations and courtroom language',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'civil-law-vocab',
          courseId: 'course-46-legal-proceedings',
          lessonNumber: '46.1',
          title: 'Civil Law Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Private disputes'
        },
        {
          id: 'criminal-law-vocab',
          courseId: 'course-46-legal-proceedings',
          lessonNumber: '46.2',
          title: 'Criminal Law Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Offenses & penalties'
        },
        {
          id: 'constitutional-law',
          courseId: 'course-46-legal-proceedings',
          lessonNumber: '46.3',
          title: 'Constitutional Law',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Basic law principles'
        },
        {
          id: 'litigation-process',
          courseId: 'course-46-legal-proceedings',
          lessonNumber: '46.4',
          title: 'Litigation Process',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Court procedures'
        },
        {
          id: 'evidence-testimony',
          courseId: 'course-46-legal-proceedings',
          lessonNumber: '46.5',
          title: 'Evidence & Testimony',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Legal proof'
        },
        {
          id: 'appeals-process',
          courseId: 'course-46-legal-proceedings',
          lessonNumber: '46.6',
          title: 'Appeals Process',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Judicial review'
        },
        {
          id: 'contract-law-advanced',
          courseId: 'course-46-legal-proceedings',
          lessonNumber: '46.7',
          title: 'Advanced Contract Law',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Binding agreements'
        },
        {
          id: 'intellectual-property',
          courseId: 'course-46-legal-proceedings',
          lessonNumber: '46.8',
          title: 'Intellectual Property',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Patents & copyrights'
        },
        {
          id: 'labor-law',
          courseId: 'course-46-legal-proceedings',
          lessonNumber: '46.9',
          title: 'Labor Law',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Employment rights'
        },
        {
          id: 'real-estate-law',
          courseId: 'course-46-legal-proceedings',
          lessonNumber: '46.10',
          title: 'Real Estate Law',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Property transactions'
        },
        {
          id: 'family-law',
          courseId: 'course-46-legal-proceedings',
          lessonNumber: '46.11',
          title: 'Family Law',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Marriage & custody'
        },
        {
          id: 'arbitration-mediation',
          courseId: 'course-46-legal-proceedings',
          lessonNumber: '46.12',
          title: 'Arbitration & Mediation',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Alternative dispute resolution'
        },
        {
          id: 'international-law',
          courseId: 'course-46-legal-proceedings',
          lessonNumber: '46.13',
          title: 'International Law Basics',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Global legal frameworks'
        }
      ]
    },
    {
      id: 'course-47-economics-finance',
      level: 'B2',
      courseNumber: 47,
      title: 'Economics & Finance',
      description: 'Master advanced economic and financial terminology',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'macroeconomics-vocab',
          courseId: 'course-47-economics-finance',
          lessonNumber: '47.1',
          title: 'Macroeconomics Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'National economy'
        },
        {
          id: 'microeconomics-vocab',
          courseId: 'course-47-economics-finance',
          lessonNumber: '47.2',
          title: 'Microeconomics Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Individual markets'
        },
        {
          id: 'monetary-policy',
          courseId: 'course-47-economics-finance',
          lessonNumber: '47.3',
          title: 'Monetary Policy',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Central banking'
        },
        {
          id: 'fiscal-policy',
          courseId: 'course-47-economics-finance',
          lessonNumber: '47.4',
          title: 'Fiscal Policy',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Government spending'
        },
        {
          id: 'stock-markets',
          courseId: 'course-47-economics-finance',
          lessonNumber: '47.5',
          title: 'Stock Markets',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Equity trading'
        },
        {
          id: 'derivatives-options',
          courseId: 'course-47-economics-finance',
          lessonNumber: '47.6',
          title: 'Derivatives & Options',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Financial instruments'
        },
        {
          id: 'portfolio-management',
          courseId: 'course-47-economics-finance',
          lessonNumber: '47.7',
          title: 'Portfolio Management',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Investment strategy'
        },
        {
          id: 'risk-assessment',
          courseId: 'course-47-economics-finance',
          lessonNumber: '47.8',
          title: 'Risk Assessment',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Financial risk'
        },
        {
          id: 'corporate-finance',
          courseId: 'course-47-economics-finance',
          lessonNumber: '47.9',
          title: 'Corporate Finance',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Business funding'
        },
        {
          id: 'mergers-acquisitions',
          courseId: 'course-47-economics-finance',
          lessonNumber: '47.10',
          title: 'Mergers & Acquisitions',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Corporate combinations'
        },
        {
          id: 'venture-capital',
          courseId: 'course-47-economics-finance',
          lessonNumber: '47.11',
          title: 'Venture Capital',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Startup funding'
        },
        {
          id: 'cryptocurrency-blockchain',
          courseId: 'course-47-economics-finance',
          lessonNumber: '47.12',
          title: 'Cryptocurrency & Blockchain',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Digital assets'
        },
        {
          id: 'international-trade',
          courseId: 'course-47-economics-finance',
          lessonNumber: '47.13',
          title: 'International Trade',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Global commerce'
        }
      ]
    },
    {
      id: 'course-48-diplomacy-relations',
      level: 'B2',
      courseNumber: 48,
      title: 'Diplomacy & International Relations',
      description: 'Navigate diplomatic discourse and global politics',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'diplomatic-protocol',
          courseId: 'course-48-diplomacy-relations',
          lessonNumber: '48.1',
          title: 'Diplomatic Protocol',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Formal procedures'
        },
        {
          id: 'treaty-negotiation',
          courseId: 'course-48-diplomacy-relations',
          lessonNumber: '48.2',
          title: 'Treaty Negotiation',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'International agreements'
        },
        {
          id: 'un-vocabulary',
          courseId: 'course-48-diplomacy-relations',
          lessonNumber: '48.3',
          title: 'United Nations Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'UN system'
        },
        {
          id: 'geopolitics-vocab',
          courseId: 'course-48-diplomacy-relations',
          lessonNumber: '48.4',
          title: 'Geopolitics Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Global power dynamics'
        },
        {
          id: 'conflict-resolution-intl',
          courseId: 'course-48-diplomacy-relations',
          lessonNumber: '48.5',
          title: 'International Conflict Resolution',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Peacemaking'
        },
        {
          id: 'human-rights-vocab',
          courseId: 'course-48-diplomacy-relations',
          lessonNumber: '48.6',
          title: 'Human Rights Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Universal rights'
        },
        {
          id: 'humanitarian-aid',
          courseId: 'course-48-diplomacy-relations',
          lessonNumber: '48.7',
          title: 'Humanitarian Aid',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Relief operations'
        },
        {
          id: 'sanctions-embargoes',
          courseId: 'course-48-diplomacy-relations',
          lessonNumber: '48.8',
          title: 'Sanctions & Embargoes',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Economic pressure'
        },
        {
          id: 'asylum-refugees',
          courseId: 'course-48-diplomacy-relations',
          lessonNumber: '48.9',
          title: 'Asylum & Refugees',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Migration issues'
        },
        {
          id: 'regional-organizations',
          courseId: 'course-48-diplomacy-relations',
          lessonNumber: '48.10',
          title: 'Regional Organizations',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Multilateral bodies'
        },
        {
          id: 'middle-east-politics',
          courseId: 'course-48-diplomacy-relations',
          lessonNumber: '48.11',
          title: 'Middle East Politics',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Regional dynamics'
        },
        {
          id: 'security-council',
          courseId: 'course-48-diplomacy-relations',
          lessonNumber: '48.12',
          title: 'Security Council Procedures',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Peace & security'
        },
        {
          id: 'diplomatic-immunity',
          courseId: 'course-48-diplomacy-relations',
          lessonNumber: '48.13',
          title: 'Diplomatic Immunity',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Legal protections'
        }
      ]
    },
    {
      id: 'course-49-israeli-society-culture',
      level: 'B2',
      courseNumber: 49,
      title: 'Israeli Society & Culture',
      description: 'Understanding contemporary Israeli society and cultural dynamics',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'military-service-culture',
          courseId: 'course-49-israeli-society-culture',
          lessonNumber: '49.1',
          title: 'Military Service Culture',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Civic obligation'
        },
        {
          id: 'service-experience',
          courseId: 'course-49-israeli-society-culture',
          lessonNumber: '49.2',
          title: 'Service Experience Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Soldier life'
        },
        {
          id: 'reserve-duty-culture',
          courseId: 'course-49-israeli-society-culture',
          lessonNumber: '49.3',
          title: 'Reserve Duty Culture',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Miluim experiences'
        },
        {
          id: 'multicultural-israel',
          courseId: 'course-49-israeli-society-culture',
          lessonNumber: '49.4',
          title: 'Multicultural Israel',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Diverse communities'
        },
        {
          id: 'religious-secular',
          courseId: 'course-49-israeli-society-culture',
          lessonNumber: '49.5',
          title: 'Religious-Secular Dynamics',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Social divisions'
        },
        {
          id: 'kibbutz-moshav',
          courseId: 'course-49-israeli-society-culture',
          lessonNumber: '49.6',
          title: 'Kibbutz & Moshav Life',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Collective living'
        },
        {
          id: 'urban-rural',
          courseId: 'course-49-israeli-society-culture',
          lessonNumber: '49.7',
          title: 'Urban & Rural Life',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Geographic differences'
        },
        {
          id: 'youth-culture',
          courseId: 'course-49-israeli-society-culture',
          lessonNumber: '49.8',
          title: 'Israeli Youth Culture',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Young generations'
        },
        {
          id: 'volunteer-activism',
          courseId: 'course-49-israeli-society-culture',
          lessonNumber: '49.9',
          title: 'Volunteering & Activism',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Social engagement'
        },
        {
          id: 'commemorations-holidays',
          courseId: 'course-49-israeli-society-culture',
          lessonNumber: '49.10',
          title: 'National Commemorations',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Memorial days'
        },
        {
          id: 'celebrations-independence',
          courseId: 'course-49-israeli-society-culture',
          lessonNumber: '49.11',
          title: 'National Celebrations',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Independence Day culture'
        },
        {
          id: 'social-solidarity',
          courseId: 'course-49-israeli-society-culture',
          lessonNumber: '49.12',
          title: 'Social Solidarity',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Community bonds'
        },
        {
          id: 'immigrant-integration',
          courseId: 'course-49-israeli-society-culture',
          lessonNumber: '49.13',
          title: 'Immigrant Integration',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Aliyah experiences'
        }
      ]
    },
    {
      id: 'course-50-environmental-policy',
      level: 'B2',
      courseNumber: 50,
      title: 'Environmental Policy & Sustainability',
      description: 'Address environmental challenges with advanced vocabulary',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'climate-policy',
          courseId: 'course-50-environmental-policy',
          lessonNumber: '50.1',
          title: 'Climate Policy',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Government action'
        },
        {
          id: 'carbon-emissions',
          courseId: 'course-50-environmental-policy',
          lessonNumber: '50.2',
          title: 'Carbon Emissions Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Greenhouse gases'
        },
        {
          id: 'renewable-energy',
          courseId: 'course-50-environmental-policy',
          lessonNumber: '50.3',
          title: 'Renewable Energy',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Clean power'
        },
        {
          id: 'conservation-biology',
          courseId: 'course-50-environmental-policy',
          lessonNumber: '50.4',
          title: 'Conservation Biology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Species protection'
        },
        {
          id: 'biodiversity-vocab',
          courseId: 'course-50-environmental-policy',
          lessonNumber: '50.5',
          title: 'Biodiversity Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Ecosystem diversity'
        },
        {
          id: 'waste-management',
          courseId: 'course-50-environmental-policy',
          lessonNumber: '50.6',
          title: 'Waste Management',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Recycling & disposal'
        },
        {
          id: 'water-resources',
          courseId: 'course-50-environmental-policy',
          lessonNumber: '50.7',
          title: 'Water Resources',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Water conservation'
        },
        {
          id: 'sustainable-agriculture',
          courseId: 'course-50-environmental-policy',
          lessonNumber: '50.8',
          title: 'Sustainable Agriculture',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Farming practices'
        },
        {
          id: 'urban-planning-green',
          courseId: 'course-50-environmental-policy',
          lessonNumber: '50.9',
          title: 'Green Urban Planning',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Sustainable cities'
        },
        {
          id: 'environmental-law',
          courseId: 'course-50-environmental-policy',
          lessonNumber: '50.10',
          title: 'Environmental Law',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Legal frameworks'
        },
        {
          id: 'pollution-control',
          courseId: 'course-50-environmental-policy',
          lessonNumber: '50.11',
          title: 'Pollution Control',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Environmental protection'
        },
        {
          id: 'circular-economy',
          courseId: 'course-50-environmental-policy',
          lessonNumber: '50.12',
          title: 'Circular Economy',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Resource efficiency'
        },
        {
          id: 'green-technology',
          courseId: 'course-50-environmental-policy',
          lessonNumber: '50.13',
          title: 'Green Technology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Clean innovation'
        }
      ]
    },
    {
      id: 'course-51-sociology-anthropology',
      level: 'B2',
      courseNumber: 51,
      title: 'Sociology & Anthropology',
      description: 'Analyze human societies and cultural phenomena',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'social-theory',
          courseId: 'course-51-sociology-anthropology',
          lessonNumber: '51.1',
          title: 'Social Theory Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Theoretical frameworks'
        },
        {
          id: 'social-stratification',
          courseId: 'course-51-sociology-anthropology',
          lessonNumber: '51.2',
          title: 'Social Stratification',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Class & inequality'
        },
        {
          id: 'cultural-analysis',
          courseId: 'course-51-sociology-anthropology',
          lessonNumber: '51.3',
          title: 'Cultural Analysis',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Cultural patterns'
        },
        {
          id: 'ethnography-methods',
          courseId: 'course-51-sociology-anthropology',
          lessonNumber: '51.4',
          title: 'Ethnographic Methods',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Fieldwork techniques'
        },
        {
          id: 'kinship-systems',
          courseId: 'course-51-sociology-anthropology',
          lessonNumber: '51.5',
          title: 'Kinship Systems',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Family structures'
        },
        {
          id: 'ritual-ceremony',
          courseId: 'course-51-sociology-anthropology',
          lessonNumber: '51.6',
          title: 'Ritual & Ceremony',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Cultural practices'
        },
        {
          id: 'social-movements',
          courseId: 'course-51-sociology-anthropology',
          lessonNumber: '51.7',
          title: 'Social Movements',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Collective action'
        },
        {
          id: 'urbanization-vocab',
          courseId: 'course-51-sociology-anthropology',
          lessonNumber: '51.8',
          title: 'Urbanization Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'City development'
        },
        {
          id: 'globalization-culture',
          courseId: 'course-51-sociology-anthropology',
          lessonNumber: '51.9',
          title: 'Globalization & Culture',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Cultural exchange'
        },
        {
          id: 'identity-formation',
          courseId: 'course-51-sociology-anthropology',
          lessonNumber: '51.10',
          title: 'Identity Formation',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Self & society'
        },
        {
          id: 'deviance-crime',
          courseId: 'course-51-sociology-anthropology',
          lessonNumber: '51.11',
          title: 'Deviance & Crime',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Social norms'
        },
        {
          id: 'religion-society',
          courseId: 'course-51-sociology-anthropology',
          lessonNumber: '51.12',
          title: 'Religion & Society',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Sacred & secular'
        },
        {
          id: 'social-change',
          courseId: 'course-51-sociology-anthropology',
          lessonNumber: '51.13',
          title: 'Social Change Processes',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Transformation'
        }
      ]
    },
    {
      id: 'course-52-psychology-cognition',
      level: 'B2',
      courseNumber: 52,
      title: 'Psychology & Cognition',
      description: 'Explore the human mind and behavior scientifically',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'cognitive-psychology',
          courseId: 'course-52-psychology-cognition',
          lessonNumber: '52.1',
          title: 'Cognitive Psychology Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Mental processes'
        },
        {
          id: 'developmental-psych',
          courseId: 'course-52-psychology-cognition',
          lessonNumber: '52.2',
          title: 'Developmental Psychology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Lifespan development'
        },
        {
          id: 'behavioral-psychology',
          courseId: 'course-52-psychology-cognition',
          lessonNumber: '52.3',
          title: 'Behavioral Psychology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Learning & conditioning'
        },
        {
          id: 'personality-theory',
          courseId: 'course-52-psychology-cognition',
          lessonNumber: '52.4',
          title: 'Personality Theory',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Individual differences'
        },
        {
          id: 'abnormal-psychology',
          courseId: 'course-52-psychology-cognition',
          lessonNumber: '52.5',
          title: 'Abnormal Psychology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Mental disorders'
        },
        {
          id: 'therapeutic-approaches',
          courseId: 'course-52-psychology-cognition',
          lessonNumber: '52.6',
          title: 'Therapeutic Approaches',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Treatment methods'
        },
        {
          id: 'social-psychology',
          courseId: 'course-52-psychology-cognition',
          lessonNumber: '52.7',
          title: 'Social Psychology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Group influence'
        },
        {
          id: 'neuropsychology',
          courseId: 'course-52-psychology-cognition',
          lessonNumber: '52.8',
          title: 'Neuropsychology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Brain & behavior'
        },
        {
          id: 'memory-learning',
          courseId: 'course-52-psychology-cognition',
          lessonNumber: '52.9',
          title: 'Memory & Learning',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Cognitive processes'
        },
        {
          id: 'perception-attention',
          courseId: 'course-52-psychology-cognition',
          lessonNumber: '52.10',
          title: 'Perception & Attention',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Sensory processing'
        },
        {
          id: 'emotion-motivation',
          courseId: 'course-52-psychology-cognition',
          lessonNumber: '52.11',
          title: 'Emotion & Motivation',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Drives & feelings'
        },
        {
          id: 'decision-making',
          courseId: 'course-52-psychology-cognition',
          lessonNumber: '52.12',
          title: 'Decision Making',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Choice processes'
        },
        {
          id: 'consciousness-vocab',
          courseId: 'course-52-psychology-cognition',
          lessonNumber: '52.13',
          title: 'Consciousness Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Awareness states'
        }
      ]
    },
    {
      id: 'course-53-education-pedagogy',
      level: 'B2',
      courseNumber: 53,
      title: 'Education & Pedagogy',
      description: 'Master educational theory and teaching methodology',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'learning-theories',
          courseId: 'course-53-education-pedagogy',
          lessonNumber: '53.1',
          title: 'Learning Theories',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Educational psychology'
        },
        {
          id: 'curriculum-design',
          courseId: 'course-53-education-pedagogy',
          lessonNumber: '53.2',
          title: 'Curriculum Design',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Course planning'
        },
        {
          id: 'assessment-evaluation',
          courseId: 'course-53-education-pedagogy',
          lessonNumber: '53.3',
          title: 'Assessment & Evaluation',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Measuring learning'
        },
        {
          id: 'differentiated-instruction',
          courseId: 'course-53-education-pedagogy',
          lessonNumber: '53.4',
          title: 'Differentiated Instruction',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Personalized learning'
        },
        {
          id: 'special-education',
          courseId: 'course-53-education-pedagogy',
          lessonNumber: '53.5',
          title: 'Special Education',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Learning disabilities'
        },
        {
          id: 'classroom-management',
          courseId: 'course-53-education-pedagogy',
          lessonNumber: '53.6',
          title: 'Classroom Management',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Behavior strategies'
        },
        {
          id: 'educational-technology',
          courseId: 'course-53-education-pedagogy',
          lessonNumber: '53.7',
          title: 'Educational Technology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Digital learning'
        },
        {
          id: 'literacy-development',
          courseId: 'course-53-education-pedagogy',
          lessonNumber: '53.8',
          title: 'Literacy Development',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Reading & writing'
        },
        {
          id: 'numeracy-skills',
          courseId: 'course-53-education-pedagogy',
          lessonNumber: '53.9',
          title: 'Numeracy Skills',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Mathematical thinking'
        },
        {
          id: 'bilingual-education',
          courseId: 'course-53-education-pedagogy',
          lessonNumber: '53.10',
          title: 'Bilingual Education',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Language instruction'
        },
        {
          id: 'higher-education',
          courseId: 'course-53-education-pedagogy',
          lessonNumber: '53.11',
          title: 'Higher Education Systems',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'University structure'
        },
        {
          id: 'adult-learning',
          courseId: 'course-53-education-pedagogy',
          lessonNumber: '53.12',
          title: 'Adult Learning',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Continuing education'
        },
        {
          id: 'educational-policy',
          courseId: 'course-53-education-pedagogy',
          lessonNumber: '53.13',
          title: 'Educational Policy',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'System reform'
        }
      ]
    },
    {
      id: 'course-54-architecture-design',
      level: 'B2',
      courseNumber: 54,
      title: 'Architecture & Design',
      description: 'Discuss built environments and design principles',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'architectural-styles',
          courseId: 'course-54-architecture-design',
          lessonNumber: '54.1',
          title: 'Architectural Styles',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Historical periods'
        },
        {
          id: 'structural-engineering',
          courseId: 'course-54-architecture-design',
          lessonNumber: '54.2',
          title: 'Structural Engineering',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Building systems'
        },
        {
          id: 'sustainable-design',
          courseId: 'course-54-architecture-design',
          lessonNumber: '54.3',
          title: 'Sustainable Design',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Green building'
        },
        {
          id: 'interior-design',
          courseId: 'course-54-architecture-design',
          lessonNumber: '54.4',
          title: 'Interior Design',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Space planning'
        },
        {
          id: 'landscape-architecture',
          courseId: 'course-54-architecture-design',
          lessonNumber: '54.5',
          title: 'Landscape Architecture',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Outdoor spaces'
        },
        {
          id: 'industrial-design',
          courseId: 'course-54-architecture-design',
          lessonNumber: '54.6',
          title: 'Industrial Design',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Product design'
        },
        {
          id: 'graphic-design',
          courseId: 'course-54-architecture-design',
          lessonNumber: '54.7',
          title: 'Graphic Design',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Visual communication'
        },
        {
          id: 'ux-ui-design',
          courseId: 'course-54-architecture-design',
          lessonNumber: '54.8',
          title: 'UX/UI Design',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Digital interfaces'
        },
        {
          id: 'typography-vocab',
          courseId: 'course-54-architecture-design',
          lessonNumber: '54.9',
          title: 'Typography Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Font & layout'
        },
        {
          id: 'color-theory',
          courseId: 'course-54-architecture-design',
          lessonNumber: '54.10',
          title: 'Color Theory',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Color relationships'
        },
        {
          id: 'materials-construction',
          courseId: 'course-54-architecture-design',
          lessonNumber: '54.11',
          title: 'Construction Materials',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Building components'
        },
        {
          id: 'preservation-restoration',
          courseId: 'course-54-architecture-design',
          lessonNumber: '54.12',
          title: 'Preservation & Restoration',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Historic conservation'
        },
        {
          id: 'parametric-design',
          courseId: 'course-54-architecture-design',
          lessonNumber: '54.13',
          title: 'Parametric Design',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Computational design'
        }
      ]
    },
    {
      id: 'course-55-culinary-gastronomy',
      level: 'B2',
      courseNumber: 55,
      title: 'Culinary Arts & Gastronomy',
      description: 'Master sophisticated food and cooking vocabulary',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'cooking-techniques',
          courseId: 'course-55-culinary-gastronomy',
          lessonNumber: '55.1',
          title: 'Advanced Cooking Techniques',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Culinary methods'
        },
        {
          id: 'knife-skills-vocab',
          courseId: 'course-55-culinary-gastronomy',
          lessonNumber: '55.2',
          title: 'Knife Skills Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Cutting techniques'
        },
        {
          id: 'flavor-profiles',
          courseId: 'course-55-culinary-gastronomy',
          lessonNumber: '55.3',
          title: 'Flavor Profiles',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Taste combinations'
        },
        {
          id: 'wine-pairing',
          courseId: 'course-55-culinary-gastronomy',
          lessonNumber: '55.4',
          title: 'Wine Pairing',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Wine terminology'
        },
        {
          id: 'molecular-gastronomy',
          courseId: 'course-55-culinary-gastronomy',
          lessonNumber: '55.5',
          title: 'Molecular Gastronomy',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Scientific cooking'
        },
        {
          id: 'pastry-baking',
          courseId: 'course-55-culinary-gastronomy',
          lessonNumber: '55.6',
          title: 'Pastry & Baking',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Dessert techniques'
        },
        {
          id: 'middle-eastern-cuisine',
          courseId: 'course-55-culinary-gastronomy',
          lessonNumber: '55.7',
          title: 'Middle Eastern Cuisine',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Regional specialties'
        },
        {
          id: 'israeli-food-culture',
          courseId: 'course-55-culinary-gastronomy',
          lessonNumber: '55.8',
          title: 'Israeli Food Culture',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Local gastronomy'
        },
        {
          id: 'kosher-cooking',
          courseId: 'course-55-culinary-gastronomy',
          lessonNumber: '55.9',
          title: 'Kosher Cooking',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Dietary laws'
        },
        {
          id: 'restaurant-management',
          courseId: 'course-55-culinary-gastronomy',
          lessonNumber: '55.10',
          title: 'Restaurant Management',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Food service'
        },
        {
          id: 'food-safety',
          courseId: 'course-55-culinary-gastronomy',
          lessonNumber: '55.11',
          title: 'Food Safety Standards',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Hygiene protocols'
        },
        {
          id: 'menu-planning',
          courseId: 'course-55-culinary-gastronomy',
          lessonNumber: '55.12',
          title: 'Menu Planning',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Course design'
        },
        {
          id: 'food-presentation',
          courseId: 'course-55-culinary-gastronomy',
          lessonNumber: '55.13',
          title: 'Food Presentation',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Plating techniques'
        }
      ]
    },
    {
      id: 'course-56-sports-athletics',
      level: 'B2',
      courseNumber: 56,
      title: 'Sports & Athletics',
      description: 'Discuss sports with advanced technical vocabulary',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'team-sports-vocab',
          courseId: 'course-56-sports-athletics',
          lessonNumber: '56.1',
          title: 'Team Sports Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Collective games'
        },
        {
          id: 'individual-sports',
          courseId: 'course-56-sports-athletics',
          lessonNumber: '56.2',
          title: 'Individual Sports',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Solo athletics'
        },
        {
          id: 'olympic-sports',
          courseId: 'course-56-sports-athletics',
          lessonNumber: '56.3',
          title: 'Olympic Sports',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'International competition'
        },
        {
          id: 'sports-medicine',
          courseId: 'course-56-sports-athletics',
          lessonNumber: '56.4',
          title: 'Sports Medicine',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Athletic injuries'
        },
        {
          id: 'training-methodology',
          courseId: 'course-56-sports-athletics',
          lessonNumber: '56.5',
          title: 'Training Methodology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Conditioning programs'
        },
        {
          id: 'nutrition-athletes',
          courseId: 'course-56-sports-athletics',
          lessonNumber: '56.6',
          title: 'Athletic Nutrition',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Performance diet'
        },
        {
          id: 'sports-psychology',
          courseId: 'course-56-sports-athletics',
          lessonNumber: '56.7',
          title: 'Sports Psychology',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Mental preparation'
        },
        {
          id: 'coaching-techniques',
          courseId: 'course-56-sports-athletics',
          lessonNumber: '56.8',
          title: 'Coaching Techniques',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Team leadership'
        },
        {
          id: 'sports-equipment',
          courseId: 'course-56-sports-athletics',
          lessonNumber: '56.9',
          title: 'Sports Equipment',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Gear & technology'
        },
        {
          id: 'referee-officiating',
          courseId: 'course-56-sports-athletics',
          lessonNumber: '56.10',
          title: 'Refereeing & Officiating',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Rules enforcement'
        },
        {
          id: 'sports-broadcasting',
          courseId: 'course-56-sports-athletics',
          lessonNumber: '56.11',
          title: 'Sports Broadcasting',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Commentary language'
        },
        {
          id: 'doping-ethics',
          courseId: 'course-56-sports-athletics',
          lessonNumber: '56.12',
          title: 'Doping & Ethics',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Fair play'
        },
        {
          id: 'extreme-sports',
          courseId: 'course-56-sports-athletics',
          lessonNumber: '56.13',
          title: 'Extreme Sports',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Adventure athletics'
        }
      ]
    },
    {
      id: 'course-57-music-theory',
      level: 'B2',
      courseNumber: 57,
      title: 'Music Theory & Performance',
      description: 'Master musical terminology and concepts',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'music-notation',
          courseId: 'course-57-music-theory',
          lessonNumber: '57.1',
          title: 'Music Notation',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Reading music'
        },
        {
          id: 'harmony-theory',
          courseId: 'course-57-music-theory',
          lessonNumber: '57.2',
          title: 'Harmony Theory',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Chord progressions'
        },
        {
          id: 'rhythm-meter',
          courseId: 'course-57-music-theory',
          lessonNumber: '57.3',
          title: 'Rhythm & Meter',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Timing structures'
        },
        {
          id: 'scales-modes',
          courseId: 'course-57-music-theory',
          lessonNumber: '57.4',
          title: 'Scales & Modes',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Tonal systems'
        },
        {
          id: 'composition-techniques',
          courseId: 'course-57-music-theory',
          lessonNumber: '57.5',
          title: 'Composition Techniques',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Writing music'
        },
        {
          id: 'orchestration-vocab',
          courseId: 'course-57-music-theory',
          lessonNumber: '57.6',
          title: 'Orchestration Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Instrument arrangement'
        },
        {
          id: 'conducting-basics',
          courseId: 'course-57-music-theory',
          lessonNumber: '57.7',
          title: 'Conducting Basics',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Leading ensembles'
        },
        {
          id: 'vocal-technique',
          courseId: 'course-57-music-theory',
          lessonNumber: '57.8',
          title: 'Vocal Technique',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Singing methods'
        },
        {
          id: 'music-history-vocab',
          courseId: 'course-57-music-theory',
          lessonNumber: '57.9',
          title: 'Music History Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Historical periods'
        },
        {
          id: 'jazz-improvisation',
          courseId: 'course-57-music-theory',
          lessonNumber: '57.10',
          title: 'Jazz & Improvisation',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Spontaneous creation'
        },
        {
          id: 'electronic-music',
          courseId: 'course-57-music-theory',
          lessonNumber: '57.11',
          title: 'Electronic Music Production',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Digital synthesis'
        },
        {
          id: 'music-criticism',
          courseId: 'course-57-music-theory',
          lessonNumber: '57.12',
          title: 'Music Criticism',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Analytical listening'
        },
        {
          id: 'world-music',
          courseId: 'course-57-music-theory',
          lessonNumber: '57.13',
          title: 'World Music Traditions',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Global styles'
        }
      ]
    },
    {
      id: 'course-58-creative-writing',
      level: 'B2',
      courseNumber: 58,
      title: 'Creative Writing in Hebrew',
      description: 'Craft original works in various literary forms',
      totalLessons: 13,
      totalWords: 104,
      lessons: [
        {
          id: 'fiction-writing',
          courseId: 'course-58-creative-writing',
          lessonNumber: '58.1',
          title: 'Fiction Writing Techniques',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Story crafting'
        },
        {
          id: 'dialogue-writing',
          courseId: 'course-58-creative-writing',
          lessonNumber: '58.2',
          title: 'Writing Dialogue',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Conversational prose'
        },
        {
          id: 'descriptive-writing',
          courseId: 'course-58-creative-writing',
          lessonNumber: '58.3',
          title: 'Descriptive Writing',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Sensory details'
        },
        {
          id: 'poetry-composition',
          courseId: 'course-58-creative-writing',
          lessonNumber: '58.4',
          title: 'Poetry Composition',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Verse writing'
        },
        {
          id: 'memoir-writing',
          courseId: 'course-58-creative-writing',
          lessonNumber: '58.5',
          title: 'Memoir Writing',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Personal narrative'
        },
        {
          id: 'screenplay-basics',
          courseId: 'course-58-creative-writing',
          lessonNumber: '58.6',
          title: 'Screenplay Basics',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Script format'
        },
        {
          id: 'playwriting',
          courseId: 'course-58-creative-writing',
          lessonNumber: '58.7',
          title: 'Playwriting',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Theatrical composition'
        },
        {
          id: 'flash-fiction',
          courseId: 'course-58-creative-writing',
          lessonNumber: '58.8',
          title: 'Flash Fiction',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Very short stories'
        },
        {
          id: 'literary-devices',
          courseId: 'course-58-creative-writing',
          lessonNumber: '58.9',
          title: 'Advanced Literary Devices',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Rhetorical techniques'
        },
        {
          id: 'revision-editing',
          courseId: 'course-58-creative-writing',
          lessonNumber: '58.10',
          title: 'Revision & Editing',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Refining work'
        },
        {
          id: 'publishing-vocab',
          courseId: 'course-58-creative-writing',
          lessonNumber: '58.11',
          title: 'Publishing Vocabulary',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Literary market'
        },
        {
          id: 'workshop-critique',
          courseId: 'course-58-creative-writing',
          lessonNumber: '58.12',
          title: 'Workshop & Critique',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Giving feedback'
        },
        {
          id: 'genre-fiction',
          courseId: 'course-58-creative-writing',
          lessonNumber: '58.13',
          title: 'Genre Fiction',
          duration: '15 min',
          vocabularyCount: 8,
          theme: 'Mystery, sci-fi, fantasy'
        }
      ]
    }
  ]
}
