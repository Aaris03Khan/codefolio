'use client'

import React from 'react'
import { useTypewriter } from '@/hooks/useTypewriter'
import '@/styles/typewriter.css'

interface TypewriterEffectProps {
  messages: string[]
  className?: string
}

export const TypewriterEffect = ({ messages, className = '' }: TypewriterEffectProps) => {
  const { currentText, isTypingDone } = useTypewriter(messages)

  return (
    <div className="flex items-center justify-center">
      <div className={`font-mono leading-tight ${className}`}>
        {currentText}
        <span className={`typewriter-cursor ${isTypingDone ? 'blinking' : ''}`}>
          |
        </span>
      </div>
    </div>
  )
}

export default TypewriterEffect