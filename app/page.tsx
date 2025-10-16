/**
 * PÁGINA PRINCIPAL DEL PORTAFOLIO
 * 
 * Estructura del portafolio con:
 * - Sistema de railes de luz sincronizado con scroll
 * - Animaciones suaves y fluidas
 * - Optimización de rendimiento automática
 * - Diseño responsive y moderno
 */

"use client"

import { useRef } from "react"

// Layout & Provider
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ProgressBar from "@/components/layout/ProgressBar"
import { ScrollProvider } from "@/components/providers/ScrollProvider"

// Sections
import HeroSection from "@/components/sections/HeroSection"
import AboutSection from "@/components/sections/AboutSection"
import TimelineSection from "@/components/sections/TimelineSection"
import SkillsSection from "@/components/sections/SkillsSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import ContactSection from "@/components/sections/ContactSection"

// Effects & Utilities
import { BackgroundEffects } from "@/components/common/BackgroundEffects"
import { LightRails } from "@/components/common/LightRails"
import { PerformanceOptimizer } from "@/components/common/PerformanceOptimizer"
import { GlobalSpotlight } from "@/components/common/GlobalSpotlight"
import { CustomCursor } from "@/components/common/CustomCursor"
import { AlternatingLayout } from "@/components/common/AlternatingLayout"

// Configuración de secciones
const sections = [
  "hero",
  "sobre-mí",
  "timeline",
  "habilidades",
  "proyectos",
  "contacto"
]

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <ScrollProvider debug={false}>
      <div
        ref={containerRef}
        className="min-h-screen bg-background text-foreground relative overflow-x-hidden"
      >
        <PerformanceOptimizer />
        <GlobalSpotlight intensity={0.15} />
        <CustomCursor />
        <Header />
        <ProgressBar />
        <LightRails sections={sections} debug={false} />

        <main className="relative">
          <HeroSection />
          
          {/* Secciones con AlternatingLayout */}
          <AlternatingLayout position="left" enableBeam={true}>
            <AboutSection />
          </AlternatingLayout>
          
          <AlternatingLayout position="right" enableBeam={true}>
            <TimelineSection />
          </AlternatingLayout>
          
          <AlternatingLayout position="left" enableBeam={true}>
            <SkillsSection />
          </AlternatingLayout>
          
          <AlternatingLayout position="right" enableBeam={true}>
            <ProjectsSection />
          </AlternatingLayout>
          
          <ContactSection />
          <Footer />
        </main>

        <BackgroundEffects />
      </div>
    </ScrollProvider>
  )
}

