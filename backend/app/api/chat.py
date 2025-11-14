from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict

from app.services.openai_service import openai_service
from app.services.redis_service import redis_service
from app.core.database import get_db

router = APIRouter()


class Message(BaseModel):
    role: str
    content: str
    translation: Optional[str] = None


class ChatRequest(BaseModel):
    message: str
    conversation_history: List[Dict[str, str]] = []
    lesson_id: Optional[str] = None
    user_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    translation: Optional[str] = None
    conversation_id: Optional[str] = None


@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    db=Depends(get_db),
):
    """
    Main chat endpoint for Hebrew AI tutor
    Supports RAG-based responses with conversation history
    """
    try:
        # Get user level (default to A1 if not provided)
        user_level = "A1"
        if request.user_id:
            user = await db.user.find_unique(where={"clerkId": request.user_id})
            if user and user.progress:
                user_level = user.progress.currentLevel

        # Check rate limit if user_id provided
        if request.user_id:
            is_allowed, remaining = await redis_service.check_rate_limit(
                request.user_id, limit=100, window=3600
            )
            if not is_allowed:
                raise HTTPException(
                    status_code=429,
                    detail="Rate limit exceeded. Please try again later.",
                )

        # Get AI response with RAG
        result = await openai_service.hebrew_tutor_response(
            user_message=request.message,
            conversation_history=request.conversation_history,
            user_level=user_level,
            lesson_id=request.lesson_id,
        )

        # Cache conversation if user_id provided
        conversation_id = None
        if request.user_id:
            # Create or update conversation in database
            conversation = await db.conversation.create(
                data={
                    "userId": request.user_id,
                    "lessonId": request.lesson_id,
                }
            )
            conversation_id = conversation.id

            # Save messages
            await db.message.create(
                data={
                    "conversationId": conversation_id,
                    "role": "user",
                    "content": request.message,
                }
            )

            await db.message.create(
                data={
                    "conversationId": conversation_id,
                    "role": "assistant",
                    "content": result["response"],
                    "translation": result.get("translation"),
                }
            )

            # Cache in Redis for faster access
            await redis_service.append_message(
                conversation_id,
                {"role": "user", "content": request.message},
            )
            await redis_service.append_message(
                conversation_id,
                {
                    "role": "assistant",
                    "content": result["response"],
                    "translation": result.get("translation"),
                },
            )

        return ChatResponse(
            response=result["response"],
            translation=result.get("translation"),
            conversation_id=conversation_id,
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/conversation/{conversation_id}")
async def get_conversation(
    conversation_id: str,
    db=Depends(get_db),
):
    """Get conversation history"""
    try:
        # Try Redis cache first
        cached = await redis_service.get_cached_conversation(conversation_id)
        if cached:
            return {"messages": cached}

        # Fall back to database
        conversation = await db.conversation.find_unique(
            where={"id": conversation_id}, include={"messages": True}
        )

        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")

        messages = [
            {
                "role": msg.role,
                "content": msg.content,
                "translation": msg.translation,
                "created_at": msg.createdAt.isoformat(),
            }
            for msg in conversation.messages
        ]

        # Cache for next time
        await redis_service.cache_conversation(conversation_id, messages)

        return {"messages": messages}

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting conversation: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
