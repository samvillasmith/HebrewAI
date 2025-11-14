'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { VocabularyItem } from '@/types/interactive-lesson'
import { Volume2 } from 'lucide-react'

interface VocabularyIntroProps {
  item: VocabularyItem
  onContinue: () => void
  autoPlayAudio?: boolean
}

export default function VocabularyIntro({
  item,
  onContinue,
  autoPlayAudio = true
}: VocabularyIntroProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (autoPlayAudio) {
      playAudio()
    }

    // Cleanup function to stop audio when component unmounts or item changes
    return () => {
      // Abort any in-flight fetch requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      // Stop any playing audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [item.hebrew])

  const playAudio = async () => {
    try {
      // Abort any previous fetch
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }

      if (item.audioUrl) {
        const audio = new Audio(item.audioUrl)
        audioRef.current = audio
        await audio.play()
      } else {
        // Create new AbortController for this request
        const abortController = new AbortController()
        abortControllerRef.current = abortController

        // Fallback to TTS
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        const response = await fetch(`${apiUrl}/api/tts/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: item.hebrew, language: 'he' }),
          signal: abortController.signal
        })

        if (response.ok) {
          const audioBlob = await response.blob()
          const audioUrl = URL.createObjectURL(audioBlob)
          const audio = new Audio(audioUrl)
          audioRef.current = audio
          await audio.play()
        }
      }
    } catch (error) {
      // Ignore abort errors
      if (error instanceof Error && error.name === 'AbortError') {
        return
      }
      console.error('Error playing audio:', error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] space-y-8">
      {/* Image */}
      {item.image && (
        <div className="w-full max-w-md">
          <img
            src={item.image}
            alt={item.english}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Hebrew Word with Audio */}
      <div className="text-center space-y-4">
        <div
          className="flex items-center justify-center gap-3 cursor-pointer hover:scale-105 transition-transform"
          onClick={playAudio}
        >
          <Volume2 className="w-8 h-8 text-indigo-600" />
          <p className="text-6xl font-bold hebrew-text text-indigo-600">
            {item.hebrew}
          </p>
        </div>

        {/* Transliteration */}
        <p className="text-2xl text-gray-600 italic">
          {item.transliteration}
        </p>

        {/* English Translation */}
        <p className="text-3xl font-semibold text-gray-800">
          {item.english}
        </p>

        {/* Note if exists */}
        {item.note && (
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded max-w-md mx-auto">
            <p className="text-sm text-yellow-800">
              💡 {item.note}
            </p>
          </div>
        )}
      </div>

      {/* Continue Button */}
      <Button
        onClick={onContinue}
        size="lg"
        className="mt-8"
      >
        Continue
      </Button>
    </div>
  )
}
