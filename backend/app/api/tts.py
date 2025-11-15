from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
import io
import os

from app.core.config import settings

router = APIRouter()

# Initialize Google Cloud TTS client
tts_client = None
try:
    from google.cloud import texttospeech
    if settings.GOOGLE_APPLICATION_CREDENTIALS:
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = settings.GOOGLE_APPLICATION_CREDENTIALS
    tts_client = texttospeech.TextToSpeechClient()
except Exception as e:
    print(f"Warning: Google Cloud TTS not available: {e}")
    texttospeech = None


class TTSRequest(BaseModel):
    text: str
    language: str = "he"  # Hebrew
    voice: Optional[str] = None  # Optional: specific voice override
    gender: Optional[str] = None  # "male" or "female" for automatic voice selection


@router.post("/")
async def text_to_speech(request: TTSRequest):
    """
    Convert Hebrew text to speech using Google Cloud TTS
    Returns audio file stream with accurate Hebrew pronunciation
    """
    try:
        # Prepare the text input
        synthesis_input = texttospeech.SynthesisInput(text=request.text)

        # Select voice based on gender or use explicit voice
        if request.voice:
            # Use explicitly specified voice
            voice_name = request.voice
        elif request.gender:
            # Map gender to appropriate high-quality Wavenet voice
            if request.gender.lower() == "male":
                voice_name = "he-IL-Wavenet-B"  # Male voice
            else:
                voice_name = "he-IL-Wavenet-A"  # Female voice (default)
        else:
            # Default to female voice
            voice_name = "he-IL-Wavenet-A"

        # Configure voice parameters for Hebrew
        # Extract language code from voice name (e.g., "he-IL-Wavenet-A" -> "he-IL")
        language_code = "-".join(voice_name.split("-")[:2]) if "-" in voice_name else "he-IL"

        voice = texttospeech.VoiceSelectionParams(
            language_code=language_code,
            name=voice_name,
        )

        # Configure audio output with high quality
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3,
            speaking_rate=0.9,  # Slightly slower for language learning
            pitch=0.0,
        )

        # Perform the text-to-speech request
        response = tts_client.synthesize_speech(
            input=synthesis_input,
            voice=voice,
            audio_config=audio_config
        )

        # Convert response to audio bytes
        audio_bytes = io.BytesIO(response.audio_content)
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
    """Get list of available Hebrew TTS voices from Google Cloud"""
    return {
        "voices": [
            {"id": "he-IL-Wavenet-A", "name": "Wavenet-A", "description": "Female voice (recommended)", "gender": "female"},
            {"id": "he-IL-Wavenet-B", "name": "Wavenet-B", "description": "Male voice", "gender": "male"},
            {"id": "he-IL-Wavenet-C", "name": "Wavenet-C", "description": "Female voice", "gender": "female"},
            {"id": "he-IL-Wavenet-D", "name": "Wavenet-D", "description": "Male voice", "gender": "male"},
            {"id": "he-IL-Standard-A", "name": "Standard-A", "description": "Female voice (standard quality)", "gender": "female"},
            {"id": "he-IL-Standard-B", "name": "Standard-B", "description": "Male voice (standard quality)", "gender": "male"},
            {"id": "he-IL-Standard-C", "name": "Standard-C", "description": "Female voice (standard quality)", "gender": "female"},
            {"id": "he-IL-Standard-D", "name": "Standard-D", "description": "Male voice (standard quality)", "gender": "male"},
        ]
    }
