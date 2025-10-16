"use client"

import { motion } from "framer-motion"
import { getTechColor, TechCategory, getGradientByTech } from "@/lib/gradients"
import { cn } from "@/lib/utils"

interface TechImageProps {
  category: TechCategory
  className?: string
  pattern?: "dots" | "grid" | "waves" | "mesh"
  animate?: boolean
}

/**
 * TECH IMAGE COMPONENT
 * Genera imágenes visuales con gradientes para categorías de tecnologías
 */
export function TechImage({ 
  category, 
  className,
  pattern = "mesh",
  animate = true 
}: TechImageProps) {
  const gradient = getGradientByTech(category, pattern === "mesh")
  
  return (
    <div 
      className={cn(
        "relative w-full h-full rounded-xl overflow-hidden",
        className
      )}
    >
      {/* Gradiente base */}
      <div 
        className="absolute inset-0"
        style={{ background: gradient }}
      />
      
      {/* Patrón de fondo */}
      {pattern === "dots" && (
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      )}
      
      {pattern === "grid" && (
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />
      )}
      
      {pattern === "waves" && (
        <svg 
          className="absolute inset-0 w-full h-full opacity-20" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z"
            fill="rgba(255,255,255,0.2)"
          />
          <path
            d="M0,60 Q25,40 50,60 T100,60 L100,100 L0,100 Z"
            fill="rgba(255,255,255,0.1)"
          />
        </svg>
      )}
      
      {/* Overlay con blur */}
      <div className="absolute inset-0 backdrop-blur-[1px]" />
      
      {/* Glow animado */}
      {animate && (
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)",
          }}
        />
      )}
      
      {/* Shimmer effect */}
      {animate && (
        <motion.div
          className="absolute inset-0"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
          }}
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
          }}
        />
      )}
      
      {/* Border glow */}
      <div className="absolute inset-0 border border-white/10 rounded-xl" />
    </div>
  )
}

/**
 * TECH ICON - Componente para mostrar iconos de tecnologías con color
 */
interface TechIconProps {
  tech: string
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function TechIcon({ tech, size = "md", showLabel = false, className }: TechIconProps) {
  const color = getTechColor(tech)
  
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
  }
  
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <motion.div
        className={cn(
          "rounded-xl flex items-center justify-center font-bold",
          "border border-white/10 shadow-lg",
          sizes[size]
        )}
        style={{
          background: `linear-gradient(135deg, ${color} 0%, color-mix(in srgb, ${color} 70%, black 30%) 100%)`,
          color: "white",
        }}
        whileHover={{
          scale: 1.1,
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.3 },
        }}
      >
        {tech.slice(0, 2).toUpperCase()}
      </motion.div>
      
      {showLabel && (
        <span className="text-xs text-muted-foreground font-medium">
          {tech}
        </span>
      )}
    </div>
  )
}

