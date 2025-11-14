'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { VocabularyItem } from '@/types/interactive-lesson'
import { Volume2 } from 'lucide-react'
import { useGender } from '@/contexts/GenderContext'
import { resolveGenderedText } from '@/lib/gender-utils'
import { playGenderedAudio } from '@/lib/tts-utils'

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
  const { gender } = useGender()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Resolve gendered text
  const hebrew = resolveGenderedText(item.hebrew, gender)
  const transliteration = resolveGenderedText(item.transliteration, gender)

  useEffect(() => {
    if (autoPlayAudio) {
      playAudio()
    }

    // Cleanup function to stop audio when component unmounts or item/gender changes
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
  }, [hebrew]) // Depend on resolved hebrew text which changes with gender

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

      // Create new AbortController for this request
      const abortController = new AbortController()
      abortControllerRef.current = abortController

      // Use the gender-aware audio playback
      const audio = await playGenderedAudio({
        text: item.hebrew,
        gender,
        language: 'he',
        audioUrl: item.audioUrl,
        abortSignal: abortController.signal
      })

      audioRef.current = audio
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
            {hebrew}
          </p>
        </div>

        {/* Transliteration */}
        <p className="text-2xl text-gray-600 italic">
          {transliteration}
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
