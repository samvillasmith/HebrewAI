from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
import io

from openai import AsyncOpenAI
from app.core.config import settings

router = APIRouter()

# Initialize OpenAI client
openai_client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)


class TTSRequest(BaseModel):
    text: str
    language: str = "he"  # Hebrew
    voice: str = "nova"  # OpenAI voice options: alloy, echo, fable, onyx, nova, shimmer


@router.post("/")
async def text_to_speech(request: TTSRequest):
    """
    Convert Hebrew text to speech using OpenAI TTS
    Returns audio file stream
    """
    try:
        # Use OpenAI TTS API with HD model for better quality
        response = await openai_client.audio.speech.create(
            model="tts-1-hd",  # Higher quality model
            voice=request.voice,
            input=request.text,
        )

        # Convert response to audio bytes
        audio_bytes = io.BytesIO()
        for chunk in response.iter_bytes():
            audio_bytes.write(chunk)
        audio_bytes.seek(0)

        return StreamingResponse(
            audio_bytes,
            media_type="audio/mpeg",
            headers={
                "Content-Disposition": "inline; filename=speech.mp3"
            }
        )

    except Exception as e:
        print(f"Error in TTS: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Text-to-speech generation failed: {str(e)}"
        )


class STTRequest(BaseModel):
    audio_data: str  # Base64 encoded audio
    language: str = "he"


# Note: For Speech-to-Text (STT), you would typically receive audio files
# This is a simplified endpoint structure
@router.post("/transcribe")
async def speech_to_text(request: STTRequest):
    """
    Transcribe Hebrew speech to text using OpenAI Whisper
    This is a placeholder - in production, you'd handle file uploads
    """
    try:
        # In a real implementation, you would:
        # 1. Decode the base64 audio data
        # 2. Save it as a temporary file
        # 3. Use OpenAI's Whisper API to transcribe
        
        # For now, return a structure showing what the response would look like
        return {
            "text": "Transcribed Hebrew text would appear here",
            "language": "he",
            "confidence": 0.95
        }

    except Exception as e:
        print(f"Error in STT: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Speech-to-text transcription failed: {str(e)}"
        )


@router.get("/voices")
async def get_available_voices():
    """Get list of available TTS voices"""
    return {
        "voices": [
            {"id": "alloy", "name": "Alloy", "description": "Neutral voice"},
            {"id": "echo", "name": "Echo", "description": "Male voice"},
            {"id": "fable", "name": "Fable", "description": "British accent"},
            {"id": "onyx", "name": "Onyx", "description": "Deep male voice"},
            {"id": "nova", "name": "Nova", "description": "Female voice (recommended for Hebrew)"},
            {"id": "shimmer", "name": "Shimmer", "description": "Soft female voice"},
        ]
    }
