"use client"

import { useEffect, useCallback } from "react"

interface Section {
  id: string
  element: HTMLElement | null
}

interface PathCalculatorProps {
  sections: string[]
  onPathsUpdate: (paths: string[]) => void
  debug?: boolean
}

/**
 * PATH CALCULATOR - Calculador de rutas SVG entre secciones
 * 
 * Calcula las rutas de Bézier que conectan las secciones visualmente
 */
export default function PathCalculator({ sections, onPathsUpdate, debug = false }: PathCalculatorProps) {
  const calculatePaths = useCallback(() => {
    const elements = sections.map(id => ({
      id,
      element: document.getElementById(id)
    }))

    const newPaths: string[] = []
    
    for (let i = 0; i < elements.length - 1; i++) {
      const currentSection = elements[i]
      const nextSection = elements[i + 1]
      
      if (!currentSection?.element || !nextSection?.element) continue

      const currentRect = currentSection.element.getBoundingClientRect()
      const nextRect = nextSection.element.getBoundingClientRect()
      
      // Puntos de inicio y fin con offset
      const currentCenter = {
        x: currentRect.left + currentRect.width / 2,
        y: currentRect.bottom - 20
      }
      
      const nextCenter = {
        x: nextRect.left + nextRect.width / 2,
        y: nextRect.top + 20
      }

      // Crear curva de Bézier suave
      const distance = Math.abs(nextCenter.y - currentCenter.y)
      const controlOffset = Math.min(distance * 0.4, 200)
      
      const controlPoint1 = {
        x: currentCenter.x,
        y: currentCenter.y + controlOffset
      }
      
      const controlPoint2 = {
        x: nextCenter.x,
        y: nextCenter.y - controlOffset
      }

      const path = `M ${currentCenter.x} ${currentCenter.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${nextCenter.x} ${nextCenter.y}`
      newPaths.push(path)
    }
    
    onPathsUpdate(newPaths)

    if (debug) {
      console.log(`Paths actualizados: ${newPaths.length} líneas`)
    }
  }, [sections, onPathsUpdate, debug])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      calculatePaths()
    })

    resizeObserver.observe(document.body)
    calculatePaths()

    return () => {
      resizeObserver.disconnect()
    }
  }, [calculatePaths])

  return null
}
