import { DeviceInfo } from "./DeviceDetector"

/**
 * SCROLL OPTIMIZER - Optimizador de scroll
 * 
 * Aplica optimizaciones específicas al scroll basadas en el dispositivo
 */
export class ScrollOptimizer {
  private static rafId: number | null = null

  /**
   * Aplica optimizaciones de scroll basadas en el dispositivo
   */
  static optimize(deviceInfo: DeviceInfo): void {
    const root = document.documentElement
    let lastScrollTime = 0
    const scrollThrottle = deviceInfo.isLowEnd ? 16 : 8 // 60fps vs 120fps
    
    const optimizeScroll = (timestamp: number) => {
      if (timestamp - lastScrollTime >= scrollThrottle) {
        if (deviceInfo.isLowEnd) {
          root.style.setProperty('--scroll-performance', 'low')
        } else {
          root.style.setProperty('--scroll-performance', 'high')
        }
        lastScrollTime = timestamp
      }
    }

    const rafOptimized = (timestamp: number) => {
      optimizeScroll(timestamp)
      if (!deviceInfo.isVeryLowEnd) {
        this.rafId = requestAnimationFrame(rafOptimized)
      }
    }

    if (!deviceInfo.isVeryLowEnd) {
      this.rafId = requestAnimationFrame(rafOptimized)
    }
  }

  /**
   * Limpia las optimizaciones de scroll
   */
  static cleanup(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }
}
