"use client"

import { useEffect, useState } from "react"
import { useScrollSync } from "@/components/providers/ScrollProvider"

interface SectionLightState {
  isTouched: boolean
  progress: number
  intensity: number
}

/**
 * useSectionLight - Hook para detectar cuando la luz toca una sección específica
 * 
 * Proporciona estado y progreso de la luz para una sección
 */
export function useSectionLight(sectionId: string, threshold: number = 0.1) {
  const { progress } = useScrollSync()
  const [lightState, setLightState] = useState<SectionLightState>({
    isTouched: false,
    progress: 0,
    intensity: 0
  })

  useEffect(() => {
    const element = document.getElementById(sectionId)
    if (!element) return

    const rect = element.getBoundingClientRect()
    const sectionStart = (rect.top + window.scrollY) / document.body.scrollHeight
    const sectionEnd = (rect.bottom + window.scrollY) / document.body.scrollHeight
    
    // Calcular si la luz está tocando esta sección
    const isTouched = progress >= sectionStart && progress <= sectionEnd
    const sectionProgress = progress >= sectionStart 
      ? Math.min((progress - sectionStart) / (sectionEnd - sectionStart), 1)
      : 0
    
    // Calcular intensidad basada en qué tan centrada está la luz
    const centerProgress = Math.abs(sectionProgress - 0.5) * 2 // 0 en el centro, 1 en los bordes
    const intensity = isTouched ? Math.max(0.1, 1 - centerProgress) : 0

    setLightState({
      isTouched,
      progress: sectionProgress,
      intensity
    })
  }, [progress, sectionId, threshold])

  return lightState
}
