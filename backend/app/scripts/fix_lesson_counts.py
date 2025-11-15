"""
Script to fix corrupted lessonsComplete counts in the database.

This script recalculates the correct number of completed lessons for each user
by counting unique completed lessons in the LessonProgress table.
"""

import asyncio
import sys
from pathlib import Path

# Add parent directory to path to import app modules
sys.path.append(str(Path(__file__).parent.parent.parent))

from app.core.database import get_db


async def fix_lesson_counts():
    """Recalculate and fix lessonsComplete for all users"""

    db = await get_db()

    try:
        print("Fetching all users...")
        users = await db.user.find_many(
            include={
                "progress": True,
                "lessonProgress": True,
            }
        )

        print(f"Found {len(users)} users to process\n")

        fixed_count = 0

        for user in users:
            # Count unique completed lessons
            completed_lessons = [
                lp for lp in user.lessonProgress
                if lp.isCompleted
            ]
            correct_count = len(completed_lessons)

            if user.progress:
                current_count = user.progress.lessonsComplete

                if current_count != correct_count:
                    print(f"User {user.clerkId}:")
                    print(f"   [X] Incorrect count: {current_count}")
                    print(f"   [OK] Correct count: {correct_count}")

                    # Update to correct count
                    await db.userprogress.update(
                        where={"userId": user.id},
                        data={"lessonsComplete": correct_count}
                    )

                    print(f"   Fixed!\n")
                    fixed_count += 1
                else:
                    print(f"[OK] User {user.clerkId}: Already correct ({correct_count} lessons)")
            else:
                if correct_count > 0:
                    # User has completed lessons but no progress record
                    print(f"User {user.clerkId}:")
                    print(f"   [!] No progress record, but has {correct_count} completed lessons")
                    print(f"   Creating progress record...")

                    await db.userprogress.create(
                        data={
                            "userId": user.id,
                            "currentLevel": "A1",
                            "xpPoints": correct_count * 100,  # Award retroactive XP
                            "streakDays": 0,
                            "lessonsComplete": correct_count,
                        }
                    )

                    print(f"   Created!\n")
                    fixed_count += 1

        print("=" * 60)
        print(f"Complete! Fixed {fixed_count} user(s)")
        print("=" * 60)

    except Exception as e:
        print(f"[ERROR] {e}")
        import traceback
        traceback.print_exc()
    finally:
        await db.disconnect()


if __name__ == "__main__":
    print("=" * 60)
    print("Lesson Count Repair Script")
    print("=" * 60)
    print()

    asyncio.run(fix_lesson_counts())
