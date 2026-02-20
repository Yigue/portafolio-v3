

export interface PortfolioData {
    metadata: {
        title: string;
        description: string;
        locale: string;
    };
    hero: {
        title: string;
        subtitle: string;
        scrollIndicator: string;
        ctaPrimary: { label: string; href: string };
        ctaSecondary: { label: string; href: string };
    };
    about: {
        badge: string;
        title: string;
        description: string;
        tags: string[];
        experience: { years: string; label: string };
        highlights: string[];
        image: string;
    };
    skills: {
        nodes: any[];
        connections: any[];
    };
    timeline: {
        mainTimeline: any[];
        branchEvents: any[];
        futureGoals: any[];
    };
    projects: any[];
    certificates: any[];
    contact: {
        title: string;
        description: string;
        formTitle: string;
        emailPlaceholder: string;
        messagePlaceholder: string;
        submitButton: string;
        cvTitle: string;
        footer: string;
    };
    navbar: {
        home: string;
        about: string;
        skills: string;
        timeline: string;
        projects: string;
        contact: string;
    };
}

export const portfolioData = {
    es: {
        metadata: {
            title: "Guillermo Riedel | Backend / DevOps",
            description: "Portfolio profesional de DevSecOps, Backend y automatización. Soporte TI a escala (Andreani), estudiante de Lic. en Sistemas (UADE) y constructor de productos (SaaS, dashboards, tooling).",
            locale: "es-AR",
        },
        hero: {
            title: "Guillermo Riedel",
            subtitle: "Backend / DevOps · Soporte TI a escala en Andreani · UADE (Lic. en Sistemas).",
            scrollIndicator: "DESLIZA PARA EXPLORAR",
            ctaPrimary: { label: "Ver Proyectos", href: "#projects" },
            ctaSecondary: { label: "Contactar", href: "#contact" }
        },
        about: {
            badge: "Sobre mí",
            title: "Más que código,<br />diseño operación.",
            description: "Soy Guillermo Riedel. Inicié mi camino como desarrollador independiente, construyendo proyectos propios y desarrollando habilidades técnicas de manera autodidacta, impulsado por una fuerte orientación a crear y resolver problemas reales.\n\nCon el tiempo decidí dar un salto estratégico hacia el entorno corporativo e ingresé a Andreani, con el objetivo de profesionalizarme y profundizar mi experiencia en infraestructura y operación de sistemas.\n\nActualmente, desde el área de Soporte TI, gestiono incidentes críticos, herramientas internas y entornos corporativos, lo que me permitió desarrollar una comprensión integral del ciclo tecnológico: desde el código hasta la operación y su impacto directo en el negocio y en los usuarios finales. Esta experiencia fortaleció mis bases en sistemas, redes, automatización y resolución estructurada de problemas.\n\nHoy oriento mi carrera hacia el rol de DevOps / Ingeniero de Software, con un fuerte enfoque en Ciberseguridad. Entiendo que las soluciones realmente eficientes, resilientes y escalables se construyen sobre arquitectura sólida, automatización bien diseñada, buenas prácticas de ingeniería y seguridad integrada desde el diseño.",
            tags: ["Soporte TI", "Backend", "DevOps"],
            experience: { years: "3+ Años", label: "Experiencia aplicada" },
            highlights: [
                "Soporte corporativo: AD, SCCM, troubleshooting de hardware y red, impresoras industriales, RF handhelds.",
                "Automatización: scripts PowerShell/Python para tareas repetitivas y diagnósticos.",
                "Construcción de productos: dashboards, SaaS, tooling y arquitectura limpia."
            ],
            image: "/me.JPG"
        },
        skills: {
            nodes: [
                {
                    type: "core",
                    icon: "⚡",
                    title: "DevOps / Software Engineer (DevSecOps Track)",
                    label: "CORE",
                    desc: "Perfil orientado a integrar Desarrollo, Infraestructura y Seguridad para construir sistemas resilientes, automatizados y escalables.",
                    color: "#ffffff",
                    borderColor: "rgba(255, 255, 255, 0.4)",
                    textColor: "white",
                    position: { top: "50%", left: "50%" }
                },
                {
                    type: "area",
                    icon: "DEV",
                    title: "Programación",
                    label: "CODE",
                    desc: "Backend/Frontend con foco en arquitectura limpia, calidad de código, performance y fundamentos de diseño.",
                    color: "#3b82f6",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "25%", left: "50%" }
                },
                {
                    type: "area",
                    icon: "OPS",
                    title: "Infraestructura",
                    label: "INFRA",
                    desc: "Sistemas, automatización y plataformas: contenedores, Linux, CI/CD e infraestructura reproducible (cloud-ready).",
                    color: "#a855f7",
                    borderColor: "rgb(168, 85, 247)",
                    textColor: "rgb(192, 132, 252)",
                    position: { top: "65%", left: "28%" }
                },
                {
                    type: "area",
                    icon: "SEC",
                    title: "Ciberseguridad",
                    label: "SECURITY",
                    desc: "Seguridad aplicada a software e infraestructura: secure-by-design, OWASP Top 10 y fundamentos de ISO 27001.",
                    color: "#30d158",
                    borderColor: "rgb(48, 209, 88)",
                    textColor: "rgb(74, 222, 128)",
                    position: { top: "65%", left: "72%" }
                },
                {
                    type: "tool",
                    icon: "C#",
                    title: ".NET / ASP.NET Core",
                    label: ".NET",
                    desc: "APIs backend con arquitectura limpia, asincronía (async/await) y buenas prácticas. Nivel: Intermedio.",
                    color: "#60a5fa",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "10%", left: "30%" }
                },
                {
                    type: "tool",
                    icon: "⚛️",
                    title: "React + Next.js",
                    label: "FRONT",
                    desc: "UI moderna con SSR/SSG, componentes reutilizables y enfoque en performance. Nivel: Intermedio.",
                    color: "#60a5fa",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "5%", left: "40%" }
                },
                {
                    type: "tool",
                    icon: "🏛️",
                    title: "Arquitectura de Software",
                    label: "ARCH",
                    desc: "Clean Architecture, patrones de diseño, modularidad y separación de responsabilidades. Nivel: Intermedio.",
                    color: "#60a5fa",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "4%", left: "50%" }
                },
                {
                    type: "tool",
                    icon: "Py",
                    title: "Python",
                    label: "PY",
                    desc: "Automatización, scripting y tooling para soporte/infra (helpers, parsers, CLI). Nivel: Intermedio.",
                    color: "#60a5fa",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "5%", left: "60%" }
                },
                {
                    type: "tool",
                    icon: "TS",
                    title: "TypeScript",
                    label: "TS",
                    desc: "Tipado estático, modelos robustos y mantenibilidad en apps JS. Nivel: Intermedio.",
                    color: "#60a5fa",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "10%", left: "70%" }
                },
                {
                    type: "tool",
                    icon: "DB",
                    title: "SQL / NoSQL",
                    label: "DATA",
                    desc: "Modelado y consultas (SQL) + fundamentos de bases documentales. Nivel: Intermedio.",
                    color: "#60a5fa",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "18%", left: "80%" }
                },
                {
                    type: "tool",
                    icon: "Git",
                    title: "Git & GitHub",
                    label: "GIT",
                    desc: "Branches, merges, PRs, convenciones y workflows (feature/bugfix). Nivel: Intermedio.",
                    color: "#60a5fa",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "18%", left: "20%" }
                },
                {
                    type: "tool",
                    icon: "🐳",
                    title: "Docker",
                    label: "DOCKER",
                    desc: "Imágenes, contenedores, networking, volúmenes y compose. Nivel: Intermedio.",
                    color: "#c084fc",
                    borderColor: "rgb(168, 85, 247)",
                    textColor: "rgb(192, 132, 252)",
                    position: { top: "55%", left: "10%" }
                },
                {
                    type: "tool",
                    icon: "☁️",
                    title: "Cloud (AWS - Learning)",
                    label: "CLOUD",
                    desc: "Fundamentos cloud: compute, networking, storage, IAM básico. Nivel: En aprendizaje.",
                    color: "#c084fc",
                    borderColor: "rgb(168, 85, 247)",
                    textColor: "rgb(192, 132, 252)",
                    position: { top: "70%", left: "5%" }
                },
                {
                    type: "tool",
                    icon: "IaC",
                    title: "Infrastructure as Code (IaC)",
                    label: "IAC",
                    desc: "Infra reproducible. Herramientas: Ansible (Intermedio) + Terraform (Learning). Enfoque: idempotencia y ambientes repetibles.",
                    color: "#c084fc",
                    borderColor: "rgb(168, 85, 247)",
                    textColor: "rgb(192, 132, 252)",
                    position: { top: "85%", left: "10%" }
                },
                {
                    type: "tool",
                    icon: "🐧",
                    title: "Linux Systems",
                    label: "LINUX",
                    desc: "CLI, permisos, procesos, servicios, troubleshooting y bash scripting. Nivel: Intermedio.",
                    color: "#c084fc",
                    borderColor: "rgb(168, 85, 247)",
                    textColor: "rgb(192, 132, 252)",
                    position: { top: "92%", left: "25%" }
                },
                {
                    type: "tool",
                    icon: "CI",
                    title: "CI/CD Pipelines",
                    label: "CICD",
                    desc: "Pipelines de build/test/deploy (GitHub Actions / Azure DevOps / Jenkins). Nivel: Intermedio.",
                    color: "#c084fc",
                    borderColor: "rgb(168, 85, 247)",
                    textColor: "rgb(192, 132, 252)",
                    position: { top: "88%", left: "40%" }
                },
                {
                    type: "tool",
                    icon: "☸️",
                    title: "Kubernetes",
                    label: "K8S",
                    desc: "Orquestación: pods, deployments, services, ingress y conceptos de cluster. Nivel: Intermedio.",
                    color: "#c084fc",
                    borderColor: "rgb(168, 85, 247)",
                    textColor: "rgb(192, 132, 252)",
                    position: { top: "75%", left: "50%" }
                },
                {
                    type: "tool",
                    icon: "🛡️",
                    title: "OWASP Top 10",
                    label: "OWASP",
                    desc: "Riesgos comunes en apps (auth, inyección, exposición de datos) y mitigaciones prácticas. Nivel: Básico/Intermedio.",
                    color: "#4ade80",
                    borderColor: "rgb(48, 209, 88)",
                    textColor: "rgb(74, 222, 128)",
                    position: { top: "75%", left: "90%" }
                },
                {
                    type: "tool",
                    icon: "ISO",
                    title: "ISO 27001 (Basics)",
                    label: "ISO",
                    desc: "Fundamentos de SGSI: políticas, controles, riesgos y compliance básico. Nivel: Básico.",
                    color: "#4ade80",
                    borderColor: "rgb(48, 209, 88)",
                    textColor: "rgb(74, 222, 128)",
                    position: { top: "85%", left: "80%" }
                },
                {
                    type: "tool",
                    icon: "🔐",
                    title: "Secure Coding",
                    label: "SECURE",
                    desc: "Buenas prácticas de desarrollo seguro y secure-by-design (validación, manejo de errores, mínimos privilegios). Nivel: Intermedio.",
                    color: "#4ade80",
                    borderColor: "rgb(48, 209, 88)",
                    textColor: "rgb(74, 222, 128)",
                    position: { top: "62%", left: "95%" }
                }
            ],
            connections: [
                [0, 1], [0, 2], [0, 3],
                [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10],
                [2, 11], [2, 12], [2, 13], [2, 14], [2, 15], [2, 16],
                [3, 17], [3, 18], [3, 19]
            ]
        },
        timeline: {
            mainTimeline: [
                {
                    date: "Dic 2022",
                    title: "Egresado Técnico en Informática",
                    description: "Formación técnica en lógica, hardware, redes y troubleshooting. Base sólida para desarrollo y sistemas.",
                    side: "left",
                    type: "main"
                },
                {
                    date: "2023",
                    title: "Etapa Autodidacta — Backend & Automatización",
                    description: "Profundización en C#/.NET, scripting (PowerShell/Python) y desarrollo de herramientas orientadas a automatización y operación.",
                    side: "right",
                    type: "main"
                },
                {
                    date: "Ago 2023 – Presente",
                    title: "Desarrollo Freelance",
                    description: "Diseño y construcción de dashboards, herramientas y aplicaciones con arquitectura limpia, automatización y foco en mantenibilidad.",
                    side: "left",
                    type: "main",
                    tags: ["Next.js", "TypeScript", ".NET", "Python", "Clean Architecture"]
                },
                {
                    date: "Ago 2024 – Presente",
                    title: "UADE — Licenciatura en Sistemas",
                    description: "Formación académica en programación, sistemas operativos, ingeniería de software, matemática discreta y economía.",
                    side: "right",
                    type: "main"
                }
            ],
            branchEvents: [
                {
                    date: "Ago 2025 – Presente",
                    title: "Soporte TI (L1) — Andreani",
                    description: "Operación de infraestructura y endpoints corporativos: Active Directory, SCCM, despliegues, dispositivos RF, impresoras y diagnóstico de red. Experiencia en estandarización y soporte en entornos productivos.",
                    branch: "andreani",
                    tags: ["Active Directory", "SCCM", "Infra Ops", "Troubleshooting"]
                },
                {
                    date: "Ago 2025 – Presente",
                    title: "Freelance (Evolución Profesional)",
                    description: "Continuidad del desarrollo independiente con mayor enfoque en arquitectura, automatización y prácticas de ingeniería aplicadas a productos reales.",
                    branch: "freelance",
                    tags: ["Next.js", "TypeScript", ".NET", "Automation", "Architecture"]
                },
                {
                    date: "Mar 2025 – Presente",
                    title: "CarStore — SaaS Automotriz",
                    description: "Diseño y desarrollo de plataforma SaaS para concesionarias: gestión de stock, CRM, KPIs y dashboards operativos con modelado de dominio.",
                    branch: "freelance",
                    tags: ["SaaS", "Domain Modeling", "Dashboards", "KPIs"]
                }
            ],
            futureGoals: [
                {
                    title: "Cloud Foundations (AWS)",
                    status: "EN PROCESO",
                    progress: 35,
                    description: "Arquitectura cloud, servicios core, despliegues reproducibles e infraestructura escalable.",
                    color: "blue"
                },
                {
                    title: "DevOps / DevSecOps Specialization",
                    status: "EN PROCESO",
                    progress: 45,
                    description: "CI/CD avanzado, seguridad integrada, observabilidad y automatización end-to-end.",
                    color: "purple"
                },
                {
                    title: "Backend Engineering Excellence",
                    status: "EN PROCESO",
                    progress: 55,
                    description: "Arquitectura limpia, APIs robustas, rendimiento y estándares de ingeniería profesional.",
                    color: "pink"
                }
            ]
        },
        projects: [
            {
                id: 1,
                title: "Unsort",
                subtitle: "Dashboard Ganadero",
                desc: "Plataforma para digitalizar operación ganadera: stock por categoría/potrero, trazabilidad, reproducción, KPIs (destete, productividad) y tablero de decisiones. Diseñada para crecer por módulos y mantener dominio claro.",
                image: "https://images.unsplash.com/photo-1527847263472-aa5338d178b8?fit=crop&w=1200&q=80",
                tech: ["Next.js", "TypeScript", "Node.js", "Clean Architecture"],
                features: ["Stock total y por potrero", "Dominio Operativo", "KPIs de Producción", "Escalabilidad Modular"]
            },
            {
                id: 2,
                title: "Ops Automation Toolkit",
                subtitle: "PowerShell / Python",
                desc: "Toolkit de automatización para soporte y operación: diagnósticos, tareas repetitivas, inventario y acciones remotas. Enfoque en seguridad (mínimos privilegios), logging y reutilización.",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=1200&q=80",
                tech: ["PowerShell", "Python", "WinRM", "WMI"],
                features: ["Ejecución Remota", "Logging Centralizado", "Diagnóstico Automático", "Plantillas de Operación"]
            },
            {
                id: 3,
                title: "Landing SaaS",
                subtitle: "Generación de sitios",
                desc: "SaaS orientado a negocios locales para generar landing pages y activos digitales con una estética minimalista y foco en conversión. Arquitectura preparada para suscripción y multitenancy.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=1200&q=80",
                tech: ["Next.js", "TypeScript", "Supabase", "Prisma"],
                features: ["Plantillas Reutilizables", "Multi-tenancy", "SEO Optimizado", "Gestión de Contenido"]
            },
            {
                id: 4,
                title: "Second Brain",
                subtitle: "Knowledge System",
                desc: "Sistema de notas y conocimiento (Obsidian + flujos) para ingerir PDFs, transcripciones y notas; estructuración, indexación y generación asistida para estudio y operación.",
                image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?fit=crop&w=1200&q=80",
                tech: ["Obsidian", "TypeScript", "Next.js", "Automation"],
                features: ["Organización de Conocimiento", "Flujos de Ingesta", "Búsqueda Semántica", "Templates de Estudio"]
            },
            {
                id: 5,
                title: "Security Audit Tool",
                subtitle: "Herramienta de Auditoría",
                desc: "Plataforma de análisis de seguridad y compliance automatizado. Herramientas de auditoría y monitoreo continuo de vulnerabilidades.",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=1200&q=80",
                tech: ["Python", "Docker", "Postgres", "React"],
                features: ["Escaneo de Vulnerabilidades", "Reportes de Compliance", "Monitoreo Continuo", "Alertas de Seguridad"]
            },
            {
                id: 6,
                title: "DevOps Platform",
                subtitle: "Infraestructura & CI/CD",
                desc: "CI/CD pipeline completo con monitoreo y alertas. Plataforma integral para automatización de despliegues y gestión de infraestructura.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=1200&q=80",
                tech: ["Jenkins", "Kubernetes", "Docker", "Prometheus"],
                features: ["Pipelines CI/CD", "Orquestación K8s", "Métricas en Tiempo Real", "Gestión de Logs"]
            }
        ],
        certificates: [
            {
                id: 3,
                title: "Implementación ISO 27001",
                subtitle: "Seguridad de la Información",
                desc: "Fundamentos y aplicación de la norma ISO/IEC 27001 para Sistemas de Gestión de Seguridad de la Información (SGSI). Gestión de riesgos y controles.",
                image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?fit=crop&w=1200&q=80",
                status: "completed",
                pdfUrl: "/Diplomas/diploma-iso-27001.pdf",
                tech: ["ISO 27001", "SGSI", "Risk Management", "Compliance"],
                features: ["Políticas de Seguridad", "Controles Técnicos", "Auditoría Interna", "Protección de Activos"]
            },
            {
                id: 5,
                title: "OWASP Top 10",
                subtitle: "Seguridad en Aplicaciones Web",
                desc: "Identificación y mitigación de las 10 vulnerabilidades más críticas en aplicaciones web (SQL Injection, XSS, Broken Auth, etc.).",
                image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?fit=crop&w=1200&q=80",
                status: "completed",
                pdfUrl: "/Diplomas/diploma-owasp-top-10.pdf",
                tech: ["AppSec", "OWASP", "Vulnerability Assessment", "Security Testing"],
                features: ["Inyección (SQL/NoSQL)", "XSS & CSRF", "Control de Acceso", "Criptografía"]
            },
            {
                id: 1,
                title: "C# Orientado a Objetos",
                subtitle: "Programación Avanzada",
                desc: "Dominio de los pilares de la POO en C#: Encapsulamiento, Herencia, Polimorfismo y Abstracción. Aplicación de patrones de diseño y buenas prácticas.",
                image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?fit=crop&w=1200&q=80",
                status: "completed",
                pdfUrl: "/Diplomas/diploma-c-sharp-poo.pdf",
                tech: ["C#", ".NET", "POO", "Patrones"],
                features: ["Clases y Objetos", "Interfaces y Abstractas", "Manejo de Memoria", "Delegados y Eventos"]
            },
            {
                id: 2,
                title: "Clean Code & Refactoring",
                subtitle: "C# / .NET",
                desc: "Escritura de código limpio, legible y mantenible. Técnicas de refactorización, principios SOLID y eliminación de deuda técnica.",
                image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?fit=crop&w=1200&q=80",
                status: "completed",
                pdfUrl: "/Diplomas/diploma-clean-code-csharp.pdf",
                tech: ["Clean Code", "SOLID", "Refactoring", "Best Practices"],
                features: ["Naming Conventions", "Functions & Methods", "Unit Tests", "Code Smells"]
            },
            {
                id: 4,
                title: "Testing con Jest",
                subtitle: "Calidad de Software",
                desc: "Aseguramiento de la calidad mediante pruebas unitarias y de integración con Jest. Mocking, spies, y test coverage en aplicaciones JavaScript/TypeScript.",
                image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?fit=crop&w=1200&q=80",
                status: "completed",
                pdfUrl: "/Diplomas/diploma-jest.pdf",
                tech: ["Jest", "Unit Testing", "TDD", "Quality Assurance"],
                features: ["Test Suites", "Mocking & Spies", "Coverage Reports", "Asynchronous Tests"]
            },
            {
                id: 6,
                title: "AWS Solutions Architect",
                subtitle: "Associate (SAA-C03)",
                desc: "Diseño de arquitecturas distribuidas, escalables y resilientes en AWS. Preparación intensiva para la certificación oficial.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?fit=crop&w=1200&q=80",
                status: "coming_soon",
                tech: ["AWS", "Cloud Architecture", "High Availability", "Cost Optimization"],
                features: ["VPC & Networking", "Serverless (Lambda)", "Storage Solutions", "Database Architecture"]
            },
            {
                id: 7,
                title: "Kubernetes Administrator",
                subtitle: "CKA Certification",
                desc: "Administración avanzada de clusters Kubernetes. Despliegue, escalado y gestión de aplicaciones en contenedores en entornos de producción.",
                image: "https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?fit=crop&w=1200&q=80",
                status: "coming_soon",
                tech: ["Kubernetes", "Docker", "Orchestration", "DevOps"],
                features: ["Cluster Architecture", "Services & Networking", "Storage & Scheduling", "Troubleshooting"]
            },
            {
                id: 8,
                title: "Advanced Pentesting",
                subtitle: "Offensive Security",
                desc: "Técnicas avanzadas de intrusión y post-explotación. Evasión de defensas, pivotaje y escalada de privilegios en entornos corporativos.",
                image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?fit=crop&w=1200&q=80",
                status: "coming_soon",
                tech: ["Pentesting", "Red Teaming", "Exploit Dev", "Active Directory"],
                features: ["Network Attacks", "Lateral Movement", "Privilege Escalation", "Reporting"]
            }
        ],
        contact: {
            title: "¿Listo para escalar?",
            description: "Actualmente disponible para proyectos freelance.",
            formTitle: "Contactar",
            emailPlaceholder: "Email",
            messagePlaceholder: "Mensaje",
            submitButton: "Enviar",
            cvTitle: "Descargar CV",
            footer: "Diseñado con precisión. © 2026."
        },
        navbar: {
            home: "Inicio",
            about: "Sobre mí",
            skills: "Skills",
            timeline: "Trayectoria",
            projects: "Proyectos",
            contact: "Contacto"
        }
    },
    en: {
        metadata: {
            title: "Guillermo Riedel | Backend / DevOps",
            description: "Professional DevSecOps, Backend, and Automation Portfolio. IT Support at scale (Andreani), Systems Engineering Student (UADE), and Product Builder (SaaS, dashboards, tooling).",
            locale: "en-US",
        },
        hero: {
            title: "Guillermo Riedel",
            subtitle: "Backend / DevOps · IT Support at scale at Andreani · UADE (Systems Engineering).",
            scrollIndicator: "SCROLL TO EXPLORE",
            ctaPrimary: { label: "View Projects", href: "#projects" },
            ctaSecondary: { label: "Contact", href: "#contact" }
        },
        about: {
            badge: "About Me",
            title: "More than code,<br />I design operation.",
            description: "I'm Guillermo Riedel. I started my journey as an independent developer, building my own projects and developing technical skills as a self-taught engineer, driven by a strong orientation to create and solve real problems.\n\nOver time, I decided to make a strategic leap into the corporate environment and joined Andreani, aiming to professionalize and deepen my experience in infrastructure and systems operation.\n\nCurrently, from the IT Support area, I manage critical incidents, internal tools, and corporate environments, which allowed me to develop a comprehensive understanding of the technological cycle: from code to operation and its direct impact on the business and end-users. This experience strengthened my foundations in systems, networking, automation, and structured problem-solving.\n\nToday, I orient my career towards the role of DevOps / Software Engineer, with a strong focus on Cybersecurity. I understand that truly efficient, resilient, and scalable solutions are built on solid architecture, well-designed automation, good engineering practices, and security integrated from the design.",
            tags: ["IT Support", "Backend", "DevOps"],
            experience: { years: "3+ Years", label: "Applied Experience" },
            highlights: [
                "Corporate Support: AD, SCCM, hardware/network troubleshooting, industrial printers, RF handhelds.",
                "Automation: PowerShell/Python scripts for repetitive tasks and diagnostics.",
                "Product Building: dashboards, SaaS, tooling, and clean architecture."
            ],
            image: "/me.JPG"
        },
        skills: {
            nodes: [
                {
                    type: "core",
                    icon: "⚡",
                    title: "DevOps / Software Engineer (DevSecOps Track)",
                    label: "CORE",
                    desc: "Profile oriented to integrate Development, Infrastructure, and Security to build resilient, automated, and scalable systems.",
                    color: "#ffffff",
                    borderColor: "rgba(255, 255, 255, 0.4)",
                    textColor: "white",
                    position: { top: "50%", left: "50%" }
                },
                {
                    type: "area",
                    icon: "DEV",
                    title: "Programming",
                    label: "CODE",
                    desc: "Backend/Frontend focused on clean architecture, code quality, performance, and design fundamentals.",
                    color: "#3b82f6",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "25%", left: "50%" }
                },
                {
                    type: "area",
                    icon: "OPS",
                    title: "Infrastructure",
                    label: "INFRA",
                    desc: "Systems, automation, and platforms: containers, Linux, CI/CD, and reproducible infrastructure (cloud-ready).",
                    color: "#a855f7",
                    borderColor: "rgb(168, 85, 247)",
                    textColor: "rgb(192, 132, 252)",
                    position: { top: "65%", left: "28%" }
                },
                {
                    type: "area",
                    icon: "SEC",
                    title: "Cybersecurity",
                    label: "SECURITY",
                    desc: "Security applied to software and infrastructure: secure-by-design, OWASP Top 10, and ISO 27001 fundamentals.",
                    color: "#30d158",
                    borderColor: "rgb(48, 209, 88)",
                    textColor: "rgb(74, 222, 128)",
                    position: { top: "65%", left: "72%" }
                },
                {
                    type: "tool",
                    icon: "C#",
                    title: ".NET / ASP.NET Core",
                    label: ".NET",
                    desc: "Intermediate experience with Backend APIs, clean architecture, async/await, and best practices.",
                    color: "#60a5fa",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "10%", left: "30%" }
                },
                {
                    type: "tool",
                    icon: "⚛️",
                    title: "React + Next.js",
                    label: "FRONT",
                    desc: "Intermediate skills in modern UI with SSR/SSG, reusable components, and performance focus.",
                    color: "#60a5fa",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "5%", left: "40%" }
                },
                {
                    type: "tool",
                    icon: "🏛️",
                    title: "Software Architecture",
                    label: "ARCH",
                    desc: "Intermediate understanding of Clean Architecture, design patterns, modularity, and separation of concerns.",
                    color: "#60a5fa",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "4%", left: "50%" }
                },
                {
                    type: "tool",
                    icon: "Py",
                    title: "Python",
                    label: "PY",
                    desc: "Intermediate proficiency in automation, scripting, and tooling for support/infra (helpers, parsers, CLI).",
                    color: "#60a5fa",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "5%", left: "60%" }
                },
                {
                    type: "tool",
                    icon: "TS",
                    title: "TypeScript",
                    label: "TS",
                    desc: "Intermediate use of static typing, robust models, and maintainability in JS apps.",
                    color: "#60a5fa",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "10%", left: "70%" }
                },
                {
                    type: "tool",
                    icon: "DB",
                    title: "SQL / NoSQL",
                    label: "DATA",
                    desc: "Intermediate capability in modeling and queries (SQL) plus document database fundamentals.",
                    color: "#60a5fa",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "18%", left: "80%" }
                },
                {
                    type: "tool",
                    icon: "Git",
                    title: "Git & GitHub",
                    label: "GIT",
                    desc: "Intermediate workflow management: Branches, merges, PRs, conventions, and feature/bugfix strategies.",
                    color: "#60a5fa",
                    borderColor: "rgb(59, 130, 246)",
                    textColor: "rgb(96, 165, 250)",
                    position: { top: "18%", left: "20%" }
                },
                {
                    type: "tool",
                    icon: "🐳",
                    title: "Docker",
                    label: "DOCKER",
                    desc: "Intermediate command of images, containers, networking, volumes, and compose.",
                    color: "#c084fc",
                    borderColor: "rgb(168, 85, 247)",
                    textColor: "rgb(192, 132, 252)",
                    position: { top: "55%", left: "10%" }
                },
                {
                    type: "tool",
                    icon: "☁️",
                    title: "Cloud (AWS - Learning)",
                    label: "CLOUD",
                    desc: "Currently learning cloud fundamentals: compute, networking, storage, and basic IAM.",
                    color: "#c084fc",
                    borderColor: "rgb(168, 85, 247)",
                    textColor: "rgb(192, 132, 252)",
                    position: { top: "70%", left: "5%" }
                },
                {
                    type: "tool",
                    icon: "IaC",
                    title: "Infrastructure as Code (IaC)",
                    label: "IAC",
                    desc: "Focus on reproducible Infra. using Ansible (Intermediate) and Terraform (Learning) for idempotency.",
                    color: "#c084fc",
                    borderColor: "rgb(168, 85, 247)",
                    textColor: "rgb(192, 132, 252)",
                    position: { top: "85%", left: "10%" }
                },
                {
                    type: "tool",
                    icon: "🐧",
                    title: "Linux Systems",
                    label: "LINUX",
                    desc: "Intermediate Linux systems management: CLI, permissions, processes, services, and troubleshooting.",
                    color: "#c084fc",
                    borderColor: "rgb(168, 85, 247)",
                    textColor: "rgb(192, 132, 252)",
                    position: { top: "92%", left: "25%" }
                },
                {
                    type: "tool",
                    icon: "CI",
                    title: "CI/CD Pipelines",
                    label: "CICD",
                    desc: "Intermediate implementation of build/test/deploy pipelines (GitHub Actions / Azure DevOps / Jenkins).",
                    color: "#c084fc",
                    borderColor: "rgb(168, 85, 247)",
                    textColor: "rgb(192, 132, 252)",
                    position: { top: "88%", left: "40%" }
                },
                {
                    type: "tool",
                    icon: "☸️",
                    title: "Kubernetes",
                    label: "K8S",
                    desc: "Intermediate orchestration skills: pods, deployments, services, ingress, and cluster concepts.",
                    color: "#c084fc",
                    borderColor: "rgb(168, 85, 247)",
                    textColor: "rgb(192, 132, 252)",
                    position: { top: "75%", left: "50%" }
                },
                {
                    type: "tool",
                    icon: "🛡️",
                    title: "OWASP Top 10",
                    label: "OWASP",
                    desc: "Basic to Intermediate knowledge of common app risks (auth, injection, data exposure) and mitigations.",
                    color: "#4ade80",
                    borderColor: "rgb(48, 209, 88)",
                    textColor: "rgb(74, 222, 128)",
                    position: { top: "75%", left: "90%" }
                },
                {
                    type: "tool",
                    icon: "ISO",
                    title: "ISO 27001 (Basics)",
                    label: "ISO",
                    desc: "Basic understanding of ISMS fundamentals: policies, controls, risks, and compliance.",
                    color: "#4ade80",
                    borderColor: "rgb(48, 209, 88)",
                    textColor: "rgb(74, 222, 128)",
                    position: { top: "85%", left: "80%" }
                },
                {
                    type: "tool",
                    icon: "🔐",
                    title: "Secure Coding",
                    label: "SECURE",
                    desc: "Intermediate application of secure development best practices and secure-by-design principles.",
                    color: "#4ade80",
                    borderColor: "rgb(48, 209, 88)",
                    textColor: "rgb(74, 222, 128)",
                    position: { top: "62%", left: "95%" }
                }
            ],
            connections: [
                [0, 1], [0, 2], [0, 3],
                [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10],
                [2, 11], [2, 12], [2, 13], [2, 14], [2, 15], [2, 16],
                [3, 17], [3, 18], [3, 19]
            ]
        },
        timeline: {
            mainTimeline: [
                {
                    date: "Dec 2022",
                    title: "IT Technician Graduate",
                    description: "Technical training in logic, hardware, networks, and troubleshooting. Solid foundation for development and systems.",
                    side: "left",
                    type: "main"
                },
                {
                    date: "2023",
                    title: "Self-Taught Stage — Backend & Automation",
                    description: "Deepening in C#/.NET, scripting (PowerShell/Python), and developing tools oriented to automation and operation.",
                    side: "right",
                    type: "main"
                },
                {
                    date: "Aug 2023 – Present",
                    title: "Freelance Development",
                    description: "Design and construction of dashboards, tools, and applications with clean architecture, automation, and focus on maintainability.",
                    side: "left",
                    type: "main",
                    tags: ["Next.js", "TypeScript", ".NET", "Python", "Clean Architecture"]
                },
                {
                    date: "Aug 2024 – Present",
                    title: "UADE — Systems Engineering Degree",
                    description: "Academic training in programming, operating systems, software engineering, discrete mathematics, and economics.",
                    side: "right",
                    type: "main"
                }
            ],
            branchEvents: [
                {
                    date: "Aug 2025 – Present",
                    title: "IT Support (L1) — Andreani",
                    description: "Operation of infrastructure and corporate endpoints: Active Directory, SCCM, deployments, RF devices, printers, and network diagnostics. Experience in standardization and support in production environments.",
                    branch: "andreani",
                    tags: ["Active Directory", "SCCM", "Infra Ops", "Troubleshooting"]
                },
                {
                    date: "Aug 2025 – Present",
                    title: "Freelance (Professional Evolution)",
                    description: "Continuity of independent development with greater focus on architecture, automation, and engineering practices applied to real products.",
                    branch: "freelance",
                    tags: ["Next.js", "TypeScript", ".NET", "Automation", "Architecture"]
                },
                {
                    date: "Mar 2025 – Present",
                    title: "CarStore — Automotive SaaS",
                    description: "Design and development of SaaS platform for dealerships: stock management, CRM, KPIs, and operational dashboards with domain modeling.",
                    branch: "freelance",
                    tags: ["SaaS", "Domain Modeling", "Dashboards", "KPIs"]
                }
            ],
            futureGoals: [
                {
                    title: "Cloud Foundations (AWS)",
                    status: "IN PROGRESS",
                    progress: 35,
                    description: "Cloud architecture, core services, reproducible deployments, and scalable infrastructure.",
                    color: "blue"
                },
                {
                    title: "DevOps / DevSecOps Specialization",
                    status: "IN PROGRESS",
                    progress: 45,
                    description: "Advanced CI/CD, integrated security, observability, and end-to-end automation.",
                    color: "purple"
                },
                {
                    title: "Backend Engineering Excellence",
                    status: "IN PROGRESS",
                    progress: 55,
                    description: "Clean architecture, robust APIs, performance, and professional engineering standards.",
                    color: "pink"
                }
            ]
        },
        projects: [
            {
                id: 1,
                title: "Unsort",
                subtitle: "Livestock Dashboard",
                desc: "Platform to digitize livestock operations: stock by category/paddock, traceability, reproduction, KPIs (weaning, productivity), and decision dashboard. Designed to grow by modules and maintain clear domain.",
                image: "https://images.unsplash.com/photo-1527847263472-aa5338d178b8?fit=crop&w=1200&q=80",
                tech: ["Next.js", "TypeScript", "Node.js", "Clean Architecture"],
                features: ["Total & Paddock Stock", "Operational Domain", "Production KPIs", "Modular Scalability"]
            },
            {
                id: 2,
                title: "Ops Automation Toolkit",
                subtitle: "PowerShell / Python",
                desc: "Automation toolkit for support and operations: diagnostics, repetitive tasks, inventory, and remote actions. Focus on security (least privilege), logging, and reuse.",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=1200&q=80",
                tech: ["PowerShell", "Python", "WinRM", "WMI"],
                features: ["Remote Execution", "Centralized Logging", "Auto Diagnostics", "Operational Templates"]
            },
            {
                id: 3,
                title: "Landing SaaS",
                subtitle: "Site Generation",
                desc: "SaaS oriented to local businesses to generate landing pages and digital assets with minimalist aesthetics and conversion focus. Architecture ready for subscription and multi-tenancy.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=1200&q=80",
                tech: ["Next.js", "TypeScript", "Supabase", "Prisma"],
                features: ["Reusable Templates", "Multi-tenancy", "SEO Optimized", "Content Management"]
            },
            {
                id: 4,
                title: "Second Brain",
                subtitle: "Knowledge System",
                desc: "Knowledge and note system (Obsidian + workflows) to ingest PDFs, transcripts, and notes; structuring, indexing, and assisted generation for study and operation.",
                image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?fit=crop&w=1200&q=80",
                tech: ["Obsidian", "TypeScript", "Next.js", "Automation"],
                features: ["Knowledge Organization", "Ingestion Workflows", "Semantic Search", "Study Templates"]
            },
            {
                id: 5,
                title: "Security Audit Tool",
                subtitle: "Audit Tool",
                desc: "Automated security analysis and compliance platform. Audit tools and continuous vulnerability monitoring.",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=1200&q=80",
                tech: ["Python", "Docker", "Postgres", "React"],
                features: ["Vulnerability Scanning", "Compliance Reports", "Continuous Monitoring", "Security Alerts"]
            },
            {
                id: 6,
                title: "DevOps Platform",
                subtitle: "Infrastructure & CI/CD",
                desc: "Complete CI/CD pipeline with monitoring and alerts. Comprehensive platform for deployment automation and infrastructure management.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=1200&q=80",
                tech: ["Jenkins", "Kubernetes", "Docker", "Prometheus"],
                features: ["Automated CI/CD", "K8s Orchestration", "Real-time Metrics", "Log Management"]
            }
        ],
        certificates: [
            {
                id: 3,
                title: "ISO 27001 Implementation",
                subtitle: "Information Security",
                desc: "Fundamentals and application of ISO/IEC 27001 standard for Information Security Management Systems (ISMS). Risk management and controls.",
                image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?fit=crop&w=1200&q=80",
                status: "completed",
                pdfUrl: "/Diplomas/diploma-iso-27001.pdf",
                tech: ["ISO 27001", "ISMS", "Risk Management", "Compliance"],
                features: ["Security Policies", "Technical Controls", "Internal Audit", "Asset Protection"]
            },
            {
                id: 5,
                title: "OWASP Top 10",
                subtitle: "Web Application Security",
                desc: "Identification and mitigation of the 10 most critical vulnerabilities in web applications (SQL Injection, XSS, Broken Auth, etc.).",
                image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?fit=crop&w=1200&q=80",
                status: "completed",
                pdfUrl: "/Diplomas/diploma-owasp-top-10.pdf",
                tech: ["AppSec", "OWASP", "Vulnerability Assessment", "Security Testing"],
                features: ["Injection (SQL/NoSQL)", "XSS & CSRF", "Access Control", "Cryptography"]
            },
            {
                id: 1,
                title: "Object-Oriented C#",
                subtitle: "Advanced Programming",
                desc: "Mastery of OOP pillars in C#: Encapsulation, Inheritance, Polymorphism, and Abstraction. Application of design patterns and best practices.",
                image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?fit=crop&w=1200&q=80",
                status: "completed",
                pdfUrl: "/Diplomas/diploma-c-sharp-poo.pdf",
                tech: ["C#", ".NET", "OOP", "Patterns"],
                features: ["Classes & Objects", "Interfaces & Abstracts", "Memory Management", "Delegates & Events"]
            },
            {
                id: 2,
                title: "Clean Code & Refactoring",
                subtitle: "C# / .NET",
                desc: "Writing clean, readable, and maintainable code. Refactoring techniques, SOLID principles, and technical debt elimination.",
                image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?fit=crop&w=1200&q=80",
                status: "completed",
                pdfUrl: "/Diplomas/diploma-clean-code-csharp.pdf",
                tech: ["Clean Code", "SOLID", "Refactoring", "Best Practices"],
                features: ["Naming Conventions", "Functions & Methods", "Unit Tests", "Code Smells"]
            },
            {
                id: 4,
                title: "Testing with Jest",
                subtitle: "Software Quality",
                desc: "Quality assurance through unit and integration testing with Jest. Mocking, spies, and test coverage in JavaScript/TypeScript applications.",
                image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?fit=crop&w=1200&q=80",
                status: "completed",
                pdfUrl: "/Diplomas/diploma-jest.pdf",
                tech: ["Jest", "Unit Testing", "TDD", "Quality Assurance"],
                features: ["Test Suites", "Mocking & Spies", "Coverage Reports", "Asynchronous Tests"]
            },
            {
                id: 6,
                title: "AWS Solutions Architect",
                subtitle: "Associate (SAA-C03)",
                desc: "Design of distributed, scalable, and resilient architectures on AWS. Intensive preparation for official certification.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?fit=crop&w=1200&q=80",
                status: "coming_soon",
                tech: ["AWS", "Cloud Architecture", "High Availability", "Cost Optimization"],
                features: ["VPC & Networking", "Serverless (Lambda)", "Storage Solutions", "Database Architecture"]
            },
            {
                id: 7,
                title: "Kubernetes Administrator",
                subtitle: "CKA Certification",
                desc: "Advanced Kubernetes cluster administration. Deployment, scaling, and management of containerized applications in production environments.",
                image: "https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?fit=crop&w=1200&q=80",
                status: "coming_soon",
                tech: ["Kubernetes", "Docker", "Orchestration", "DevOps"],
                features: ["Cluster Architecture", "Services & Networking", "Storage & Scheduling", "Troubleshooting"]
            },
            {
                id: 8,
                title: "Advanced Pentesting",
                subtitle: "Offensive Security",
                desc: "Advanced intrusion and post-exploitation techniques. Defense evasion, pivoting, and privilege escalation in corporate environments.",
                image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?fit=crop&w=1200&q=80",
                status: "coming_soon",
                tech: ["Pentesting", "Red Teaming", "Exploit Dev", "Active Directory"],
                features: ["Network Attacks", "Lateral Movement", "Privilege Escalation", "Reporting"]
            }
        ],
        contact: {
            title: "Ready to scale?",
            description: "Currently available for freelance projects.",
            formTitle: "Get in touch",
            emailPlaceholder: "Email",
            messagePlaceholder: "Message",
            submitButton: "Send",
            cvTitle: "Download CV",
            footer: "Designed with precision. © 2026."
        },
        navbar: {
            home: "Home",
            about: "About",
            skills: "Skills",
            timeline: "Career",
            projects: "Projects",
            contact: "Contact"
        }
    }
};

export const heroData = portfolioData.es.hero;
export const aboutData = portfolioData.es.about;
export const skillsData = portfolioData.es.skills;
export const timelineData = portfolioData.es.timeline;
export const projectsData = portfolioData.es.projects;
export const contactData = portfolioData.es.contact;
export const metadata = portfolioData.es.metadata;
