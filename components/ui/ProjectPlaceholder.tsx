"use client"

import { motion } from "framer-motion"
import { getProjectGradient, ProjectType, getMeshGradient } from "@/lib/gradients"
import { cn } from "@/lib/utils"

interface ProjectPlaceholderProps {
  type: ProjectType
  title: string
  className?: string
  pattern?: "mesh" | "geometric" | "minimal"
}

/**
 * PROJECT PLACEHOLDER
 * Placeholder visual moderno para proyectos sin imagen
 */
export function ProjectPlaceholder({ 
  type, 
  title,
  className,
  pattern = "mesh"
}: ProjectPlaceholderProps) {
  const gradient = getProjectGradient(type)
  
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Gradiente base */}
      <div 
        className="absolute inset-0"
        style={{ background: gradient }}
      />
      
      {/* Patrón según tipo */}
      {pattern === "mesh" && <MeshPattern />}
      {pattern === "geometric" && <GeometricPattern type={type} />}
      {pattern === "minimal" && <MinimalPattern />}
      
      {/* Overlay con blur sutil */}
      <div className="absolute inset-0 backdrop-blur-[0.5px]" />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2,
        }}
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
        }}
      />
      
      {/* Icono central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectIcon type={type} />
        </motion.div>
      </div>
      
      {/* Texto (opcional, oculto por defecto pero útil para accessibility) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <span className="text-white font-bold text-2xl drop-shadow-lg px-4 text-center">
          {title}
        </span>
      </div>
      
      {/* Border glow */}
      <div className="absolute inset-0 border border-white/10" />
    </div>
  )
}

/**
 * MESH PATTERN
 */
function MeshPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
      <defs>
        <pattern id="mesh-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.3)" />
          <circle cx="12" cy="12" r="1.5" fill="rgba(255,255,255,0.2)" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#mesh-pattern)" />
      <motion.circle
        cx="50"
        cy="50"
        r="30"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.5"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  )
}

/**
 * GEOMETRIC PATTERN
 */
function GeometricPattern({ type }: { type: ProjectType }) {
  const shapes = {
    web: (
      <>
        <rect x="20" y="20" width="25" height="25" fill="rgba(255,255,255,0.1)" />
        <rect x="55" y="55" width="25" height="25" fill="rgba(255,255,255,0.15)" />
        <circle cx="70" cy="30" r="15" fill="rgba(255,255,255,0.1)" />
      </>
    ),
    mobile: (
      <>
        <rect x="35" y="20" width="30" height="60" rx="5" fill="rgba(255,255,255,0.1)" />
        <line x1="35" y1="30" x2="65" y2="30" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      </>
    ),
    saas: (
      <>
        <path d="M50,20 L80,40 L50,60 L20,40 Z" fill="rgba(255,255,255,0.1)" />
        <circle cx="50" cy="70" r="10" fill="rgba(255,255,255,0.15)" />
      </>
    ),
    ecommerce: (
      <>
        <rect x="30" y="35" width="40" height="30" fill="rgba(255,255,255,0.1)" />
        <path d="M35,30 L40,35 L60,35 L65,30 Z" fill="rgba(255,255,255,0.15)" />
      </>
    ),
    analytics: (
      <>
        <polyline points="20,70 35,50 50,55 65,35 80,40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        {[20, 35, 50, 65, 80].map((x, i) => (
          <circle key={i} cx={x} cy={[70, 50, 55, 35, 40][i]} r="3" fill="rgba(255,255,255,0.3)" />
        ))}
      </>
    ),
    api: (
      <>
        <circle cx="30" cy="50" r="8" fill="rgba(255,255,255,0.1)" />
        <circle cx="50" cy="50" r="8" fill="rgba(255,255,255,0.1)" />
        <circle cx="70" cy="50" r="8" fill="rgba(255,255,255,0.1)" />
        <line x1="38" y1="50" x2="42" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <line x1="58" y1="50" x2="62" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      </>
    ),
  }
  
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
      {shapes[type]}
    </svg>
  )
}

/**
 * MINIMAL PATTERN
 */
function MinimalPattern() {
  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/5"
        animate={{
          y: [0, -30, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

/**
 * PROJECT ICON - Iconos SVG por tipo de proyecto
 */
function ProjectIcon({ type }: { type: ProjectType }) {
  const icons = {
    web: (
      <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    mobile: (
      <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    saas: (
      <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    ecommerce: (
      <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    analytics: (
      <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    api: (
      <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  }
  
  return icons[type]
}

