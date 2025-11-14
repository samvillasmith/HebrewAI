#!/usr/bin/env python3
"""
Quick seed using raw SQL to bypass Prisma issues
"""
import asyncio
import asyncpg
import json
import os
from dotenv import load_dotenv

load_dotenv()

async def quick_seed():
    # Parse DATABASE_URL
    db_url = os.getenv("DATABASE_URL")
    conn = await asyncpg.connect(db_url)

    print("Connected to database")

    # Create a course
    course_id = await conn.fetchval("""
        INSERT INTO "Course" (id, title, description, level, "order", "estimatedHours", "isLocked", prerequisites, "createdAt", "updatedAt")
        VALUES (
            gen_random_uuid()::text,
            'Hebrew Foundations',
            'Master the alphabet and essential phrases',
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

    print(f"Created course: {course_id}")

    # Create a lesson with exercises
    exercises = [
        {
            "type": "flashcard",
            "title": "Practice the Alphabet",
            "items": [
                {"front": "א", "back": "Alef", "pronunciation": "silent"},
                {"front": "ב", "back": "Bet", "pronunciation": "b/v"},
                {"front": "ג", "back": "Gimel", "pronunciation": "g"}
            ]
        },
        {
            "type": "multiple_choice",
            "title": "Letter Recognition",
            "questions": [
                {
                    "question": "Which letter makes the 'b' sound?",
                    "hebrew": "ב",
                    "options": ["Alef", "Bet", "Gimel", "Dalet"],
                    "correct": 1
                }
            ]
        }
    ]

    vocabulary = {
        "letters": [
            {"hebrew": "א", "name": "Alef", "sound": "silent"},
            {"hebrew": "ב", "name": "Bet", "sound": "b/v"},
            {"hebrew": "ג", "name": "Gimel", "sound": "g"}
        ]
    }

    content = {
        "introduction": "Learn the first letters of the Hebrew alphabet",
        "examples": [
            {"hebrew": "אבא", "english": "father", "transliteration": "abba"}
        ]
    }

    lesson_id = await conn.fetchval("""
        INSERT INTO "Lesson" (
            id, "courseId", title, description, level, "order", duration,
            content, objectives, vocabulary, exercises, "isLocked", difficulty, tags,
            "createdAt", "updatedAt"
        )
        VALUES (
            gen_random_uuid()::text,
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW()
        )
        RETURNING id
    """, course_id, "Hebrew Alphabet - Part 1", "Master the first letters", "A1", 1, 15,
    json.dumps(content), ["Recognize Hebrew letters"], json.dumps(vocabulary),
    json.dumps(exercises), False, "beginner", ["alphabet"])

    print(f"Created lesson: {lesson_id}")

    await conn.close()
    print("Done!")

if __name__ == "__main__":
    asyncio.run(quick_seed())
