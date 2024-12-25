import { useState, useEffect } from 'react'

interface TypewriterState {
  currentText: string
  isTypingDone: boolean
}

export const useTypewriter = (messages: string[]): TypewriterState => {
  const [currentText, setCurrentText] = useState('')
  const [messageIndex, setMessageIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTypingDone, setIsTypingDone] = useState(false)

  useEffect(() => {
    const text = messages[messageIndex]
    const speed = isDeleting ? 50 : 100

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === text) {
        setIsTypingDone(true)
        setTimeout(() => {
          setIsTypingDone(false)
          setIsDeleting(true)
        }, 2000)
        return
      }

      if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setMessageIndex((prev) => (prev + 1) % messages.length)
        return
      }

      setCurrentText(prev => 
        isDeleting 
          ? prev.slice(0, -1)
          : text.slice(0, prev.length + 1)
      )
    }, speed)

    return () => clearTimeout(timer)
  }, [currentText, messageIndex, isDeleting, messages])

  return {
    currentText,
    isTypingDone
  }
}