from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

from app.api import chat, lessons, users, courses, vocabulary, tts
from app.core.database import prisma

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await prisma.connect()
    print("Connected to database")
    yield
    # Shutdown
    await prisma.disconnect()
    print("Disconnected from database")


app = FastAPI(
    title="Hebrew AI API",
    description="AI-powered Hebrew learning platform API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS configuration
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(courses.router, prefix="/api/courses", tags=["Courses"])
app.include_router(lessons.router, prefix="/api/lessons", tags=["Lessons"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(vocabulary.router, prefix="/api/vocabulary", tags=["Vocabulary"])
app.include_router(tts.router, prefix="/api/tts", tags=["Text-to-Speech"])


@app.get("/")
async def root():
    return {
        "message": "Hebrew AI API",
        "version": "1.0.0",
        "status": "running",
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.post("/admin/seed-cafe")
async def seed_cafe_lesson():
    """Seed the cafe lesson into the database"""
    try:
        # Create course
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

        # Create cafe lesson
        vocabulary = [
            {"hebrew": "קָפֶה", "transliteration": "kafé", "english": "coffee"},
            {"hebrew": "מַיִם", "transliteration": "mayim", "english": "water"},
            {"hebrew": "תֵּה", "transliteration": "te", "english": "tea"},
            {"hebrew": "בְּבַקָּשָׁה", "transliteration": "bevakasha", "english": "please"},
            {"hebrew": "תּוֹדָה", "transliteration": "toda", "english": "thank you"},
            {"hebrew": "סְלִיחָה", "transliteration": "slicha", "english": "excuse me"},
            {"hebrew": "אֲנִי רוֹצֶה", "transliteration": "ani rotze", "english": "I want"},
            {"hebrew": "כֵּן", "transliteration": "ken", "english": "yes"},
            {"hebrew": "לֹא", "transliteration": "lo", "english": "no"},
        ]

        import json

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
                    "objectives": ["Order drinks and food", "Use basic politeness expressions", "Make simple requests"],
                    "tags": ["cafe", "food", "politeness", "daily-life"],
                    "difficulty": "beginner",
                    "content": json.dumps({
                        "intro": "In this lesson, you'll learn essential phrases for ordering at a café in Israel.",
                        "notes": "Hebrew cafés are central to Israeli culture. Practice these phrases to feel confident!"
                    }),
                    "vocabulary": json.dumps(vocabulary),
                    "grammar": json.dumps({
                        "points": [
                            "Using 'אני רוצה' (I want) for basic requests",
                            "Politeness with 'בבקשה' and 'תודה'"
                        ]
                    }),
                    "exercises": json.dumps([]),
                },
                "update": {
                    "title": "At the Café",
                    "description": "Learn how to order drinks and use polite expressions",
                    "vocabulary": json.dumps(vocabulary),
                }
            }
        )

        return {
            "success": True,
            "message": f"Lesson '{lesson.title}' created successfully!",
            "lesson_id": lesson.id,
            "course_id": course.id,
            "vocabulary_count": len(vocabulary)
        }
    except Exception as e:
        return {"success": False, "error": str(e)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=os.getenv("API_HOST", "0.0.0.0"),
        port=int(os.getenv("API_PORT", 8000)),
        reload=True,
    )
