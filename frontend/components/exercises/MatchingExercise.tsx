'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface MatchPair {
  left: string
  right: string
}

interface MatchingExerciseProps {
  title: string
  pairs: MatchPair[]
  onComplete: (score: number) => void
}

export default function MatchingExercise({ title, pairs, onComplete }: MatchingExerciseProps) {
  const [leftItems, setLeftItems] = useState<string[]>([])
  const [rightItems, setRightItems] = useState<string[]>([])
  const [selected, setSelected] = useState<{ side: 'left' | 'right'; index: number } | null>(null)
  const [matches, setMatches] = useState<Map<number, number>>(new Map())
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Shuffle right items for challenge
    const shuffledRight = [...pairs.map(p => p.right)].sort(() => Math.random() - 0.5)
    setLeftItems(pairs.map(p => p.left))
    setRightItems(shuffledRight)
  }, [pairs])

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

      // Find if this is a correct pair
      const isCorrectPair = pairs.some(pair => pair.left === leftValue && pair.right === rightValue)

      if (isCorrectPair) {
        const newMatches = new Map(matches)
        newMatches.set(leftIdx, rightIdx)
        setMatches(newMatches)

        if (newMatches.size === pairs.length) {
          setIsComplete(true)
          onComplete(100)
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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Click pairs that match. {matches.size} / {pairs.length} matched
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-3">
          {leftItems.map((item, index) => (
            <Card
              key={`left-${index}`}
              className={`cursor-pointer transition-all ${
                isMatched('left', index)
                  ? 'bg-green-50 border-green-500'
                  : isSelected('left', index)
                  ? 'bg-indigo-50 border-indigo-500 border-2'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSelect('left', index)}
            >
              <CardContent className="p-4">
                <p className="text-2xl hebrew-text text-center">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {rightItems.map((item, index) => (
            <Card
              key={`right-${index}`}
              className={`cursor-pointer transition-all ${
                isMatched('right', index)
                  ? 'bg-green-50 border-green-500'
                  : isSelected('right', index)
                  ? 'bg-indigo-50 border-indigo-500 border-2'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSelect('right', index)}
            >
              <CardContent className="p-4">
                <p className="text-lg text-center">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {isComplete && (
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <p className="text-2xl font-semibold text-green-700">🎉 Perfect! All matched!</p>
        </div>
      )}
    </div>
  )
}
