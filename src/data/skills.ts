import { skillsData } from './portfolio-data';

export interface SkillNode {
    type: 'core' | 'area' | 'tool';
    icon: string;
    title: string;
    label: string;
    desc: string;
    color: string;
    borderColor: string;
    textColor: string;
    position: { top: string; left: string };
}

export const skillNodes: SkillNode[] = skillsData.nodes as SkillNode[];

// Connection pairs [fromIndex, toIndex]
export const connections: [number, number][] = skillsData.connections as [number, number][];

/**
 * Retorna los títulos de las herramientas conectadas a un área
 * @param areaIndex Índice del nodo de área (1 = Programación, 2 = Infraestructura, 3 = Ciberseguridad)
 * @returns Array de títulos de herramientas
 */
export function getToolsForArea(areaIndex: number): string[] {
    const toolIndices = connections
        .filter(([fromIdx]) => fromIdx === areaIndex)
        .map(([, toIdx]) => toIdx);
    
    return toolIndices
        .map((idx) => skillNodes[idx]?.title)
        .filter((title): title is string => Boolean(title));
}
