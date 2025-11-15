/**
 * Tipos TypeScript para la estructura de datos del Mind Map
 */

export interface Skill {
  id: string;
  name: string;
  description?: string;
}

export interface SubNode {
  id: string;
  title: string;
  x: number; // Porcentaje relativo a la categoría padre
  y: number; // Porcentaje relativo a la categoría padre
  color: string;
  skills: Skill[];
}

export interface MindMapNode {
  id: string;
  title: string;
  x: number; // Porcentaje desde el centro (50%, 50%)
  y: number; // Porcentaje desde el centro (50%, 50%)
  color: string;
  bgColor: string;
  glowColor: string;
  glowIntensity: number;
  subNodes?: SubNode[];
  skills?: Skill[]; // Skills directos de la categoría
  description?: string;
}

export interface CentralNode {
  title: string;
  subtitle: string;
}

export interface MindMapData {
  central: CentralNode;
  categories: MindMapNode[];
}

