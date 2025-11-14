#!/usr/bin/env python3
import asyncio
from prisma import Prisma, Json

async def test_seed():
    db = Prisma()
    await db.connect()
    print("Connected to database")

    # Create a simple course
    course = await db.course.create(
        data={
            "title": "Test Course",
            "description": "A test course",
            "level": "A1",
            "order": 1,
            "estimatedHours": 5,
            "isLocked": False,
            "prerequisites": []
        }
    )
    print(f"Created course: {course.id}")

    # Create a simple lesson with exercises
    lesson = await db.lesson.create(
        data={
            "courseId": course.id,
            "title": "Test Lesson",
            "description": "A test lesson",
            "level": "A1",
            "order": 1,
            "duration": 15,
            "content": Json({
                "introduction": "This is a test lesson",
                "examples": []
            }),
            "objectives": ["Learn something"],
            "vocabulary": Json({
                "words": [
                    {
                        "hebrew": "שָׁלוֹם",
                        "english": "Hello/Peace",
                        "transliteration": "shalom"
                    }
                ]
            }),
            "exercises": Json([
                {
                    "type": "flashcard",
                    "title": "Practice Vocabulary",
                    "items": [
                        {
                            "front": "שָׁלוֹם",
                            "back": "Hello/Peace",
                            "pronunciation": "shalom"
                        }
                    ]
                }
            ]),
            "isLocked": False,
            "difficulty": "beginner",
            "tags": ["test"]
        }
    )
    print(f"Created lesson: {lesson.id}")

    await db.disconnect()
    print("Done!")

if __name__ == "__main__":
    asyncio.run(test_seed())
