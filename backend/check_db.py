import asyncio
from prisma import Prisma

async def check_database():
    db = Prisma()
    await db.connect()

    try:
        lessons = await db.lesson.find_many()
        print(f"\n✅ Found {len(lessons)} lessons in database")

        if lessons:
            print("\nFirst lesson sample:")
            lesson = lessons[0]
            print(f"  - Title: {lesson.title}")
            print(f"  - Level: {lesson.level}")

            # Check if exercises field exists (new schema)
            if hasattr(lesson, 'exercises'):
                print(f"  - Exercises: {lesson.exercises is not None}")
                print("  ✅ NEW SCHEMA DETECTED (exercises field exists)")
            else:
                print("  ❌ OLD SCHEMA (no exercises field)")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        await db.disconnect()

if __name__ == "__main__":
    asyncio.run(check_database())
