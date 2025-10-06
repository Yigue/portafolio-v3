"use client"

import { motion } from "framer-motion"
import { useScrollProgress } from "@/components/providers/ScrollProvider"

interface ScrollBeamOverlayProps {
  /** Mostrar el overlay visual de la franja */
  visible?: boolean
  /** Altura de la franja en px */
  height?: number
  /** Color principal de la franja */
  color?: string
  /** Opacidad del efecto (0-1) */
  opacity?: number
}

/**
 * SCROLL BEAM OVERLAY - Visualización de la franja luminosa
 * 
 * Componente opcional que muestra visualmente la "franja luminosa" que ilumina las cards.
 * Útil para debugging o como elemento decorativo que muestra dónde está activo el efecto.
 * 
 * La franja está fija en el centro del viewport (50vh) y reacciona al scroll con
 * animaciones sutiles de brillo y pulsación.
 * 
 * @example
 * ```tsx
 * // En layout.tsx o page.tsx
 * <ScrollBeamOverlay visible={true} opacity={0.15} />
 * ```
 */
export default function ScrollBeamOverlay({
  visible = true,
  height = 60,
  color = "10, 132, 255", // RGB del azul primary
  opacity = 0.15
}: ScrollBeamOverlayProps) {
  const { isScrolling } = useScrollProgress()

  if (!visible) return null

  return (
    <>
      {/* ===== FRANJA LUMINOSA PRINCIPAL ===== */}
      <motion.div
        className="fixed left-0 w-full pointer-events-none z-[10]"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          height: `${height}px`,
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isScrolling ? opacity * 1.5 : opacity,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        {/* Gradiente principal con blur */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              rgba(${color}, ${opacity * 0.3}) 20%,
              rgba(${color}, ${opacity}) 50%, 
              rgba(${color}, ${opacity * 0.3}) 80%,
              transparent 100%
            )`,
            filter: "blur(20px)",
          }}
        />

        {/* Línea central definida */}
        <motion.div
          className="absolute inset-x-0 h-[2px]"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(${color}, ${opacity * 0.5}) 10%,
              rgba(${color}, ${opacity * 0.8}) 50%, 
              rgba(${color}, ${opacity * 0.5}) 90%,
              transparent 100%
            )`,
            boxShadow: `0 0 ${height / 3}px rgba(${color}, ${opacity * 0.6})`,
          }}
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Puntos pulsantes en el centro */}
        <div className="absolute inset-0 flex items-center justify-center gap-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{
                backgroundColor: `rgba(${color}, ${opacity * 2})`,
                boxShadow: `0 0 ${height / 4}px rgba(${color}, ${opacity * 1.5})`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* ===== RESPLANDOR AMBIENTAL ===== */}
      {/* Glow radial más amplio para crear atmósfera */}
      <motion.div
        className="fixed left-0 w-full pointer-events-none z-[9]"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          height: `${height * 4}px`,
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isScrolling ? opacity * 0.8 : opacity * 0.5,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, 
              rgba(${color}, ${opacity * 0.4}) 0%,
              rgba(${color}, ${opacity * 0.2}) 30%,
              rgba(${color}, ${opacity * 0.05}) 60%,
              transparent 80%
            )`,
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* ===== INDICADORES LATERALES ===== */}
      {/* Marcas opcionales en los bordes para visualizar mejor la zona */}
      <motion.div
        className="fixed left-4 pointer-events-none z-[10]"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
        }}
        animate={{
          opacity: isScrolling ? [opacity * 0.5, opacity, opacity * 0.5] : opacity * 0.3,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div
          className="w-12 h-[2px] rounded-full"
          style={{
            background: `linear-gradient(90deg, 
              rgba(${color}, ${opacity * 0.6}), 
              transparent
            )`,
            boxShadow: `0 0 10px rgba(${color}, ${opacity * 0.4})`,
          }}
        />
      </motion.div>

      <motion.div
        className="fixed right-4 pointer-events-none z-[10]"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
        }}
        animate={{
          opacity: isScrolling ? [opacity * 0.5, opacity, opacity * 0.5] : opacity * 0.3,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div
          className="w-12 h-[2px] rounded-full"
          style={{
            background: `linear-gradient(90deg, 
              transparent, 
              rgba(${color}, ${opacity * 0.6})
            )`,
            boxShadow: `0 0 10px rgba(${color}, ${opacity * 0.4})`,
          }}
        />
      </motion.div>
    </>
  )
}

