"""
Seed script to create lessons in the database with IDs matching the frontend lesson slugs.
This ensures the frontend can call the API with lesson IDs like 'essential-greetings'.
"""

import asyncio
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from prisma import Prisma
from dotenv import load_dotenv

load_dotenv()

async def main():
    db = Prisma()
    await db.connect()

    try:
        # Create a course for these lessons
        course = await db.course.upsert(
            where={"id": "a1-greetings-course"},
            data={
                "create": {
                    "id": "a1-greetings-course",
                    "title": "Greetings & First Words",
                    "description": "Master essential Hebrew greetings and polite expressions",
                    "level": "A1",
                    "order": 2,
                    "estimatedHours": 3,
                    "isLocked": False,
                },
                "update": {
                    "title": "Greetings & First Words",
                    "description": "Master essential Hebrew greetings and polite expressions",
                }
            }
        )
        print(f"[OK] Course created/updated: {course.title}")

        # Define lessons with IDs matching frontend
        lessons = [
            {
                "id": "alef-bet-part-1",
                "title": "The Alef-Bet: Part 1",
                "description": "Learn the first letters of the Hebrew alphabet",
                "level": "A1",
                "order": 1,
                "duration": 15,
                "objectives": [
                    "Recognize the first 5 Hebrew letters",
                    "Understand their sounds",
                    "Practice basic pronunciation"
                ],
                "tags": ["alphabet", "reading", "pronunciation"],
                "difficulty": "beginner",
            },
            {
                "id": "vowels-final-forms",
                "title": "Vowels & Final Forms",
                "description": "Master Hebrew vowels and final letter forms",
                "level": "A1",
                "order": 2,
                "duration": 15,
                "objectives": [
                    "Learn Hebrew vowel marks",
                    "Recognize final letter forms",
                    "Practice reading with vowels"
                ],
                "tags": ["alphabet", "reading", "vowels"],
                "difficulty": "beginner",
            },
            {
                "id": "essential-greetings",
                "title": "Essential Greetings",
                "description": "Learn essential Hebrew greetings for daily life",
                "level": "A1",
                "order": 3,
                "duration": 15,
                "objectives": [
                    "Greet people at different times of day",
                    "Say thank you and please",
                    "Use basic yes/no responses"
                ],
                "tags": ["greetings", "conversation", "basics"],
                "difficulty": "beginner",
            },
            {
                "id": "introductions",
                "title": "Introductions",
                "description": "Introduce yourself and others in Hebrew",
                "level": "A1",
                "order": 4,
                "duration": 15,
                "objectives": [
                    "Introduce yourself",
                    "Ask someone's name",
                    "Say where you're from"
                ],
                "tags": ["introductions", "conversation", "basics"],
                "difficulty": "beginner",
            },
            {
                "id": "polite-expressions",
                "title": "Polite Expressions",
                "description": "Master polite expressions and courtesy phrases",
                "level": "A1",
                "order": 5,
                "duration": 15,
                "objectives": [
                    "Use polite expressions",
                    "Say please and thank you",
                    "Apologize and excuse yourself"
                ],
                "tags": ["politeness", "conversation", "basics"],
                "difficulty": "beginner",
            },
            {
                "id": "cafe-1",
                "title": "At the Café",
                "description": "Order food and drinks at a café in Hebrew",
                "level": "A1",
                "order": 6,
                "duration": 15,
                "objectives": [
                    "Order food and drinks",
                    "Ask for the bill",
                    "Use café vocabulary"
                ],
                "tags": ["food", "conversation", "practical"],
                "difficulty": "beginner",
            },
        ]

        for lesson_data in lessons:
            # Check if lesson exists
            existing = await db.lesson.find_unique(where={"id": lesson_data["id"]})

            if existing:
                # Update existing lesson
                lesson = await db.lesson.update(
                    where={"id": lesson_data["id"]},
                    data={
                        "title": lesson_data["title"],
                        "description": lesson_data["description"],
                        "objectives": lesson_data["objectives"],
                        "tags": lesson_data["tags"],
                    }
                )
            else:
                # Create new lesson
                import json
                lesson = await db.lesson.create(
                    data={
                        "id": lesson_data["id"],
                        "title": lesson_data["title"],
                        "description": lesson_data["description"],
                        "level": lesson_data["level"],
                        "order": lesson_data["order"],
                        "duration": lesson_data["duration"],
                        "objectives": lesson_data["objectives"],
                        "tags": lesson_data["tags"],
                        "difficulty": lesson_data["difficulty"],
                        "course": {"connect": {"id": course.id}},
                        "content": json.dumps({"intro": "Lesson content here"}),
                        "vocabulary": json.dumps([{"hebrew": "placeholder", "english": "placeholder"}]),
                        "exercises": json.dumps([]),
                    }
                )
            print(f"  [OK] Lesson: {lesson.title} (ID: {lesson.id})")

        print("\n[SUCCESS] Database seeded successfully!")
        print(f"Created {len(lessons)} lessons in course '{course.title}'")

    except Exception as e:
        print(f"[ERROR] Error seeding database: {e}")
        raise
    finally:
        await db.disconnect()

if __name__ == "__main__":
    asyncio.run(main())
