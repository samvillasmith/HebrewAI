from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

from app.core.database import get_db
from app.services.vocabulary_service import vocabulary_service

router = APIRouter()


class VocabularyItemResponse(BaseModel):
    id: str
    hebrew: str
    english: str
    transliteration: Optional[str] = None
    category: str
    level: str
    exampleSentence: Optional[str] = None
    repetitions: Optional[int] = 0
    nextReview: Optional[datetime] = None


class ReviewUpdateRequest(BaseModel):
    quality: int  # 0-5 rating of recall quality


class ReviewStatsResponse(BaseModel):
    total_words: int
    due_for_review: int
    learning: int
    mastered: int


@router.get("/review", response_model=List[VocabularyItemResponse])
async def get_review_words(
    user_id: str,
    limit: Optional[int] = 20,
    db=Depends(get_db),
):
    """Get vocabulary words due for review"""
    try:
        # Get user or create if doesn't exist
        user = await db.user.find_unique(where={"clerkId": user_id})
        if not user:
            # Auto-create user if they don't exist
            user = await db.user.create(
                data={
                    "clerkId": user_id,
                    "email": f"{user_id}@temp.com",
                }
            )
            # Create initial progress
            await db.userprogress.create(
                data={
                    "userId": user.id,
                    "currentLevel": "A1",
                }
            )

        # Get review words
        review_words = await vocabulary_service.get_user_review_words(
            user.id, limit=limit
        )

        return [
            VocabularyItemResponse(
                id=word["id"],
                hebrew=word["hebrew"],
                english=word["english"],
                transliteration=word.get("transliteration"),
                category=word["category"],
                level=word["level"],
                exampleSentence=word.get("exampleSentence"),
                repetitions=word.get("repetitions", 0),
                nextReview=word.get("nextReview"),
            )
            for word in review_words
        ]

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting review words: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/review/{review_item_id}")
async def update_review(
    review_item_id: str,
    request: ReviewUpdateRequest,
    db=Depends(get_db),
):
    """Update review item after practice"""
    try:
        # Validate quality rating
        if not 0 <= request.quality <= 5:
            raise HTTPException(
                status_code=400,
                detail="Quality must be between 0 and 5"
            )

        # Update review item
        result = await vocabulary_service.update_review_item(
            review_item_id, request.quality
        )

        return {
            "success": True,
            "nextReview": result["nextReview"],
            "interval": result["interval"],
            "repetitions": result["repetitions"],
        }

    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        print(f"Error updating review: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats", response_model=ReviewStatsResponse)
async def get_vocabulary_stats(
    user_id: str,
    db=Depends(get_db),
):
    """Get user's vocabulary statistics"""
    try:
        # Get user or create if doesn't exist
        user = await db.user.find_unique(where={"clerkId": user_id})
        if not user:
            # Auto-create user if they don't exist
            user = await db.user.create(
                data={
                    "clerkId": user_id,
                    "email": f"{user_id}@temp.com",
                }
            )
            # Create initial progress
            await db.userprogress.create(
                data={
                    "userId": user.id,
                    "currentLevel": "A1",
                }
            )

        # Get all review items for user
        all_items = await db.reviewitem.find_many(
            where={"userId": user.id}
        )

        total_words = len(all_items)

        # Count items due for review
        from datetime import timezone
        now = datetime.now(timezone.utc)
        due_for_review = sum(1 for item in all_items if item.nextReview.replace(tzinfo=timezone.utc) <= now)

        # Count learning (repetitions < 3)
        learning = sum(1 for item in all_items if item.repetitions < 3)

        # Count mastered (repetitions >= 3)
        mastered = sum(1 for item in all_items if item.repetitions >= 3)

        return ReviewStatsResponse(
            total_words=total_words,
            due_for_review=due_for_review,
            learning=learning,
            mastered=mastered,
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting vocabulary stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/all", response_model=List[VocabularyItemResponse])
async def get_all_user_vocabulary(
    user_id: str,
    category: Optional[str] = None,
    level: Optional[str] = None,
    db=Depends(get_db),
):
    """Get all vocabulary items for a user, optionally filtered"""
    try:
        # Get user or create if doesn't exist
        user = await db.user.find_unique(where={"clerkId": user_id})
        if not user:
            # Auto-create user if they don't exist
            user = await db.user.create(
                data={
                    "clerkId": user_id,
                    "email": f"{user_id}@temp.com",
                }
            )
            # Create initial progress
            await db.userprogress.create(
                data={
                    "userId": user.id,
                    "currentLevel": "A1",
                }
            )

        # Build where clause
        where_clause: Dict[str, Any] = {"userId": user.id}

        vocab_where: Dict[str, Any] = {}
        if category:
            vocab_where["category"] = category
        if level:
            vocab_where["level"] = level

        if vocab_where:
            where_clause["vocabulary"] = vocab_where

        # Get all review items with vocabulary
        review_items = await db.reviewitem.find_many(
            where=where_clause,
            include={"vocabulary": True},
            order={"createdAt": "desc"}
        )

        return [
            VocabularyItemResponse(
                id=item.id,
                hebrew=item.vocabulary.hebrew,
                english=item.vocabulary.english,
                transliteration=item.vocabulary.transliteration,
                category=item.vocabulary.category,
                level=item.vocabulary.level,
                exampleSentence=item.vocabulary.exampleSentence,
                repetitions=item.repetitions,
                nextReview=item.nextReview,
            )
            for item in review_items
        ]

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting user vocabulary: {e}")
        raise HTTPException(status_code=500, detail=str(e))
