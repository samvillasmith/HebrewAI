#!/usr/bin/env python3
"""
Comprehensive Babbel-style seeding using raw SQL to bypass Prisma cache issues
"""
import asyncio
import asyncpg
import json
import os
from dotenv import load_dotenv

load_dotenv()

async def seed_babbel_system():
    # Connect to database
    db_url = os.getenv("DATABASE_URL")
    conn = await asyncpg.connect(db_url)

    print("Connected to database")

    # Clear existing data (in correct order to avoid foreign key errors)
    print("Clearing existing data...")
    await conn.execute('DELETE FROM "ReviewSession"')
    await conn.execute('DELETE FROM "ReviewItem"')
    await conn.execute('DELETE FROM "VocabularyItem"')
    await conn.execute('DELETE FROM "Message"')
    await conn.execute('DELETE FROM "Conversation"')
    await conn.execute('DELETE FROM "LessonProgress"')
    await conn.execute('DELETE FROM "Lesson"')
    await conn.execute('DELETE FROM "Course"')
    print("Cleared existing data")

    print("Creating A1 Level courses...")

    # ========== COURSE 1: HEBREW FOUNDATIONS ==========
    course1_id = await conn.fetchval("""
        INSERT INTO "Course" (id, title, description, level, "order", "estimatedHours", "isLocked", prerequisites, "createdAt", "updatedAt")
        VALUES (
            gen_random_uuid()::text,
            'Hebrew Foundations',
            'Master the alphabet, greetings, and essential phrases',
            'A1',
            1,
            6,
            false,
            '{}',
            NOW(),
            NOW()
        )
        RETURNING id
    """)
    print(f"Created course: Hebrew Foundations ({course1_id})")

    # LESSON 1.1: Hebrew Alphabet - Part 1
    lesson1_exercises = [
        {
            "type": "flashcard",
            "title": "Practice the Letters",
            "items": [
                {
                    "title": "The Hebrew Alphabet - Part 1",
                    "description": "Master the first 11 letters of the Hebrew alphabet",
                    "order": 1,
                    "duration": 15,
                    "objectives": [
                        "Recognize and write 11 Hebrew letters",
                        "Pronounce each letter correctly",
                        "Understand vowel sounds"
                    ],
                    "vocabulary": {
                        "items": [
                            {"hebrew": "א", "english": "Aleph", "transliteration": "alef", "type": "letter", "sound": "silent/ah"},
                            {"hebrew": "ב", "english": "Bet", "transliteration": "bet", "type": "letter", "sound": "b/v"},
                            {"hebrew": "ג", "english": "Gimel", "transliteration": "gimel", "type": "letter", "sound": "g"},
                            {"hebrew": "ד", "english": "Dalet", "transliteration": "dalet", "type": "letter", "sound": "d"},
                            {"hebrew": "ה", "english": "Hey", "transliteration": "hey", "type": "letter", "sound": "h"},
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
                            ]
                        },
                        {
                            "type": "matching",
                            "title": "Match Letters to Sounds",
                            "pairs": [
                                {"left": "א", "right": "silent/ah"},
                                {"left": "ב", "right": "b/v"},
                                {"left": "ג", "right": "g"},
                                {"left": "ד", "right": "d"},
                            ]
                        }
                    ],
                    "content": {
                        "introduction": "Hebrew is written from right to left. The alphabet has 22 letters, all consonants. Let's start with the first few!",
                        "tips": [
                            "Practice writing each letter multiple times",
                            "Hebrew letters change shape at the end of words",
                            "Some letters have two sounds depending on context"
                        ]
                    }
                },
                {
                    "title": "Essential Greetings",
                    "description": "Learn how to greet people and introduce yourself in Hebrew",
                    "order": 2,
                    "duration": 12,
                    "objectives": [
                        "Greet people at different times of day",
                        "Introduce yourself with confidence",
                        "Ask someone's name and respond"
                    ],
                    "vocabulary": {
                        "items": [
                            {"hebrew": "שָׁלוֹם", "english": "hello/peace/goodbye", "transliteration": "shalom", "type": "phrase"},
                            {"hebrew": "בּוֹקֶר טוֹב", "english": "good morning", "transliteration": "boker tov", "type": "phrase"},
                            {"hebrew": "עֶרֶב טוֹב", "english": "good evening", "transliteration": "erev tov", "type": "phrase"},
                            {"hebrew": "מָה שְׁמֶךָ?", "english": "what's your name?", "transliteration": "ma shimcha?", "type": "phrase"},
                            {"hebrew": "שְׁמִי...", "english": "my name is...", "transliteration": "shmi...", "type": "phrase"},
                        ]
                    },
                    "exercises": [
                        {
                            "type": "fill_in_blank",
                            "title": "Complete the Conversation",
                            "questions": [
                                {
                                    "sentence": "_____ ! מה שמך?",
                                    "answer": "שלום",
                                    "translation": "Hello! What's your name?"
                                },
                                {
                                    "sentence": "_____ טוב!",
                                    "answer": "בוקר",
                                    "translation": "Good morning!"
                                }
                            ]
                        },
                        {
                            "type": "listening",
                            "title": "Listen and Repeat",
                            "items": [
                                {"hebrew": "שָׁלוֹם", "english": "hello"},
                                {"hebrew": "בּוֹקֶר טוֹב", "english": "good morning"},
                            ]
                        },
                        {
                            "type": "conversation",
                            "title": "Introduction Practice",
                            "dialogue": [
                                {"speaker": "A", "hebrew": "שלום! מה שמך?", "english": "Hello! What's your name?"},
                                {"speaker": "B", "hebrew": "שמי דוד. ואתה?", "english": "My name is David. And you?"},
                                {"speaker": "A", "hebrew": "שמי שרה. נעים מאוד.", "english": "My name is Sarah. Nice to meet you."}
                            ]
                        }
                    ],
                    "content": {
                        "examples": [
                            {"hebrew": "שלום! מה שמך?", "english": "Hello! What's your name?"},
                            {"hebrew": "שמי דוד.", "english": "My name is David."},
                            {"hebrew": "נעים מאוד!", "english": "Nice to meet you!"}
                        ]
                    }
                },
                {
                    "title": "Numbers 1-10",
                    "description": "Count from 1 to 10 in Hebrew",
                    "order": 3,
                    "duration": 10,
                    "objectives": [
                        "Count from 1 to 10",
                        "Understand masculine and feminine forms",
                        "Use numbers in basic sentences"
                    ],
                    "vocabulary": {
                        "items": [
                            {"hebrew": "אֶחָד/אַחַת", "english": "one (m/f)", "transliteration": "echad/achat", "type": "number"},
                            {"hebrew": "שְׁנַיִם/שְׁתַּיִם", "english": "two (m/f)", "transliteration": "shnayim/shtayim", "type": "number"},
                            {"hebrew": "שְׁלוֹשָׁה/שָׁלוֹשׁ", "english": "three (m/f)", "transliteration": "shlosha/shalosh", "type": "number"},
                            {"hebrew": "אַרְבָּעָה/אַרְבַּע", "english": "four (m/f)", "transliteration": "arba'a/arba", "type": "number"},
                            {"hebrew": "חֲמִשָּׁה/חָמֵשׁ", "english": "five (m/f)", "transliteration": "chamisha/chamesh", "type": "number"},
                        ]
                    },
                    "exercises": [
                        {
                            "type": "multiple_choice",
                            "title": "Number Recognition",
                            "questions": [
                                {
                                    "question": "What is 'three' in Hebrew (masculine)?",
                                    "options": ["אחד", "שניים", "שלושה", "ארבעה"],
                                    "correct": 2,
                                    "feedback": "שלושה (shlosha) is the masculine form of 'three'"
                                },
                                {
                                    "question": "What number is this: חמש?",
                                    "options": ["Three", "Four", "Five", "Six"],
                                    "correct": 2,
                                    "feedback": "חמש (chamesh) is the feminine form of 'five'"
                                }
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
                }
            ]
        },
        {
            "title": "Newcomer Course 2",
            "description": "Expand your vocabulary with family, everyday objects, and time expressions",
            "level": "A1",
            "order": 2,
            "estimatedHours": 6,
            "lessons": [
                {
                    "title": "Family Members",
                    "description": "Learn to talk about your family in Hebrew",
                    "order": 1,
                    "duration": 15,
                    "objectives": [
                        "Name immediate family members",
                        "Describe your family structure",
                        "Ask about someone's family"
                    ],
                    "vocabulary": {
                        "items": [
                            {"hebrew": "אָב/אַבָּא", "english": "father/dad", "transliteration": "av/abba", "type": "noun"},
                            {"hebrew": "אֵם/אִמָּא", "english": "mother/mom", "transliteration": "em/ima", "type": "noun"},
                            {"hebrew": "אָח", "english": "brother", "transliteration": "ach", "type": "noun"},
                            {"hebrew": "אָחוֹת", "english": "sister", "transliteration": "achot", "type": "noun"},
                            {"hebrew": "מִשְׁפָּחָה", "english": "family", "transliteration": "mishpacha", "type": "noun"},
                        ]
                    },
                    "exercises": [
                        {
                            "type": "flashcard",
                            "title": "Family Vocabulary",
                            "items": [
                                {"front": "אבא", "back": "father/dad"},
                                {"front": "אמא", "back": "mother/mom"},
                                {"front": "אח", "back": "brother"},
                                {"front": "אחות", "back": "sister"},
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
                                }
                            ]
                        }
                    ],
                    "content": {
                        "examples": [
                            {"hebrew": "יש לי משפחה גדולה", "english": "I have a big family"},
                            {"hebrew": "אבא שלי עובד", "english": "My father works"}
                        ]
                    }
                }
            ]
        }
    ]

    # Create courses and lessons
    for course_data in a1_courses:
        lessons_data = course_data.pop('lessons')

        # Create course
        course = await prisma.course.create(data={
            "title": course_data["title"],
            "description": course_data["description"],
            "level": course_data["level"],
            "order": course_data["order"],
            "estimatedHours": course_data["estimatedHours"]
        })
        print(f"✅ Created course: {course.title}")

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
                "exercises": Json(lesson_data["exercises"])
            })
            print(f"  ✅ Created lesson: {lesson.title}")

    await prisma.disconnect()
    print("\n✅ Seeding complete!")
    print(f"📚 Created {len(a1_courses)} courses with interactive lessons")


if __name__ == "__main__":
    asyncio.run(seed_babbel_courses())
