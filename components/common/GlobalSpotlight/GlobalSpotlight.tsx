"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlobalSpotlightProps {
  className?: string
  fill?: string
  intensity?: number
  size?: number
  blur?: number
  disabled?: boolean
}

/**
 * GLOBAL SPOTLIGHT
 * Efecto de spotlight que sigue el cursor en toda la aplicación
 * Similar al del Hero pero más sutil y global
 */
export function GlobalSpotlight({ 
  className,
  fill = "hsl(var(--primary))",
  intensity = 0.15,
  size = 600,
  blur = 100,
  disabled = false,
}: GlobalSpotlightProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring para suavizar el movimiento - más lento y suave
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 25, restDelta: 0.001 })
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 25, restDelta: 0.001 })

  useEffect(() => {
    // Detectar si es mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // No ejecutar en mobile o si está deshabilitado
    if (isMobile || disabled) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isActive) setIsActive(true)
    }

    const handleMouseLeave = () => {
      setIsActive(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isMobile, disabled, mouseX, mouseY, isActive])

  // No renderizar en mobile
  if (isMobile || disabled) return null

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-30 overflow-hidden",
        className
      )}
    >
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle at center, ${fill} 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
        }}
        animate={{
          opacity: isActive ? intensity : 0,
          scale: isActive ? 1 : 0.9,
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { duration: 0.4, ease: "easeOut" },
        }}
      />
    </div>
  )
}

export default GlobalSpotlight

