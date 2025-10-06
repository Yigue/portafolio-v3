"use client"

import { useEffect, useState, RefObject } from "react"
import { useScrollProgress } from "@/components/providers/ScrollProvider"

interface SpotlightConfig {
  /** Posición vertical del spotlight (0-1, donde 0.5 es el centro) */
  spotlightPosition?: number
  /** Radio de influencia del spotlight en px */
  influenceRadius?: number
  /** Intensidad máxima del efecto (0-1) */
  maxIntensity?: number
  /** Si debe actualizarse solo durante el scroll */
  onlyOnScroll?: boolean
}

interface SpotlightResult {
  /** Intensidad de la luz (0-1) donde 1 es máxima iluminación */
  intensity: number
  /** Distancia al centro del spotlight en px */
  distance: number
  /** Si el elemento está dentro del radio de influencia */
  isInSpotlight: boolean
  /** Progreso de la iluminación (0-1) suavizado */
  glowProgress: number
}

/**
 * HOOK: useScrollSpotlight
 * 
 * Detecta la proximidad de un elemento al "spotlight" central de la pantalla
 * y retorna valores para animar bordes, sombras y efectos de iluminación.
 * 
 * @param elementRef - Referencia al elemento a monitorear
 * @param config - Configuración del spotlight
 * @returns Valores de intensidad y distancia para animaciones
 * 
 * @example
 * ```tsx
 * const ref = useRef(null)
 * const { intensity, isInSpotlight } = useScrollSpotlight(ref)
 * 
 * <div 
 *   ref={ref}
 *   style={{
 *     boxShadow: `0 0 ${intensity * 30}px rgba(59, 130, 246, ${intensity})`,
 *     borderColor: `rgba(59, 130, 246, ${intensity})`
 *   }}
 * />
 * ```
 */
export function useScrollSpotlight(
  elementRef: RefObject<HTMLElement>,
  config: SpotlightConfig = {}
): SpotlightResult {
  const {
    spotlightPosition = 0.5,  // Centro de la pantalla por defecto
    influenceRadius = 300,     // 300px de radio de influencia
    maxIntensity = 1,          // Intensidad máxima
    onlyOnScroll = false       // Actualizar siempre, no solo en scroll
  } = config

  const { progress, isScrolling } = useScrollProgress()
  
  const [spotlight, setSpotlight] = useState<SpotlightResult>({
    intensity: 0,
    distance: Infinity,
    isInSpotlight: false,
    glowProgress: 0
  })

  useEffect(() => {
    if (!elementRef.current) return

    // Si solo debe actualizar durante scroll y no está scrolleando, retornar
    if (onlyOnScroll && !isScrolling) return

    const updateSpotlight = () => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calcular el centro del spotlight en la pantalla
      const spotlightY = windowHeight * spotlightPosition
      
      // Calcular el centro del elemento
      const elementCenterY = rect.top + rect.height / 2
      
      // Calcular distancia al spotlight
      const distance = Math.abs(elementCenterY - spotlightY)
      
      // Calcular intensidad basada en distancia (inversa)
      // Cuando distance = 0, intensity = 1
      // Cuando distance >= influenceRadius, intensity = 0
      const rawIntensity = Math.max(0, 1 - (distance / influenceRadius))
      
      // Aplicar una curva suave (easing) para mejor transición
      // Usando ease-out-cubic para transición más natural
      const easedIntensity = 1 - Math.pow(1 - rawIntensity, 3)
      const intensity = easedIntensity * maxIntensity
      
      // Calcular glowProgress con otra curva para efectos adicionales
      // Este es más agresivo, llega a 1 antes
      const glowProgress = Math.pow(rawIntensity, 0.5) * maxIntensity
      
      const isInSpotlight = distance <= influenceRadius

      setSpotlight({
        intensity,
        distance,
        isInSpotlight,
        glowProgress
      })
    }

    // Actualizar inmediatamente
    updateSpotlight()

    // Usar RAF para actualizaciones suaves sin sobrecargar
    let rafId: number
    const rafLoop = () => {
      updateSpotlight()
      rafId = requestAnimationFrame(rafLoop)
    }

    rafId = requestAnimationFrame(rafLoop)

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [progress, isScrolling, spotlightPosition, influenceRadius, maxIntensity, onlyOnScroll])

  return spotlight
}

/**
 * HOOK: useScrollSpotlightMultiple
 * 
 * Versión optimizada para múltiples elementos que comparten el mismo spotlight
 * Calcula el spotlight una vez y lo distribuye a todos los elementos
 * 
 * @param elementsRefs - Array de referencias a elementos
 * @param config - Configuración compartida del spotlight
 * @returns Array de resultados de spotlight para cada elemento
 */
export function useScrollSpotlightMultiple(
  elementsRefs: RefObject<HTMLElement>[],
  config: SpotlightConfig = {}
): SpotlightResult[] {
  const {
    spotlightPosition = 0.5,
    influenceRadius = 300,
    maxIntensity = 1,
    onlyOnScroll = false
  } = config

  const { progress, isScrolling } = useScrollProgress()
  
  const [spotlights, setSpotlights] = useState<SpotlightResult[]>(
    elementsRefs.map(() => ({
      intensity: 0,
      distance: Infinity,
      isInSpotlight: false,
      glowProgress: 0
    }))
  )

  useEffect(() => {
    if (onlyOnScroll && !isScrolling) return

    const updateSpotlights = () => {
      const windowHeight = window.innerHeight
      const spotlightY = windowHeight * spotlightPosition

      const results = elementsRefs.map((ref) => {
        if (!ref.current) {
          return {
            intensity: 0,
            distance: Infinity,
            isInSpotlight: false,
            glowProgress: 0
          }
        }

        const rect = ref.current.getBoundingClientRect()
        const elementCenterY = rect.top + rect.height / 2
        const distance = Math.abs(elementCenterY - spotlightY)
        
        const rawIntensity = Math.max(0, 1 - (distance / influenceRadius))
        const easedIntensity = 1 - Math.pow(1 - rawIntensity, 3)
        const intensity = easedIntensity * maxIntensity
        const glowProgress = Math.pow(rawIntensity, 0.5) * maxIntensity
        const isInSpotlight = distance <= influenceRadius

        return {
          intensity,
          distance,
          isInSpotlight,
          glowProgress
        }
      })

      setSpotlights(results)
    }

    let rafId: number
    const rafLoop = () => {
      updateSpotlights()
      rafId = requestAnimationFrame(rafLoop)
    }

    rafId = requestAnimationFrame(rafLoop)

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [elementsRefs, progress, isScrolling, spotlightPosition, influenceRadius, maxIntensity, onlyOnScroll])

  return spotlights
}

