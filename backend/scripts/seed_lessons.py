#!/usr/bin/env python3
"""
Seed script to populate the database with initial Hebrew lessons
Run with: python scripts/seed_lessons.py
"""

import asyncio
import sys
import json
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from app.core.database import prisma
from prisma import Json


async def seed_lessons():
    """Seed initial lessons for A1, A2, and B1 levels"""
    
    await prisma.connect()
    print("✅ Connected to database")

    # A1 Level Lessons (Beginner)
    a1_lessons = [
        {
            "title": "Hebrew Alphabet: Aleph to Mem",
            "description": "Learn the first 13 letters of the Hebrew alphabet with pronunciation",
            "level": "A1",
            "order": 1,
            "objectives": [
                "Recognize and write the first 13 Hebrew letters",
                "Pronounce each letter correctly",
                "Understand the concept of Hebrew script"
            ],
            "vocabulary": {
                "letters": [
                    {"hebrew": "א", "name": "Aleph", "sound": "silent/ah"},
                    {"hebrew": "ב", "name": "Bet", "sound": "b/v"},
                    {"hebrew": "ג", "name": "Gimel", "sound": "g"},
                    {"hebrew": "ד", "name": "Dalet", "sound": "d"},
                    {"hebrew": "ה", "name": "Hey", "sound": "h"},
                    {"hebrew": "ו", "name": "Vav", "sound": "v/o/u"},
                    {"hebrew": "ז", "name": "Zayin", "sound": "z"},
                    {"hebrew": "ח", "name": "Chet", "sound": "ch"},
                    {"hebrew": "ט", "name": "Tet", "sound": "t"},
                    {"hebrew": "י", "name": "Yod", "sound": "y"},
                    {"hebrew": "כ", "name": "Kaf", "sound": "k/kh"},
                    {"hebrew": "ל", "name": "Lamed", "sound": "l"},
                    {"hebrew": "מ", "name": "Mem", "sound": "m"}
                ]
            },
            "content": {
                "introduction": "Welcome to Hebrew! The Hebrew alphabet (Aleph-Bet) has 22 letters, all consonants.",
                "sections": []
            }
        },
        {
            "title": "Basic Greetings and Introductions",
            "description": "Learn essential Hebrew greetings and how to introduce yourself",
            "level": "A1",
            "order": 2,
            "objectives": [
                "Greet people in Hebrew",
                "Introduce yourself",
                "Ask and answer basic questions"
            ],
            "vocabulary": {
                "words": [
                    {"hebrew": "שָׁלוֹם", "english": "hello/peace", "transliteration": "shalom"},
                    {"hebrew": "בּוֹקֶר טוֹב", "english": "good morning", "transliteration": "boker tov"},
                    {"hebrew": "עֶרֶב טוֹב", "english": "good evening", "transliteration": "erev tov"},
                    {"hebrew": "לַיְלָה טוֹב", "english": "good night", "transliteration": "laila tov"},
                    {"hebrew": "תּוֹדָה", "english": "thank you", "transliteration": "toda"},
                    {"hebrew": "בְּבַקָּשָׁה", "english": "please/you're welcome", "transliteration": "bevakasha"},
                    {"hebrew": "סְלִיחָה", "english": "excuse me/sorry", "transliteration": "slicha"},
                    {"hebrew": "כֵּן", "english": "yes", "transliteration": "ken"},
                    {"hebrew": "לֹא", "english": "no", "transliteration": "lo"},
                    {"hebrew": "מָה שְׁמֶךָ?", "english": "what's your name?", "transliteration": "ma shimcha?"}
                ]
            },
            "content": {
                "examples": [
                    {"hebrew": "שָׁלוֹם! מָה שְׁמֶךָ?", "english": "Hello! What's your name?"},
                    {"hebrew": "שְׁמִי דָּוִד. נָעִים מְאֹד.", "english": "My name is David. Nice to meet you."}
                ]
            }
        },
        {
            "title": "Numbers 1-20",
            "description": "Count from 1 to 20 in Hebrew",
            "level": "A1",
            "order": 3,
            "objectives": [
                "Count from 1 to 20",
                "Use numbers in basic sentences",
                "Understand masculine and feminine number forms"
            ],
            "vocabulary": {
                "numbers": [
                    {"hebrew": "אֶחָד/אַחַת", "english": "one (m/f)", "transliteration": "echad/achat"},
                    {"hebrew": "שְׁנַיִם/שְׁתַּיִם", "english": "two (m/f)", "transliteration": "shnayim/shtayim"},
                    {"hebrew": "שְׁלוֹשָׁה/שָׁלוֹשׁ", "english": "three (m/f)", "transliteration": "shlosha/shalosh"},
                    {"hebrew": "אַרְבָּעָה/אַרְבַּע", "english": "four (m/f)", "transliteration": "arba'a/arba"},
                    {"hebrew": "חֲמִשָּׁה/חָמֵשׁ", "english": "five (m/f)", "transliteration": "chamisha/chamesh"}
                ]
            },
            "content": {
                "note": "Hebrew numbers have masculine and feminine forms. The form used depends on the gender of the noun being counted."
            }
        }
    ]

    # A2 Level Lessons (Elementary)
    a2_lessons = [
        {
            "title": "Family Members",
            "description": "Vocabulary and conversations about family",
            "level": "A2",
            "order": 4,
            "objectives": [
                "Name family members in Hebrew",
                "Describe your family",
                "Discuss family relationships"
            ],
            "vocabulary": {
                "words": [
                    {"hebrew": "מִשְׁפָּחָה", "english": "family", "transliteration": "mishpacha"},
                    {"hebrew": "אָב/אַבָּא", "english": "father/dad", "transliteration": "av/abba"},
                    {"hebrew": "אֵם/אִמָּא", "english": "mother/mom", "transliteration": "em/ima"},
                    {"hebrew": "אָח", "english": "brother", "transliteration": "ach"},
                    {"hebrew": "אָחוֹת", "english": "sister", "transliteration": "achot"},
                    {"hebrew": "בֵּן", "english": "son", "transliteration": "ben"},
                    {"hebrew": "בַּת", "english": "daughter", "transliteration": "bat"}
                ]
            },
            "content": {}
        }
    ]

    # B1 Level Lessons (Intermediate)
    b1_lessons = [
        {
            "title": "Expressing Opinions and Preferences",
            "description": "Advanced conversation skills for sharing thoughts",
            "level": "B1",
            "order": 5,
            "objectives": [
                "Express personal opinions",
                "Agree and disagree politely",
                "Justify your preferences"
            ],
            "vocabulary": {
                "words": [
                    {"hebrew": "לְדַעְתִּי", "english": "in my opinion", "transliteration": "le'da'ati"},
                    {"hebrew": "אֲנִי חוֹשֵׁב/חוֹשֶׁבֶת", "english": "I think (m/f)", "transliteration": "ani choshev/choshevet"},
                    {"hebrew": "אֲנִי מַסְכִּים/מַסְכִּימָה", "english": "I agree (m/f)", "transliteration": "ani maskim/maskima"}
                ]
            },
            "content": {}
        }
    ]

    all_lessons = a1_lessons + a2_lessons + b1_lessons

    # Insert lessons
    for lesson_data in all_lessons:
        try:
            # Convert vocabulary and content to Json type
            lesson_data['vocabulary'] = Json(lesson_data['vocabulary'])
            lesson_data['content'] = Json(lesson_data['content'])
            if 'grammar' in lesson_data:
                lesson_data['grammar'] = Json(lesson_data['grammar'])

            lesson = await prisma.lesson.create(data=lesson_data)
            print(f"✅ Created lesson: {lesson.title}")
        except Exception as e:
            print(f"❌ Error creating lesson {lesson_data['title']}: {e}")

    await prisma.disconnect()
    print("\n✅ Seeding complete!")
    print(f"📚 Created {len(all_lessons)} lessons")


if __name__ == "__main__":
    asyncio.run(seed_lessons())
