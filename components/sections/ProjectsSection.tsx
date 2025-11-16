"use client"

import { useMemo, useState } from "react"
import { TextAnimation } from "@/components/common/SectionAnimation"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { ProjectPlaceholder } from "@/components/ui/ProjectPlaceholder"
import { Button } from "@/components/ui/button"
import { projects as projectData } from "@/lib/data/portfolio"
import type { ProjectType } from "@/lib/gradients"

const filterLabels: Record<string, string> = {
  todos: "Todos",
  enterprise: "Enterprise",
  saas: "SaaS",
  commerce: "E-commerce",
  data: "Data",
  mobile: "Mobile",
  platform: "Platform",
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("todos")

  const filters = useMemo(() => {
    const uniqueCategories = Array.from(new Set(projectData.map((project) => project.category)))
    return ["todos", ...uniqueCategories]
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === "todos") return projectData
    return projectData.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  return (
    <section id="proyectos" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <TextAnimation delay={0.2}>
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Casos reales</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light">
              Sistemas que mueven negocio
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Productos SaaS, plataformas enterprise y experiencias móviles diseñadas para escalar sin sacrificar calidad
            </p>
          </div>
        </TextAnimation>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "glass"}
              size="sm"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filterLabels[filter] ?? filter}
            </Button>
          ))}
        </div>

        <BentoGrid className="max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <BentoGridItem
              key={project.title}
              title={project.title}
              description={
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-2xl border border-white/10 px-3 py-2 text-left">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{metric.label}</p>
                        <p className="text-base font-semibold text-foreground">{metric.value}</p>
                      </div>
                    ))}
                  </div>

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-primary font-medium pt-2 group-hover/bento:gap-3 transition-all"
                    aria-label={`Ver caso ${project.title}`}
                  >
                    Ver caso
                    <span>→</span>
                  </a>
                </div>
              }
              header={
                <div className="w-full h-full min-h-[220px] overflow-hidden rounded-xl relative group-hover/bento:scale-105 transition-transform duration-500">
                  <ProjectPlaceholder
                    type={project.type as ProjectType}
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
