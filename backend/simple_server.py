#!/usr/bin/env python3
"""
Simple FastAPI server using asyncpg to bypass Prisma issues
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import asyncpg
import os
from dotenv import load_dotenv
import json

load_dotenv()

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection pool
db_pool = None

@app.on_event("startup")
async def startup():
    global db_pool
    db_url = os.getenv("DATABASE_URL")
    db_pool = await asyncpg.create_pool(db_url, min_size=1, max_size=10)
    print("Connected to database")

@app.on_event("shutdown")
async def shutdown():
    if db_pool:
        await db_pool.close()

@app.get("/")
async def root():
    return {"message": "Hebrew AI Backend - Running", "status": "ok"}

@app.get("/api/lessons/")
async def get_all_lessons():
    """Get all lessons"""
    async with db_pool.acquire() as conn:
        lessons = await conn.fetch("""
            SELECT
                l.id, l.title, l.description, l.level, l."order", l.duration,
                l.content, l.objectives, l.vocabulary, l.exercises,
                l."isLocked", l.difficulty, l.tags,
                l."courseId", c.title as "courseTitle"
            FROM "Lesson" l
            JOIN "Course" c ON l."courseId" = c.id
            ORDER BY c."order", l."order"
        """)

        return [{
            "id": lesson["id"],
            "courseId": lesson["courseId"],
            "courseTitle": lesson["courseTitle"],
            "title": lesson["title"],
            "description": lesson["description"],
            "level": lesson["level"],
            "order": lesson["order"],
            "duration": lesson["duration"],
            "content": json.loads(lesson["content"]) if lesson["content"] else {},
            "objectives": lesson["objectives"],
            "vocabulary": json.loads(lesson["vocabulary"]) if lesson["vocabulary"] else {},
            "exercises": json.loads(lesson["exercises"]) if lesson["exercises"] else [],
            "isLocked": lesson["isLocked"],
            "difficulty": lesson["difficulty"],
            "tags": lesson["tags"]
        } for lesson in lessons]

@app.get("/api/lessons/{lesson_id}")
async def get_lesson(lesson_id: str):
    """Get a specific lesson by ID"""
    async with db_pool.acquire() as conn:
        lesson = await conn.fetchrow("""
            SELECT
                l.id, l.title, l.description, l.level, l."order", l.duration,
                l.content, l.objectives, l.vocabulary, l.exercises, l.grammar,
                l."isLocked", l.difficulty, l.tags,
                l."courseId"
            FROM "Lesson" l
            WHERE l.id = $1
        """, lesson_id)

        if not lesson:
            raise HTTPException(status_code=404, detail="Lesson not found")

        return {
            "id": lesson["id"],
            "courseId": lesson["courseId"],
            "title": lesson["title"],
            "description": lesson["description"],
            "level": lesson["level"],
            "order": lesson["order"],
            "duration": lesson["duration"],
            "content": json.loads(lesson["content"]) if lesson["content"] else {},
            "objectives": lesson["objectives"],
            "vocabulary": json.loads(lesson["vocabulary"]) if lesson["vocabulary"] else {},
            "grammar": json.loads(lesson["grammar"]) if lesson["grammar"] else None,
            "exercises": json.loads(lesson["exercises"]) if lesson["exercises"] else [],
            "isLocked": lesson["isLocked"],
            "difficulty": lesson["difficulty"],
            "tags": lesson["tags"]
        }

@app.get("/api/courses/")
async def get_all_courses():
    """Get all courses"""
    async with db_pool.acquire() as conn:
        courses = await conn.fetch("""
            SELECT
                id, title, description, level, "order", "imageUrl",
                "estimatedHours", "isLocked", prerequisites
            FROM "Course"
            ORDER BY "order"
        """)

        return [{
            "id": course["id"],
            "title": course["title"],
            "description": course["description"],
            "level": course["level"],
            "order": course["order"],
            "imageUrl": course["imageUrl"],
            "estimatedHours": course["estimatedHours"],
            "isLocked": course["isLocked"],
            "prerequisites": course["prerequisites"]
        } for course in courses]

@app.post("/api/tts/")
async def text_to_speech(request: dict):
    """Text-to-speech endpoint (stub for now)"""
    return {"message": "TTS not implemented in simple server"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
