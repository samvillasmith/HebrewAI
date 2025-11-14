'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Volume2, Check, X } from 'lucide-react'

interface DialogueLine {
  speaker: string // "user" or "other"
  hebrew: string
  english: string
  transliteration?: string
  audioUrl?: string
}

interface ConversationChoice {
  hebrew: string
  english: string
  transliteration?: string
  isCorrect: boolean
  feedback?: string
}

interface ConversationStep {
  context?: string // Optional context/scenario description
  dialogue: DialogueLine[] // Previous lines in the conversation
  choices: ConversationChoice[] // User's response options
}

interface ConversationExerciseProps {
  title: string
  scenario: string // Overall conversation scenario
  steps: ConversationStep[]
  onComplete: (score: number) => void
}

export default function ConversationExercise({
  title,
  scenario,
  steps,
  onComplete
}: ConversationExerciseProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [conversationHistory, setConversationHistory] = useState<DialogueLine[]>([])
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const currentStep = steps[currentStepIndex]
  const progress = ((currentStepIndex + (showFeedback ? 1 : 0)) / steps.length) * 100

  // Scroll to bottom when conversation updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversationHistory, currentStep])

  const playAudio = async (text: string, audioUrl?: string) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      audio.play()
      return
    }

    // Use TTS
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: 'he' })
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audio.play()
      } else {
        // Fallback to browser TTS
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'he-IL'
        utterance.rate = 0.9
        window.speechSynthesis.speak(utterance)
      }
    } catch (error) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'he-IL'
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleChoiceSelect = (index: number) => {
    if (showFeedback) return
    setSelectedChoice(index)
    setShowFeedback(true)

    const choice = currentStep.choices[index]
    if (choice.isCorrect) {
      setScore(score + 1)
    }

    // Add the selected choice to conversation history
    const newLine: DialogueLine = {
      speaker: 'user',
      hebrew: choice.hebrew,
      english: choice.english,
      transliteration: choice.transliteration
    }
    setConversationHistory([...conversationHistory, ...currentStep.dialogue, newLine])
  }

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
      setSelectedChoice(null)
      setShowFeedback(false)
    } else {
      const finalScore = Math.round((score / steps.length) * 100)
      onComplete(finalScore)
    }
  }

  // Combine conversation history with current step dialogue
  const fullConversation = showFeedback
    ? conversationHistory
    : [...conversationHistory, ...currentStep.dialogue]

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-sm text-muted-foreground">
            {currentStepIndex + 1} / {steps.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Scenario context */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-blue-900">
            <span className="font-semibold">Scenario:</span> {scenario}
          </p>
          {currentStep.context && (
            <p className="text-sm text-blue-800 mt-2">
              {currentStep.context}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Conversation history */}
      <Card className="max-h-96 overflow-y-auto">
        <CardContent className="p-4 space-y-3">
          {fullConversation.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              The conversation will appear here...
            </p>
          ) : (
            fullConversation.map((line, index) => (
              <div
                key={index}
                className={`flex ${line.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    line.speaker === 'user'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <p className={`hebrew-text text-xl mb-1 ${
                        line.speaker === 'user' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {line.hebrew}
                      </p>
                      {line.transliteration && (
                        <p className={`text-sm italic mb-1 ${
                          line.speaker === 'user' ? 'text-indigo-100' : 'text-gray-600'
                        }`}>
                          {line.transliteration}
                        </p>
                      )}
                      <p className={`text-sm ${
                        line.speaker === 'user' ? 'text-indigo-100' : 'text-gray-600'
                      }`}>
                        {line.english}
                      </p>
                    </div>
                    {line.speaker !== 'user' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-1 h-auto"
                        onClick={() => playAudio(line.hebrew, line.audioUrl)}
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </CardContent>
      </Card>

      {/* Response choices */}
      {!showFeedback && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            Choose your response:
          </p>
          <div className="grid gap-3">
            {currentStep.choices.map((choice, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 text-left justify-start hover:bg-indigo-50"
                onClick={() => handleChoiceSelect(index)}
              >
                <div className="w-full">
                  <p className="hebrew-text text-lg mb-1">{choice.hebrew}</p>
                  {choice.transliteration && (
                    <p className="text-sm text-muted-foreground italic mb-1">
                      {choice.transliteration}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">{choice.english}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      {showFeedback && selectedChoice !== null && (
        <Card className={
          currentStep.choices[selectedChoice].isCorrect
            ? 'bg-green-50 border-2 border-green-500'
            : 'bg-red-50 border-2 border-red-500'
        }>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {currentStep.choices[selectedChoice].isCorrect ? (
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              )}

              <div className="flex-1">
                <p className={`font-semibold mb-2 ${
                  currentStep.choices[selectedChoice].isCorrect
                    ? 'text-green-800'
                    : 'text-red-800'
                }`}>
                  {currentStep.choices[selectedChoice].isCorrect
                    ? 'Great choice!'
                    : 'Not the best response'}
                </p>

                {currentStep.choices[selectedChoice].feedback && (
                  <p className="text-sm text-gray-700 mb-2">
                    {currentStep.choices[selectedChoice].feedback}
                  </p>
                )}

                {!currentStep.choices[selectedChoice].isCorrect && (
                  <div className="mt-3 p-3 bg-white rounded border">
                    <p className="text-sm font-medium mb-2">Better response:</p>
                    {currentStep.choices.find(c => c.isCorrect) && (
                      <div>
                        <p className="hebrew-text text-lg">
                          {currentStep.choices.find(c => c.isCorrect)!.hebrew}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {currentStep.choices.find(c => c.isCorrect)!.english}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      {showFeedback && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Score: {score} / {currentStepIndex + 1}
          </div>
          <Button onClick={handleNext}>
            {currentStepIndex === steps.length - 1 ? 'Complete ✓' : 'Continue →'}
          </Button>
        </div>
      )}
    </div>
  )
}
