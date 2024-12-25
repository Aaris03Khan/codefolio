// src/app/page.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { TypewriterEffect } from '@/components/animations/TypewriterEffect'

export default function Home() {
  const messages = [
    "Hello, World!",
    "I'm Aaris Khan.",
    "I make ideas happen!"
  ]

  const floatingAnimation = {
    y: [0, -10, 0], // Move up and down by 10px
    transition: {
      duration: 3, // Total duration of one cycle
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }

  return (
    <div className="h-screen w-full grid place-items-center bg-white dark:bg-gray-900">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center gap-8 px-4">
        {/* Image */}
        <motion.div
          animate={{ 
            y: [-3, 3],
            scale: 1,
          }}
          initial={{ scale: 0, y: 0 }}
          transition={{
            scale: { type: "spring", stiffness: 260, damping: 20 },
            y: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        >
          <Image
            src="/memoji-me.png"
            alt="Memoji Avatar"
            width={150}
            height={150}
            priority
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TypewriterEffect 
            messages={messages}
            className="text-3xl md:text-5xl font-bold"
          />
        </motion.div>
      </div>
    </div>
  )
}