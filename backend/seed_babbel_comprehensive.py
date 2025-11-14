#!/usr/bin/env python3
"""
Comprehensive Babbel-style seeding using raw SQL
"""
import asyncio
import asyncpg
import json
import os
from dotenv import load_dotenv

load_dotenv()

async def seed_babbel():
    db_url = os.getenv("DATABASE_URL")
    conn = await asyncpg.connect(db_url)
    print("Connected to database")

    # Clear existing data
    print("Clearing existing data...")
    await conn.execute('DELETE FROM "LessonProgress"')
    await conn.execute('DELETE FROM "Lesson"')
    await conn.execute('DELETE FROM "Course"')

    # Course 1: Hebrew Foundations
    course1_id = await conn.fetchval("""
        INSERT INTO "Course" (id, title, description, level, "order", "estimatedHours", "isLocked", prerequisites, "createdAt", "updatedAt")
        VALUES (gen_random_uuid()::text, 'Hebrew Foundations', 'Master the alphabet, greetings, and essential phrases', 'A1', 1, 6, false, '{}', NOW(), NOW())
        RETURNING id
    """)
    print(f"Course 1: Hebrew Foundations ({course1_id})")

    # Lesson 1.1: Alphabet
    await conn.execute("""
        INSERT INTO "Lesson" (id, "courseId", title, description, level, "order", duration, content, objectives, vocabulary, exercises, "isLocked", difficulty, tags, "createdAt", "updatedAt")
        VALUES (gen_random_uuid()::text, $1, 'Hebrew Alphabet - Part 1', 'Learn your first Hebrew letters', 'A1', 1, 12, $2, $3, $4, $5, false, 'beginner', $6, NOW(), NOW())
    """, course1_id,
    json.dumps({"introduction": "Welcome to Hebrew! Learn the first five letters.", "examples": [{"hebrew": "אבא", "english": "father"}]}),
    ["Recognize first 5 Hebrew letters"],
    json.dumps({"letters": [{"hebrew": "א", "name": "Alef", "sound": "silent"}, {"hebrew": "ב", "name": "Bet", "sound": "b/v"}]}),
    json.dumps([{"type": "flashcard", "title": "Practice Letters", "items": [{"front": "א", "back": "Alef"}]}, {"type": "multiple_choice", "title": "Quiz", "questions": [{"question": "Which letter makes 'b' sound?", "options": ["Alef", "Bet"], "correct": 1}]}]),
    ["alphabet"])

    # Lesson 1.2: Greetings
    await conn.execute("""
        INSERT INTO "Lesson" (id, "courseId", title, description, level, "order", duration, content, objectives, vocabulary, exercises, "isLocked", difficulty, tags, "createdAt", "updatedAt")
        VALUES (gen_random_uuid()::text, $1, 'Essential Greetings', 'Master basic Hebrew greetings', 'A1', 2, 15, $2, $3, $4, $5, false, 'beginner', $6, NOW(), NOW())
    """, course1_id,
    json.dumps({"introduction": "Learn essential greetings", "examples": [{"hebrew": "שלום", "english": "hello"}]}),
    ["Greet people in Hebrew"],
    json.dumps({"words": [{"hebrew": "שָׁלוֹם", "english": "Hello", "transliteration": "shalom"}, {"hebrew": "תּוֹדָה", "english": "Thank you", "transliteration": "toda"}]}),
    json.dumps([{"type": "flashcard", "title": "Greetings", "items": [{"front": "שָׁלוֹם", "back": "Hello"}]}, {"type": "translation", "title": "Translate", "questions": [{"english": "Hello", "correct": "שָׁלוֹם", "alternatives": []}]}]),
    ["greetings"])

    # Lesson 1.3: Introductions
    await conn.execute("""
        INSERT INTO "Lesson" (id, "courseId", title, description, level, "order", duration, content, objectives, vocabulary, exercises, "isLocked", difficulty, tags, "createdAt", "updatedAt")
        VALUES (gen_random_uuid()::text, $1, 'Introducing Yourself', 'Learn to introduce yourself', 'A1', 3, 15, $2, $3, $4, $5, false, 'beginner', $6, NOW(), NOW())
    """, course1_id,
    json.dumps({"introduction": "Introduce yourself in Hebrew", "examples": [{"hebrew": "שְׁמִי", "english": "My name is"}]}),
    ["Introduce yourself"],
    json.dumps({"words": [{"hebrew": "אֲנִי", "english": "I am", "transliteration": "ani"}, {"hebrew": "שְׁמִי", "english": "My name is", "transliteration": "shmi"}]}),
    json.dumps([{"type": "conversation", "title": "Introduce", "scenario": "Meeting someone", "steps": [{"speaker": "other", "text": "שָׁלוֹם!", "translation": "Hello!"}, {"speaker": "you", "prompt": "Say your name", "expected": "שְׁמִי", "alternatives": []}]}]),
    ["introduction"])

    # Course 2: Everyday Essentials
    course2_id = await conn.fetchval("""
        INSERT INTO "Course" (id, title, description, level, "order", "estimatedHours", "isLocked", prerequisites, "createdAt", "updatedAt")
        VALUES (gen_random_uuid()::text, 'Everyday Essentials', 'Navigate daily situations', 'A1', 2, 8, false, $1, NOW(), NOW())
        RETURNING id
    """, [course1_id])
    print(f"Course 2: Everyday Essentials ({course2_id})")

    # Lesson 2.1: At the Café
    await conn.execute("""
        INSERT INTO "Lesson" (id, "courseId", title, description, level, "order", duration, content, objectives, vocabulary, exercises, "isLocked", difficulty, tags, "createdAt", "updatedAt")
        VALUES (gen_random_uuid()::text, $1, 'At the Café', 'Order food and drinks', 'A1', 1, 15, $2, $3, $4, $5, false, 'beginner', $6, NOW(), NOW())
    """, course2_id,
    json.dumps({"introduction": "Order at a café in Hebrew", "examples": [{"hebrew": "קָפֶה", "english": "coffee"}]}),
    ["Order coffee and tea"],
    json.dumps({"words": [{"hebrew": "קָפֶה", "english": "Coffee", "transliteration": "kafe"}, {"hebrew": "תֵּה", "english": "Tea", "transliteration": "te"}]}),
    json.dumps([{"type": "flashcard", "title": "Café", "items": [{"front": "קָפֶה", "back": "Coffee"}]}, {"type": "fill_in_blank", "title": "Order", "questions": [{"sentence": "אֲנִי רוֹצֶה ___", "blank": "___", "correct": "קָפֶה", "options": ["קָפֶה", "תֵּה"]}]}]),
    ["food", "café"])

    print("\n✅ Seeded 2 courses with 4 lessons!")
    await conn.close()

if __name__ == "__main__":
    asyncio.run(seed_babbel())
