"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface SkillTagProps {
  label: string
  angle: number
  distance: number
  delay: number
}

export default function SkillTag({ label, angle, distance, delay }: SkillTagProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const x = Math.cos((angle * Math.PI) / 180) * distance
  const y = Math.sin((angle * Math.PI) / 180) * distance

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `50%`,
        top: `50%`,
        x: x,
        y: y,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      <motion.div
        className="px-2 md:px-2.5 py-0.5 md:py-1 bg-background/95 backdrop-blur-md border border-foreground/30 rounded-full text-[8px] md:text-[10px] font-medium text-foreground shadow-xl whitespace-nowrap"
        style={{ zIndex: 10 }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: delay / 1000,
          ease: "easeInOut",
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  )
}

