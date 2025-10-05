"use client"

import { motion } from "framer-motion"
import { useScrollProgress } from "@/components/providers/ScrollProvider"

interface ProgressBarProps {
  containerRef?: React.RefObject<HTMLDivElement | null>
}

/**
 * PROGRESS BAR - Barra de progreso sincronizada con Lenis
 * 
 * Muestra el progreso de scroll usando el ScrollProvider centralizado
 */
export default function ProgressBar({ containerRef }: ProgressBarProps) {
  const { progress } = useScrollProgress()

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 w-0.5 h-96 bg-rail z-10 hidden lg:block">
      <motion.div
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-rail-active via-primary to-rail-active"
        style={{ 
          height: `${progress * 100}%`,
          boxShadow: "0 0 10px hsl(var(--primary) / 0.3)"
        }}
        transition={{ 
          duration: 0.1, 
          ease: "linear" 
        }}
      />
    </div>
  )
}
