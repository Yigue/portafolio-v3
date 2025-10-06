"use client"

import { motion } from "framer-motion"
import { ReactNode, useEffect, useState } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  sectionId: string
  className?: string
  animationType?: "fadeIn" | "slideUp" | "scale" | "rotate" | "glow" | "none"
  delay?: number
  duration?: number
}

/**
 * ANIMATED SECTION - Sección que se anima cuando la luz la toca
 * 
 * Se activa cuando la luz del ConnectedLines toca la sección
 */
export default function AnimatedSection({ 
  children, 
  sectionId, 
  className = "",
  animationType = "fadeIn",
  delay = 0,
  duration = 0.8
}: AnimatedSectionProps) {
  const [isLightTouching, setIsLightTouching] = useState(false)
  const [lightProgress, setLightProgress] = useState(0)

  // Escuchar eventos de la luz
  useEffect(() => {
    const handleLightTrigger = (event: CustomEvent) => {
      if (event.detail.sectionId === sectionId) {
        setIsLightTouching(event.detail.isActive)
        setLightProgress(event.detail.progress)
      }
    }

    window.addEventListener('lightTrigger', handleLightTrigger as EventListener)
    return () => window.removeEventListener('lightTrigger', handleLightTrigger as EventListener)
  }, [sectionId])

  // Definir animaciones según el tipo
  const getAnimationVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }

    switch (animationType) {
      case "fadeIn":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration, delay }
          }
        }
      
      case "slideUp":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration, delay }
          }
        }
      
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration, delay }
          }
        }
      
      case "rotate":
        return {
          hidden: { opacity: 0, rotate: -10 },
          visible: { 
            opacity: 1, 
            rotate: 0,
            transition: { duration, delay }
          }
        }
      
      case "glow":
        return {
          hidden: { opacity: 0, boxShadow: "0 0 0px rgba(0,0,0,0)" },
          visible: { 
            opacity: 1, 
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            transition: { duration, delay }
          }
        }
       case "none":
          return {
          
          }
      default:
        return baseVariants
    }
  }

  const variants = getAnimationVariants()

  return (
    <motion.div
      className={`relative ${className}`}
      variants={variants}
      initial="hidden"
      animate={isLightTouching ? "visible" : "hidden"}
      style={{
        // Efecto adicional basado en el progreso de la luz
        transform: isLightTouching 
          ? `scale(${1 + (lightProgress * 0.05)})` 
          : "scale(1)",
        filter: isLightTouching 
          ? `brightness(${1 + (lightProgress * 0.2)})` 
          : "brightness(1)"
      }}
    >
      {children}
      
      {/* Efecto de resplandor cuando la luz toca */}
      {isLightTouching && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-800/20 to-transparent rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: lightProgress }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}
