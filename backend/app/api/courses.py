from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

from app.core.database import get_db
from app.services.vocabulary_service import vocabulary_service

router = APIRouter()


class CourseResponse(BaseModel):
    id: str
    title: str
    description: str
    level: str
    order: int
    imageUrl: Optional[str] = None
    estimatedHours: int
    isLocked: bool
    progress: Optional[int] = 0
    isCompleted: Optional[bool] = False


class CourseDetailResponse(CourseResponse):
    lessons: List[Dict[str, Any]]
    totalLessons: int
    completedLessons: int


class UpdateCourseProgressRequest(BaseModel):
    user_id: str


@router.get("/", response_model=List[CourseResponse])
async def get_courses(
    level: Optional[str] = None,
    user_id: Optional[str] = None,
    db=Depends(get_db),
):
    """Get all courses, optionally filtered by level"""
    try:
        where_clause = {}
        if level:
            where_clause["level"] = level

        courses = await db.course.find_many(
            where=where_clause,
            order={"order": "asc"},
            include={"lessons": True}
        )

        # If user_id provided, get their progress
        progress_map = {}
        completed_map = {}
        if user_id:
            user = await db.user.find_unique(where={"clerkId": user_id})
            if user:
                course_progress = await db.courseprogress.find_many(
                    where={"userId": user.id}
                )
                progress_map = {p.courseId: p.progress for p in course_progress}
                completed_map = {p.courseId: p.isCompleted for p in course_progress}

        return [
            CourseResponse(
                id=course.id,
                title=course.title,
                description=course.description,
                level=course.level,
                order=course.order,
                imageUrl=course.imageUrl,
                estimatedHours=course.estimatedHours,
                isLocked=course.isLocked,
                progress=progress_map.get(course.id, 0),
                isCompleted=completed_map.get(course.id, False),
            )
            for course in courses
        ]

    except Exception as e:
        print(f"Error getting courses: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{course_id}", response_model=CourseDetailResponse)
async def get_course(
    course_id: str,
    user_id: Optional[str] = None,
    db=Depends(get_db),
):
    """Get detailed course information including lessons"""
    try:
        course = await db.course.find_unique(
            where={"id": course_id},
            include={"lessons": True}
        )

        if not course:
            raise HTTPException(status_code=404, detail="Course not found")

        # Get user progress if user_id provided
        progress = 0
        is_completed = False
        completed_lessons = 0

        if user_id:
            user = await db.user.find_unique(where={"clerkId": user_id})
            if user:
                # Get course progress
                course_progress = await db.courseprogress.find_unique(
                    where={
                        "userId_courseId": {
                            "userId": user.id,
                            "courseId": course_id,
                        }
                    }
                )
                if course_progress:
                    progress = course_progress.progress
                    is_completed = course_progress.isCompleted

                # Count completed lessons
                lesson_ids = [lesson.id for lesson in course.lessons]
                lesson_progress = await db.lessonprogress.find_many(
                    where={
                        "userId": user.id,
                        "lessonId": {"in": lesson_ids},
                        "isCompleted": True
                    }
                )
                completed_lessons = len(lesson_progress)

        # Format lessons
        lessons = [
            {
                "id": lesson.id,
                "title": lesson.title,
                "description": lesson.description,
                "order": lesson.order,
                "duration": lesson.duration,
            }
            for lesson in course.lessons
        ]

        return CourseDetailResponse(
            id=course.id,
            title=course.title,
            description=course.description,
            level=course.level,
            order=course.order,
            imageUrl=course.imageUrl,
            estimatedHours=course.estimatedHours,
            isLocked=course.isLocked,
            progress=progress,
            isCompleted=is_completed,
            lessons=lessons,
            totalLessons=len(course.lessons),
            completedLessons=completed_lessons,
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting course: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{course_id}/check-completion")
async def check_course_completion(
    course_id: str,
    request: UpdateCourseProgressRequest,
    db=Depends(get_db),
):
    """
    Check if course is completed and update progress
    Automatically adds vocabulary to user's review queue on completion
    """
    try:
        # Get user
        user = await db.user.find_unique(where={"clerkId": request.user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Get course with lessons
        course = await db.course.find_unique(
            where={"id": course_id},
            include={"lessons": True}
        )
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")

        # Count completed lessons
        lesson_ids = [lesson.id for lesson in course.lessons]
        completed_lesson_progress = await db.lessonprogress.find_many(
            where={
                "userId": user.id,
                "lessonId": {"in": lesson_ids},
                "isCompleted": True
            }
        )

        total_lessons = len(course.lessons)
        completed_lessons = len(completed_lesson_progress)
        progress_percentage = int((completed_lessons / total_lessons) * 100) if total_lessons > 0 else 0

        # Check if course is newly completed
        is_completed = completed_lessons == total_lessons

        # Get existing course progress
        existing_progress = await db.courseprogress.find_unique(
            where={
                "userId_courseId": {
                    "userId": user.id,
                    "courseId": course_id,
                }
            }
        )

        was_already_completed = existing_progress and existing_progress.isCompleted

        # Update or create course progress
        course_progress = await db.courseprogress.upsert(
            where={
                "userId_courseId": {
                    "userId": user.id,
                    "courseId": course_id,
                }
            },
            data={
                "create": {
                    "userId": user.id,
                    "courseId": course_id,
                    "progress": progress_percentage,
                    "isCompleted": is_completed,
                    "completedAt": datetime.utcnow() if is_completed else None,
                },
                "update": {
                    "progress": progress_percentage,
                    "isCompleted": is_completed,
                    "completedAt": datetime.utcnow() if is_completed and not was_already_completed else existing_progress.completedAt if existing_progress else None,
                },
            },
        )

        # If course just completed (not already completed), add vocabulary to review
        vocabulary_result = None
        if is_completed and not was_already_completed:
            vocabulary_result = await vocabulary_service.process_course_completion(
                user.id, course_id
            )

        return {
            "success": True,
            "progress": course_progress.progress,
            "isCompleted": course_progress.isCompleted,
            "completedLessons": completed_lessons,
            "totalLessons": total_lessons,
            "vocabulary": vocabulary_result,
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error checking course completion: {e}")
        raise HTTPException(status_code=500, detail=str(e))
