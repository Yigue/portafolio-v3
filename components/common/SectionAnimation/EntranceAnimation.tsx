"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"
import { entranceAnimations, scrollRevealConfig } from "@/lib/animations"
import { cn } from "@/lib/utils"

type AnimationType = "appleReveal" | "bounceIn" | "rotateSlide" | "expandCenter"

interface EntranceAnimationProps {
  children: ReactNode
  type?: AnimationType
  delay?: number
  className?: string
}

/**
 * ENTRANCE ANIMATION
 * Animaciones de entrada sofisticadas estilo Apple
 */
export function EntranceAnimation({ 
  children, 
  type = "appleReveal",
  delay = 0,
  className = ""
}: EntranceAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, scrollRevealConfig.viewport)
  
  const animation = entranceAnimations[type]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animation}
      custom={delay}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export default EntranceAnimation

