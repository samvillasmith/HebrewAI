'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MatchPairItem } from '@/types/interactive-lesson'
import { Check } from 'lucide-react'
import { useGender } from '@/contexts/GenderContext'
import { resolveGenderedText } from '@/lib/gender-utils'

interface MatchPairsExerciseProps {
  pairs: MatchPairItem[]
  onComplete: () => void
}

export default function MatchPairsExercise({
  pairs,
  onComplete
}: MatchPairsExerciseProps) {
  const { gender } = useGender()
  const [leftItems, setLeftItems] = useState<string[]>([])
  const [rightItems, setRightItems] = useState<string[]>([])
  const [selected, setSelected] = useState<{ side: 'left' | 'right'; index: number } | null>(null)
  const [matches, setMatches] = useState<Map<number, number>>(new Map())
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Resolve gendered text and shuffle right items for challenge
    const resolvedLeft = pairs.map(p => resolveGenderedText(p.left, gender))
    const shuffledRight = [...pairs.map(p => p.right)].sort(() => Math.random() - 0.5)
    setLeftItems(resolvedLeft)
    setRightItems(shuffledRight)
  }, [pairs, gender])

  const handleSelect = (side: 'left' | 'right', index: number) => {
    // If already matched, ignore
    if (side === 'left' && Array.from(matches.keys()).includes(index)) return
    if (side === 'right' && Array.from(matches.values()).includes(index)) return

    if (!selected) {
      setSelected({ side, index })
    } else if (selected.side !== side) {
      // Check if it's a match
      const leftIdx = side === 'left' ? index : selected.index
      const rightIdx = side === 'right' ? index : selected.index

      const leftValue = leftItems[leftIdx]
      const rightValue = rightItems[rightIdx]

      // Find if this is a correct pair by comparing resolved left value with right value
      const isCorrectPair = pairs.some(pair =>
        resolveGenderedText(pair.left, gender) === leftValue && pair.right === rightValue
      )

      if (isCorrectPair) {
        const newMatches = new Map(matches)
        newMatches.set(leftIdx, rightIdx)
        setMatches(newMatches)

        if (newMatches.size === pairs.length) {
          setIsComplete(true)
          setTimeout(() => {
            onComplete()
          }, 2000)
        }
      }

      setSelected(null)
    } else {
      setSelected({ side, index })
    }
  }

  const isMatched = (side: 'left' | 'right', index: number) => {
    if (side === 'left') return matches.has(index)
    return Array.from(matches.values()).includes(index)
  }

  const isSelected = (side: 'left' | 'right', index: number) => {
    return selected?.side === side && selected?.index === index
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8">
      {/* Instruction */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">Match the Hebrew with the English</h3>
        <p className="text-gray-600">
          {matches.size} / {pairs.length} matched
        </p>
      </div>

      {/* Matching Area */}
      <div className="grid grid-cols-2 gap-8 w-full max-w-3xl">
        {/* Left Column */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-600 text-center mb-3">Left Column</p>
          {leftItems.map((item, index) => (
            <Card
              key={`left-${index}`}
              className={`cursor-pointer transition-all ${
                isMatched('left', index)
                  ? 'bg-green-50 border-green-500 border-2'
                  : isSelected('left', index)
                  ? 'bg-indigo-50 border-indigo-500 border-2'
                  : 'hover:bg-gray-50 border-2 border-gray-200'
              }`}
              onClick={() => handleSelect('left', index)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <p className="text-2xl hebrew-text font-medium">{item}</p>
                {isMatched('left', index) && (
                  <Check className="w-6 h-6 text-green-600" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-600 text-center mb-3">Right Column</p>
          {rightItems.map((item, index) => (
            <Card
              key={`right-${index}`}
              className={`cursor-pointer transition-all ${
                isMatched('right', index)
                  ? 'bg-green-50 border-green-500 border-2'
                  : isSelected('right', index)
                  ? 'bg-indigo-50 border-indigo-500 border-2'
                  : 'hover:bg-gray-50 border-2 border-gray-200'
              }`}
              onClick={() => handleSelect('right', index)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <p className="text-lg font-medium">{item}</p>
                {isMatched('right', index) && (
                  <Check className="w-6 h-6 text-green-600" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div className="text-center space-y-2 animate-bounce">
          <div className="text-5xl">🎉</div>
          <p className="text-2xl font-semibold text-green-600">All correct!</p>
        </div>
      )}
    </div>
  )
}
