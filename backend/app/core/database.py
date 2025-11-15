from prisma import Prisma

# Global Prisma client instance
# Will automatically use DATABASE_URL from .env
prisma = Prisma()


async def get_db():
    """Dependency for getting database connection"""
    if not prisma.is_connected():
        await prisma.connect()
    return prisma
