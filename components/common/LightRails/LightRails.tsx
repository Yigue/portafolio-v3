"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ClientOnly } from "../ClientOnly"
import { useScrollProgress } from "@/components/providers/ScrollProvider"
import RailProgress from "./RailProgress"
import SectionPoints from "./SectionPoints"
import ConnectionLines from "./ConnectionLines"
import RailGlow from "./RailGlow"


interface LightRailsProps {
  sections: string[]
  debug?: boolean
}

/**
 * LIGHT RAILS - Componente principal del sistema de railes
 * 
 * Orquesta todos los subcomponentes del sistema de railes de luz
 */
export default function LightRails({ sections, debug = false }: LightRailsProps) {
  const { progress, isScrolling } = useScrollProgress()
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <ClientOnly fallback={<div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block w-1 h-96 bg-rail rounded-full" />}>
      <div ref={containerRef} className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <motion.div 
          className="relative"
          style={{ 
            scale: 0.95 + (progress * 0.05),
            filter: isScrolling ? "blur(0.5px)" : "blur(0px)"
          }}
        >
          
          {/* Progreso principal del rail */}
          <RailProgress progress={progress} isScrolling={isScrolling} />
          
          {/* Puntos de sección */}
          <SectionPoints sections={sections} progress={progress} debug={debug} />
          
          {/* Líneas de conexión entre puntos */}
          <ConnectionLines sections={sections} progress={progress} />
          
          {/* Glow global del rail */}
          <RailGlow progress={progress} />
        </motion.div>
      </div>
    </ClientOnly>
  )
}
