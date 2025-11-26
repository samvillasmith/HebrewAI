"""
Curriculum API endpoints for fetching curriculum levels and statistics.
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from app.core.database import get_db

router = APIRouter()


class LessonSummary(BaseModel):
    id: str
    courseId: str
    lessonNumber: str
    title: str
    duration: int
    vocabularyCount: int
    theme: str
    objectives: List[str]
    isLocked: bool
    isCompleted: Optional[bool] = False


class CourseSummary(BaseModel):
    id: str
    level: str
    courseNumber: int
    title: str
    description: str
    totalLessons: int
    totalWords: int
    estimatedHours: int
    isLocked: bool
    progress: Optional[int] = 0
    isCompleted: Optional[bool] = False
    lessons: List[LessonSummary]


class CurriculumLevel(BaseModel):
    level: str
    title: str
    description: str
    totalWords: int
    totalLessons: int
    courses: List[CourseSummary]
    progress: Optional[int] = 0


# Level metadata that can't be calculated from courses alone
LEVEL_METADATA = {
    "TOURIST": {
        "title": "Tourist Level - Quick Start",
        "description": "Essential phrases for travelers and visitors to Israel",
    },
    "A1": {
        "title": "A1 Level - Newcomer/Beginner",
        "description": "Master the fundamentals of Hebrew - alphabet, basic vocabulary, and essential grammar",
    },
    "A2": {
        "title": "A2 Level - Elementary",
        "description": "Build on your foundation with intermediate grammar, expanded vocabulary, and practical conversation skills",
    },
    "B1": {
        "title": "B1 Level - Intermediate",
        "description": "Develop fluency with complex grammar, advanced vocabulary, and confident conversation skills for real-world situations",
    },
    "B2": {
        "title": "B2 Level - Upper Intermediate",
        "description": "Achieve near-native fluency with advanced grammar structures, rich vocabulary, and sophisticated communication skills",
    },
}


@router.get("/levels", response_model=List[CurriculumLevel])
async def get_curriculum_levels(
    user_id: Optional[str] = None,
    db=Depends(get_db),
):
    """
    Get all curriculum levels with their courses and lessons.
    Optionally includes user progress if user_id is provided.
    """
    try:
        # Get all courses with their lessons
        courses = await db.course.find_many(
            order={"order": "asc"},
            include={"lessons": {"order_by": {"order": "asc"}}}
        )

        # Group courses by level
        courses_by_level = {}
        for course in courses:
            level = course.level
            if level not in courses_by_level:
                courses_by_level[level] = []
            courses_by_level[level].append(course)

        # Get user progress if user_id provided
        user = None
        course_progress_map = {}
        lesson_progress_map = {}

        if user_id:
            user = await db.user.find_unique(where={"clerkId": user_id})
            if user:
                # Get course progress
                course_progress = await db.courseprogress.find_many(
                    where={"userId": user.id}
                )
                course_progress_map = {
                    cp.courseId: {"progress": cp.progress, "isCompleted": cp.isCompleted}
                    for cp in course_progress
                }

                # Get lesson progress
                lesson_progress = await db.lessonprogress.find_many(
                    where={"userId": user.id}
                )
                lesson_progress_map = {
                    lp.lessonId: lp.isCompleted
                    for lp in lesson_progress
                }

        # Build curriculum levels
        curriculum_levels = []

        # Define level order
        level_order = ["TOURIST", "A1", "A2", "B1", "B2"]

        for level in level_order:
            if level not in courses_by_level:
                continue

            level_courses = courses_by_level[level]
            metadata = LEVEL_METADATA.get(level, {
                "title": f"{level} Level",
                "description": f"Hebrew {level} curriculum"
            })

            # Calculate totals
            total_lessons = sum(len(c.lessons) for c in level_courses)
            # Calculate total words by parsing vocabularyCount from lesson content
            total_words = 0
            for course in level_courses:
                for lesson in course.lessons:
                    try:
                        import json
                        content = json.loads(lesson.content) if isinstance(lesson.content, str) else lesson.content
                        total_words += content.get("vocabularyCount", 0)
                    except:
                        total_words += 8  # Default fallback

            # Build course summaries
            course_summaries = []
            level_completed_lessons = 0

            for course in level_courses:
                # Get course progress
                course_prog = course_progress_map.get(course.id, {})

                # Calculate vocabulary count from lessons
                course_vocab_count = 0
                for lesson in course.lessons:
                    try:
                        import json
                        content = json.loads(lesson.content) if isinstance(lesson.content, str) else lesson.content
                        course_vocab_count += content.get("vocabularyCount", 0)
                    except:
                        course_vocab_count += 8  # Default fallback

                # Build lesson summaries
                lesson_summaries = []
                for idx, lesson in enumerate(course.lessons):
                    # Parse content for vocab count
                    vocab_count = 8  # Default
                    try:
                        import json
                        content = json.loads(lesson.content) if isinstance(lesson.content, str) else lesson.content
                        vocab_count = content.get("vocabularyCount", 8)
                    except:
                        pass

                    is_completed = lesson_progress_map.get(lesson.id, False)
                    if is_completed:
                        level_completed_lessons += 1

                    # Extract lesson number from order
                    lesson_number = f"{course.order}.{idx + 1}"

                    # Get theme from content
                    theme = ""
                    try:
                        import json
                        content = json.loads(lesson.content) if isinstance(lesson.content, str) else lesson.content
                        theme = content.get("theme", "")
                    except:
                        pass

                    lesson_summaries.append(LessonSummary(
                        id=lesson.id,
                        courseId=course.id,
                        lessonNumber=lesson_number,
                        title=lesson.title,
                        duration=lesson.duration,
                        vocabularyCount=vocab_count,
                        theme=theme,
                        objectives=lesson.objectives or [],
                        isLocked=lesson.isLocked,
                        isCompleted=is_completed,
                    ))

                course_summaries.append(CourseSummary(
                    id=course.id,
                    level=course.level,
                    courseNumber=course.order,
                    title=course.title,
                    description=course.description,
                    totalLessons=len(course.lessons),
                    totalWords=course_vocab_count,
                    estimatedHours=course.estimatedHours,
                    isLocked=course.isLocked,
                    progress=course_prog.get("progress", 0),
                    isCompleted=course_prog.get("isCompleted", False),
                    lessons=lesson_summaries,
                ))

            # Calculate level progress
            level_progress = 0
            if total_lessons > 0:
                level_progress = int((level_completed_lessons / total_lessons) * 100)

            curriculum_levels.append(CurriculumLevel(
                level=level,
                title=metadata["title"],
                description=metadata["description"],
                totalWords=total_words,
                totalLessons=total_lessons,
                courses=course_summaries,
                progress=level_progress,
            ))

        return curriculum_levels

    except Exception as e:
        print(f"Error getting curriculum levels: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/levels/{level}", response_model=CurriculumLevel)
async def get_curriculum_level(
    level: str,
    user_id: Optional[str] = None,
    db=Depends(get_db),
):
    """
    Get a specific curriculum level with its courses and lessons.
    """
    try:
        levels = await get_curriculum_levels(user_id, db)

        for curriculum_level in levels:
            if curriculum_level.level == level:
                return curriculum_level

        raise HTTPException(status_code=404, detail=f"Level {level} not found")

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting curriculum level: {e}")
        raise HTTPException(status_code=500, detail=str(e))
