"use client"

import { TextAnimation } from "@/components/common/SectionAnimation"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { TechImage } from "@/components/ui/TechImage"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

// ===== ICONOS SVG PERSONALIZADOS =====
const CodeIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const ServerIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
)

const CloudIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
)

const SparklesIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

const DesignIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
)

const DatabaseIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
)

export default function SkillsSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  
  // Parallax sutil para el fondo
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section ref={ref} id="habilidades" className="py-32 relative">
      {/* Efecto parallax de fondo */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ y }}
      >
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ===== TÍTULO DE LA SECCIÓN ===== */}
        <TextAnimation delay={0.2}>
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-5xl md:text-6xl font-light">
              Stack Tecnológico
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Herramientas y tecnologías que domino para crear soluciones completas
            </p>
          </div>
        </TextAnimation>

        {/* ===== BENTO GRID ASIMÉTRICO ===== */}
        <BentoGrid className="max-w-7xl mx-auto">
          {/* Frontend - Card grande */}
          <BentoGridItem
            title="Frontend Development"
            description={
              <div className="space-y-3">
                <p className="text-muted-foreground">Interfaces modernas y responsivas con las últimas tecnologías</p>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            }
            header={
              <div className="w-full h-32 rounded-xl overflow-hidden">
                <TechImage category="frontend" pattern="mesh" />
              </div>
            }
            icon={<CodeIcon />}
            className="md:col-span-2 md:row-span-2"
            delay={0.1}
          />

          {/* Backend */}
          <BentoGridItem
            title="Backend"
            description={
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {[".NET", "Node.js", "Express", "REST APIs"].map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            }
            header={
              <div className="w-full h-24 rounded-xl overflow-hidden">
                <TechImage category="backend" pattern="waves" />
              </div>
            }
            icon={<ServerIcon />}
            className="md:col-span-1"
            delay={0.2}
          />

          {/* Databases */}
          <BentoGridItem
            title="Databases"
            description={
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {["PostgreSQL", "MongoDB", "Redis", "Supabase"].map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            }
            header={
              <div className="w-full h-24 rounded-xl overflow-hidden">
                <TechImage category="database" pattern="grid" />
              </div>
            }
            icon={<DatabaseIcon />}
            className="md:col-span-1"
            delay={0.25}
          />

          {/* DevOps - Card mediana */}
          <BentoGridItem
            title="DevOps & Cloud"
            description={
              <div className="space-y-3">
                <p className="text-muted-foreground">Infraestructura escalable y automatizada</p>
                <div className="flex flex-wrap gap-2">
                  {["Docker", "AWS", "CI/CD", "Kubernetes", "Vercel"].map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            }
            header={
              <div className="w-full h-28 rounded-xl overflow-hidden">
                <TechImage category="devops" pattern="dots" />
              </div>
            }
            icon={<CloudIcon />}
            className="md:col-span-2"
            delay={0.3}
          />

          {/* AI & ML */}
          <BentoGridItem
            title="AI & ML"
            description={
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {["OpenAI", "LangChain", "Vector DBs", "RAG"].map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            }
            header={
              <div className="w-full h-24 rounded-xl overflow-hidden">
                <TechImage category="ai" pattern="mesh" />
              </div>
            }
            icon={<SparklesIcon />}
            className="md:col-span-1"
            delay={0.35}
          />

          {/* Design & Tools */}
          <BentoGridItem
            title="Design & Tools"
            description={
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {["Figma", "Git", "Jira", "Notion", "Linear"].map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            }
            header={
              <div className="w-full h-28 rounded-xl overflow-hidden">
                <TechImage category="design" pattern="waves" />
              </div>
            }
            icon={<DesignIcon />}
            className="md:col-span-2"
            delay={0.4}
          />
        </BentoGrid>
      </div>
    </section>
  )
}
