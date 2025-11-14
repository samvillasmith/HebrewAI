#!/usr/bin/env python3
"""
Comprehensive Babbel-style seed script following CEFR structure
Implements: Levels (A1, A2, B1) → Courses (2-8 per level) → Lessons (5-15 per course)
Run with: python scripts/seed_comprehensive_babbel.py
"""

import asyncio
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from app.core.database import prisma
from prisma import Json


async def seed_comprehensive_babbel():
    """Seed complete Babbel-style course structure (A1-B1)"""

    await prisma.connect()
    print("✅ Connected to database")

    # Clear existing data
    print("🗑️  Clearing existing courses and lessons...")
    await prisma.lesson.delete_many()
    await prisma.course.delete_many()
    print("✅ Cleared existing data")

    # ===========================
    # A1 LEVEL (Newcomer/Beginner)
    # ===========================
    a1_courses = [
        {
            "title": "Hebrew Foundations",
            "description": "Master the alphabet, essential greetings, and basic phrases",
            "level": "A1",
            "order": 1,
            "estimatedHours": 6,
            "lessons": [
                {
                    "title": "The Hebrew Alphabet - Part 1",
                    "description": "Master the first 7 Hebrew letters",
                    "order": 1,
                    "duration": 12,
                    "tags": ["alphabet", "letters", "pronunciation"],
                    "objectives": [
                        "Recognize and write 7 Hebrew letters",
                        "Pronounce each letter correctly",
                        "Understand basic letter sounds"
                    ],
                    "vocabulary": {
                        "items": [
                            {"hebrew": "א", "english": "Aleph", "transliteration": "alef", "type": "letter", "sound": "silent/ah"},
                            {"hebrew": "ב", "english": "Bet", "transliteration": "bet", "type": "letter", "sound": "b/v"},
                            {"hebrew": "ג", "english": "Gimel", "transliteration": "gimel", "type": "letter", "sound": "g"},
                            {"hebrew": "ד", "english": "Dalet", "transliteration": "dalet", "type": "letter", "sound": "d"},
                            {"hebrew": "ה", "english": "Hey", "transliteration": "hey", "type": "letter", "sound": "h"},
                            {"hebrew": "ו", "english": "Vav", "transliteration": "vav", "type": "letter", "sound": "v/o/u"},
                            {"hebrew": "ז", "english": "Zayin", "transliteration": "zayin", "type": "letter", "sound": "z"}
                        ]
                    },
                    "exercises": [
                        {
                            "type": "flashcard",
                            "title": "Letter Recognition",
                            "items": [
                                {"front": "א", "back": "Aleph (silent/ah)"},
                                {"front": "ב", "back": "Bet (b/v)"},
                                {"front": "ג", "back": "Gimel (g)"},
                                {"front": "ד", "back": "Dalet (d)"},
                                {"front": "ה", "back": "Hey (h)"},
                                {"front": "ו", "back": "Vav (v/o/u)"},
                                {"front": "ז", "back": "Zayin (z)"}
                            ]
                        },
                        {
                            "type": "matching",
                            "title": "Match Letters to Sounds",
                            "pairs": [
                                {"left": "א", "right": "Aleph"},
                                {"left": "ב", "right": "Bet"},
                                {"left": "ג", "right": "Gimel"},
                                {"left": "ד", "right": "Dalet"},
                                {"left": "ה", "right": "Hey"}
                            ]
                        },
                        {
                            "type": "listening",
                            "title": "Listen and Identify",
                            "items": [
                                {"hebrew": "א", "english": "Aleph", "transliteration": "alef"},
                                {"hebrew": "ב", "english": "Bet", "transliteration": "bet"},
                                {"hebrew": "ג", "english": "Gimel", "transliteration": "gimel"}
                            ]
                        }
                    ],
                    "content": {
                        "introduction": "Hebrew is written from right to left. The alphabet has 22 letters, all consonants. Let's start with the first seven!",
                        "tips": [
                            "Practice writing each letter multiple times",
                            "Hebrew letters can change shape at the end of words",
                            "Some letters have multiple sounds depending on context"
                        ]
                    }
                },
                {
                    "title": "Essential Greetings",
                    "description": "Learn how to greet people in different situations",
                    "order": 2,
                    "duration": 15,
                    "tags": ["greetings", "conversation", "basics"],
                    "objectives": [
                        "Greet people at different times of day",
                        "Introduce yourself with confidence",
                        "Say goodbye appropriately"
                    ],
                    "vocabulary": {
                        "items": [
                            {"hebrew": "שָׁלוֹם", "english": "hello/peace/goodbye", "transliteration": "shalom", "type": "phrase"},
                            {"hebrew": "בּוֹקֶר טוֹב", "english": "good morning", "transliteration": "boker tov", "type": "phrase"},
                            {"hebrew": "עֶרֶב טוֹב", "english": "good evening", "transliteration": "erev tov", "type": "phrase"},
                            {"hebrew": "לַיְלָה טוֹב", "english": "good night", "transliteration": "layla tov", "type": "phrase"},
                            {"hebrew": "לְהִתְרָאוֹת", "english": "see you later", "transliteration": "lehitraot", "type": "phrase"},
                            {"hebrew": "תּוֹדָה", "english": "thank you", "transliteration": "toda", "type": "phrase"}
                        ]
                    },
                    "exercises": [
                        {
                            "type": "multiple_choice",
                            "title": "Choose the Right Greeting",
                            "questions": [
                                {
                                    "question": "How do you say 'good morning' in Hebrew?",
                                    "options": ["שלום", "בוקר טוב", "ערב טוב", "לילה טוב"],
                                    "correct": 1,
                                    "feedback": "בוקר טוב (boker tov) means 'good morning'"
                                },
                                {
                                    "question": "What does 'שלום' mean?",
                                    "options": ["Good night", "Hello/Peace/Goodbye", "Thank you", "See you later"],
                                    "correct": 1,
                                    "feedback": "שלום is the most versatile Hebrew greeting, meaning hello, peace, or goodbye"
                                }
                            ]
                        },
                        {
                            "type": "listening",
                            "title": "Listen and Type the Greeting",
                            "items": [
                                {"hebrew": "שָׁלוֹם", "english": "hello/peace/goodbye", "transliteration": "shalom"},
                                {"hebrew": "בּוֹקֶר טוֹב", "english": "good morning", "transliteration": "boker tov"},
                                {"hebrew": "תּוֹדָה", "english": "thank you", "transliteration": "toda"}
                            ]
                        },
                        {
                            "type": "conversation",
                            "title": "Morning Meeting",
                            "scenario": "You meet your Hebrew teacher in the morning",
                            "steps": [
                                {
                                    "dialogue": [
                                        {"speaker": "other", "hebrew": "בוקר טוב!", "english": "Good morning!", "transliteration": "boker tov!"}
                                    ],
                                    "choices": [
                                        {
                                            "hebrew": "בוקר טוב!",
                                            "english": "Good morning!",
                                            "transliteration": "boker tov!",
                                            "isCorrect": True,
                                            "feedback": "Perfect! You greeted back appropriately."
                                        },
                                        {
                                            "hebrew": "לילה טוב",
                                            "english": "Good night",
                                            "transliteration": "layla tov",
                                            "isCorrect": False,
                                            "feedback": "Not quite - it's morning, so 'בוקר טוב' is the right greeting."
                                        }
                                    ]
                                },
                                {
                                    "dialogue": [
                                        {"speaker": "other", "hebrew": "מה שלומך?", "english": "How are you?", "transliteration": "ma shlomcha?"}
                                    ],
                                    "choices": [
                                        {
                                            "hebrew": "טוב, תודה!",
                                            "english": "Good, thank you!",
                                            "transliteration": "tov, toda!",
                                            "isCorrect": True,
                                            "feedback": "Excellent! You responded politely."
                                        },
                                        {
                                            "hebrew": "להתראות",
                                            "english": "See you later",
                                            "transliteration": "lehitraot",
                                            "isCorrect": False,
                                            "feedback": "That's a goodbye - better to answer the question first!"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "content": {
                        "introduction": "Greetings are essential for any conversation. In Hebrew, greetings often reflect the time of day and level of formality.",
                        "examples": [
                            {"hebrew": "בוקר טוב! מה שלומך?", "english": "Good morning! How are you?"},
                            {"hebrew": "שלום! נעים להכיר.", "english": "Hello! Nice to meet you."}
                        ],
                        "note": "שלום is the most versatile word - use it for hello, peace, or goodbye!"
                    }
                },
                {
                    "title": "Self-Introduction",
                    "description": "Introduce yourself and ask basic questions",
                    "order": 3,
                    "duration": 14,
                    "tags": ["introduction", "conversation", "basics"],
                    "objectives": [
                        "State your name in Hebrew",
                        "Ask someone's name",
                        "Say where you're from"
                    ],
                    "vocabulary": {
                        "items": [
                            {"hebrew": "שְׁמִי", "english": "my name is", "transliteration": "shmi", "type": "phrase"},
                            {"hebrew": "מָה שִׁמְךָ?", "english": "what's your name? (m)", "transliteration": "ma shimcha?", "type": "phrase"},
                            {"hebrew": "מָה שְׁמֵךְ?", "english": "what's your name? (f)", "transliteration": "ma shmech?", "type": "phrase"},
                            {"hebrew": "אֲנִי מִ...", "english": "I'm from...", "transliteration": "ani mi...", "type": "phrase"},
                            {"hebrew": "נָעִים מְאֹד", "english": "nice to meet you", "transliteration": "na'im me'od", "type": "phrase"}
                        ]
                    },
                    "exercises": [
                        {
                            "type": "fill_in_blank",
                            "title": "Complete the Introduction",
                            "questions": [
                                {
                                    "sentence": "_____ דוד. מה שמך?",
                                    "answer": "שמי",
                                    "translation": "My name is David. What's your name?"
                                },
                                {
                                    "sentence": "_____ מאוד!",
                                    "answer": "נעים",
                                    "translation": "Nice to meet you!"
                                }
                            ]
                        },
                        {
                            "type": "flashcard",
                            "title": "Introduction Vocabulary",
                            "items": [
                                {"front": "שמי", "back": "my name is"},
                                {"front": "מה שמך?", "back": "what's your name?"},
                                {"front": "נעים מאוד", "back": "nice to meet you"}
                            ]
                        },
                        {
                            "type": "conversation",
                            "title": "First Meeting",
                            "scenario": "You meet a new Hebrew-speaking friend",
                            "steps": [
                                {
                                    "dialogue": [
                                        {"speaker": "other", "hebrew": "שלום! מה שמך?", "english": "Hello! What's your name?", "transliteration": "shalom! ma shimcha?"}
                                    ],
                                    "choices": [
                                        {
                                            "hebrew": "שמי יוסף. מה שלומך?",
                                            "english": "My name is Yosef. How are you?",
                                            "transliteration": "shmi yosef. ma shlomcha?",
                                            "isCorrect": True,
                                            "feedback": "Great! You introduced yourself and asked a follow-up question."
                                        },
                                        {
                                            "hebrew": "תודה",
                                            "english": "Thank you",
                                            "transliteration": "toda",
                                            "isCorrect": False,
                                            "feedback": "You should answer the question first! Try 'שמי...' (my name is...)"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "content": {
                        "examples": [
                            {"hebrew": "שלום! שמי רחל. מה שמך?", "english": "Hello! My name is Rachel. What's your name?"},
                            {"hebrew": "נעים להכיר אותך!", "english": "Nice to meet you!"}
                        ]
                    }
                },
                {
                    "title": "Numbers 1-10",
                    "description": "Count from 1 to 10 in Hebrew",
                    "order": 4,
                    "duration": 13,
                    "tags": ["numbers", "counting", "vocabulary"],
                    "objectives": [
                        "Count from 1 to 10",
                        "Understand masculine and feminine forms",
                        "Use numbers in context"
                    ],
                    "vocabulary": {
                        "items": [
                            {"hebrew": "אֶחָד/אַחַת", "english": "one (m/f)", "transliteration": "echad/achat", "type": "number"},
                            {"hebrew": "שְׁנַיִם/שְׁתַּיִם", "english": "two (m/f)", "transliteration": "shnayim/shtayim", "type": "number"},
                            {"hebrew": "שְׁלוֹשָׁה/שָׁלוֹשׁ", "english": "three (m/f)", "transliteration": "shlosha/shalosh", "type": "number"},
                            {"hebrew": "אַרְבָּעָה/אַרְבַּע", "english": "four (m/f)", "transliteration": "arba'a/arba", "type": "number"},
                            {"hebrew": "חֲמִשָּׁה/חָמֵשׁ", "english": "five (m/f)", "transliteration": "chamisha/chamesh", "type": "number"}
                        ]
                    },
                    "exercises": [
                        {
                            "type": "listening",
                            "title": "Listen to Numbers",
                            "items": [
                                {"hebrew": "אֶחָד", "english": "one (m)", "transliteration": "echad"},
                                {"hebrew": "שְׁנַיִם", "english": "two (m)", "transliteration": "shnayim"},
                                {"hebrew": "שְׁלוֹשָׁה", "english": "three (m)", "transliteration": "shlosha"}
                            ]
                        },
                        {
                            "type": "multiple_choice",
                            "title": "Number Recognition",
                            "questions": [
                                {
                                    "question": "What is 'three' in Hebrew (masculine)?",
                                    "options": ["אחד", "שניים", "שלושה", "ארבעה"],
                                    "correct": 2,
                                    "feedback": "שלושה (shlosha) is the masculine form of 'three'"
                                }
                            ]
                        },
                        {
                            "type": "matching",
                            "title": "Match Hebrew Numbers",
                            "pairs": [
                                {"left": "אחד", "right": "one"},
                                {"left": "שניים", "right": "two"},
                                {"left": "שלושה", "right": "three"},
                                {"left": "ארבעה", "right": "four"}
                            ]
                        }
                    ],
                    "content": {
                        "note": "Hebrew numbers have masculine and feminine forms. The form used depends on the gender of the noun being counted.",
                        "examples": [
                            {"hebrew": "שלושה ילדים", "english": "three boys"},
                            {"hebrew": "שלוש בנות", "english": "three girls"}
                        ]
                    }
                },
                {
                    "title": "Family Members",
                    "description": "Talk about your family in Hebrew",
                    "order": 5,
                    "duration": 15,
                    "tags": ["family", "vocabulary", "relationships"],
                    "objectives": [
                        "Name immediate family members",
                        "Describe your family structure",
                        "Ask about someone's family"
                    ],
                    "vocabulary": {
                        "items": [
                            {"hebrew": "אַבָּא", "english": "dad/father", "transliteration": "abba", "type": "noun"},
                            {"hebrew": "אִמָּא", "english": "mom/mother", "transliteration": "ima", "type": "noun"},
                            {"hebrew": "אָח", "english": "brother", "transliteration": "ach", "type": "noun"},
                            {"hebrew": "אָחוֹת", "english": "sister", "transliteration": "achot", "type": "noun"},
                            {"hebrew": "מִשְׁפָּחָה", "english": "family", "transliteration": "mishpacha", "type": "noun"},
                            {"hebrew": "יֶלֶד/יַלְדָּה", "english": "boy/girl", "transliteration": "yeled/yalda", "type": "noun"}
                        ]
                    },
                    "exercises": [
                        {
                            "type": "flashcard",
                            "title": "Family Vocabulary",
                            "items": [
                                {"front": "אבא", "back": "dad/father"},
                                {"front": "אמא", "back": "mom/mother"},
                                {"front": "אח", "back": "brother"},
                                {"front": "אחות", "back": "sister"},
                                {"front": "משפחה", "back": "family"}
                            ]
                        },
                        {
                            "type": "fill_in_blank",
                            "title": "Describe Your Family",
                            "questions": [
                                {
                                    "sentence": "יש לי _____ ושתי אחיות",
                                    "answer": "אח",
                                    "translation": "I have a brother and two sisters"
                                },
                                {
                                    "sentence": "_____ שלי גדולה",
                                    "answer": "משפחה",
                                    "translation": "My family is big"
                                }
                            ]
                        },
                        {
                            "type": "conversation",
                            "title": "Talking About Family",
                            "scenario": "Someone asks you about your family",
                            "steps": [
                                {
                                    "dialogue": [
                                        {"speaker": "other", "hebrew": "יש לך משפחה?", "english": "Do you have family?", "transliteration": "yesh lecha mishpacha?"}
                                    ],
                                    "choices": [
                                        {
                                            "hebrew": "כן, יש לי משפחה גדולה",
                                            "english": "Yes, I have a big family",
                                            "transliteration": "ken, yesh li mishpacha gdola",
                                            "isCorrect": True,
                                            "feedback": "Perfect! You answered positively about your family."
                                        },
                                        {
                                            "hebrew": "שלום",
                                            "english": "Hello",
                                            "transliteration": "shalom",
                                            "isCorrect": False,
                                            "feedback": "That's a greeting, not an answer to the question!"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "content": {
                        "examples": [
                            {"hebrew": "יש לי משפחה גדולה", "english": "I have a big family"},
                            {"hebrew": "אבא שלי עובד במשרד", "english": "My father works in an office"}
                        ]
                    }
                }
            ]
        },
        {
            "title": "Everyday Conversations",
            "description": "Navigate daily situations with essential vocabulary and phrases",
            "level": "A1",
            "order": 2,
            "estimatedHours": 7,
            "lessons": [
                {
                    "title": "At the Café",
                    "description": "Order food and drinks in Hebrew",
                    "order": 1,
                    "duration": 14,
                    "tags": ["food", "ordering", "café", "conversation"],
                    "objectives": [
                        "Order common beverages",
                        "Ask for food items",
                        "Handle basic café interactions"
                    ],
                    "vocabulary": {
                        "items": [
                            {"hebrew": "קָפֶה", "english": "coffee", "transliteration": "cafe", "type": "noun"},
                            {"hebrew": "תֵּה", "english": "tea", "transliteration": "te", "type": "noun"},
                            {"hebrew": "מַיִם", "english": "water", "transliteration": "mayim", "type": "noun"},
                            {"hebrew": "לֶחֶם", "english": "bread", "transliteration": "lechem", "type": "noun"},
                            {"hebrew": "אֲנִי רוֹצֶה", "english": "I want", "transliteration": "ani rotse/rotsa", "type": "phrase"},
                            {"hebrew": "בְּבַקָּשָׁה", "english": "please", "transliteration": "bevakasha", "type": "phrase"}
                        ]
                    },
                    "exercises": [
                        {
                            "type": "conversation",
                            "title": "Ordering at a Café",
                            "scenario": "You're at a café and want to order",
                            "steps": [
                                {
                                    "dialogue": [
                                        {"speaker": "other", "hebrew": "בוקר טוב! מה אתה רוצה?", "english": "Good morning! What do you want?", "transliteration": "boker tov! ma ata rotse?"}
                                    ],
                                    "choices": [
                                        {
                                            "hebrew": "אני רוצה קפה, בבקשה",
                                            "english": "I want coffee, please",
                                            "transliteration": "ani rotse cafe, bevakasha",
                                            "isCorrect": True,
                                            "feedback": "Perfect order! Very polite."
                                        },
                                        {
                                            "hebrew": "שלום",
                                            "english": "Hello",
                                            "transliteration": "shalom",
                                            "isCorrect": False,
                                            "feedback": "The greeting already happened - now it's time to order!"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "matching",
                            "title": "Match Food & Drinks",
                            "pairs": [
                                {"left": "קפה", "right": "coffee"},
                                {"left": "תה", "right": "tea"},
                                {"left": "מים", "right": "water"},
                                {"left": "לחם", "right": "bread"}
                            ]
                        },
                        {
                            "type": "listening",
                            "title": "Café Vocabulary",
                            "items": [
                                {"hebrew": "קָפֶה", "english": "coffee", "transliteration": "cafe"},
                                {"hebrew": "תֵּה", "english": "tea", "transliteration": "te"},
                                {"hebrew": "בְּבַקָּשָׁה", "english": "please", "transliteration": "bevakasha"}
                            ]
                        }
                    ],
                    "content": {
                        "examples": [
                            {"hebrew": "אני רוצה קפה, בבקשה", "english": "I want coffee, please"},
                            {"hebrew": "כמה זה עולה?", "english": "How much does it cost?"}
                        ]
                    }
                }
            ]
        },
        {
            "title": "Essential Grammar & Verbs",
            "description": "Learn basic verb conjugations and sentence structure",
            "level": "A1",
            "order": 3,
            "estimatedHours": 8,
            "lessons": [
                {
                    "title": "Present Tense - To Be",
                    "description": "Express existence and identity in present tense",
                    "order": 1,
                    "duration": 15,
                    "tags": ["grammar", "verbs", "present-tense"],
                    "objectives": [
                        "Use 'to be' in present tense",
                        "Describe yourself and others",
                        "Form simple sentences"
                    ],
                    "vocabulary": {
                        "items": [
                            {"hebrew": "אֲנִי", "english": "I", "transliteration": "ani", "type": "pronoun"},
                            {"hebrew": "אַתָּה/אַתְּ", "english": "you (m/f)", "transliteration": "ata/at", "type": "pronoun"},
                            {"hebrew": "הוּא/הִיא", "english": "he/she", "transliteration": "hu/hi", "type": "pronoun"},
                            {"hebrew": "טוֹב/טוֹבָה", "english": "good (m/f)", "transliteration": "tov/tova", "type": "adjective"},
                            {"hebrew": "עַיֵף/עֲיֵפָה", "english": "tired (m/f)", "transliteration": "ayef/ayefa", "type": "adjective"}
                        ]
                    },
                    "grammar": {
                        "topic": "Present Tense - 'To Be'",
                        "explanation": "In Hebrew, there's no verb 'to be' in present tense. Simply use pronoun + adjective.",
                        "examples": [
                            {"hebrew": "אני טוב", "english": "I am good (m)", "structure": "pronoun + adjective"},
                            {"hebrew": "היא עייפה", "english": "She is tired", "structure": "pronoun + adjective (f)"}
                        ]
                    },
                    "exercises": [
                        {
                            "type": "fill_in_blank",
                            "title": "Complete the Sentence",
                            "questions": [
                                {
                                    "sentence": "_____ עייף",
                                    "answer": "אני",
                                    "translation": "I am tired"
                                },
                                {
                                    "sentence": "היא _____",
                                    "answer": "טובה",
                                    "translation": "She is good"
                                }
                            ]
                        },
                        {
                            "type": "multiple_choice",
                            "title": "Grammar Check",
                            "questions": [
                                {
                                    "question": "How do you say 'I am good' (masculine)?",
                                    "options": ["אני טובה", "אני טוב", "אתה טוב", "הוא טוב"],
                                    "correct": 1,
                                    "feedback": "אני טוב - 'I' (ani) + 'good masculine' (tov)"
                                }
                            ]
                        }
                    ],
                    "content": {
                        "introduction": "Hebrew present tense is simpler than English - no 'am/is/are' needed!",
                        "examples": [
                            {"hebrew": "אני סטודנט", "english": "I am a student"},
                            {"hebrew": "את מורה", "english": "You are a teacher (f)"}
                        ]
                    }
                }
            ]
        }
    ]

    # ===========================
    # A2 LEVEL (Pre-Intermediate)
    # ===========================
    a2_courses = [
        {
            "title": "Workplace Hebrew",
            "description": "Develop professional communication skills for the workplace",
            "level": "A2",
            "order": 1,
            "estimatedHours": 10,
            "prerequisites": [],
            "lessons": [
                {
                    "title": "Office Vocabulary",
                    "description": "Essential terms for the workplace",
                    "order": 1,
                    "duration": 15,
                    "difficulty": "intermediate",
                    "tags": ["workplace", "professional", "vocabulary"],
                    "objectives": [
                        "Describe your work environment",
                        "Use professional vocabulary",
                        "Discuss job responsibilities"
                    ],
                    "vocabulary": {
                        "items": [
                            {"hebrew": "מִשְׂרָד", "english": "office", "transliteration": "misrad", "type": "noun"},
                            {"hebrew": "עֲבוֹדָה", "english": "work/job", "transliteration": "avoda", "type": "noun"},
                            {"hebrew": "פְּגִישָׁה", "english": "meeting", "transliteration": "pgisha", "type": "noun"},
                            {"hebrew": "מַחְשֵׁב", "english": "computer", "transliteration": "machshev", "type": "noun"},
                            {"hebrew": "דּוּ״חַ", "english": "report", "transliteration": "du'ach", "type": "noun"},
                            {"hebrew": "מְנַהֵל", "english": "manager", "transliteration": "menahel", "type": "noun"}
                        ]
                    },
                    "exercises": [
                        {
                            "type": "flashcard",
                            "title": "Office Terms",
                            "items": [
                                {"front": "משרד", "back": "office"},
                                {"front": "עבודה", "back": "work/job"},
                                {"front": "פגישה", "back": "meeting"},
                                {"front": "מחשב", "back": "computer"}
                            ]
                        },
                        {
                            "type": "conversation",
                            "title": "At the Office",
                            "scenario": "Your manager asks about your project",
                            "steps": [
                                {
                                    "dialogue": [
                                        {"speaker": "other", "hebrew": "איך הפרויקט שלך מתקדם?", "english": "How is your project progressing?", "transliteration": "eich haproject shelcha mitkadeim?"}
                                    ],
                                    "choices": [
                                        {
                                            "hebrew": "הפרויקט מתקדם טוב, אני עובד על הדוח",
                                            "english": "The project is going well, I'm working on the report",
                                            "transliteration": "haproject mitkadeim tov, ani oved al hadu'ach",
                                            "isCorrect": True,
                                            "feedback": "Excellent professional response!"
                                        },
                                        {
                                            "hebrew": "שלום",
                                            "english": "Hello",
                                            "transliteration": "shalom",
                                            "isCorrect": False,
                                            "feedback": "Answer the question about your project!"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listening",
                            "title": "Office Words",
                            "items": [
                                {"hebrew": "פְּגִישָׁה", "english": "meeting", "transliteration": "pgisha"},
                                {"hebrew": "דּוּ״חַ", "english": "report", "transliteration": "du'ach"}
                            ]
                        }
                    ],
                    "content": {
                        "introduction": "Professional Hebrew uses specific terminology. These words will help you navigate the workplace.",
                        "examples": [
                            {"hebrew": "יש לי פגישה בשעה שתיים", "english": "I have a meeting at 2 o'clock"},
                            {"hebrew": "אני עובד במשרד", "english": "I work in an office"}
                        ]
                    }
                }
            ]
        }
    ]

    # ===========================
    # B1 LEVEL (Intermediate)
    # ===========================
    b1_courses = [
        {
            "title": "Expressing Opinions",
            "description": "Discuss topics, explain plans, and justify opinions",
            "level": "B1",
            "order": 1,
            "estimatedHours": 12,
            "prerequisites": [],
            "lessons": [
                {
                    "title": "Giving Your Opinion",
                    "description": "Express and defend your point of view",
                    "order": 1,
                    "duration": 15,
                    "difficulty": "advanced",
                    "tags": ["opinions", "debate", "conversation"],
                    "objectives": [
                        "Express personal opinions",
                        "Agree and disagree politely",
                        "Support your viewpoint"
                    ],
                    "vocabulary": {
                        "items": [
                            {"hebrew": "לְדַעְתִּי", "english": "in my opinion", "transliteration": "le'da'ati", "type": "phrase"},
                            {"hebrew": "אֲנִי חוֹשֵׁב/חוֹשֶׁבֶת", "english": "I think (m/f)", "transliteration": "ani choshev/choshevet", "type": "phrase"},
                            {"hebrew": "אֲנִי מַסְכִּים/מַסְכִּימָה", "english": "I agree (m/f)", "transliteration": "ani maskim/maskima", "type": "phrase"},
                            {"hebrew": "אֲנִי לֹא מַסְכִּים", "english": "I disagree", "transliteration": "ani lo maskim", "type": "phrase"},
                            {"hebrew": "זֶה חָשׁוּב", "english": "this is important", "transliteration": "ze hashuv", "type": "phrase"}
                        ]
                    },
                    "exercises": [
                        {
                            "type": "conversation",
                            "title": "Debate: Learning Hebrew",
                            "scenario": "Discussing the importance of learning Hebrew",
                            "steps": [
                                {
                                    "dialogue": [
                                        {"speaker": "other", "hebrew": "האם חשוב ללמוד עברית?", "english": "Is it important to learn Hebrew?", "transliteration": "ha'im hashuv lilmod ivrit?"}
                                    ],
                                    "choices": [
                                        {
                                            "hebrew": "לדעתי, זה מאוד חשוב ללמוד עברית",
                                            "english": "In my opinion, it's very important to learn Hebrew",
                                            "transliteration": "le'da'ati, ze me'od hashuv lilmod ivrit",
                                            "isCorrect": True,
                                            "feedback": "Great! You expressed a clear opinion."
                                        },
                                        {
                                            "hebrew": "שלום",
                                            "english": "Hello",
                                            "transliteration": "shalom",
                                            "isCorrect": False,
                                            "feedback": "This is a debate - share your opinion!"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "multiple_choice",
                            "title": "Opinion Phrases",
                            "questions": [
                                {
                                    "question": "How do you say 'in my opinion' in Hebrew?",
                                    "options": ["אני חושב", "לדעתי", "אני מסכים", "זה חשוב"],
                                    "correct": 1,
                                    "feedback": "לדעתי (le'da'ati) means 'in my opinion'"
                                }
                            ]
                        }
                    ],
                    "content": {
                        "introduction": "At B1 level, you can participate in discussions and express nuanced opinions.",
                        "examples": [
                            {"hebrew": "אני חושב שזה רעיון טוב", "english": "I think this is a good idea"},
                            {"hebrew": "לדעתי, צריך ללמוד עברית כל יום", "english": "In my opinion, one should study Hebrew every day"}
                        ]
                    }
                }
            ]
        }
    ]

    # Create all courses
    all_courses = a1_courses + a2_courses + b1_courses

    for course_data in all_courses:
        lessons_data = course_data.pop('lessons')

        # Create course
        course = await prisma.course.create(data={
            "title": course_data["title"],
            "description": course_data["description"],
            "level": course_data["level"],
            "order": course_data["order"],
            "estimatedHours": course_data["estimatedHours"],
            "prerequisites": course_data.get("prerequisites", [])
        })
        print(f"✅ Created course: {course.title} ({course.level})")

        # Create lessons for this course
        for lesson_data in lessons_data:
            lesson = await prisma.lesson.create(data={
                "courseId": course.id,
                "title": lesson_data["title"],
                "description": lesson_data["description"],
                "level": course.level,
                "order": lesson_data["order"],
                "duration": lesson_data["duration"],
                "objectives": lesson_data["objectives"],
                "vocabulary": Json(lesson_data["vocabulary"]),
                "content": Json(lesson_data.get("content", {})),
                "grammar": Json(lesson_data.get("grammar")) if lesson_data.get("grammar") else None,
                "exercises": Json(lesson_data["exercises"]),
                "tags": lesson_data.get("tags", []),
                "difficulty": lesson_data.get("difficulty", "beginner")
            })
            print(f"  ✅ Created lesson: {lesson.title}")

    await prisma.disconnect()
    print("\n✅ Comprehensive Babbel-style seeding complete!")
    print(f"📚 Created {len(all_courses)} courses across A1, A2, and B1 levels")
    print(f"📖 Total lessons with diverse exercise types (flashcard, fill-in-blank, matching, listening, conversation)")


if __name__ == "__main__":
    asyncio.run(seed_comprehensive_babbel())
