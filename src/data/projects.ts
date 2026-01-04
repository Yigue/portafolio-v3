export interface Project {
    id: number;
    title: string;
    subtitle: string;
    desc: string;
    image: string;
    tech: string[];
    features: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        title: 'SaaS',
        subtitle: 'Dashboard',
        desc: 'Sistema de gestión empresarial con analíticas en tiempo real. Plataforma completa para administración de recursos, métricas y dashboards interactivos.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=1200&q=80',
        tech: ['React', 'Node.js', 'Postgres', 'TypeScript'],
        features: [
            'Arquitectura escalable y modular',
            'Diseño responsive y optimizado',
            'Seguridad de primer nivel',
            'Analíticas en tiempo real',
        ],
    },
    {
        id: 2,
        title: 'Fintech',
        subtitle: 'Wallet',
        desc: 'Billetera virtual segura con integración bancaria y biometría. Solución de pagos digitales con encriptación de extremo a extremo.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=1200&q=80',
        tech: ['Swift', 'Python', 'AWS', 'Stripe'],
        features: [
            'Encriptación end-to-end',
            'Autenticación biométrica',
            'Integración bancaria',
            'Transacciones instantáneas',
        ],
    },
    {
        id: 3,
        title: 'AI',
        subtitle: 'Generator',
        desc: 'Plataforma de generación de contenido mediante modelos LLM. Interfaz intuitiva para crear contenido de alta calidad usando inteligencia artificial.',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?fit=crop&w=1200&q=80',
        tech: ['Next.js', 'OpenAI', 'Vercel', 'TypeScript'],
        features: [
            'Integración con GPT-4',
            'Interfaz intuitiva',
            'Generación en tiempo real',
            'Múltiples formatos',
        ],
    },
    {
        id: 4,
        title: 'Cloud',
        subtitle: 'Infrastructure',
        desc: 'Arquitectura serverless escalable con AWS y Terraform. Infraestructura como código para despliegues automatizados y resilientes.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?fit=crop&w=1200&q=80',
        tech: ['AWS', 'Terraform', 'Docker', 'K8s'],
        features: [
            'Infraestructura como código',
            'Auto-scaling',
            'Alta disponibilidad',
            'Despliegue automatizado',
        ],
    },
    {
        id: 5,
        title: 'Security',
        subtitle: 'Audit Tool',
        desc: 'Plataforma de análisis de seguridad y compliance automatizado. Herramientas de auditoría y monitoreo continuo de vulnerabilidades.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=1200&q=80',
        tech: ['Python', 'Docker', 'Postgres', 'React'],
        features: [
            'Escaneo automatizado',
            'Reportes detallados',
            'Compliance tracking',
            'Alertas en tiempo real',
        ],
    },
    {
        id: 6,
        title: 'DevOps',
        subtitle: 'Platform',
        desc: 'CI/CD pipeline completo con monitoreo y alertas. Plataforma integral para automatización de despliegues y gestión de infraestructura.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=1200&q=80',
        tech: ['Jenkins', 'K8s', 'Docker', 'Prometheus'],
        features: [
            'CI/CD automatizado',
            'Monitoreo continuo',
            'Gestión de infraestructura',
            'Alertas proactivas',
        ],
    },
];
