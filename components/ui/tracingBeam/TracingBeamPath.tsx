/**
 * TRACING BEAM PATH - Control Manual Total
 * 
 * 🎯 CARACTERÍSTICAS:
 * - Control manual total desde el array 'nodes' con coordenadas absolutas
 * - Línea gris base visible desde el inicio (basePaths)
 * - Efecto de iluminación aparece progresivamente con scroll (illuminatedPaths)
 * - Coordenadas X: 0-100 (0=izquierda, 50=centro, 100=derecha)
 * - Coordenadas Y: 0-1 (0=arriba, 1=abajo)
 * - Sin lógica de isLeft - control directo de posiciones
 */

"use client";
import { motion, useMotionValueEvent } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { TracingBeamGradient } from "./TracingBeamGradient";
import { MotionValue } from "framer-motion";

interface TracingBeamPathProps {
  svgHeight: number;
  y1: MotionValue<number>;
  y2: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  gradientId?: string;
}

interface Node {
  id: string;
  x: number;
  y: number;
  scrollTrigger: number;
}

interface Path {
  id: string;
  from: string;
  to: string;
  type: 'straight' | 'curve';
  curveControl?: { x: number; y: number };
  scrollStart?: number;
  scrollEnd?: number;
}

interface PathWithNodes extends Path {
  fromNode: Node;
  toNode: Node;
}

export function TracingBeamPath({
  svgHeight,
  y1,
  y2,
  scrollYProgress,
  gradientId = "gradient",
}: TracingBeamPathProps) {
  // Función simplificada para obtener posición de nodos - coordenadas absolutas
  const getNodePosition = useCallback((node: Node) => {
    const x = node.x; // Directo: 0-100 (0=izquierda, 50=centro, 100=derecha)
    const y = node.y * svgHeight; // 0-1 convertido a píxeles
    return { x, y };
  }, [svgHeight]);


  // 🎨 CONFIGURACIÓN DE NODOS Y CAMINOS - EDITA AQUÍ
  // Coordenadas X: 0=izquierda, 50=centro, 100=derecha
  const nodes: Node[] = [
    { id: 'start', x: 50, y: 0, scrollTrigger: 0 },
    { id: 'banner', x: 50, y: 0.1, scrollTrigger: 0.1 },
    { id: 'descripcion', x: 50, y: 0.25, scrollTrigger: 0.25 },
    { id: 'contenido', x: 50, y: 0.4, scrollTrigger: 0.4 },
    { id: 'split1', x: 50, y: 0.5, scrollTrigger: 0.5 },
    { id: 'left1', x: 30, y: 0.6, scrollTrigger: 0.6 },
    { id: 'right1', x: 70, y: 0.6, scrollTrigger: 0.6 },
    { id: 'left2', x: 30, y: 0.75, scrollTrigger: 0.75 },
    { id: 'right2', x: 70, y: 0.75, scrollTrigger: 0.75 },
    { id: 'merge1', x: 50, y: 0.85, scrollTrigger: 0.85 },
    { id: 'skills', x: 50, y: 0.9, scrollTrigger: 0.9 },
    { id: 'split2', x: 50, y: 0.95, scrollTrigger: 0.95 },
    { id: 'circle1', x: 35, y: 1, scrollTrigger: 1 },
    { id: 'circle2', x: 50, y: 1, scrollTrigger: 1 },
    { id: 'circle3', x: 65, y: 1, scrollTrigger: 1 },
  ];

  const paths: Path[] = [
    { id: 'main1', from: 'start', to: 'banner', type: 'straight' },
    { id: 'main2', from: 'banner', to: 'descripcion', type: 'straight' },
    { id: 'main3', from: 'descripcion', to: 'contenido', type: 'straight' },
    { id: 'main4', from: 'contenido', to: 'split1', type: 'straight' },
    { id: 'branch1', from: 'split1', to: 'left1', type: 'curve', curveControl: { x: 40, y: 0.55 } },
    { id: 'branch2', from: 'split1', to: 'right1', type: 'curve', curveControl: { x: 60, y: 0.55 } },
    { id: 'left_conn', from: 'left1', to: 'left2', type: 'straight' },
    { id: 'right_conn', from: 'right1', to: 'right2', type: 'straight' },
    { id: 'merge_left', from: 'left2', to: 'merge1', type: 'curve', curveControl: { x: 45, y: 0.8 } },
    { id: 'merge_right', from: 'right2', to: 'merge1', type: 'curve', curveControl: { x: 55, y: 0.8 } },
    { id: 'main5', from: 'merge1', to: 'skills', type: 'straight' },
    { id: 'main6', from: 'skills', to: 'split2', type: 'straight' },
    { id: 'final1', from: 'split2', to: 'circle1', type: 'curve', curveControl: { x: 42, y: 0.975 } },
    { id: 'final2', from: 'split2', to: 'circle2', type: 'straight' },
    { id: 'final3', from: 'split2', to: 'circle3', type: 'curve', curveControl: { x: 58, y: 0.975 } },
  ];

  // Función para obtener caminos visibles según el scroll - SOLO para iluminación
  const getVisiblePaths = useCallback((progress: number): PathWithNodes[] => {
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    return paths
      .map(path => ({
        ...path,
        fromNode: nodeMap.get(path.from)!,
        toNode: nodeMap.get(path.to)!
      }))
      .filter(pathWithNodes => {
        const fromTrigger = pathWithNodes.fromNode.scrollTrigger;
        const toTrigger = pathWithNodes.toNode.scrollTrigger;
        const pathStart = pathWithNodes.scrollStart ?? fromTrigger;
        const pathEnd = pathWithNodes.scrollEnd ?? toTrigger;
        // Solo iluminar si el scroll ha llegado al inicio del path
        return progress >= pathStart;
      });
  }, [nodes, paths]);

  // Función para generar path SVG de un camino - SOLO para iluminación
  const generatePathString = useCallback((path: PathWithNodes, progress: number) => {
    const fromPos = getNodePosition(path.fromNode);
    const toPos = getNodePosition(path.toNode);

    const fromTrigger = path.fromNode.scrollTrigger;
    const toTrigger = path.toNode.scrollTrigger;
    const pathStart = path.scrollStart ?? fromTrigger;
    const pathEnd = path.scrollEnd ?? toTrigger;

    // Calcular cuánto del path debe estar iluminado
    let pathProgress = 1;
    if (progress < pathEnd) {
      pathProgress = Math.max(0, (progress - pathStart) / (pathEnd - pathStart));
    }

    const currentX = fromPos.x + (toPos.x - fromPos.x) * pathProgress;
    const currentY = fromPos.y + (toPos.y - fromPos.y) * pathProgress;

    if (path.type === 'straight') {
      return `M ${fromPos.x} ${fromPos.y} L ${currentX} ${currentY}`;
    } else if (path.type === 'curve' && path.curveControl) {
      // Usar coordenadas absolutas directamente
      const controlX = path.curveControl.x;
      const controlY = path.curveControl.y * svgHeight;
      const currentControlX = fromPos.x + (controlX - fromPos.x) * pathProgress;
      const currentControlY = fromPos.y + (controlY - fromPos.y) * pathProgress;
      return `M ${fromPos.x} ${fromPos.y} Q ${currentControlX} ${currentControlY} ${currentX} ${currentY}`;
    }

    return `M ${fromPos.x} ${fromPos.y} L ${currentX} ${currentY}`;
  }, [getNodePosition, svgHeight]);

  // Función para generar paths base completos (sin interpolación)
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
        const controlY = path.curveControl.y * svgHeight;
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
  }, [nodes, paths, getNodePosition, svgHeight]);

  // Función para generar paths iluminados (con interpolación según scroll)
  const generateIlluminatedPaths = useCallback((progress: number) => {
    const visiblePaths = getVisiblePaths(progress);
    return visiblePaths.map(path => ({
      id: path.id,
      d: generatePathString(path, progress)
    }));
  }, [getVisiblePaths, generatePathString]);

  // Estado para paths base (estático - siempre visible)
  const [basePaths, setBasePaths] = useState<Array<{id: string; d: string}>>([]);

  // Estado para paths iluminados (dinámico - aparece con scroll)
  const [illuminatedPaths, setIlluminatedPaths] = useState<Array<{id: string; d: string}>>([]);

  // Regenerar basePaths cuando svgHeight cambie
  useEffect(() => {
    if (svgHeight > 0) {
      // Generar basePaths directamente aquí para evitar dependencias que cambian
      const nodeMap = new Map(nodes.map(node => [node.id, node]));
      const newBasePaths = paths.map(path => {
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
          const controlY = path.curveControl.y * svgHeight;
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

      // Generar illuminatedPaths iniciales
      const visiblePaths = getVisiblePaths(0);
      const newIlluminatedPaths = visiblePaths.map(path => ({
        id: path.id,
        d: generatePathString(path, 0)
      }));

      setBasePaths(newBasePaths);
      setIlluminatedPaths(newIlluminatedPaths);
    }
  }, [svgHeight]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const newIlluminatedPaths = generateIlluminatedPaths(value);
    setIlluminatedPaths(newIlluminatedPaths);
  });

  // No renderizar hasta que tengamos la altura correcta
  if (svgHeight === 0) {
    return null;
  }

  return (
    <svg
      viewBox={`0 0 100 ${svgHeight}`}
      width="100%"
      height={svgHeight}
      className="absolute top-0 left-0 w-full h-full"
      aria-hidden="true"
    >
      {/* Líneas base grises - siempre visibles, paths completos */}
      {basePaths.map((path) => (
        <path
          key={`base-${path.id}`}
          d={path.d}
          fill="none"
          stroke="hsl(var(--border))"
          strokeOpacity="0.3"
          strokeWidth="2"
        />
      ))}

      {/* Haces iluminados - aparecen progresivamente con scroll */}
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

/**
 * RESUMEN PARA USO Y PERSONALIZACIÓN:
 * 
 * 🎯 CONTROL MANUAL TOTAL:
 * - Edita el array 'nodes' para cambiar la forma de la línea
 * - Coordenadas X: 0=izquierda, 50=centro, 100=derecha
 * - Coordenadas Y: 0=arriba, 1=abajo (porcentaje de altura)
 * - scrollTrigger: cuándo aparece cada nodo (0-1)
 * 
 * 🎨 EFECTOS VISUALES:
 * - Línea gris base: siempre visible desde el inicio (basePaths)
 * - Efecto de iluminación: aparece progresivamente con scroll (illuminatedPaths)
 * 
 * 🔧 MODIFICAR FORMAS:
 * - Cambia 'x' en nodes para mover horizontalmente
 * - Cambia 'y' en nodes para mover verticalmente  
 * - Agrega/elimina nodos y paths según necesites
 * - Usa 'curve' con curveControl para curvas suaves
 */