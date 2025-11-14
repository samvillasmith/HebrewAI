from prisma import Prisma

# Global Prisma client instance
prisma = Prisma()


async def get_db():
    """Dependency for getting database connection"""
    return prisma
