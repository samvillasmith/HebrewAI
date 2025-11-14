import { Gender, GenderedText } from '@/types/interactive-lesson'
import { resolveGenderedText } from './gender-utils'

export interface PlayAudioOptions {
  text: GenderedText
  gender: Gender
  language?: string
  audioUrl?: string
  abortSignal?: AbortSignal
}

/**
 * Plays audio for gendered text using TTS or a provided audio URL
 * Returns the Audio element for external control (pause, etc.)
 */
export async function playGenderedAudio({
  text,
  gender,
  language = 'he',
  audioUrl,
  abortSignal
}: PlayAudioOptions): Promise<HTMLAudioElement> {
  // Resolve the gendered text to the appropriate form
  const resolvedText = resolveGenderedText(text, gender)

  if (audioUrl) {
    const audio = new Audio(audioUrl)
    await audio.play()
    return audio
  }

  // Fallback to TTS with gender-specific voice
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  const response = await fetch(`${apiUrl}/api/tts/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: resolvedText,
      language,
      gender // Pass gender to backend for voice selection
    }),
    signal: abortSignal
  })

  if (!response.ok) {
    throw new Error('TTS request failed')
  }

  const audioBlob = await response.blob()
  const blobUrl = URL.createObjectURL(audioBlob)
  const audio = new Audio(blobUrl)
  await audio.play()
  return audio
}
