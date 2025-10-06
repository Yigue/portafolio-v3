"use client"

import { motion, useInView, useMotionValue, useTransform, animate, useScroll, useSpring } from "framer-motion"
import { useRef, ReactNode, useEffect, useState } from "react"
import { useScrollProgress } from "@/components/providers/ScrollProvider"

interface CardAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  /** Activar o no el efecto Scroll Beam */
  enableBeam?: boolean
  /** Altura de la franja luminosa en px */
  beamHeight?: number
  /** Radio de influencia alrededor de la franja */
  influenceRadius?: number
  /** Intensidad máxima del glow (0–1) */
  maxIntensity?: number
  /** Duración del recorrido de la luz (segundos) */
  traceDuration?: number
}

/**
 * CARD ANIMATION – Tracing Beam Edition (Sincronizado con Scroll)
 *
 * Los bordes de la card se trazan progresivamente mientras scrolleas,
 * similar al efecto TracingBeam pero aplicado al contorno de cada card.
 * 
 * Características:
 * - Trazado SVG que se dibuja de 0% a 100% según scroll progress
 * - Sincronizado con el scroll individual de cada card
 * - Glow dinámico que aumenta al alcanzar el centro del viewport
 * - Animaciones fluidas con spring physics
 */
export default function CardAnimation({ 
  children, 
  className = "",
  delay = 0,
  stagger = 0.1,
  enableBeam = true,
  beamHeight = 60,
  influenceRadius = 200,
  maxIntensity = 1,
  traceDuration = 2.5,
}: CardAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.2 })
  const { progress: globalProgress } = useScrollProgress()
  const glowIntensity = useMotionValue(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // ===== SCROLL PROGRESS DE LA CARD INDIVIDUAL =====
  // Esto hace que los bordes se tracen según la posición de la card en el viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Se dibuja desde que entra hasta que sale
  })

  // Suavizar el scroll progress con spring para transiciones fluidas
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // ===== ACTUALIZAR DIMENSIONES DE LA CARD =====
  useEffect(() => {
    if (!ref.current) return
    
    const updateDimensions = () => {
      if (!ref.current) return
      const { width, height } = ref.current.getBoundingClientRect()
      setDimensions({ width, height })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // ===== CALCULAR INTENSIDAD SEGÚN DISTANCIA A LA FRANJA =====
  // Este efecto controla el glow cuando la card está cerca del centro
  useEffect(() => {
    if (!enableBeam || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const spotlightY = window.innerHeight / 2

    // Distancia vertical entre la franja y el centro del elemento
    const elementCenter = rect.top + rect.height / 2
    const distance = Math.abs(elementCenter - spotlightY)

    // Intensidad máxima cuando el centro está dentro de la franja
    const rawIntensity = Math.max(0, 1 - distance / influenceRadius)
    const eased = 1 - Math.pow(1 - rawIntensity, 3)
    const finalIntensity = eased * maxIntensity

    animate(glowIntensity, finalIntensity, {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    })
  }, [globalProgress, enableBeam, glowIntensity, beamHeight, influenceRadius, maxIntensity])

  // ===== TRANSFORMACIONES VISUALES =====
  // Opacidad del borde basada en scroll progress (se dibuja gradualmente)
  const borderOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3])
  
  // Opacidad del glow ambiental aumenta cuando está cerca del centro
  const ambientOpacity = useTransform(glowIntensity, [0, 1], [0, 0.6])
  
  // Escala sutil en el centro
  const scale = useTransform(glowIntensity, [0, 1], [1, 1.02])
  
  // Brightness aumenta cuando pasa por el centro
  const brightness = useTransform(glowIntensity, [0, 1], [1, 1.15])

  // ===== CALCULAR PERÍMETRO Y TRAZADO PARA SVG =====
  const perimeter = (dimensions.width + dimensions.height) * 2
  const strokeDasharray = perimeter
  
  // El strokeDashoffset se anima con el scroll progress
  // Va de perimeter completo (sin dibujar) a 0 (completamente dibujado)
  const strokeDashoffset = useTransform(smoothProgress, [0, 0.8], [perimeter, 0])
  
  // Opacidad de la línea secundaria de glow
  const secondaryGlowOpacity = useTransform(borderOpacity, [0, 1], [0, 0.6])
  
  // Opacidad del punto brillante que sigue el trazado
  const pointOpacity = useTransform(smoothProgress, [0, 0.2, 0.6, 0.8], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: delay + stagger,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 120,
        damping: 25,
      }}
      className={className}
      style={{
        position: "relative",
        scale,
        filter: `brightness(${brightness})`,
      }}
    >
      {/* ===== SVG TRACING BEAM SINCRONIZADO CON SCROLL ===== */}
      {enableBeam && dimensions.width > 0 && (
        <>
          {/* SVG que traza el borde progresivamente según el scroll */}
          <motion.svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradiente dinámico que crea el efecto de "luz viajera" */}
              <linearGradient
                id="card-tracing-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="hsl(var(--primary) / 0)" />
                <stop offset="40%" stopColor="hsl(var(--primary) / 0.3)" />
                <stop offset="50%" stopColor="hsl(var(--primary) / 1)" />
                <stop offset="60%" stopColor="hsl(var(--primary) / 0.3)" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
              </linearGradient>
              
              {/* Filtro de glow para la línea */}
              <filter id="card-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Borde base estático (gris sutil) */}
            <motion.rect
              x="1"
              y="1"
              width={dimensions.width - 2}
              height={dimensions.height - 2}
              rx="18"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              strokeOpacity="0.3"
              style={{
                strokeLinecap: "round",
              }}
            />

            {/* Rectángulo que se va "dibujando" con el scroll */}
            <motion.rect
              x="1"
              y="1"
              width={dimensions.width - 2}
              height={dimensions.height - 2}
              rx="18"
              stroke="url(#card-tracing-gradient)"
              strokeWidth="2.5"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              filter="url(#card-glow-filter)"
              style={{
                strokeLinecap: "round",
                opacity: borderOpacity,
              }}
            />
            
            {/* Línea secundaria más gruesa para efecto de glow intenso */}
            <motion.rect
              x="1"
              y="1"
              width={dimensions.width - 2}
              height={dimensions.height - 2}
              rx="18"
              stroke="hsl(var(--primary) / 0.25)"
              strokeWidth="6"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              filter="url(#card-glow-filter)"
              style={{
                strokeLinecap: "round",
                opacity: secondaryGlowOpacity,
              }}
            />
          </motion.svg>

          {/* Resplandor ambiental difuso que aumenta cuando pasa por el centro */}
          <motion.div
            style={{
              position: "absolute",
              inset: "-20px",
              borderRadius: "24px",
              background:
                "radial-gradient(circle at center, hsl(var(--primary) / 0.2) 0%, transparent 70%)",
              filter: "blur(32px)",
              opacity: ambientOpacity,
              pointerEvents: "none",
            }}
          />

          {/* Punto brillante que sigue el progreso del trazado */}
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: "0",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "hsl(var(--primary))",
              boxShadow: "0 0 16px hsl(var(--primary)), 0 0 32px hsl(var(--primary) / 0.6)",
              pointerEvents: "none",
              transform: "translate(-50%, -50%)",
              opacity: pointOpacity,
            }}
          />
        </>
      )}
      
      {children}
    </motion.div>
  )
}
