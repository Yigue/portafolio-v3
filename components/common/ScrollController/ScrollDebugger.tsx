"use client"

import { useScrollSync } from "@/lib/hooks/useScrollSync"

interface ScrollDebuggerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

/**
 * SCROLL DEBUGGER - Debugger visual del scroll
 * 
 * Muestra información en tiempo real del estado del scroll
 */
export default function ScrollDebugger({ position = 'top-right' }: ScrollDebuggerProps) {
  const { progress, isScrolling, scrollY, lenis } = useScrollSync()

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono`}>
      <div className="space-y-1">
        <div>Progress: {(progress * 100).toFixed(1)}%</div>
        <div>ScrollY: {Math.round(scrollY)}px</div>
        <div>Scrolling: {isScrolling ? 'Yes' : 'No'}</div>
        <div>Lenis: {lenis ? 'Active' : 'Inactive'}</div>
      </div>
    </div>
  )
}
