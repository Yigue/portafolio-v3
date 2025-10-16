"use client"

import { TextAnimation } from "@/components/common/SectionAnimation"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { ProjectPlaceholder } from "@/components/ui/ProjectPlaceholder"
import type { ProjectType } from "@/lib/gradients"

interface Project {
  title: string
  description: string
  stack: string[]
  type: ProjectType
  featured?: boolean
}

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "Sistema de Tracking",
      description: "Plataforma de seguimiento en tiempo real para logística con React, .NET y microservicios en AWS. Manejo de datos en tiempo real y visualización de rutas.",
      stack: ["React", "Node.js", "PostgreSQL", "AWS"],
      type: "web",
      featured: true
    },
    {
      title: "SaaS de Gestión",
      description: "Herramienta de gestión empresarial potenciada con IA para automatización de tareas",
      stack: ["Next.js", "Supabase", "OpenAI"],
      type: "saas",
      featured: true
    },
    {
      title: "E-commerce Platform",
      description: "Tienda online moderna con pagos integrados y gestión de inventario",
      stack: ["React", "Stripe", "Tailwind"],
      type: "ecommerce",
    },
    {
      title: "Analytics Dashboard",
      description: "Dashboard interactivo de métricas con visualización de datos en tiempo real",
      stack: ["Next.js", "D3.js", "Redis"],
      type: "analytics",
    },
    {
      title: "Mobile App",
      description: "Aplicación móvil para gestión de tareas con sincronización en la nube",
      stack: ["React Native", "Firebase"],
      type: "mobile",
    },
    {
      title: "API Gateway",
      description: "Arquitectura de microservicios escalable con Docker y Kubernetes",
      stack: [".NET", "Docker", "AWS"],
      type: "api",
    },
  ]

  return (
    <section id="proyectos" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <TextAnimation delay={0.2}>
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-5xl md:text-6xl font-light">
              Proyectos Destacados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluciones innovadoras desarrolladas con las últimas tecnologías
            </p>
          </div>
        </TextAnimation>

        {/* BentoGrid estilo Apple con layout asimétrico */}
        <BentoGrid className="max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <BentoGridItem
              key={index}
              title={project.title}
              description={
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Stack tecnológico */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Call to action */}
                  <div className="flex items-center gap-2 text-sm text-primary font-medium pt-2 group-hover/bento:gap-3 transition-all">
                    Ver proyecto 
                    <span>→</span>
                  </div>
                </div>
              }
              header={
                <div className="w-full h-full min-h-[200px] overflow-hidden rounded-xl relative group-hover/bento:scale-105 transition-transform duration-500">
                  <ProjectPlaceholder 
                    type={project.type} 
                    title={project.title}
                    pattern="geometric"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
                </div>
              }
              className={`${
                project.featured 
                  ? "md:col-span-2 md:row-span-2" 
                  : "md:col-span-1"
              }`}
              delay={index * 0.1}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
