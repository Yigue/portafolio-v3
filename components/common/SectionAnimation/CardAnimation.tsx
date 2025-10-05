"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"

interface CardAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
}

/**
 * CARD ANIMATION - Animación específica para cards
 * 
 * Efecto de aparición suave con rotación 3D para elementos tipo card
 */
export default function CardAnimation({ 
  children, 
  className = "",
  delay = 0,
  stagger = 0.1
}: CardAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.2
  })

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: 40, 
        scale: 0.95,
        rotateX: 15
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotateX: 0
      } : {}}
      transition={{
        duration: 0.8,
        delay: delay + stagger,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 120,
        damping: 25
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
