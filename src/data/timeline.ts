export interface TimelineEvent {
    date: string;
    title: string;
    description: string;
    side: 'left' | 'right';
    type: 'main';
}

export interface BranchEvent {
    date: string;
    title: string;
    description: string;
    branch: 'andreani' | 'freelance';
    tags: string[];
}

export const mainTimeline: TimelineEvent[] = [
    {
        date: 'Dic 2022',
        title: 'Egresado Técnico',
        description: 'Base sólida en lógica, electrónica y fundamentos de hardware.',
        side: 'left',
        type: 'main',
    },
    {
        date: 'Ene 2023',
        title: 'Autodidacta Full Focus',
        description: 'Aprendizaje intensivo de C#, .NET y Python. Primeros scripts.',
        side: 'right',
        type: 'main',
    },
    {
        date: '2024',
        title: 'Ingreso Universidad (UADE)',
        description: 'Licenciatura en Sistemas. Estructuración formal del conocimiento.',
        side: 'left',
        type: 'main',
    },
];

export const branchEvents: BranchEvent[] = [
    // Andreani branch
    {
        date: 'Agosto 2025 - Presente',
        title: 'Soporte TI Andreani',
        description: 'Gestión de infraestructura, resolución de incidentes críticos y soporte técnico a gran escala.',
        branch: 'andreani',
        tags: ['Infraestructura', 'Active Directory'],
    },
    {
        date: 'Proyección',
        title: 'SysAdmin Junior',
        description: 'Evolución hacia administración de servidores.',
        branch: 'andreani',
        tags: [],
    },
    // Freelance branch
    {
        date: '2025 - Presente',
        title: 'Dev Freelance & Proyectos',
        description: 'Desarrollo continuo de software, APIs en .NET y automatización con Python.',
        branch: 'freelance',
        tags: ['.NET Core', 'DevSecOps'],
    },
    {
        date: 'Objetivo 2026',
        title: 'Arquitectura Cloud',
        description: 'Certificación AWS y despliegue de arquitecturas serverless.',
        branch: 'freelance',
        tags: [],
    },
];

export const futureGoals = [
    {
        title: 'Cloud Architect',
        status: 'PENDIENTE',
        progress: 30,
        description: 'AWS Serverless mastery.',
        color: 'blue',
    },
    {
        title: 'Red Teaming',
        status: 'EN PROCESO',
        progress: 60,
        description: 'Advanced Penetration Testing.',
        color: 'pink',
    },
    {
        title: 'AI Agents',
        status: 'PLANIFICADO',
        progress: 10,
        description: 'Defensive Security AI.',
        color: 'purple',
    },
];
