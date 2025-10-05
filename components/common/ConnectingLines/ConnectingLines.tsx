"use client"

import { useRef, useState } from "react"
import { ClientOnly } from "../ClientOnly"
import { useScrollProgress } from "@/components/providers/ScrollProvider"
import PathCalculator from "./PathCalculator"
import AnimatedPaths from "./AnimatedPaths"
import AnimatedArrows from "./AnimatedArrows"
import PathGlow from "./PathGlow"

interface ConnectingLinesProps {
  sections: string[]
  debug?: boolean
}

/**
 * CONNECTING LINES - Componente principal del sistema de líneas de conexión
 * 
 * Orquesta todos los subcomponentes del sistema de líneas SVG animadas
 */
export default function ConnectingLines({ sections, debug = false }: ConnectingLinesProps) {
  const { progress, isScrolling } = useScrollProgress()
  const svgRef = useRef<SVGSVGElement>(null)
  const [paths, setPaths] = useState<string[]>([])

  return (
    <ClientOnly fallback={<div className="fixed inset-0 pointer-events-none z-10 hidden lg:block" />}>
      <svg
        ref={svgRef}
        className="fixed inset-0 pointer-events-none z-10 hidden lg:block"
        style={{ width: "100vw", height: "100vh" }}
      >
        {/* Calculador de rutas */}
        <PathCalculator 
          sections={sections} 
          onPathsUpdate={setPaths}
          debug={debug}
        />
        
        {/* Líneas animadas */}
        <AnimatedPaths 
          paths={paths} 
          sections={sections} 
          progress={progress} 
          isScrolling={isScrolling}
        />
        
        {/* Flechas animadas */}
        <AnimatedArrows 
          paths={paths} 
          sections={sections} 
          progress={progress}
        />
        
        {/* Glow de las líneas */}
        <PathGlow 
          paths={paths} 
          sections={sections} 
          progress={progress}
        />
      </svg>
    </ClientOnly>
  )
}
