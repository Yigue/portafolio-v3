/**
 * EJEMPLO DE USO - TimelineCard
 * 
 * Este archivo muestra cómo usar el componente TimelineCard
 * en una sección de Timeline con TracingBeam
 */

"use client"

import { TracingBeam } from "@/components/ui/TracingBeam"
import { TimelineCard } from "@/components"
import { TextAnimation } from "@/components/common/SectionAnimation"

interface TimelineItem {
  year: string
  title: string
  subtitle: string
  description: string
  type: "education" | "experience"
}

export default function ExampleTimelineSection() {
  const timelineItems: TimelineItem[] = [
    {
      year: "2023 - Presente",
      title: "Desarrollador Full Stack",
      subtitle: "Andreani",
      description: "Desarrollo de plataformas logísticas y sistemas de tracking en tiempo real con React, .NET y microservicios en AWS.",
      type: "experience",
    },
    {
      year: "2021 - Presente",
      title: "Licenciatura en Sistemas",
      subtitle: "UADE",
      description: "Especialización en desarrollo de software, arquitectura de sistemas, algoritmos avanzados y bases de datos distribuidas.",
      type: "education",
    },
    {
      year: "2023",
      title: "Certificación Full Stack",
      subtitle: "Plataforma Online",
      description: "Stack MERN completo: React, Node.js, Express, MongoDB, PostgreSQL, Docker y despliegue en producción.",
      type: "education",
    },
    {
      year: "2022 - 2023",
      title: "Freelance Developer",
      subtitle: "Proyectos SaaS",
      description: "Creación de productos SaaS para startups: dashboards de analytics, sistemas de autenticación y APIs RESTful.",
      type: "experience",
    },
  ]

  return (
    <section id="timeline" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        {/* Título de la sección */}
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

        {/* TracingBeam con TimelineCards */}
        <TracingBeam className="px-6">
          <div className="space-y-12 md:space-y-16">
            {timelineItems.map((item, index) => (
              <TimelineCard
                key={index}
                year={item.year}
                title={item.title}
                subtitle={item.subtitle}
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

/**
 * EJEMPLOS ADICIONALES
 */

// Ejemplo 1: TimelineCard simple sin badge
export function SimpleTimelineCard() {
  return (
    <TimelineCard
      year="2023"
      title="Proyecto Personal"
      subtitle="Open Source"
    >
      Desarrollo de una librería de componentes React con TypeScript.
    </TimelineCard>
  )
}

// Ejemplo 2: TimelineCard con contenido personalizado
export function CustomContentTimelineCard() {
  return (
    <TimelineCard
      year="2022"
      title="Certificación AWS"
      subtitle="Amazon Web Services"
      badge={{ label: "Completado", variant: "success" }}
    >
      <div className="space-y-3">
        <p className="font-medium">Servicios dominados:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>EC2 y Auto Scaling</li>
          <li>S3 y CloudFront</li>
          <li>Lambda y API Gateway</li>
          <li>RDS y DynamoDB</li>
        </ul>
      </div>
    </TimelineCard>
  )
}

// Ejemplo 3: TimelineCard sin efecto de beam
export function NoBeamTimelineCard() {
  return (
    <TimelineCard
      year="2021"
      title="Curso de TypeScript"
      subtitle="Udemy"
      enableBeam={false}
      badge={{ label: "Certificado", variant: "info" }}
    >
      Curso avanzado de TypeScript con patrones de diseño y mejores prácticas.
    </TimelineCard>
  )
}

// Ejemplo 4: TimelineCard con estilos personalizados
export function StyledTimelineCard() {
  return (
    <TimelineCard
      year="2020"
      title="Primer Proyecto Freelance"
      subtitle="Cliente Internacional"
      className="bg-gradient-to-br from-primary/5 to-transparent"
      badge={{ label: "Hito", variant: "success" }}
    >
      Desarrollo de una landing page con animaciones avanzadas y formularios de contacto.
    </TimelineCard>
  )
}

