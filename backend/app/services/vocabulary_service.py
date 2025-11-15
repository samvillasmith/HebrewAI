from typing import List, Dict, Any, Optional
from datetime import datetime
import json
from app.core.database import prisma


class VocabularyService:
    """Service for managing vocabulary items and user review tracking"""

    async def extract_vocabulary_from_lessons(
        self, lesson_ids: List[str]
    ) -> List[Dict[str, Any]]:
        """
        Extract all vocabulary from a list of lessons
        Returns a list of vocabulary items with their metadata
        """
        lessons = await prisma.lesson.find_many(
            where={"id": {"in": lesson_ids}},
            include={"course": True}
        )

        vocabulary_items = []
        seen_words = set()  # Avoid duplicates

        for lesson in lessons:
            if not lesson.vocabulary:
                continue

            # Parse vocabulary JSON
            vocab_list = lesson.vocabulary
            if isinstance(vocab_list, str):
                try:
                    vocab_list = json.loads(vocab_list)
                except:
                    vocab_list = []
            if not isinstance(vocab_list, list):
                vocab_list = []

            for vocab in vocab_list:
                # Extract hebrew word as unique identifier
                hebrew_word = vocab.get("hebrew", "")
                if not hebrew_word or hebrew_word in seen_words:
                    continue

                seen_words.add(hebrew_word)

                # Determine category from lesson tags
                category = lesson.tags[0] if lesson.tags else "general"

                vocabulary_items.append({
                    "hebrew": hebrew_word,
                    "english": vocab.get("english", ""),
                    "transliteration": vocab.get("transliteration"),
                    "level": lesson.level,
                    "category": category,
                    "exampleSentence": vocab.get("note") or vocab.get("example"),
                    "audioUrl": vocab.get("audioUrl"),
                })

        return vocabulary_items

    async def add_vocabulary_to_database(
        self, vocabulary_items: List[Dict[str, Any]]
    ) -> List[str]:
        """
        Add vocabulary items to the database (upsert to avoid duplicates)
        Returns list of vocabulary IDs
        """
        vocabulary_ids = []

        for item in vocabulary_items:
            # Check if vocabulary already exists
            existing = await prisma.vocabularyitem.find_first(
                where={
                    "hebrew": item["hebrew"],
                    "english": item["english"]
                }
            )

            if existing:
                vocabulary_ids.append(existing.id)
            else:
                # Create new vocabulary item
                vocab = await prisma.vocabularyitem.create(
                    data={
                        "hebrew": item["hebrew"],
                        "english": item["english"],
                        "transliteration": item.get("transliteration"),
                        "level": item["level"],
                        "category": item["category"],
                        "exampleSentence": item.get("exampleSentence"),
                        "audioUrl": item.get("audioUrl"),
                    }
                )
                vocabulary_ids.append(vocab.id)

        return vocabulary_ids

    async def add_words_to_user_review(
        self, user_id: str, vocabulary_ids: List[str]
    ) -> int:
        """
        Add vocabulary items to user's review queue
        Returns number of new words added
        """
        new_words_count = 0

        for vocab_id in vocabulary_ids:
            # Check if review item already exists for this user
            existing = await prisma.reviewitem.find_first(
                where={
                    "userId": user_id,
                    "vocabularyId": vocab_id
                }
            )

            if not existing:
                # Create new review item with spaced repetition defaults
                await prisma.reviewitem.create(
                    data={
                        "userId": user_id,
                        "vocabularyId": vocab_id,
                        "interval": 1,  # Review tomorrow
                        "easeFactor": 2.5,  # Default ease
                        "repetitions": 0,
                        "nextReview": datetime.utcnow(),  # Available for review immediately
                    }
                )
                new_words_count += 1

        return new_words_count

    async def process_lesson_completion(
        self, user_id: str, lesson_id: str
    ) -> Dict[str, Any]:
        """
        Process lesson completion: extract vocabulary and add to user's review queue
        Returns summary of words added
        """
        # Extract vocabulary from this lesson
        vocabulary_items = await self.extract_vocabulary_from_lessons([lesson_id])

        if not vocabulary_items:
            return {
                "total_words": 0,
                "new_words_added": 0,
                "message": "No vocabulary found in this lesson"
            }

        # Add vocabulary to database
        vocabulary_ids = await self.add_vocabulary_to_database(vocabulary_items)

        # Add to user's review queue
        new_words_count = await self.add_words_to_user_review(user_id, vocabulary_ids)

        return {
            "total_words": len(vocabulary_items),
            "new_words_added": new_words_count,
            "message": f"Added {new_words_count} new words to your vocabulary review"
        }

    async def process_course_completion(
        self, user_id: str, course_id: str
    ) -> Dict[str, Any]:
        """
        Process course completion: extract vocabulary and add to user's review queue
        Returns summary of words added
        """
        # Get all lessons in the course
        lessons = await prisma.lesson.find_many(
            where={"courseId": course_id},
            order={"order": "asc"}
        )

        lesson_ids = [lesson.id for lesson in lessons]

        # Extract vocabulary from lessons
        vocabulary_items = await self.extract_vocabulary_from_lessons(lesson_ids)

        if not vocabulary_items:
            return {
                "total_words": 0,
                "new_words_added": 0,
                "message": "No vocabulary found in this course"
            }

        # Add vocabulary to database
        vocabulary_ids = await self.add_vocabulary_to_database(vocabulary_items)

        # Add to user's review queue
        new_words_count = await self.add_words_to_user_review(user_id, vocabulary_ids)

        return {
            "total_words": len(vocabulary_items),
            "new_words_added": new_words_count,
            "message": f"Added {new_words_count} new words to your vocabulary review"
        }

    async def get_user_review_words(
        self, user_id: str, limit: Optional[int] = None
    ) -> List[Dict[str, Any]]:
        """
        Get user's vocabulary words that are due for review
        """
        from datetime import timezone
        now = datetime.now(timezone.utc)

        query = {
            "where": {
                "userId": user_id,
                "nextReview": {"lte": now}
            },
            "include": {"vocabulary": True},
            "order": {"nextReview": "asc"}
        }

        if limit:
            query["take"] = limit

        review_items = await prisma.reviewitem.find_many(**query)

        return [
            {
                "id": item.id,
                "hebrew": item.vocabulary.hebrew,
                "english": item.vocabulary.english,
                "transliteration": item.vocabulary.transliteration,
                "category": item.vocabulary.category,
                "level": item.vocabulary.level,
                "exampleSentence": item.vocabulary.exampleSentence,
                "repetitions": item.repetitions,
                "nextReview": item.nextReview,
            }
            for item in review_items
        ]

    async def update_review_item(
        self, review_item_id: str, quality: int
    ) -> Dict[str, Any]:
        """
        Update review item based on user's recall quality (0-5)
        Uses SM-2 spaced repetition algorithm

        Quality scale:
        5 - Perfect recall
        4 - Correct with hesitation
        3 - Correct with difficulty
        2 - Incorrect but familiar
        1 - Incorrect, barely familiar
        0 - Complete blackout
        """
        review_item = await prisma.reviewitem.find_unique(
            where={"id": review_item_id}
        )

        if not review_item:
            raise ValueError("Review item not found")

        # SM-2 Algorithm
        ease_factor = review_item.easeFactor
        interval = review_item.interval
        repetitions = review_item.repetitions

        if quality >= 3:
            # Correct response
            if repetitions == 0:
                interval = 1
            elif repetitions == 1:
                interval = 6
            else:
                interval = int(interval * ease_factor)

            repetitions += 1
        else:
            # Incorrect response - reset
            repetitions = 0
            interval = 1

        # Update ease factor
        ease_factor = max(1.3, ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

        # Calculate next review date
        from datetime import timedelta
        next_review = datetime.utcnow() + timedelta(days=interval)

        # Update review item
        updated = await prisma.reviewitem.update(
            where={"id": review_item_id},
            data={
                "interval": interval,
                "easeFactor": ease_factor,
                "repetitions": repetitions,
                "nextReview": next_review,
                "lastReviewed": datetime.utcnow(),
            }
        )

        return {
            "nextReview": next_review,
            "interval": interval,
            "repetitions": repetitions,
        }


# Singleton instance
vocabulary_service = VocabularyService()
