"use client";
import { motion, useMotionValueEvent } from "framer-motion";
import { useState, useCallback } from "react";
import { TracingBeamGradient } from "./TracingBeamGradient";
import { MotionValue } from "framer-motion";

interface TracingBeamPathProps {
  svgHeight: number;
  y1: MotionValue<number>;
  y2: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  gradientId?: string;
}

// 🎯 Sistema de Nodos y Caminos Simplificado
interface Node {
  id: string;
  x: number;        // Posición horizontal (0-100, donde 50 = centro)
  y: number;        // Posición vertical (0-100, donde 0 = arriba)
}

interface Path {
  id: string;
  from: string;     // ID del nodo origen
  to: string;       // ID del nodo destino
  type: 'straight' | 'curve';
  curveControl?: { x: number; y: number }; // Para curvas
  scrollStart: number;  // Cuándo empieza este camino (0-1)
  scrollEnd: number;    // Cuándo termina este camino (0-1)
}

interface PathWithNodes extends Path {
  fromNode: Node;
  toNode: Node;
}

/**
 * TRACING BEAM PATH - Control Manual Total
 * 
 * 🎯 CARACTERÍSTICAS:
 * - Control total manual desde los arrays 'nodes' y 'paths'
 * - Línea gris base visible desde el principio
 * - Solo el efecto de iluminación aparece con el scroll
 * - Coordenadas simples: X (0-100), Y (0-100)
 * - Sin lógica de isLeft - control directo de posiciones
 */
export function TracingBeamPath({
  svgHeight,
  y1,
  y2,
  scrollYProgress,
  gradientId = "gradient",
}: TracingBeamPathProps) {

  // 🎨 CONFIGURACIÓN DE NODOS Y CAMINOS - EDITA AQUÍ
  // Coordenadas: X (0-100 donde 50=centro), Y (0-100 donde 0=arriba)
  const nodes: Node[] = [
    // Línea principal vertical
    { id: 'start', x: 50, y: 0 },
    { id: 'banner', x: 50, y: 10 },
    { id: 'descripcion', x: 50, y: 25 },
    { id: 'contenido', x: 50, y: 40 },
    
    // Primera división - dos columnas
    { id: 'split1', x: 50, y: 50 },
    { id: 'left1', x: 30, y: 60 },
    { id: 'right1', x: 70, y: 60 },
    { id: 'left2', x: 30, y: 75 },
    { id: 'right2', x: 70, y: 75 },
    
    // Reunión y segunda división
    { id: 'merge1', x: 50, y: 85 },
    { id: 'skills', x: 50, y: 90 },
    { id: 'split2', x: 50, y: 95 },
    
    // División final - tres círculos
    { id: 'circle1', x: 35, y: 100 },
    { id: 'circle2', x: 50, y: 100 },
    { id: 'circle3', x: 65, y: 100 },
  ];

  const paths: Path[] = [
    // Línea principal vertical
    { id: 'main1', from: 'start', to: 'banner', type: 'straight', scrollStart: 0, scrollEnd: 0.1 },
    { id: 'main2', from: 'banner', to: 'descripcion', type: 'straight', scrollStart: 0.1, scrollEnd: 0.25 },
    { id: 'main3', from: 'descripcion', to: 'contenido', type: 'straight', scrollStart: 0.25, scrollEnd: 0.4 },
    { id: 'main4', from: 'contenido', to: 'split1', type: 'straight', scrollStart: 0.4, scrollEnd: 0.5 },
    
    // Primera división
    { id: 'branch1', from: 'split1', to: 'left1', type: 'curve', curveControl: { x: 40, y: 55 }, scrollStart: 0.5, scrollEnd: 0.6 },
    { id: 'branch2', from: 'split1', to: 'right1', type: 'curve', curveControl: { x: 60, y: 55 }, scrollStart: 0.5, scrollEnd: 0.6 },
    { id: 'left_conn', from: 'left1', to: 'left2', type: 'straight', scrollStart: 0.6, scrollEnd: 0.75 },
    { id: 'right_conn', from: 'right1', to: 'right2', type: 'straight', scrollStart: 0.6, scrollEnd: 0.75 },
    
    // Reunión
    { id: 'merge_left', from: 'left2', to: 'merge1', type: 'curve', curveControl: { x: 45, y: 80 }, scrollStart: 0.75, scrollEnd: 0.85 },
    { id: 'merge_right', from: 'right2', to: 'merge1', type: 'curve', curveControl: { x: 55, y: 80 }, scrollStart: 0.75, scrollEnd: 0.85 },
    { id: 'main5', from: 'merge1', to: 'skills', type: 'straight', scrollStart: 0.85, scrollEnd: 0.9 },
    { id: 'main6', from: 'skills', to: 'split2', type: 'straight', scrollStart: 0.9, scrollEnd: 0.95 },
    
    // División final
    { id: 'final1', from: 'split2', to: 'circle1', type: 'curve', curveControl: { x: 42, y: 97.5 }, scrollStart: 0.95, scrollEnd: 1 },
    { id: 'final2', from: 'split2', to: 'circle2', type: 'straight', scrollStart: 0.95, scrollEnd: 1 },
    { id: 'final3', from: 'split2', to: 'circle3', type: 'curve', curveControl: { x: 58, y: 97.5 }, scrollStart: 0.95, scrollEnd: 1 },
  ];

  // 🔧 Función para convertir coordenadas a píxeles SVG
  const getNodePosition = useCallback((node: Node) => {
    const x = node.x; // Ya está en coordenadas 0-100
    const y = (node.y / 100) * svgHeight; // Convertir Y a píxeles
    return { x, y };
  }, [svgHeight]);

  // 🔧 Función para obtener caminos visibles según el scroll
  const getVisiblePaths = useCallback((progress: number): PathWithNodes[] => {
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    
    return paths
      .map(path => ({
        ...path,
        fromNode: nodeMap.get(path.from)!,
        toNode: nodeMap.get(path.to)!
      }))
      .filter(pathWithNodes => {
        return progress >= pathWithNodes.scrollStart && progress <= pathWithNodes.scrollEnd;
      });
  }, [nodes, paths]);

  // 🔧 Función para generar path SVG de un camino
  const generatePathString = useCallback((path: PathWithNodes, progress: number) => {
    const fromPos = getNodePosition(path.fromNode);
    const toPos = getNodePosition(path.toNode);
    
    // Calcular progreso del camino específico
    const pathProgress = Math.max(0, Math.min(1, (progress - path.scrollStart) / (path.scrollEnd - path.scrollStart)));
    
    // Interpolar posiciones
    const currentX = fromPos.x + (toPos.x - fromPos.x) * pathProgress;
    const currentY = fromPos.y + (toPos.y - fromPos.y) * pathProgress;
    
    if (path.type === 'straight') {
      return `M ${fromPos.x} ${fromPos.y} L ${currentX} ${currentY}`;
    } else if (path.type === 'curve' && path.curveControl) {
      const controlX = path.curveControl.x;
      const controlY = (path.curveControl.y / 100) * svgHeight;
      const currentControlX = fromPos.x + (controlX - fromPos.x) * pathProgress;
      const currentControlY = fromPos.y + (controlY - fromPos.y) * pathProgress;
      
      return `M ${fromPos.x} ${fromPos.y} Q ${currentControlX} ${currentControlY} ${currentX} ${currentY}`;
    }
    
    return `M ${fromPos.x} ${fromPos.y} L ${currentX} ${currentY}`;
  }, [getNodePosition, svgHeight]);

  // 🔧 Función para generar todos los paths visibles (solo para iluminación)
  const generateIlluminatedPaths = useCallback((progress: number) => {
    const visiblePaths = getVisiblePaths(progress);
    return visiblePaths.map(path => ({
      id: path.id,
      d: generatePathString(path, progress)
    }));
  }, [getVisiblePaths, generatePathString]);

  // 🔧 Función para generar todos los paths base (línea gris completa)
  const generateBasePaths = useCallback(() => {
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    
    return paths.map(path => {
      const fromNode = nodeMap.get(path.from)!;
      const toNode = nodeMap.get(path.to)!;
      const fromPos = getNodePosition(fromNode);
      const toPos = getNodePosition(toNode);
      
      if (path.type === 'straight') {
        return {
          id: path.id,
          d: `M ${fromPos.x} ${fromPos.y} L ${toPos.x} ${toPos.y}`
        };
      } else if (path.type === 'curve' && path.curveControl) {
        const controlX = path.curveControl.x;
        const controlY = (path.curveControl.y / 100) * svgHeight;
        return {
          id: path.id,
          d: `M ${fromPos.x} ${fromPos.y} Q ${controlX} ${controlY} ${toPos.x} ${toPos.y}`
        };
      }
      
      return {
        id: path.id,
        d: `M ${fromPos.x} ${fromPos.y} L ${toPos.x} ${toPos.y}`
      };
    });
  }, [nodes, paths, getNodePosition]);

  const [illuminatedPaths, setIlluminatedPaths] = useState<Array<{id: string; d: string}>>([]);
  const [basePaths] = useState<Array<{id: string; d: string}>>(() => generateBasePaths());

  // 🔁 Escuchar scroll y actualizar solo los paths iluminados
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setIlluminatedPaths(generateIlluminatedPaths(value));
  });

  return (
    <svg
      viewBox={`0 0 100 ${svgHeight}`}
      width="100%"
      height={svgHeight}
      className="block"
      aria-hidden="true"
    >
      {/* Líneas base grises - siempre visibles */}
      {basePaths.map((path) => (
      <motion.path
          key={`base-${path.id}`}
          d={path.d}
        fill="none"
        stroke="hsl(var(--border))"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      ))}

      {/* Haces iluminados - aparecen con el scroll */}
      {illuminatedPaths.map((path) => (
      <motion.path
          key={`illuminated-${path.id}`}
          d={path.d}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.5"
        style={{
          filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.6))",
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      />
      ))}

      {/* Gradiente dinámico */}
      <TracingBeamGradient y1={y1} y2={y2} gradientId={gradientId} />
    </svg>
  );
}