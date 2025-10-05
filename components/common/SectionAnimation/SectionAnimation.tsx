"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"
import { useScrollProgress } from "@/components/providers/ScrollProvider"
import { getInitialAnimation, getAnimateAnimation } from "./AnimationUtils"

interface SectionAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade" | "slide"
  duration?: number
  parallax?: boolean
  parallaxStrength?: number
  stagger?: boolean
  staggerDelay?: number
}

/**
 * SECTION ANIMATION - Componente principal de animaciones de sección
 * 
 * Maneja animaciones complejas con parallax y múltiples variantes
 */
export default function SectionAnimation({ 
  children, 
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
  parallax = false,
  parallaxStrength = 0.5,
  stagger = false,
  staggerDelay = 0.1
}: SectionAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.3
  })
  
  // Parallax effect usando ScrollProvider
  const { progress } = useScrollProgress()
  
  // Calcular parallax basado en el progreso global
  const y = parallax ? progress * -50 * parallaxStrength : 0
  const opacity = parallax ? (progress < 0.2 ? progress * 5 : progress > 0.8 ? (1 - progress) * 5 : 1) : 1

  return (
    <motion.div
      ref={ref}
      initial={getInitialAnimation(direction)}
      animate={isInView ? getAnimateAnimation() : getInitialAnimation(direction)}
      style={parallax ? { y, opacity } : {}}
      transition={{
        duration,
        delay: stagger ? delay + staggerDelay : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
