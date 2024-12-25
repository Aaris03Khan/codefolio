import { useInView } from 'framer-motion'
import { useRef } from 'react'

export const useScrollAnimation = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return {
    ref,
    style: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s'
    }
  }
}