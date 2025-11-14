from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional

from app.core.database import get_db

router = APIRouter()


class UserResponse(BaseModel):
    id: str
    clerk_id: str
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    is_premium: bool
    current_level: Optional[str] = None
    xp_points: int = 0
    streak_days: int = 0
    lessons_complete: int = 0


class CreateUserRequest(BaseModel):
    clerk_id: str
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    image_url: Optional[str] = None


@router.post("/", response_model=UserResponse)
async def create_user(
    request: CreateUserRequest,
    db=Depends(get_db),
):
    """Create a new user"""
    try:
        # Check if user already exists
        existing_user = await db.user.find_unique(
            where={"clerkId": request.clerk_id}
        )
        if existing_user:
            raise HTTPException(
                status_code=400, detail="User already exists"
            )

        # Create user
        user = await db.user.create(
            data={
                "clerkId": request.clerk_id,
                "email": request.email,
                "firstName": request.first_name,
                "lastName": request.last_name,
                "imageUrl": request.image_url,
            }
        )

        # Create initial progress record
        progress = await db.userprogress.create(
            data={
                "userId": user.id,
                "currentLevel": "A1",
                "xpPoints": 0,
                "streakDays": 0,
                "lessonsComplete": 0,
            }
        )

        return UserResponse(
            id=user.id,
            clerk_id=user.clerkId,
            email=user.email,
            first_name=user.firstName,
            last_name=user.lastName,
            is_premium=user.isPremium,
            current_level=progress.currentLevel,
            xp_points=progress.xpPoints,
            streak_days=progress.streakDays,
            lessons_complete=progress.lessonsComplete,
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error creating user: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/{clerk_id}", response_model=UserResponse)
async def get_user(
    clerk_id: str,
    db=Depends(get_db),
):
    """Get user by Clerk ID"""
    try:
        user = await db.user.find_unique(
            where={"clerkId": clerk_id}, include={"progress": True}
        )

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        progress = user.progress
        return UserResponse(
            id=user.id,
            clerk_id=user.clerkId,
            email=user.email,
            first_name=user.firstName,
            last_name=user.lastName,
            is_premium=user.isPremium,
            current_level=progress.currentLevel if progress else "A1",
            xp_points=progress.xpPoints if progress else 0,
            streak_days=progress.streakDays if progress else 0,
            lessons_complete=progress.lessonsComplete if progress else 0,
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting user: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


class UpdateSubscriptionRequest(BaseModel):
    subscription_id: str
    is_premium: bool


@router.post("/{clerk_id}/subscription")
async def update_subscription(
    clerk_id: str,
    request: UpdateSubscriptionRequest,
    db=Depends(get_db),
):
    """Update user subscription status"""
    try:
        user = await db.user.find_unique(where={"clerkId": clerk_id})

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Update subscription
        updated_user = await db.user.update(
            where={"clerkId": clerk_id},
            data={
                "subscriptionId": request.subscription_id,
                "isPremium": request.is_premium,
            },
        )

        return {
            "success": True,
            "is_premium": updated_user.isPremium,
            "subscription_id": updated_user.subscriptionId,
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error updating subscription: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/{clerk_id}/progress")
async def get_user_progress(
    clerk_id: str,
    db=Depends(get_db),
):
    """Get detailed user progress"""
    try:
        user = await db.user.find_unique(
            where={"clerkId": clerk_id},
            include={
                "progress": True,
                "lessonProgress": {
                    "include": {"lesson": True},
                    "order": {"lastAttempt": "desc"},
                },
            },
        )

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        progress = user.progress
        lesson_progress = [
            {
                "lesson_id": lp.lessonId,
                "lesson_title": lp.lesson.title,
                "level": lp.lesson.level,
                "progress": lp.progress,
                "is_completed": lp.isCompleted,
                "score": lp.score,
                "attempts": lp.attempts,
                "last_attempt": lp.lastAttempt.isoformat(),
            }
            for lp in user.lessonProgress
        ]

        return {
            "current_level": progress.currentLevel if progress else "A1",
            "xp_points": progress.xpPoints if progress else 0,
            "streak_days": progress.streakDays if progress else 0,
            "lessons_complete": progress.lessonsComplete if progress else 0,
            "last_active": (
                progress.lastActiveDate.isoformat() if progress else None
            ),
            "lesson_progress": lesson_progress,
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting user progress: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
