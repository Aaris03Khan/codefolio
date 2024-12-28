'use client'

import React, { useEffect, useState } from 'react'
import { useTypewriter } from '@/hooks/useTypewriter'
import '@/styles/typewriter.css'

interface TypewriterEffectProps {
  messages: string[]
  className?: string
  onComplete?: () => void
}

export const TypewriterEffect = ({ 
  messages, 
  className = '',
  onComplete 
}: TypewriterEffectProps) => {
  const { currentText, isTypingDone } = useTypewriter(messages)
  const [completedCount, setCompletedCount] = useState(0)

  
  // Trigger the onComplete callback when the last message is done typing
  useEffect(()=>{
    if(isTypingDone){
      if(completedCount === messages.length - 1){
        onComplete?.()
      }
      else{
        setCompletedCount(prev => prev + 1)
      }
    }
  },[isTypingDone])

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