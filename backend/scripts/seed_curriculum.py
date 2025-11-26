"""
Seed the database with curriculum data from exported JSON.

Prerequisites:
1. Run the export script first: cd frontend && node scripts/export-curriculum.js
2. This creates backend/data/curriculum.json

Usage:
    cd backend
    python scripts/seed_curriculum.py
"""

import asyncio
import json
import sys
import os
import re

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from prisma import Prisma
from dotenv import load_dotenv

load_dotenv()


def parse_duration(duration_str: str) -> int:
    """Convert duration string like '15 min' to integer minutes."""
    match = re.search(r'(\d+)', duration_str)
    if match:
        return int(match.group(1))
    return 15  # default


async def seed_curriculum():
    """Seed the database with curriculum from JSON file."""
    db = Prisma()
    await db.connect()

    # Load curriculum data
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'curriculum.json')

    if not os.path.exists(data_path):
        print(f"[ERROR] Curriculum JSON not found at: {data_path}")
        print("Please run the export script first:")
        print("  cd frontend && node scripts/export-curriculum.js")
        return

    with open(data_path, 'r', encoding='utf-8') as f:
        curriculum_data = json.load(f)

    print(f"Loaded {len(curriculum_data)} curriculum levels\n")

    total_courses = 0
    total_lessons = 0

    try:
        # Clean up old data first
        print("Cleaning up old curriculum data...")

        # Delete all lessons first (due to foreign key constraints)
        deleted_lessons = await db.lesson.delete_many()
        print(f"  Deleted {deleted_lessons} old lessons")

        # Delete all courses
        deleted_courses = await db.course.delete_many()
        print(f"  Deleted {deleted_courses} old courses")

        print("  Cleanup complete!\n")

        for level_data in curriculum_data:
            level = level_data['level']
            print(f"Processing {level} - {level_data['title']}")
            print(f"  {len(level_data['courses'])} courses, {level_data['totalLessons']} lessons")

            for course_data in level_data['courses']:
                # Calculate estimated hours based on lessons
                total_minutes = sum(
                    parse_duration(lesson.get('duration', '15 min'))
                    for lesson in course_data['lessons']
                )
                estimated_hours = max(1, round(total_minutes / 60))

                # Create or update course
                course = await db.course.upsert(
                    where={"id": course_data['id']},
                    data={
                        "create": {
                            "id": course_data['id'],
                            "title": course_data['title'],
                            "description": course_data['description'],
                            "level": course_data['level'],
                            "order": course_data['courseNumber'],
                            "estimatedHours": estimated_hours,
                            "isLocked": course_data['courseNumber'] > 1,  # Lock all except first
                            "prerequisites": [],
                        },
                        "update": {
                            "title": course_data['title'],
                            "description": course_data['description'],
                            "level": course_data['level'],
                            "order": course_data['courseNumber'],
                            "estimatedHours": estimated_hours,
                        }
                    }
                )
                total_courses += 1

                # Create lessons for this course
                for idx, lesson_data in enumerate(course_data['lessons']):
                    # Determine difficulty based on level
                    difficulty_map = {
                        'A1': 'beginner',
                        'A2': 'beginner',
                        'B1': 'intermediate',
                        'B2': 'advanced',
                        'tourist': 'beginner'
                    }
                    difficulty = difficulty_map.get(level, 'beginner')

                    # Build lesson description from theme
                    description = f"{lesson_data.get('theme', '')} - {course_data['title']}"

                    # Create tags from theme and level
                    tags = [
                        level.lower(),
                        lesson_data.get('theme', '').lower().replace(' ', '-'),
                        course_data['title'].lower().split()[0]
                    ]

                    # Prepare content JSON
                    content = {
                        "intro": f"Welcome to {lesson_data['title']}",
                        "theme": lesson_data.get('theme', ''),
                        "lessonNumber": lesson_data.get('lessonNumber', ''),
                        "vocabularyCount": lesson_data.get('vocabularyCount', 0)
                    }

                    # Prepare vocabulary placeholder
                    vocabulary = []
                    for i in range(lesson_data.get('vocabularyCount', 5)):
                        vocabulary.append({
                            "hebrew": f"placeholder_{i}",
                            "english": f"placeholder_{i}",
                            "transliteration": ""
                        })

                    # Prepare grammar notes
                    grammar = {
                        "notes": lesson_data.get('grammarNotes', [])
                    }

                    # Prepare exercises placeholder
                    exercises = [
                        {
                            "type": "flashcard",
                            "items": []
                        },
                        {
                            "type": "matching",
                            "items": []
                        }
                    ]

                    # Create or update lesson
                    lesson = await db.lesson.upsert(
                        where={"id": lesson_data['id']},
                        data={
                            "create": {
                                "id": lesson_data['id'],
                                "courseId": course_data['id'],
                                "title": lesson_data['title'],
                                "description": description,
                                "level": course_data['level'],
                                "order": idx + 1,
                                "duration": parse_duration(lesson_data.get('duration', '15 min')),
                                "content": json.dumps(content),
                                "objectives": lesson_data.get('objectives', []),
                                "vocabulary": json.dumps(vocabulary),
                                "grammar": json.dumps(grammar),
                                "exercises": json.dumps(exercises),
                                "isLocked": idx > 0,  # Lock all except first lesson
                                "difficulty": difficulty,
                                "tags": tags,
                            },
                            "update": {
                                "title": lesson_data['title'],
                                "description": description,
                                "level": course_data['level'],
                                "order": idx + 1,
                                "duration": parse_duration(lesson_data.get('duration', '15 min')),
                                "content": json.dumps(content),
                                "objectives": lesson_data.get('objectives', []),
                                "vocabulary": json.dumps(vocabulary),
                                "grammar": json.dumps(grammar),
                                "exercises": json.dumps(exercises),
                                "difficulty": difficulty,
                                "tags": tags,
                            }
                        }
                    )
                    total_lessons += 1

                print(f"    [OK] {course_data['title']}: {len(course_data['lessons'])} lessons")

        print(f"\n[SUCCESS] Database seeded successfully!")
        print(f"  Total courses: {total_courses}")
        print(f"  Total lessons: {total_lessons}")

    except Exception as e:
        print(f"\n[ERROR] Error seeding database: {e}")
        raise
    finally:
        await db.disconnect()


if __name__ == "__main__":
    asyncio.run(seed_curriculum())
