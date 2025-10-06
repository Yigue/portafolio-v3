"use client"

import { useScrollSync } from "@/lib/hooks/useScrollSync"
import { useEffect, useRef } from "react"
import { triggerLightEvent } from "@/lib/hooks/useLightTrigger"
import MainVerticalLine from "./MainVerticalLine"
import LineIllumination from "./LineIllumination"

interface ConnectedLinesProps {
  debug?: boolean
  onSectionTrigger?: (sectionId: string, isActive: boolean, progress: number) => void
}

/**
 * CONNECTED LINES - Sistema principal de líneas conectadas
 * 
 * Controla el flujo de luz a través de las secciones:
 * 1. Detecta cuándo la luz toca cada sección
 * 2. Emite eventos para que las secciones reaccionen
 * 3. Calcula el progreso dentro de cada sección
 * 
 * La luz comienza en 90vh y se mueve hacia abajo con el scroll.
 */
export default function ConnectedLines({ debug = false, onSectionTrigger }: ConnectedLinesProps) {
  const { progress, isScrolling, scrollY } = useScrollSync()
  const previousActiveSectionRef = useRef<string | null>(null)

  // Definir las secciones que deben reaccionar a la luz (sin el hero)
  const sections = [
    { id: "sobre-mí", name: "Sobre mí" },
    { id: "timeline", name: "Timeline" },
    { id: "habilidades", name: "Habilidades" },
    { id: "proyectos", name: "Proyectos" },
    { id: "contacto", name: "Contacto" }
  ]

  // Detectar cuando la luz toca cada sección
  useEffect(() => {
    // Calcular la posición de la partícula de luz
    const viewportHeight = window.innerHeight
    const lightPositionY = viewportHeight * 0.9 + (scrollY * progress)

    let activeSectionId: string | null = null
    let maxProgress = 0

    sections.forEach(section => {
      const element = document.getElementById(section.id)
      if (!element) {
        if (debug) console.log(`⚠️ Sección no encontrada: ${section.id}`)
        return
      }

      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + scrollY
      const elementBottom = rect.bottom + scrollY
      
      // Verificar si la luz está tocando esta sección
      const isLightTouching = lightPositionY >= elementTop && lightPositionY <= elementBottom
      
      if (isLightTouching) {
        // Calcular el progreso dentro de la sección (0 = arriba, 1 = abajo)
        const sectionHeight = elementBottom - elementTop
        const sectionProgress = Math.min(Math.max((lightPositionY - elementTop) / sectionHeight, 0), 1)
        
        activeSectionId = section.id
        maxProgress = sectionProgress

        // Emitir evento global para que la sección reaccione
        triggerLightEvent(section.id, true, sectionProgress)
        
        // Callback opcional
        if (onSectionTrigger) {
          onSectionTrigger(section.id, true, sectionProgress)
        }

        if (debug) {
          console.log(`💡 Luz tocando: ${section.name} (${(sectionProgress * 100).toFixed(1)}%)`)
        }
      }
    })

    // Detectar cambio de sección
    if (activeSectionId !== previousActiveSectionRef.current) {
      if (previousActiveSectionRef.current && debug) {
        console.log(`🔄 Transición: ${previousActiveSectionRef.current} → ${activeSectionId || 'ninguna'}`)
      }
      previousActiveSectionRef.current = activeSectionId
    }

  }, [progress, scrollY, debug, onSectionTrigger])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 hidden lg:block">
      {/* Línea vertical principal */}
      <MainVerticalLine progress={progress} isScrolling={isScrolling} />
      
      {/* Efectos de iluminación */}
      <LineIllumination progress={progress} isScrolling={isScrolling} />
      
      {/* Debug info */}
      {debug && (
        <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono pointer-events-auto z-50">
          <div>Progress: {(progress * 100).toFixed(1)}%</div>
          <div>ScrollY: {scrollY.toFixed(0)}px</div>
          <div>Scrolling: {isScrolling ? '✓' : '✗'}</div>
          <div>Active: {previousActiveSectionRef.current || 'ninguna'}</div>
        </div>
      )}
    </div>
  )
}
