"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import MindMapDiagram from "./SkillsVenn/MindMapDiagram";
import { MindMapNode, Skill, SubNode } from "./SkillsVenn/MindMapTypes";

export default function SkillsSectionMindMap() {
  const RADIUS = 32; // Porcentaje desde el centro (reducido para dar más espacio)
  const CENTER_X = 50;
  const CENTER_Y = 50;

  const calculateRadialPosition = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: CENTER_X + Math.cos(rad) * RADIUS,
      y: CENTER_Y + Math.sin(rad) * RADIUS,
    };
  };

  const createSkill = (name: string, description?: string): Skill => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    description,
  });

  const mindMapData = {
    central: {
      title: "DevOps Engineer",
      subtitle: "Backend / Cloud / Security",
    },
    categories: [
      {
        id: "desarrollo",
        title: "Desarrollo",
        ...calculateRadialPosition(150),
        color: "#6b5bff",
        bgColor: "rgba(107, 91, 255, 0.25)",
        glowColor: "#6b5bff",
        glowIntensity: 0.6,
        description: "Desarrollo de software y programación",
        subNodes: [
          {
            id: "oop",
            title: "OOP",
            x: 5,
            y: 10,
            color: "#6b5bff",
            skills: [
              createSkill("OOP", "Programación Orientada a Objetos"),
              createSkill(".NET", "Framework .NET para desarrollo backend"),
              createSkill("React", "Biblioteca de JavaScript para UI"),
              createSkill("APIs", "Diseño e implementación de APIs REST"),
            ],
          } as SubNode,
        ],
        skills: [
          createSkill("SQL", "Structured Query Language para bases de datos"),
          { ...createSkill("SQL", "Structured Query Language para bases de datos"), id: "sql-2" },
        ],
      },
      {
        id: "cloud-infra",
        title: "Cloud / Infraestructura",
        ...calculateRadialPosition(90),
        color: "#18b2f0",
        bgColor: "rgba(24, 178, 240, 0.25)",
        glowColor: "#18b2f0",
        glowIntensity: 0.6,
        description: "Cloud computing e infraestructura como código",
        skills: [
          createSkill("AWS", "Amazon Web Services - servicios cloud"),
          createSkill("Terraform", "Infrastructure as Code (IaC)"),
          createSkill("Ansible", "Automatización de configuración"),
        ],
      },
      {
        id: "cicd",
        title: "CICD",
        ...calculateRadialPosition(45),
        color: "#1e40af",
        bgColor: "rgba(30, 64, 175, 0.25)",
        glowColor: "#1e40af",
        glowIntensity: 0.6,
        description: "Continuous Integration / Continuous Delivery",
        skills: [createSkill("CI/CD", "Integración y despliegue continuo")],
      },
      {
        id: "datos-auto-rosa",
        title: "Automatización de Datos",
        ...calculateRadialPosition(0),
        color: "#f472b6",
        bgColor: "rgba(244, 114, 182, 0.25)",
        glowColor: "#f472b6",
        glowIntensity: 0.6,
        description: "Procesamiento de datos y automatización",
        skills: [
          createSkill("Python", "Lenguaje de programación para automatización"),
          createSkill("Bash", "Scripting en bash para automatización"),
        ],
      },
      {
        id: "datos-auto-verde",
        title: "Observabilidad",
        ...calculateRadialPosition(-90),
        color: "#10b981",
        bgColor: "rgba(16, 185, 129, 0.25)",
        glowColor: "#10b981",
        glowIntensity: 0.6,
        description: "Monitoreo y automatización de datos",
        subNodes: [
          {
            id: "python-monitoring",
            title: "Python",
            x: -5,
            y: 10,
            color: "#10b981",
            skills: [
              createSkill("Grafana", "Plataforma de visualización y monitoreo"),
              createSkill("Monitoring", "Monitoreo de sistemas y aplicaciones"),
              createSkill("PowerShell", "Automatización con PowerShell"),
            ],
          } as SubNode,
        ],
      },
      {
        id: "security",
        title: "Security",
        ...calculateRadialPosition(-150),
        color: "#059669",
        bgColor: "rgba(5, 150, 105, 0.25)",
        glowColor: "#059669",
        glowIntensity: 0.6,
        description: "Seguridad informática y análisis de vulnerabilidades",
        skills: [
          createSkill("Hardening", "Fortificación de sistemas"),
          createSkill("SIEM", "Security Information and Event Management"),
          createSkill("Análisis de Vulnerabilidades", "Evaluación de seguridad"),
          createSkill("Firewalls", "Configuración y gestión de firewalls"),
        ],
      },
    ] as MindMapNode[],
  };

  const categories = mindMapData.categories;
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    categories[0]?.id ?? null
  );

  const activeCategory = useMemo(() => {
    if (!activeCategoryId) return categories[0];
    return (
      categories.find((category) => category.id === activeCategoryId) ??
      categories[0]
    );
  }, [categories, activeCategoryId]);

  const activeSkills = useMemo(() => {
    if (!activeCategory) return [];
    const combined = [
      ...(activeCategory.skills ?? []),
      ...(activeCategory.subNodes?.flatMap((node) => node.skills) ?? []),
    ];
    const unique = new Map<string, Skill>();
    combined.forEach((skill) => {
      unique.set(skill.id, skill);
    });
    return Array.from(unique.values());
  }, [activeCategory]);

  return (
    <section id="habilidades" className="relative py-24 md:py-40 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-blue-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Habilidades
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Áreas de expertise y tecnologías que domino
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto rounded-[32px] border border-white/5 bg-gradient-to-br from-white/5 via-background/40 to-background/80 backdrop-blur-2xl shadow-[0_10px_80px_rgba(0,0,0,0.35)] px-6 py-8 md:px-10 md:py-12">
          <div className="absolute inset-0 rounded-[32px] border border-white/10 pointer-events-none" />

          {/* Diagrama Mind Map */}
          <MindMapDiagram
            data={mindMapData}
            activeCategoryId={activeCategory?.id ?? null}
            onCategorySelect={setActiveCategoryId}
          />

          {/* Controles y detalle */}
          <div className="mt-12 space-y-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const isActive = category.id === (activeCategory?.id ?? null);
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategoryId(category.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white text-background shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                    style={{
                      borderColor: `${category.color}40`,
                      boxShadow: isActive
                        ? `0 10px 30px ${category.color}40`
                        : undefined,
                    }}
                  >
                    {category.title}
                  </button>
                );
              })}
            </div>

            {activeCategory && (
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <p className="text-sm uppercase tracking-[0.35em] text-foreground/60">
                    Visión
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">
                    {activeCategory.title}
                  </h3>
                  <p className="mt-3 text-base text-foreground/75 leading-relaxed">
                    {activeCategory.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeSkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-foreground/80"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/30 p-6 space-y-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-foreground/60">
                    Sub dominios
                  </p>
                  {activeCategory.subNodes?.length ? (
                    activeCategory.subNodes.map((node) => (
                      <div
                        key={node.id}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <p className="text-sm font-semibold text-white/90">
                          {node.title}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {node.skills.map((skill) => (
                            <span
                              key={skill.id}
                              className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-foreground/60">
                      Esta categoría agrupa conocimientos generales sin sub
                      nodos adicionales.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
