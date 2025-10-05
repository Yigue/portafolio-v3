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
import { ConnectingLines } from "@/components/common/ConnectingLines"     // Líneas de conexión animadas
import { RailGlow } from "@/components/common/RailGlow"                   // Efecto de glow del rail
import { PerformanceOptimizer } from "@/components/common/PerformanceOptimizer" // Optimizador de rendimiento
import { ScrollProvider } from "@/components/providers/ScrollProvider" // Provider de scroll global

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

/**
 * COMPONENTE PRINCIPAL HOME
 * 
 * Estructura del portafolio con efectos visuales avanzados:
 * 1. Optimizador de rendimiento (se ejecuta primero)
 * 2. Scroll suave con Lenis
 * 3. Header con navegación y toggle de tema
 * 4. Barra de progreso de scroll
 * 5. Sistema de railes de luz (lado izquierdo)
 * 6. Líneas de conexión animadas (SVG)
 * 7. Secciones principales del contenido
 * 8. Efectos de fondo
 */
export default function Home() {
  // Referencia al contenedor principal para el scroll
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <ScrollProvider debug={false}>
      <div 
        ref={containerRef} 
        className="min-h-screen bg-background text-foreground relative overflow-x-hidden"
      >
        {/* ===== OPTIMIZADOR DE RENDIMIENTO ===== */}
        {/* Detecta dispositivos de bajo rendimiento y ajusta animaciones automáticamente */}
        <PerformanceOptimizer />
        
        {/* ===== SCROLL SUAVE ===== */}
        

        
        {/* ===== HEADER ===== */}
        {/* Barra de navegación superior con toggle de tema y navegación */}
        <Header />
        
        {/* ===== BARRA DE PROGRESO ===== */}
        {/* Muestra el progreso de scroll en el lado derecho */}
        <ProgressBar />

        {/* ===== SISTEMA DE RAILES DE LUZ ===== */}
        {/* Barra vertical con puntos de luz que se llenan al hacer scroll */}
        <LightRails sections={sections} debug={false} />
        
        {/* ===== GLOW DEL RAIL ===== */}
        {/* Efecto de iluminación dinámico del rail principal */}
        <RailGlow sections={sections} debug={false} />
        
        {/* ===== LÍNEAS DE CONEXIÓN ===== */}
        {/* Líneas curvas SVG que conectan visualmente las secciones */}
        <ConnectingLines sections={sections} debug={false} />

        {/* ===== CONTENIDO PRINCIPAL ===== */}
        <main className="relative">
          {/* Sección Hero - Presentación principal */}
          <section id="hero">
            <HeroSection />
          </section>
          
          {/* Sección Sobre mí - Información personal */}
          <section id="sobre-mí">
            <AboutSection />
          </section>
          
          {/* Sección Timeline - Trayectoria y experiencia */}
          <section id="timeline">
            <TimelineSection />
          </section>
          

          <section id="habilidades">
            <SkillsSection />
          </section>
  
          <section id="proyectos">
            <ProjectsSection />
          </section>
          

          <section id="contacto">
            <ContactSection />
          </section>
          
       
          <Footer />
        </main>

        {/* ===== EFECTOS DE FONDO ===== */}
        {/* Efectos visuales de fondo para profundidad */}
        <BackgroundEffects />
      </div>
    </ScrollProvider>
  )
}

