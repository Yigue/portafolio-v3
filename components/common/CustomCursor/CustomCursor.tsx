"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface CustomCursorProps {
  disabled?: boolean
}

/**
 * CUSTOM CURSOR
 * Cursor personalizado con efectos interactivos
 * Se expande en botones, se contrae en enlaces
 */
export function CustomCursor({ disabled = false }: CustomCursorProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [cursorVariant, setCursorVariant] = useState<"default" | "button" | "link">("default")
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Spring más lento para el cursor principal
  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  // Trail cursor (más lento)
  const trailX = useSpring(cursorX, { damping: 30, stiffness: 100 })
  const trailY = useSpring(cursorY, { damping: 30, stiffness: 100 })

  useEffect(() => {
    // Detectar mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile || disabled) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (target.tagName === "BUTTON" || target.closest("button")) {
        setCursorVariant("button")
      } else if (target.tagName === "A" || target.closest("a")) {
        setCursorVariant("link")
      } else {
        setCursorVariant("default")
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [isMobile, disabled, cursorX, cursorY])

  // No renderizar en mobile o si está deshabilitado
  if (isMobile || disabled) return null

  const variants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: "rgba(var(--primary-rgb), 0.5)",
      border: "2px solid rgba(var(--primary-rgb), 0.8)",
    },
    button: {
      width: 50,
      height: 50,
      backgroundColor: "rgba(var(--primary-rgb), 0.1)",
      border: "2px solid rgba(var(--primary-rgb), 1)",
    },
    link: {
      width: 10,
      height: 10,
      backgroundColor: "rgba(var(--primary-rgb), 0.8)",
      border: "1px solid rgba(var(--primary-rgb), 1)",
    },
  }

  return (
    <>
      {/* Cursor principal */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={variants[cursorVariant]}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Trail cursor (opcional) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          backgroundColor: "rgba(var(--primary-rgb), 0.3)",
        }}
      />
    </>
  )
}

export default CustomCursor

