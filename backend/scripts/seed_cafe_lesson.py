"""
Seed script to create the cafe lesson in the database.
This can be run directly without prisma generate.
"""

import asyncio
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.core.database import prisma
from dotenv import load_dotenv

load_dotenv()

async def main():
    await prisma.connect()

    try:
        # Create a course for the cafe lesson
        course = await prisma.course.upsert(
            where={"id": "a1-daily-interactions"},
            data={
                "create": {
                    "id": "a1-daily-interactions",
                    "title": "Daily Interactions",
                    "description": "Learn to navigate everyday situations in Hebrew",
                    "level": "A1",
                    "order": 3,
                    "estimatedHours": 4,
                    "isLocked": False,
                },
                "update": {
                    "title": "Daily Interactions",
                    "description": "Learn to navigate everyday situations in Hebrew",
                }
            }
        )
        print(f"✓ Course created/updated: {course.title}")

        # Create the cafe lesson with vocabulary from the frontend
        vocabulary = [
            {"hebrew": "קָפֶה", "transliteration": "kafé", "english": "coffee"},
            {"hebrew": "מַיִם", "transliteration": "mayim", "english": "water"},
            {"hebrew": "תֵּה", "transliteration": "te", "english": "tea"},
            {"hebrew": "בְּבַקָּשָׁה", "transliteration": "bevakasha", "english": "please"},
            {"hebrew": "תּוֹדָה", "transliteration": "toda", "english": "thank you"},
            {"hebrew": "סְלִיחָה", "transliteration": "slicha", "english": "excuse me / sorry"},
            {"hebrew": "אֲנִי רוֹצֶה", "transliteration": "ani rotze (m) / ani rotza (f)", "english": "I want"},
            {"hebrew": "כֵּן", "transliteration": "ken", "english": "yes"},
            {"hebrew": "לֹא", "transliteration": "lo", "english": "no"},
        ]

        lesson = await prisma.lesson.upsert(
            where={"id": "cafe-1"},
            data={
                "create": {
                    "id": "cafe-1",
                    "courseId": course.id,
                    "title": "At the Café",
                    "description": "Learn how to order drinks and use polite expressions",
                    "level": "A1",
                    "order": 1,
                    "duration": 18,
                    "objectives": [
                        "Order drinks and food",
                        "Use basic politeness expressions",
                        "Make simple requests"
                    ],
                    "tags": ["cafe", "food", "politeness", "daily-life"],
                    "difficulty": "beginner",
                    "content": {
                        "intro": "In this lesson, you'll learn essential phrases for ordering at a café in Israel.",
                        "notes": "Hebrew cafés are central to Israeli culture. Practice these phrases to feel confident!"
                    },
                    "vocabulary": vocabulary,
                    "grammar": {
                        "points": [
                            "Using 'אני רוצה' (I want) for basic requests",
                            "Politeness with 'בבקשה' and 'תודה'"
                        ]
                    },
                    "exercises": [],
                },
                "update": {
                    "title": "At the Café",
                    "description": "Learn how to order drinks and use polite expressions",
                    "vocabulary": vocabulary,
                }
            }
        )
        print(f"✓ Lesson created/updated: {lesson.title} (ID: {lesson.id})")
        print(f"  - {len(vocabulary)} vocabulary items")
        print(f"  - Level: {lesson.level}")
        print(f"  - Duration: {lesson.duration} minutes")

    except Exception as e:
        print(f"✗ Error: {e}")
        raise
    finally:
        await prisma.disconnect()

if __name__ == "__main__":
    asyncio.run(main())
