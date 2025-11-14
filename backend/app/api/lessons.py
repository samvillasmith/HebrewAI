from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict

from app.core.database import get_db
from app.services.openai_service import openai_service
from app.services.pinecone_service import pinecone_service

router = APIRouter()


class LessonResponse(BaseModel):
    id: str
    title: str
    description: str
    level: str
    order: int
    objectives: List[str]
    progress: Optional[int] = 0


class LessonDetailResponse(LessonResponse):
    content: Dict
    vocabulary: Dict
    grammar: Optional[Dict] = None


@router.get("/", response_model=List[LessonResponse])
async def get_lessons(
    level: Optional[str] = None,
    user_id: Optional[str] = None,
    db=Depends(get_db),
):
    """Get all lessons, optionally filtered by level"""
    try:
        where_clause = {}
        if level:
            where_clause["level"] = level

        lessons = await db.lesson.find_many(
            where=where_clause, order={"order": "asc"}
        )

        # If user_id provided, get their progress
        progress_map = {}
        if user_id:
            user = await db.user.find_unique(where={"clerkId": user_id})
            if user:
                user_progress = await db.lessonprogress.find_many(
                    where={"userId": user.id}
                )
                progress_map = {
                    p.lessonId: p.progress for p in user_progress
                }

        return [
            LessonResponse(
                id=lesson.id,
                title=lesson.title,
                description=lesson.description,
                level=lesson.level,
                order=lesson.order,
                objectives=lesson.objectives,
                progress=progress_map.get(lesson.id, 0),
            )
            for lesson in lessons
        ]

    except Exception as e:
        print(f"Error getting lessons: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/{lesson_id}", response_model=LessonDetailResponse)
async def get_lesson(
    lesson_id: str,
    user_id: Optional[str] = None,
    db=Depends(get_db),
):
    """Get detailed lesson information"""
    try:
        lesson = await db.lesson.find_unique(where={"id": lesson_id})

        if not lesson:
            raise HTTPException(status_code=404, detail="Lesson not found")

        # Get user progress if user_id provided
        progress = 0
        if user_id:
            user = await db.user.find_unique(where={"clerkId": user_id})
            if user:
                lesson_progress = await db.lessonprogress.find_unique(
                    where={
                        "userId_lessonId": {
                            "userId": user.id,
                            "lessonId": lesson_id,
                        }
                    }
                )
                if lesson_progress:
                    progress = lesson_progress.progress

        return LessonDetailResponse(
            id=lesson.id,
            title=lesson.title,
            description=lesson.description,
            level=lesson.level,
            order=lesson.order,
            objectives=lesson.objectives,
            content=lesson.content,
            vocabulary=lesson.vocabulary,
            grammar=lesson.grammar,
            progress=progress,
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting lesson: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


class UpdateProgressRequest(BaseModel):
    user_id: str
    progress: int  # 0-100
    is_completed: bool = False
    score: Optional[int] = None


@router.post("/{lesson_id}/progress")
async def update_lesson_progress(
    lesson_id: str,
    request: UpdateProgressRequest,
    db=Depends(get_db),
):
    """Update user's progress on a lesson"""
    try:
        # Get user
        user = await db.user.find_unique(where={"clerkId": request.user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Check if lesson exists
        lesson = await db.lesson.find_unique(where={"id": lesson_id})
        if not lesson:
            raise HTTPException(status_code=404, detail="Lesson not found")

        # Update or create lesson progress
        lesson_progress = await db.lessonprogress.upsert(
            where={
                "userId_lessonId": {
                    "userId": user.id,
                    "lessonId": lesson_id,
                }
            },
            data={
                "create": {
                    "userId": user.id,
                    "lessonId": lesson_id,
                    "progress": request.progress,
                    "isCompleted": request.is_completed,
                    "score": request.score,
                    "attempts": 1,
                },
                "update": {
                    "progress": request.progress,
                    "isCompleted": request.is_completed,
                    "score": request.score,
                    "attempts": {"increment": 1},
                    "lastAttempt": {"set": None},  # Will use default now()
                },
            },
        )

        # Update user overall progress if lesson completed
        if request.is_completed:
            user_progress = await db.userprogress.find_unique(
                where={"userId": user.id}
            )
            if user_progress:
                await db.userprogress.update(
                    where={"userId": user.id},
                    data={
                        "lessonsComplete": {"increment": 1},
                        "xpPoints": {"increment": 100},  # Award XP
                        "lastActiveDate": {"set": None},  # Will use default now()
                    },
                )

        return {
            "success": True,
            "progress": lesson_progress.progress,
            "is_completed": lesson_progress.isCompleted,
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error updating lesson progress: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


class CreateLessonRequest(BaseModel):
    title: str
    description: str
    level: str
    order: int
    objectives: List[str]
    topic: str


@router.post("/generate")
async def generate_lesson(
    request: CreateLessonRequest,
    db=Depends(get_db),
):
    """Generate a new lesson using AI"""
    try:
        # Generate lesson content using OpenAI
        content = await openai_service.generate_lesson_content(
            level=request.level,
            topic=request.topic,
            objectives=request.objectives,
        )

        # Create lesson in database
        lesson = await db.lesson.create(
            data={
                "title": request.title,
                "description": request.description,
                "level": request.level,
                "order": request.order,
                "objectives": request.objectives,
                "content": content.get("content", {}),
                "vocabulary": content.get("vocabulary", {}),
                "grammar": content.get("grammar"),
            }
        )

        # Index in Pinecone for RAG
        await pinecone_service.index_lesson_content(
            lesson.id,
            {
                "title": lesson.title,
                "description": lesson.description,
                "vocabulary": lesson.vocabulary,
                "grammar": lesson.grammar,
            },
            openai_service.generate_embedding,
        )

        return {
            "success": True,
            "lesson_id": lesson.id,
            "message": "Lesson generated and indexed successfully",
        }

    except Exception as e:
        print(f"Error generating lesson: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
