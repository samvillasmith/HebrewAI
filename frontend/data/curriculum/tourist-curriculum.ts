import { CurriculumLevel, Course } from '@/types/curriculum'

export const touristCurriculum: CurriculumLevel = {
  level: 'TOURIST',
  title: 'Tourist Survival Hebrew',
  description: 'Essential phrases and cultural guide for visiting Israel - perfect for travelers and tourists',
  totalWords: 150,
  totalLessons: 20,
  courses: [
    {
      id: 'course-tourist-survival',
      level: 'TOURIST',
      courseNumber: 1,
      title: 'Tourist Survival Guide',
      description: 'Essential Hebrew for visiting Israel - emergency phrases, navigation, cultural customs, and travel tips',
      totalLessons: 20,
      totalWords: 150,
      lessons: [
        {
          id: 'emergency-help',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.1',
          title: 'Emergency: Getting Help',
          duration: '8 min',
          vocabularyCount: 7,
          theme: 'Help, police, ambulance',
          objectives: [
            'Learn critical emergency phrases',
            'Know how to ask for help'
          ]
        },
        {
          id: 'lost-found',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.2',
          title: 'I\'m Lost / I Need...',
          duration: '8 min',
          vocabularyCount: 8,
          theme: 'Lost, map, bathroom'
        },
        {
          id: 'directions-basics',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.3',
          title: 'Asking for Directions',
          duration: '8 min',
          vocabularyCount: 7,
          theme: 'Where, how to get there'
        },
        {
          id: 'transport-vocab',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.4',
          title: 'Transportation Essentials',
          duration: '8 min',
          vocabularyCount: 8,
          theme: 'Bus, train, taxi, station'
        },
        {
          id: 'hotel-basics',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.5',
          title: 'Hotel Essentials',
          duration: '8 min',
          vocabularyCount: 7,
          theme: 'Room, key, checkout'
        },
        {
          id: 'restaurant-tourist',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.6',
          title: 'Restaurant Basics',
          duration: '8 min',
          vocabularyCount: 8,
          theme: 'Menu, water, bill'
        },
        {
          id: 'shopping-tourist',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.7',
          title: 'Shopping Phrases',
          duration: '8 min',
          vocabularyCount: 7,
          theme: 'How much, expensive, cheap'
        },
        {
          id: 'payment-money',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.8',
          title: 'Money & Payment',
          duration: '8 min',
          vocabularyCount: 8,
          theme: 'Shekel, credit card, change'
        },
        {
          id: 'medical-tourist',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.9',
          title: 'Medical Emergencies',
          duration: '8 min',
          vocabularyCount: 7,
          theme: 'Doctor, pharmacy, pain'
        },
        {
          id: 'tourist-attractions',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.10',
          title: 'Tourist Sites Vocabulary',
          duration: '8 min',
          vocabularyCount: 8,
          theme: 'Museum, beach, old city'
        },
        {
          id: 'shabbat-intro',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.11',
          title: 'Understanding Shabbat',
          duration: '10 min',
          vocabularyCount: 0,
          theme: 'Cultural guide: Friday night to Saturday night',
          objectives: [
            'Understand Shabbat timing and restrictions',
            'Know what closes and when',
            'Learn proper etiquette in religious areas'
          ],
          grammarNotes: [
            'No language learning - cultural preparation',
            'Shabbat starts Friday sunset, ends Saturday night',
            'Most shops, buses, trains stop in Jewish areas',
            'Plan ahead: buy food, charge phones Friday',
            'Some areas completely shut down, others stay open',
            'Tel Aviv more secular, Jerusalem more religious',
            'Respect: dress modestly in religious neighborhoods',
            'Elevators may run on "Shabbat mode" (stop at every floor)'
          ]
        },
        {
          id: 'cultural-customs',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.12',
          title: 'Cultural Customs Guide',
          duration: '10 min',
          vocabularyCount: 0,
          theme: 'Social etiquette and expectations',
          grammarNotes: [
            'No language learning - cultural preparation',
            'Israelis are direct - not rude, just honest',
            'Bargaining is common in markets (shuk)',
            'Tipping: 10-15% in restaurants',
            'Dress code: modest at religious sites',
            'Security checks are normal everywhere',
            'Always carry ID/passport',
            'Photography: ask permission at religious sites',
            'Handshakes common, but ask in religious areas'
          ]
        },
        {
          id: 'safety-tips',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.13',
          title: 'Staying Safe in Israel',
          duration: '10 min',
          vocabularyCount: 0,
          theme: 'Practical safety guidance',
          grammarNotes: [
            'No language learning - safety preparation',
            'Israel is generally very safe for tourists',
            'Security presence is high - this is normal',
            'Unattended bags trigger evacuations - watch yours',
            'Follow local news and embassy alerts',
            'Download Red Alert app for emergency notifications',
            'Know where bomb shelters are (miklat)',
            'Avoid demonstrations and large gatherings',
            'Stay in well-traveled tourist areas',
            'Register with your embassy',
            'Travel insurance is essential',
            'Emergency numbers: Police 100, Ambulance 101, Fire 102'
          ]
        },
        {
          id: 'regions-overview',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.14',
          title: 'Exploring Israel: Regions',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'North, south, center, desert',
          grammarNotes: [
            'Tel Aviv: beaches, nightlife, secular culture',
            'Jerusalem: history, religion, old city',
            'Haifa: mixed city, Baha\'i gardens, port',
            'Dead Sea: lowest point on earth, floating',
            'Eilat: Red Sea, diving, desert resort',
            'Galilee: nature, Christian sites, hiking',
            'Negev: desert, craters, Bedouin culture',
            'Travel time: whole country drivable in hours'
          ]
        },
        {
          id: 'weather-packing',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.15',
          title: 'Weather & What to Pack',
          duration: '8 min',
          vocabularyCount: 7,
          theme: 'Hot, cold, rain, sun',
          grammarNotes: [
            'Summer (May-Sep): very hot, 85-100°F',
            'Winter (Nov-Mar): mild, 50-65°F, some rain',
            'Pack: sunscreen, hat, sunglasses always',
            'Modest clothing for religious sites',
            'Comfortable walking shoes essential',
            'Light layers for air-conditioned places',
            'Swimsuit for Dead Sea and beaches'
          ]
        },
        {
          id: 'kosher-food',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.16',
          title: 'Understanding Kosher',
          duration: '8 min',
          vocabularyCount: 7,
          theme: 'Kosher, dairy, meat, parve',
          grammarNotes: [
            'Kosher: Jewish dietary laws',
            'Many (not all) restaurants are kosher',
            'No mixing milk and meat',
            'Separate dishes and waiting periods',
            'Kosher symbol: הכשר (hechsher)',
            'Non-kosher food widely available too',
            'Pork and shellfish not in kosher places'
          ]
        },
        {
          id: 'market-shopping',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.17',
          title: 'Shopping at the Shuk',
          duration: '8 min',
          vocabularyCount: 8,
          theme: 'Market, fresh, bargain, taste',
          grammarNotes: [
            'Shuk = outdoor market',
            'Bargaining expected at markets',
            'Start at 50-70% of asking price',
            'Cash often gets better deals',
            'Try before you buy (especially food)',
            'Best markets: Mahane Yehuda (Jerusalem), Carmel (Tel Aviv)',
            'Go early for freshest produce'
          ]
        },
        {
          id: 'tech-connectivity',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.18',
          title: 'Staying Connected',
          duration: '8 min',
          vocabularyCount: 7,
          theme: 'WiFi, SIM card, internet, phone',
          grammarNotes: [
            'Buy local SIM at airport or city',
            'Major carriers: Partner, Cellcom, Pelephone',
            'Tourist SIM plans available',
            'Free WiFi common in cafes, hotels',
            'Download offline maps before arrival',
            'WhatsApp is primary messaging app',
            'Outlets: Type H (same as Palestine), 230V'
          ]
        },
        {
          id: 'religious-sites',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.19',
          title: 'Visiting Religious Sites',
          duration: '8 min',
          vocabularyCount: 8,
          theme: 'Holy, synagogue, church, mosque',
          grammarNotes: [
            'Dress modestly: cover shoulders, knees',
            'Women: bring scarf for head covering',
            'Men: may need to cover head (kippah provided)',
            'Remove shoes at mosques',
            'Quiet and respectful behavior',
            'No photography on Shabbat at Jewish sites',
            'Western Wall: men and women separate sections',
            'Check opening hours - vary by site and day'
          ]
        },
        {
          id: 'final-tips',
          courseId: 'course-tourist-survival',
          lessonNumber: '1.20',
          title: 'Final Travel Tips',
          duration: '10 min',
          vocabularyCount: 8,
          theme: 'Enjoy, relax, explore, experience',
          grammarNotes: [
            'Learn a few Hebrew words - locals appreciate it',
            'English widely spoken in tourist areas',
            'Israeli culture: warm, loud, direct',
            'Don\'t take offense at directness',
            'Ask questions - people are generally helpful',
            'Try local food: hummus, falafel, shakshuka',
            'Stay hydrated - especially in summer',
            'Enjoy the mix of ancient and modern',
            'Three religions, multiple cultures, one country',
            'Take time to absorb the complexity'
          ]
        }
      ]
    }
  ]
}
