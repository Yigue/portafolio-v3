"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MindMapNode, Skill, SubNode } from "./MindMapTypes";

type Central = {
  title: string;
  subtitle?: string;
};

interface Props {
  data: {
    central: Central;
    categories: MindMapNode[];
  };
  activeCategoryId: string | null;
  onCategorySelect: (id: string) => void;
}

export default function MindMapDiagram({
  data,
  activeCategoryId,
  onCategorySelect,
}: Props) {
  const { central, categories } = data;
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sistema de opacidad dinámica
  const getOpacity = useMemo(() => {
    return (categoryId: string, elementType: 'category' | 'subnode' | 'skill' | 'line-main' | 'line-secondary' | 'line-tertiary') => {
      const isActive = categoryId === activeCategoryId;
      const isHovered = categoryId === hoveredCategoryId;
      
      if (isActive) {
        switch (elementType) {
          case 'category': return 1;
          case 'subnode': return 1;
          case 'skill': return 1;
          case 'line-main': return 0.6;
          case 'line-secondary': return 0.5;
          case 'line-tertiary': return 0.4;
        }
      } else if (isHovered) {
        switch (elementType) {
          case 'category': return 0.9;
          case 'subnode': return 0.7;
          case 'skill': return 0.6;
          case 'line-main': return 0.45;
          case 'line-secondary': return 0.4;
          case 'line-tertiary': return 0.3;
        }
      } else {
        switch (elementType) {
          case 'category': return 0.7;
          case 'subnode': return 0.4;
          case 'skill': return 0.4;
          case 'line-main': return 0.3;
          case 'line-secondary': return 0.25;
          case 'line-tertiary': return 0.2;
        }
      }
    };
  }, [activeCategoryId, hoveredCategoryId]);

  // Calcular posición absoluta
  const getAbsolutePosition = (x: number, y: number, parentX?: number, parentY?: number) => {
    if (parentX !== undefined && parentY !== undefined) {
      return { x: parentX + x, y: parentY + y };
    }
    return { x, y };
  };

  // Renderizar skill pequeño
  const renderSkill = (
    skill: Skill,
    categoryX: number,
    categoryY: number,
    angle: number,
    distance: number,
    color: string,
    index: number,
    categoryId: string,
    baseDelay: number = 0.5
  ) => {
    const rad = (angle * Math.PI) / 180;
    const skillX = categoryX + Math.cos(rad) * distance;
    const skillY = categoryY + Math.sin(rad) * distance;
    const skillOpacity = getOpacity(categoryId, 'skill');
    const lineOpacity = getOpacity(categoryId, 'line-tertiary');

    return (
      <g key={`${skill.id}-${index}`}>
        {/* Línea de conexión terciaria */}
        <motion.line
          x1={categoryX}
          y1={categoryY}
          x2={skillX}
          y2={skillY}
          stroke={color}
          strokeWidth={isMobile ? "0.6" : "0.8"}
          strokeOpacity={lineOpacity}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: lineOpacity }}
          transition={{ 
            delay: baseDelay + index * 0.03 + 0.05, 
            duration: 0.4,
            opacity: { duration: 0.3 }
          }}
          style={{
            filter: `drop-shadow(0 0 1px ${color})`,
          }}
        />
        {/* Nodo pequeño del skill */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: skillOpacity,
            scale: 1
          }}
          transition={{
            delay: baseDelay + index * 0.03 + 0.1,
            duration: 0.3,
            type: "spring",
            stiffness: 200
          }}
        >
          <circle
            cx={skillX}
            cy={skillY}
            r={isMobile ? "1.8" : "2.3"}
            fill={color}
            className="cursor-pointer"
            style={{
              filter: `drop-shadow(0 0 ${isMobile ? "4" : "5"}px ${color})`,
            }}
          />
          <text
            x={skillX}
            y={skillY + (isMobile ? 3.2 : 3.6)}
            fontSize={isMobile ? "8px" : "9px"}
            fill="white"
            textAnchor="middle"
            className="pointer-events-none select-none"
            style={{
              filter: `drop-shadow(0 1px 2px rgba(0,0,0,0.95)) drop-shadow(0 0 2px ${color})`,
              fontWeight: "500",
            }}
          >
            {skill.name}
          </text>
        </motion.g>
      </g>
    );
  };

  // Renderizar sub-nodo
  const renderSubNode = (
    subNode: SubNode,
    categoryX: number,
    categoryY: number,
    categoryColor: string,
    categoryId: string
  ) => {
    const { x, y } = getAbsolutePosition(subNode.x, subNode.y, categoryX, categoryY);
    const subNodeOpacity = getOpacity(categoryId, 'subnode');
    const lineOpacity = getOpacity(categoryId, 'line-secondary');

    return (
      <g key={subNode.id}>
        {/* Línea de conexión secundaria */}
        <motion.line
          x1={categoryX}
          y1={categoryY}
          x2={x}
          y2={y}
          stroke={categoryColor}
          strokeWidth={isMobile ? "1" : "1.3"}
          strokeOpacity={lineOpacity}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: lineOpacity }}
          transition={{ 
            duration: 0.4,
            delay: 0.45,
            opacity: { duration: 0.3 }
          }}
          style={{
            filter: `drop-shadow(0 0 2px ${categoryColor})`,
          }}
        />
        {/* Círculo del sub-nodo */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: subNodeOpacity, 
            scale: 1 
          }}
          transition={{ 
            duration: 0.4, 
            delay: 0.4,
            type: "spring", 
            stiffness: 200 
          }}
        >
          <circle
            cx={x}
            cy={y}
            r={isMobile ? "4" : "5"}
            fill={subNode.color}
            fillOpacity={0.3}
            stroke={subNode.color}
            strokeWidth={isMobile ? "1.5" : "2"}
            style={{
              filter: `drop-shadow(0 0 ${isMobile ? "5" : "6"}px ${subNode.color})`,
            }}
          />
          <text
            x={x}
            y={y - (isMobile ? 3.5 : 4)}
            fontSize={isMobile ? "11px" : "12px"}
            fill="white"
            fontWeight="600"
            textAnchor="middle"
            className="pointer-events-none select-none"
            style={{
              filter: `drop-shadow(0 1px 2px rgba(0,0,0,0.95)) drop-shadow(0 0 2px ${subNode.color})`,
            }}
          >
            {subNode.title}
          </text>
          {/* Skills del sub-nodo */}
          {subNode.skills.map((skill, index) => {
            const angle = (360 / subNode.skills.length) * index;
            const distance = isMobile ? 9 : 10;
            return renderSkill(skill, x, y, angle, distance, subNode.color, index, categoryId, 0.5);
          })}
        </motion.g>
      </g>
    );
  };

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[16/8] overflow-hidden rounded-3xl bg-[#0a0f1c] border border-white/10 shadow-2xl backdrop-blur-xl">
      {/* Fondo glassmorphism */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.06),transparent_60%)]" />

      {/* SVG Container completo */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Líneas de conexión principales (Nivel 1: Centro → Categorías) */}
        {categories.map((cat, idx) => {
          const lineOpacity = getOpacity(cat.id, 'line-main');
          return (
            <motion.line
              key={`line-${cat.id}`}
              x1="50"
              y1="50"
              x2={cat.x}
              y2={cat.y}
              stroke={cat.color}
              strokeWidth={isMobile ? "1.2" : "1.8"}
              strokeOpacity={lineOpacity}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: lineOpacity }}
              transition={{ 
                delay: 0.1 + idx * 0.1, 
                duration: 0.6,
                opacity: { duration: 0.3 }
              }}
              style={{
                filter: `drop-shadow(0 0 2px ${cat.color})`,
              }}
            />
          );
        })}

        {/* Nodo central (Nivel 1: Rol Principal) */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        >
          <circle
            cx="50"
            cy="50"
            r={isMobile ? "6" : "7"}
            fill="#1e3a8a"
            fillOpacity={0.25}
            stroke="#3b82f6"
            strokeWidth={isMobile ? "2" : "2.4"}
            style={{
              filter: `drop-shadow(0 0 ${isMobile ? "8" : "10"}px #3b82f6)`,
            }}
          />
          <text
            x="50"
            y={isMobile ? "47" : "47"}
            fontSize={isMobile ? "15px" : "18px"}
            fill="white"
            fontWeight="800"
            textAnchor="middle"
            className="pointer-events-none select-none"
            style={{
              filter: `drop-shadow(0 1px 2px rgba(0,0,0,0.95)) drop-shadow(0 0 3px #3b82f6)`,
            }}
          >
            {central.title}
          </text>
          {central.subtitle && (
            <text
              x="50"
              y={isMobile ? "53" : "53"}
              fontSize={isMobile ? "9.5px" : "11px"}
              fill="white"
              fillOpacity={0.9}
              textAnchor="middle"
              className="pointer-events-none select-none"
              style={{
                filter: `drop-shadow(0 1px 2px rgba(0,0,0,0.95)) drop-shadow(0 0 2px #3b82f6)`,
              }}
            >
              {central.subtitle}
            </text>
          )}
        </motion.g>

        {/* Categorías y sus elementos (Nivel 2 y 3) */}
        {categories.map((cat, index) => {
          const isActive = cat.id === activeCategoryId;
          const isHovered = cat.id === hoveredCategoryId;
          const categoryOpacity = getOpacity(cat.id, 'category');
          const glowIntensity = isActive ? (isMobile ? 15 : 18) : isHovered ? (isMobile ? 10 : 12) : (isMobile ? 6 : 8);

          return (
            <g key={cat.id}>
              {/* Círculo de categoría (Nivel 2: Área) */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: categoryOpacity, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5, type: "spring", stiffness: 150 }}
              >
                <motion.circle
                  cx={cat.x}
                  cy={cat.y}
                  r={isActive ? (isMobile ? "6" : "7") : isMobile ? "5" : "6"}
                  fill={cat.bgColor}
                  stroke={cat.color}
                  strokeWidth={isMobile ? "2" : "2.5"}
                  className="cursor-pointer"
                  onClick={() => onCategorySelect(cat.id)}
                  onMouseEnter={() => setHoveredCategoryId(cat.id)}
                  onMouseLeave={() => setHoveredCategoryId(null)}
                  whileHover={{ scale: 1.15 }}
                  animate={{
                    filter: [
                      `drop-shadow(0 0 ${glowIntensity}px ${cat.glowColor})`,
                    ],
                  }}
                />
                {/* Título de categoría */}
                <text
                  x={cat.x}
                  y={cat.y - (isMobile ? 3.5 : 4)}
                  fontSize={isMobile ? "10px" : "11px"}
                  fill="white"
                  fontWeight="700"
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  style={{
                    filter: `drop-shadow(0 1px 2px rgba(0,0,0,0.95)) drop-shadow(0 0 2px ${cat.glowColor})`,
                  }}
                >
                  {cat.title}
                </text>
              </motion.g>

              {/* Sub-nodos y skills (Nivel 3: Habilidades) */}
              <AnimatePresence>
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Sub-nodos */}
                  {cat.subNodes?.map((subNode) =>
                    renderSubNode(subNode, cat.x, cat.y, cat.color, cat.id)
                  )}

                  {/* Skills directos de la categoría */}
                  {cat.skills?.map((skill, skillIndex) => {
                    const totalSkills = cat.skills?.length || 1;
                    const angleStep = 360 / totalSkills;
                    const ringIndex = skillIndex % 3;
                    const baseDistance = isMobile ? 10 : 12.5;
                    const ringMultipliers = isMobile ? [1.2, 0.95, 0.78] : [1.3, 1.05, 0.82];
                    const distance = baseDistance * ringMultipliers[ringIndex];
                    const categoryAngleOffset = index * 25 + (index % 2) * 10;
                    const ringAngleOffset = ringIndex * 6;
                    const angle = skillIndex * angleStep + categoryAngleOffset + ringAngleOffset;

                    return renderSkill(
                      skill,
                      cat.x,
                      cat.y,
                      angle,
                      distance,
                      cat.color,
                      skillIndex,
                      cat.id,
                      0.5
                    );
                  })}
                </motion.g>
              </AnimatePresence>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
