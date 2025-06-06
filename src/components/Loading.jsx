import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const loadingTexts = [
  'Curating the finest looks...',
  'Loading creative ideas...',
  'Diving into the world of acting...',
  'Crafting fashion stories...',
  'Just a moment of magic...',
]

const maskSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-24 h-24 text-yellow-400"
  >
    <path d="M12 20c8-8 32-8 40 0 0 12-8 32-20 32S12 32 12 20z" />
    <circle cx="22" cy="28" r="4" fill="currentColor" />
    <circle cx="42" cy="28" r="4" fill="currentColor" />
    <path d="M16 44c10 6 22 6 28 0" />
  </svg>
)

const Loading = () => {
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-400px bg-gradient-to-r from-black via-gray-900 to-black flex flex-col items-center justify-center text-center px-4 py-16">
      <motion.div
        className="mb-6"
        initial={{ rotate: -10, scale: 0.8 }}
        animate={{
          rotate: [-10, 10, -10],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {maskSvg}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.p
          key={textIndex}
          className="text-lg sm:text-xl font-semibold text-yellow-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
        >
          {loadingTexts[textIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export default Loading
