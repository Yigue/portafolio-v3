"use client"

import { motion } from "framer-motion"
import { useScrollProgress } from "@/components/providers/ScrollProvider"

interface ScrollSpotlightProps {
  /** Posición vertical del spotlight (0-1, donde 0.5 es el centro) */
  position?: number
  /** Color del spotlight en formato RGB (sin 'rgb()') */
  color?: string
  /** Si debe mostrar el indicador visual */
  showIndicator?: boolean
  /** Estilo del indicador: 'line' | 'pulse' | 'gradient' */
  indicatorStyle?: "line" | "pulse" | "gradient"
  /** Opacidad del indicador (0-1) */
  opacity?: number
}

/**
 * SCROLL SPOTLIGHT - Indicador visual del punto de iluminación
 * 
 * Componente que muestra visualmente dónde está el "spotlight" que ilumina
 * las cards al hacer scroll. Útil para debugging o como elemento decorativo.
 * 
 * @example
 * ```tsx
 * // Línea horizontal simple
 * <ScrollSpotlight indicatorStyle="line" />
 * 
 * // Efecto de pulso animado
 * <ScrollSpotlight indicatorStyle="pulse" color="59, 130, 246" />
 * 
 * // Gradiente radial sutil
 * <ScrollSpotlight indicatorStyle="gradient" opacity={0.3} />
 * ```
 */
export default function ScrollSpotlight({
  position = 0.5,
  color = "59, 130, 246",
  showIndicator = true,
  indicatorStyle = "line",
  opacity = 0.15
}: ScrollSpotlightProps) {
  const { isScrolling } = useScrollProgress()

  if (!showIndicator) return null

  const topPosition = `${position * 100}vh`

  return (
    <div 
      className="fixed left-0 right-0 pointer-events-none z-[100]"
      style={{ top: topPosition }}
    >
      {/* ESTILO: Línea horizontal */}
      {indicatorStyle === "line" && (
        <motion.div
          className="w-full h-[2px] relative"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isScrolling ? opacity * 1.5 : opacity,
            scaleX: isScrolling ? 1 : 0.95
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Línea principal */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(${color}, ${opacity * 0.3}) 20%,
                rgba(${color}, ${opacity}) 50%, 
                rgba(${color}, ${opacity * 0.3}) 80%,
                transparent 100%
              )`
            }}
          />
          
          {/* Glow superior */}
          <div 
            className="absolute inset-x-0 -top-8 h-16 blur-xl"
            style={{
              background: `radial-gradient(ellipse at center, 
                rgba(${color}, ${opacity * 0.4}) 0%, 
                transparent 70%
              )`
            }}
          />
          
          {/* Punto central */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{
              backgroundColor: `rgba(${color}, ${opacity * 2})`,
              boxShadow: `0 0 20px rgba(${color}, ${opacity * 1.5})`
            }}
            animate={{
              scale: isScrolling ? [1, 1.5, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}

      {/* ESTILO: Pulso animado */}
      {indicatorStyle === "pulse" && (
        <div className="w-full flex justify-center">
          <motion.div
            className="relative w-32 h-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: isScrolling ? opacity * 1.5 : opacity }}
          >
            {/* Ondas de pulso */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2"
                style={{
                  borderColor: `rgba(${color}, ${opacity * 0.6})`
                }}
                animate={{
                  scale: [1, 2, 2],
                  opacity: [opacity, opacity * 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {/* Centro brillante */}
            <motion.div
              className="absolute inset-0 m-auto w-4 h-4 rounded-full"
              style={{
                backgroundColor: `rgba(${color}, ${opacity * 2})`,
                boxShadow: `0 0 30px rgba(${color}, ${opacity})`
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      )}

      {/* ESTILO: Gradiente radial sutil */}
      {indicatorStyle === "gradient" && (
        <motion.div
          className="w-full h-[400px] -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isScrolling ? opacity * 1.3 : opacity,
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Gradiente principal */}
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at center, 
                rgba(${color}, ${opacity * 0.6}) 0%,
                rgba(${color}, ${opacity * 0.3}) 30%,
                rgba(${color}, ${opacity * 0.1}) 50%,
                transparent 70%
              )`,
              filter: "blur(40px)"
            }}
          />
          
          {/* Capa adicional más concentrada */}
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 20% at center, 
                rgba(${color}, ${opacity * 0.4}) 0%,
                transparent 60%
              )`,
              filter: "blur(20px)"
            }}
          />
        </motion.div>
      )}
    </div>
  )
}

