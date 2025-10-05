"use client"

import { useEffect } from "react"

interface PerformanceOptimizerProps {
  debug?: boolean
}

/**
 * PERFORMANCE OPTIMIZER - Componente principal de optimización
 * 
 * Aplica optimizaciones de performance basadas en el dispositivo
 */
export default function PerformanceOptimizer({ debug = false }: PerformanceOptimizerProps) {
  useEffect(() => {
    // ===== DETECCIÓN AVANZADA DE RENDIMIENTO =====
    const getDeviceInfo = () => {
      const memory = (navigator as any).deviceMemory || 4 // Fallback a 4GB
      const cores = navigator.hardwareConcurrency || 4
      const connection = (navigator as any).connection
      const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
      
      return {
        memory,
        cores,
        isSlowConnection,
        isLowEnd: memory <= 2 || cores <= 2,
        isVeryLowEnd: memory <= 1 || cores <= 1
      }
    }

    const deviceInfo = getDeviceInfo()
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (debug) {
      console.log('🔧 Performance Optimizer:', {
        memory: `${deviceInfo.memory}GB`,
        cores: deviceInfo.cores,
        isLowEnd: deviceInfo.isLowEnd,
        isVeryLowEnd: deviceInfo.isVeryLowEnd,
        isSlowConnection: deviceInfo.isSlowConnection,
        prefersReducedMotion
      })
    }

    // ===== OPTIMIZACIONES BASADAS EN DETECCIÓN =====
    const root = document.documentElement

    if (prefersReducedMotion) {
      // Reducir todas las animaciones
      root.style.setProperty('--animation-duration', '0.1s')
      root.style.setProperty('--transition-duration', '0.1s')
      root.style.setProperty('--blur-intensity', '2px')
      root.style.setProperty('--glow-intensity', '0.1')
    } else if (deviceInfo.isVeryLowEnd) {
      // Optimizaciones extremas
      root.style.setProperty('--animation-duration', '0.3s')
      root.style.setProperty('--transition-duration', '0.2s')
      root.style.setProperty('--blur-intensity', '3px')
      root.style.setProperty('--glow-intensity', '0.15')
      root.style.setProperty('--parallax-strength', '0.2')
    } else if (deviceInfo.isLowEnd) {
      // Optimizaciones moderadas
      root.style.setProperty('--animation-duration', '0.5s')
      root.style.setProperty('--transition-duration', '0.3s')
      root.style.setProperty('--blur-intensity', '5px')
      root.style.setProperty('--glow-intensity', '0.2')
      root.style.setProperty('--parallax-strength', '0.3')
    } else {
      // Configuración completa para dispositivos potentes
      root.style.setProperty('--animation-duration', '0.8s')
      root.style.setProperty('--transition-duration', '0.5s')
      root.style.setProperty('--blur-intensity', '8px')
      root.style.setProperty('--glow-intensity', '0.3')
      root.style.setProperty('--parallax-strength', '0.5')
    }

    // ===== OPTIMIZACIÓN DE SCROLL CON THROTTLING =====
    let lastScrollTime = 0
    const scrollThrottle = deviceInfo.isLowEnd ? 16 : 8 // 60fps vs 120fps
    
    const optimizeScroll = (timestamp: number) => {
      if (timestamp - lastScrollTime >= scrollThrottle) {
        // Aplicar optimizaciones de scroll solo cuando sea necesario
        if (deviceInfo.isLowEnd) {
          // Reducir cálculos complejos en dispositivos lentos
          root.style.setProperty('--scroll-performance', 'low')
        } else {
          root.style.setProperty('--scroll-performance', 'high')
        }
        lastScrollTime = timestamp
      }
    }

    // ===== OPTIMIZACIÓN DE RAF =====
    let rafId: number
    const rafOptimized = (timestamp: number) => {
      optimizeScroll(timestamp)
      if (!deviceInfo.isVeryLowEnd) {
        rafId = requestAnimationFrame(rafOptimized)
      }
    }

    if (!deviceInfo.isVeryLowEnd) {
      rafId = requestAnimationFrame(rafOptimized)
    }

    // ===== CLEANUP =====
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [debug])

  return null
}
