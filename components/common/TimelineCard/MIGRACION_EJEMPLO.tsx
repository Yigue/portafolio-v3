/**
 * GUÍA DE MIGRACIÓN
 * 
 * Cómo migrar tu TimelineSection actual al nuevo componente TimelineCard
 */

// ============================================
// VERSIÓN ANTERIOR (TimelineSection.tsx)
// ============================================

/*
"use client"

import { CardAnimation, TextAnimation } from "@/components/common/SectionAnimation"
import { TracingBeam } from "@/components/ui/TracingBeam"

function TimelineCard({ item, index }) {
  return (
    <CardAnimation
      delay={0.2 + index * 0.1}
      className="glass rounded-[20px] p-8 shadow-card border border-border/50 hover:shadow-primary-lg 
      hover:border-primary/30 transition-all duration-500 group cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-4 right-4">
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
          item.type === "education" 
            ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" 
            : "bg-primary/10 text-primary border border-primary/20"
        }`}>
          {item.type === "education" ? "Formación" : "Experiencia"}
        </span>
      </div>

      <div className="space-y-3">
        <div className="text-sm text-primary font-semibold tracking-wide uppercase">
          {item.year}
        </div>
        
        <h4 className="text-2xl font-medium group-hover:text-primary transition-colors leading-tight">
          {item.title}
        </h4>
        
        <div className="text-base text-muted-foreground font-medium">
          {item.institution || item.company}
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed pt-2">
          {item.description}
        </p>
      </div>

      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 
      group-hover:opacity-100 transition-opacity duration-500" />
    </CardAnimation>
  )
}
*/

// ============================================
// VERSIÓN NUEVA (con TimelineCard genérico)
// ============================================

"use client"

import { TextAnimation } from "@/components/common/SectionAnimation"
import { TracingBeam } from "@/components/ui/TracingBeam"
import { TimelineCard } from "@/components" // 👈 Importar el componente genérico

interface TimelineItem {
  year: string
  title: string
  institution?: string
  company?: string
  description: string
  type: "education" | "experience"
}

export default function TimelineSection() {
  const timelineItems: TimelineItem[] = [
    {
      year: "2023 - Presente",
      title: "Desarrollador Full Stack",
      company: "Andreani",
      description: "Desarrollo de plataformas logísticas y sistemas de tracking en tiempo real con React, .NET y microservicios en AWS.",
      type: "experience",
    },
    {
      year: "2021 - Presente",
      title: "Licenciatura en Sistemas",
      institution: "UADE",
      description: "Especialización en desarrollo de software, arquitectura de sistemas, algoritmos avanzados y bases de datos distribuidas.",
      type: "education",
    },
    // ... más items
  ]

  return (
    <section id="timeline" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <TextAnimation delay={0.2}>
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-5xl md:text-6xl font-light">
              Trayectoria
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mi recorrido profesional y académico en el desarrollo de software
            </p>
          </div>
        </TextAnimation>

        <TracingBeam className="px-6">
          <div className="space-y-12 md:space-y-16">
            {timelineItems.map((item, index) => (
              {/* 👇 Versión simplificada con el componente genérico */}
              <TimelineCard
                key={index}
                year={item.year}
                title={item.title}
                subtitle={item.institution || item.company}
                badge={{
                  label: item.type === "education" ? "Formación" : "Experiencia",
                  variant: item.type === "education" ? "info" : "primary"
                }}
                index={index}
              >
                {item.description}
              </TimelineCard>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  )
}

// ============================================
// COMPARACIÓN LÍNEA POR LÍNEA
// ============================================

/*

ANTES:
------
<CardAnimation
  delay={0.2 + index * 0.1}
  className="glass rounded-[20px] p-8 shadow-card border border-border/50..."
>
  <div className="absolute top-4 right-4">
    <span className={`...${
      item.type === "education" 
        ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" 
        : "bg-primary/10 text-primary border border-primary/20"
    }`}>
      {item.type === "education" ? "Formación" : "Experiencia"}
    </span>
  </div>
  
  <div className="space-y-3">
    <div className="...">{item.year}</div>
    <h4 className="...">{item.title}</h4>
    <div className="...">{item.institution || item.company}</div>
    <p className="...">{item.description}</p>
  </div>
  
  <div className="absolute -bottom-20 -right-20..." />
</CardAnimation>


AHORA:
------
<TimelineCard
  year={item.year}
  title={item.title}
  subtitle={item.institution || item.company}
  badge={{
    label: item.type === "education" ? "Formación" : "Experiencia",
    variant: item.type === "education" ? "info" : "primary"
  }}
  index={index}
>
  {item.description}
</TimelineCard>

*/

// ============================================
// VENTAJAS DE LA MIGRACIÓN
// ============================================

/*

✅ CÓDIGO MÁS LIMPIO
   - De ~40 líneas a ~8 líneas por card
   - Props claras e intuitivas
   - Sin lógica condicional compleja

✅ REUTILIZABLE
   - Puedes usar TimelineCard en cualquier sección
   - No está acoplado a TimelineSection
   - Fácil de compartir entre proyectos

✅ MANTENIBLE
   - Un solo lugar para actualizar el diseño
   - Cambios centralizados afectan todas las instancias
   - Menos código duplicado

✅ TYPE-SAFE
   - Props tipadas con TypeScript
   - Autocomplete en el IDE
   - Errores en tiempo de desarrollo

✅ DOCUMENTADO
   - README completo
   - Ejemplos de uso
   - Props explicadas

*/

// ============================================
// PASOS PARA MIGRAR
// ============================================

/*

1. IMPORTAR EL COMPONENTE
   ```tsx
   import { TimelineCard } from "@/components"
   ```

2. REEMPLAZAR LA FUNCIÓN TIMELINECARD LOCAL
   - Eliminar la función TimelineCard que está dentro de TimelineSection.tsx
   - Usar el componente importado

3. ACTUALIZAR EL MAPEO
   ```tsx
   {timelineItems.map((item, index) => (
     <TimelineCard
       key={index}
       year={item.year}
       title={item.title}
       subtitle={item.institution || item.company}
       badge={{
         label: item.type === "education" ? "Formación" : "Experiencia",
         variant: item.type === "education" ? "info" : "primary"
       }}
       index={index}
     >
       {item.description}
     </TimelineCard>
   ))}
   ```

4. PROBAR
   - El componente ya tiene todos los estilos y animaciones
   - Debería verse exactamente igual (o mejor)
   - Ahora sincronizado con TracingBeam en el centro

*/

