"use client"

import { useEffect, useRef, useState } from "react"
import Lenis from "lenis"

interface UseScrollAnimationOptions {
  triggerOffset?: number
  once?: boolean
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { triggerOffset = 0.1, once = true } = options
  const [isInView, setIsInView] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Inicializar Lenis si no existe
    if (!lenis) {
      const newLenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })
      setLenis(newLenis)
    }

    const handleScroll = () => {
      if (!elementRef.current || !lenis) return

      const rect = elementRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height
      
      // Calcular progreso de entrada
      const elementTop = rect.top
      const elementBottom = rect.bottom
      const triggerPoint = windowHeight * triggerOffset
      
      const isVisible = elementTop < windowHeight - triggerPoint && elementBottom > triggerPoint
      
      if (isVisible && (!once || !isInView)) {
        setIsInView(true)
      }
      
      // Calcular progreso de scroll dentro del elemento
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - elementTop) / (windowHeight + elementHeight)
      ))
      setScrollProgress(scrollProgress)
    }

    if (lenis) {
      lenis.on("scroll", handleScroll)
      handleScroll() // Llamada inicial
    }

    return () => {
      if (lenis) {
        lenis.off("scroll", handleScroll)
      }
    }
  }, [lenis, triggerOffset, once, isInView])

  useEffect(() => {
    // Cleanup Lenis al desmontar
    return () => {
      if (lenis) {
        lenis.destroy()
      }
    }
  }, [lenis])

  return {
    elementRef,
    isInView,
    scrollProgress,
    lenis
  }
}

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", updateScrollProgress)
    updateScrollProgress()

    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return scrollProgress
}
