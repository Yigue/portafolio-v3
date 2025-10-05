"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"

interface TextAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * TEXT ANIMATION - Animación específica para texto
 * 
 * Efecto de escritura con blur para elementos de texto
 */
export default function TextAnimation({ 
  children, 
  className = "",
  delay = 0
}: TextAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px"
  })

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: 30,
        filter: "blur(10px)"
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)"
      } : {}}
      transition={{
        duration: 1,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
