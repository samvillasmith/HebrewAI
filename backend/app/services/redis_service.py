import redis.asyncio as redis
import json
from typing import Optional, Any, List
from datetime import timedelta

from app.core.config import settings


class RedisService:
    def __init__(self):
        self.redis_client: Optional[redis.Redis] = None

    async def connect(self):
        """Connect to Redis"""
        if not self.redis_client:
            self.redis_client = await redis.from_url(
                settings.REDIS_URL, encoding="utf-8", decode_responses=True
            )

    async def disconnect(self):
        """Disconnect from Redis"""
        if self.redis_client:
            await self.redis_client.close()

    async def get(self, key: str) -> Optional[Any]:
        """Get value from Redis"""
        if not self.redis_client:
            await self.connect()

        value = await self.redis_client.get(key)
        if value:
            try:
                return json.loads(value)
            except json.JSONDecodeError:
                return value
        return None

    async def set(
        self, key: str, value: Any, expiry: Optional[int] = None
    ) -> bool:
        """Set value in Redis with optional expiry (in seconds)"""
        if not self.redis_client:
            await self.connect()

        if isinstance(value, (dict, list)):
            value = json.dumps(value)

        if expiry:
            return await self.redis_client.setex(key, expiry, value)
        return await self.redis_client.set(key, value)

    async def delete(self, key: str) -> bool:
        """Delete key from Redis"""
        if not self.redis_client:
            await self.connect()

        return await self.redis_client.delete(key) > 0

    async def exists(self, key: str) -> bool:
        """Check if key exists"""
        if not self.redis_client:
            await self.connect()

        return await self.redis_client.exists(key) > 0

    # Conversation-specific methods
    async def cache_conversation(
        self, conversation_id: str, messages: List[dict], expiry: int = 3600
    ):
        """Cache conversation messages"""
        key = f"conversation:{conversation_id}"
        await self.set(key, messages, expiry)

    async def get_cached_conversation(
        self, conversation_id: str
    ) -> Optional[List[dict]]:
        """Get cached conversation"""
        key = f"conversation:{conversation_id}"
        return await self.get(key)

    async def append_message(
        self, conversation_id: str, message: dict, expiry: int = 3600
    ):
        """Append message to cached conversation"""
        key = f"conversation:{conversation_id}"
        messages = await self.get_cached_conversation(conversation_id) or []
        messages.append(message)
        await self.set(key, messages, expiry)

    # User session methods
    async def cache_user_session(
        self, user_id: str, session_data: dict, expiry: int = 86400
    ):
        """Cache user session data"""
        key = f"session:{user_id}"
        await self.set(key, session_data, expiry)

    async def get_user_session(self, user_id: str) -> Optional[dict]:
        """Get user session data"""
        key = f"session:{user_id}"
        return await self.get(key)

    # Rate limiting
    async def check_rate_limit(
        self, user_id: str, limit: int = 100, window: int = 3600
    ) -> tuple[bool, int]:
        """
        Check if user has exceeded rate limit
        Returns: (is_allowed, remaining_requests)
        """
        if not self.redis_client:
            await self.connect()

        key = f"rate_limit:{user_id}"
        current = await self.redis_client.get(key)

        if current is None:
            await self.redis_client.setex(key, window, 1)
            return True, limit - 1

        current_count = int(current)
        if current_count >= limit:
            return False, 0

        await self.redis_client.incr(key)
        return True, limit - current_count - 1

    # Vocabulary practice tracking
    async def track_vocabulary_practice(
        self, user_id: str, word: str, is_correct: bool
    ):
        """Track vocabulary practice for spaced repetition"""
        key = f"vocab:{user_id}:{word}"
        data = await self.get(key) or {
            "correct": 0,
            "incorrect": 0,
            "last_practiced": None,
        }

        if is_correct:
            data["correct"] += 1
        else:
            data["incorrect"] += 1

        from datetime import datetime

        data["last_practiced"] = datetime.utcnow().isoformat()

        await self.set(key, data, expiry=86400 * 30)  # 30 days


# Singleton instance
redis_service = RedisService()
