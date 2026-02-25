

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
            image: "/me.jpeg"
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
                "id": 1,
                "title": "Unsort",
                "subtitle": "Dashboard de Gestión Ganadera",
                "desc": "Plataforma integral para la digitalización de operaciones ganaderas: trazabilidad, métricas de reproducción y control de stock en tiempo real. Diseñada bajo una arquitectura modular para garantizar escalabilidad y consistencia del dominio.",
                "image": "https://images.unsplash.com/photo-1527847263472-aa5338d178b8?fit=crop&w=1200&q=80",
                "tech": ["Next.js", "TypeScript", "Node.js", "Clean Architecture", "Docker"],
                "features": ["Seguimiento de Stock por Categoría", "Enfoque en Dominio Operativo", "KPIs de Producción Real", "Despliegue Contenerizado"]
            },
            {
                "id": 2,
                "title": "Ops Automation Toolkit",
                "subtitle": "Suite de Automatización de Infraestructura",
                "desc": "Conjunto de herramientas especializadas para automatizar tareas repetitivas de IT y operaciones de soporte. Enfocado en la ejecución remota segura, logging centralizado y la reducción de errores humanos en entornos productivos.",
                "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=1200&q=80",
                "tech": ["PowerShell", "Python", "WinRM", "WMI", "Ansible"],
                "features": ["Ejecución de Tareas Remotas", "Auditoría y Logging Centralizado", "Diagnóstico Automático de Red", "Plantillas de Operación Reutilizables"]
            },

            {
                "id": 3,
                "title": "CarStore",
                "subtitle": "SaaS Automotriz (CRM + Gestión de Stock)",
                "desc": "Solución SaaS para concesionarias que gestiona el inventario, pipelines de ventas y leads de clientes. Implementado con principios de DDD para soportar lógicas de negocio complejas y crecimiento modular.",
                "image": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?fit=crop&w=1200&q=80",
                "tech": ["Next.js", "TypeScript", ".NET", "SQL", "Clean Architecture"],
                "features": ["Motor de Inventario y Precios", "Pipeline de Ventas/CRM", "Dashboard de Analíticas", "Servicios de Backend Modulares"]
            },
            {
                "id": 4,
                "title": "Hybrid Cloud Lab",
                "subtitle": "Infraestructura como Código & CI/CD",
                "desc": "Despliegue de entornos cloud automatizados utilizando herramientas modernas de DevOps. Foco en la provisión de infraestructura inmutable y la creación de pipelines de entrega continua para aplicaciones web.",
                "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?fit=crop&w=1200&q=80",
                "tech": ["Terraform", "Ansible", "AWS", "GitHub Actions", "Docker"],
                "features": ["Provisión Cloud Automatizada", "Gestión de Configuración (Ansible)", "Pipelines de CI/CD", "Despliegues Zero-Touch"]
            },
            {
                "id": 5,
                "title": "Migración de Infraestructura",
                "subtitle": "Despliegue de Sistemas y Redes Corporativas",
                "desc": "Gestión integral de la migración de infraestructura para oficinas: planificación de redes, estrategia de cutover y despliegue físico de hardware para asegurar la continuidad del negocio sin tiempos de inactividad.",
                "image": "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?fit=crop&w=1200&q=80",
                "tech": ["Networking", "Switching", "Routing", "Active Directory", "CCTV"],
                "features": ["Estrategia de Migración y Cutover", "Armado de Racks y Red Física", "Validación de Conectividad de Servicios", "Soporte y Estabilización Post-Migración"]
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
            footer: "Diseñado con precisión. ©Riedel Guillermo 2026."
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
            image: "/me.jpeg"
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
                "id": 1,
                "title": "Unsort",
                "subtitle": "Livestock Management Dashboard",
                "desc": "A digital platform for cattle operations featuring real-time stock tracking, traceability, and reproduction metrics. Built with a modular approach to ensure scalability and domain-driven consistency.",
                "image": "https://images.unsplash.com/photo-1527847263472-aa5338d178b8?fit=crop&w=1200&q=80",
                "tech": ["Next.js", "TypeScript", "Node.js", "Clean Architecture", "Docker"],
                "features": ["Category & Location Stock Tracking", "Operational Domain Focus", "Production KPIs", "Containerized Deployment"]
            },
            {
                "id": 2,
                "title": "Ops Automation Toolkit",
                "subtitle": "Infrastructure Automation Suite",
                "desc": "A specialized toolkit designed to automate repetitive IT operations and support tasks. Focuses on secure remote execution, centralized logging, and reducing human error in production environments.",
                "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=1200&q=80",
                "tech": ["PowerShell", "Python", "WinRM", "WMI", "Ansible"],
                "features": ["Remote Task Execution", "Centralized Audit Logging", "Automated Diagnostics", "Reusable Operation Templates"]
            },
            {
                "id": 3,
                "title": "CarStore",
                "subtitle": "Automotive SaaS (CRM & Inventory)",
                "desc": "A comprehensive SaaS solution for car dealerships to manage inventory, sales pipelines, and customer leads. Implemented using DDD principles to support complex business logic and modular growth.",
                "image": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?fit=crop&w=1200&q=80",
                "tech": ["Next.js", "TypeScript", ".NET", "SQL", "Clean Architecture"],
                "features": ["Inventory & Pricing Engine", "Lead/CRM Pipeline", "Sales Analytics Dashboard", "Modular Backend Services"]
            },
            {
                "id": 4,
                "title": "Hybrid Cloud Lab",
                "subtitle": "Infrastructure as Code & CI/CD",
                "desc": "Deployment of automated cloud environments using modern DevOps tools. Focuses on provisioning immutable infrastructure and establishing robust delivery pipelines for web applications.",
                "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?fit=crop&w=1200&q=80",
                "tech": ["Terraform", "Ansible", "AWS", "GitHub Actions", "Docker"],
                "features": ["Automated Cloud Provisioning", "Config Management via Ansible", "Automated CI/CD Pipelines", "Zero-Touch Deployments"]
            },
            {
                "id": 5,
                "title": "Infrastructure Migration",
                "subtitle": "Enterprise Network & Systems Deployment",
                "desc": "Successfully managed an end-to-end office infrastructure migration, including network planning, service cutover, and physical hardware deployment to ensure zero downtime for critical business operations.",
                "image": "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?fit=crop&w=1200&q=80",
                "tech": ["Networking", "Switching", "Routing", "Active Directory", "CCTV"],
                "features": ["Cutover & Migration Strategy", "Rack/Network Physical Setup", "Service Connectivity Validation", "Post-Migration Stability Support"]
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
