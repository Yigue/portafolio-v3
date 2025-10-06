"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type SpotlightProps = {
  className?: string
  fill?: string
}

export const Spotlight = ({ className, fill = "hsl(var(--primary))" }: SpotlightProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const element = ref.current
    if (element) {
      element.addEventListener("mousemove", handleMouseMove)
      element.addEventListener("mouseenter", handleMouseEnter)
      element.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove)
        element.removeEventListener("mouseenter", handleMouseEnter)
        element.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-auto absolute inset-0 overflow-hidden",
        className
      )}
    >
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle at center, ${fill} 0%, transparent 70%)`,
          filter: "blur(80px)",
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          opacity: isHovering ? 0.4 : 0,
          scale: isHovering ? 1.2 : 0.8,
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { duration: 0.5, ease: "easeOut" },
        }}
      />
    </div>
  )
}

