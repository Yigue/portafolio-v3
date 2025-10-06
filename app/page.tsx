/**
 * PÁGINA PRINCIPAL DEL PORTAFOLIO
 * 
 * Este archivo contiene la estructura principal del portafolio con:
 * - Sistema de railes de luz que se llenan al hacer scroll
 * - Líneas de conexión animadas entre secciones
 * - Animaciones suaves estilo Apple
 * - Optimización de rendimiento automática
 * - Diseño responsive y accesible
 */

"use client"

import { useRef } from "react"

// ===== IMPORTACIONES DE COMPONENTES =====
// Layout Components - Componentes de estructura general
import Header from "@/components/layout/Header"           // Barra de navegación superior
import Footer from "@/components/layout/Footer"           // Pie de página
import ProgressBar from "@/components/layout/ProgressBar" // Barra de progreso de scroll

// Section Components - Secciones principales del portafolio
import HeroSection from "@/components/sections/HeroSection"         // Sección de presentación principal
import AboutSection from "@/components/sections/AboutSection"       // Sección "Sobre mí"
import TimelineSection from "@/components/sections/TimelineSection" // Sección de trayectoria/experiencia
import SkillsSection from "@/components/sections/SkillsSection"     // Sección de habilidades técnicas
import ProjectsSection from "@/components/sections/ProjectsSection" // Sección de proyectos
import ContactSection from "@/components/sections/ContactSection"   // Sección de contacto

// Common Components - Componentes de efectos y utilidades
import { BackgroundEffects } from "@/components/common/BackgroundEffects" // Efectos de fondo

import { LightRails } from "@/components/common/LightRails"               // Sistema de railes de luz
import { PerformanceOptimizer } from "@/components/common/PerformanceOptimizer" // Optimizador de rendimiento
import { ScrollProvider } from "@/components/providers/ScrollProvider" // Provider de scroll global
import { ConnectedLines } from "@/components/common/ConnectedLines"     // Líneas conectadas del boceto
import AnimatedSection from "@/components/common/AnimatedSection/AnimatedSection" // Secciones animadas

// ===== CONFIGURACIÓN DE SECCIONES =====
// Array con los IDs de todas las secciones para el sistema de navegación
const sections = [
  "hero",        // Sección principal de presentación
  "sobre-mí",    // Sección "Sobre mí"
  "timeline",    // Sección de trayectoria
  "habilidades", // Sección de habilidades
  "proyectos",   // Sección de proyectos
  "contacto"     // Sección de contacto
]


export default function Home() {
  // Referencia al contenedor principal para el scroll
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <ScrollProvider debug={false}>
      <div
        ref={containerRef}
        className="min-h-screen bg-background text-foreground relative overflow-x-hidden"
      >

        <PerformanceOptimizer />
        <Header />

        <ProgressBar />
        <LightRails sections={sections} debug={false} />

        {/* <ConnectedLines debug={false} /> */}
        <main className="relative">
          <HeroSection />
          <AboutSection />
          <TimelineSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </main>

        <BackgroundEffects />
      </div>
    </ScrollProvider>
  )
}

