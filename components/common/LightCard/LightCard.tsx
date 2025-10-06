"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import LightPassThrough from "../LightPassThrough/LightPassThrough"

interface LightCardProps {
  children: ReactNode
  sectionId: string
  className?: string
  lightIntensity?: number
  lightColor?: string
  cardVariant?: "default" | "elevated" | "glass" | "neon"
}

/**
 * LIGHT CARD - Card con efecto de luz que la atraviesa
 * 
 * Combina una card normal con el efecto de luz pasante
 */
export default function LightCard({ 
  children, 
  sectionId, 
  className = "",
  lightIntensity = 0.4,
  lightColor = "hsl(var(--primary))",
  cardVariant = "default"
}: LightCardProps) {
  
  // Definir estilos según la variante
  const getCardStyles = () => {
    switch (cardVariant) {
      case "elevated":
        return "bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-300"
      
      case "glass":
        return "bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg"
      
      case "neon":
        return "bg-card border border-primary/30 shadow-lg shadow-primary/20"
      
      default:
        return "bg-card border border-border shadow-md"
    }
  }

  return (
    <LightPassThrough
      sectionId={sectionId}
      intensity={lightIntensity}
      color={lightColor}
      className="rounded-lg p-6"
    >
      <motion.div
        className={`${getCardStyles()} ${className}`}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </LightPassThrough>
  )
}
