"""
Refresh user vocabulary by re-processing completed lessons with updated vocabulary
This will remove placeholder vocabulary and add real Hebrew words
"""
import asyncio
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.core.database import prisma
from app.services.vocabulary_service import vocabulary_service
from dotenv import load_dotenv

load_dotenv()

async def main():
    await prisma.connect()

    try:
        # Get all users
        users = await prisma.user.find_many()

        for user in users:
            print(f"\n[PROCESSING] User: {user.clerkId}")

            # Get user's completed lessons
            completed_lesson_progress = await prisma.lessonprogress.find_many(
                where={
                    "userId": user.id,
                    "isCompleted": True
                },
                include={"lesson": True}
            )

            if not completed_lesson_progress:
                print(f"  [SKIP] No completed lessons")
                continue

            print(f"  Found {len(completed_lesson_progress)} completed lessons")

            # Clear old review items with placeholder vocabulary
            old_review_items = await prisma.reviewitem.find_many(
                where={"userId": user.id},
                include={"vocabulary": True}
            )

            # Delete review items that have "placeholder" in hebrew or english
            deleted_count = 0
            for item in old_review_items:
                if (item.vocabulary.hebrew == "placeholder" or
                    item.vocabulary.english == "placeholder"):
                    await prisma.reviewitem.delete(where={"id": item.id})
                    deleted_count += 1

            if deleted_count > 0:
                print(f"  [CLEANUP] Removed {deleted_count} placeholder vocabulary items")

            # Re-process each completed lesson to add real vocabulary
            total_words_added = 0
            for lp in completed_lesson_progress:
                lesson_id = lp.lesson.id
                result = await vocabulary_service.process_lesson_completion(
                    user.id, lesson_id
                )

                if result["new_words_added"] > 0:
                    print(f"  [OK] {lp.lesson.title}: Added {result['new_words_added']} words")
                    total_words_added += result["new_words_added"]

            print(f"\n  [SUCCESS] Total words added for user: {total_words_added}")

        print(f"\n[COMPLETE] Refreshed vocabulary for {len(users)} users!")

    except Exception as e:
        import traceback
        print(f"[ERROR] {e}")
        print(traceback.format_exc())
    finally:
        await prisma.disconnect()

if __name__ == "__main__":
    asyncio.run(main())
