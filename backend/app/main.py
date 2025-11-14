from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

from app.api import chat, lessons, users, tts
from app.core.database import prisma

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await prisma.connect()
    print("✅ Connected to database")
    yield
    # Shutdown
    await prisma.disconnect()
    print("✅ Disconnected from database")


app = FastAPI(
    title="Hebrew AI API",
    description="AI-powered Hebrew learning platform API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS configuration
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(lessons.router, prefix="/api/lessons", tags=["Lessons"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(tts.router, prefix="/api/tts", tags=["Text-to-Speech"])


@app.get("/")
async def root():
    return {
        "message": "Hebrew AI API",
        "version": "1.0.0",
        "status": "running",
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=os.getenv("API_HOST", "0.0.0.0"),
        port=int(os.getenv("API_PORT", 8000)),
        reload=True,
    )
