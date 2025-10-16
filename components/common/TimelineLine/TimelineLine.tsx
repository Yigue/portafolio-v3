"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimelineLineProps {
  items: Array<{
    type: "experience" | "education"
    year: string
  }>
  className?: string
}

/**
 * TIMELINE LINE
 * Línea central animada para la sección de Timeline
 * Con nodos y conectores para cada item
 */
export function TimelineLine({ items, className }: TimelineLineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [lineHeight, setLineHeight] = useState(0)
  
  // Scroll progress de la línea
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  })
  
  // Suavizar con spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    if (!ref.current) return
    
    const updateHeight = () => {
      if (ref.current) {
        setLineHeight(ref.current.offsetHeight)
      }
    }
    
    updateHeight()
    window.addEventListener("resize", updateHeight)
    
    return () => window.removeEventListener("resize", updateHeight)
  }, [items])

  // Altura de la línea animada
  const lineY = useTransform(smoothProgress, [0, 1], [0, lineHeight])

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Línea base estática */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-border/30" />
      
      {/* Línea animada que crece */}
      <motion.div
        className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-primary via-primary to-primary/0"
        style={{
          height: lineY,
          filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.6))",
        }}
      />
      
      {/* Nodos por cada item */}
      {items.map((item, index) => {
        const progress = (index + 1) / (items.length + 1)
        const nodeOpacity = useTransform(
          smoothProgress,
          [progress - 0.1, progress, progress + 0.1],
          [0, 1, 1]
        )
        const nodeScale = useTransform(
          smoothProgress,
          [progress - 0.1, progress],
          [0.5, 1]
        )
        
        return (
          <motion.div
            key={index}
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: `${progress * 100}%`,
              opacity: nodeOpacity,
              scale: nodeScale,
            }}
          >
            {/* Círculo del nodo */}
            <div className="relative">
              <motion.div
                className={cn(
                  "w-5 h-5 rounded-full border-3 bg-background shadow-lg relative z-10",
                  item.type === "experience" 
                    ? "border-primary" 
                    : "border-blue-500"
                )}
                whileHover={{ scale: 1.3 }}
              >
                {/* Punto interior */}
                <div className={cn(
                  "absolute inset-1 rounded-full",
                  item.type === "experience" 
                    ? "bg-primary" 
                    : "bg-blue-500"
                )} />
              </motion.div>
              
              {/* Glow del nodo */}
              <motion.div
                className={cn(
                  "absolute inset-0 rounded-full blur-md -z-10",
                  item.type === "experience" 
                    ? "bg-primary/40" 
                    : "bg-blue-500/40"
                )}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              />
              
              {/* Conector horizontal */}
              <motion.div
                className={cn(
                  "absolute top-1/2 w-12 h-[2px] -translate-y-1/2",
                  item.type === "experience" 
                    ? "right-full bg-gradient-to-l from-primary/50 to-transparent" 
                    : "left-full bg-gradient-to-r from-blue-500/50 to-transparent"
                )}
                initial={{ scaleX: 0 }}
                style={{
                  scaleX: useTransform(
                    smoothProgress,
                    [progress, progress + 0.05],
                    [0, 1]
                  ),
                  transformOrigin: item.type === "experience" ? "right" : "left",
                }}
              />
              
              {/* Badge con año */}
              <motion.div
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 whitespace-nowrap",
                  "px-2 py-1 rounded-full text-xs font-medium",
                  "bg-background border border-border shadow-sm",
                  item.type === "experience" ? "right-16" : "left-16"
                )}
                initial={{ opacity: 0, x: item.type === "experience" ? 10 : -10 }}
                style={{
                  opacity: nodeOpacity,
                  x: 0,
                }}
              >
                {item.year}
              </motion.div>
            </div>
          </motion.div>
        )
      })}
      
      {/* Indicador de inicio */}
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg" />
      </motion.div>
      
      {/* Indicador de fin */}
      <motion.div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2"
        style={{
          opacity: useTransform(smoothProgress, [0.9, 1], [0, 1]),
          scale: useTransform(smoothProgress, [0.9, 1], [0.5, 1]),
        }}
      >
        <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg animate-pulse" />
      </motion.div>
    </div>
  )
}

export default TimelineLine

