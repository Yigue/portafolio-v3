import portfolioData from './portfolio-data.json';

// Export all data types
export interface PortfolioData {
    metadata: {
        title: string;
        description: string;
        locale?: string;
        timezone?: string;
    };
    hero: {
        title: string;
        subtitle: string;
        scrollIndicator: string;
        ctaPrimary?: {
            label: string;
            href: string;
        };
        ctaSecondary?: {
            label: string;
            href: string;
        };
    };
    about: {
        badge: string;
        title: string;
        description: string;
        tags: string[];
        experience: {
            years: string;
            label: string;
        };
        highlights?: string[];
        image: string;
    };
    skills: {
        nodes: Array<{
            type: 'core' | 'area' | 'tool';
            icon: string;
            title: string;
            label: string;
            desc: string;
            color: string;
            borderColor: string;
            textColor: string;
            position: { top: string; left: string };
        }>;
        connections: [number, number][];
    };
    timeline: {
        mainTimeline: Array<{
            date: string;
            title: string;
            description: string;
            side: 'left' | 'right';
            type: 'main';
        }>;
        branchEvents: Array<{
            date: string;
            title: string;
            description: string;
            branch: 'andreani' | 'freelance';
            tags: string[];
        }>;
        futureGoals: Array<{
            title: string;
            status: string;
            progress: number;
            description: string;
            color: string;
        }>;
    };
    projects: Array<{
        id: number;
        title: string;
        subtitle: string;
        desc: string;
        image: string;
        tech: string[];
        features: string[];
    }>;
    certificates: Array<{
        id: number;
        title: string;
        subtitle: string;
        desc: string;
        image: string;
        tech: string[];
        features: string[];
        pdfUrl?: string; // Optional: URL to the PDF file
        status?: 'completed' | 'coming_soon'; // Status of the certificate
    }>;
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
}

// Type assertion with proper handling - using unknown first to avoid type errors
const typedPortfolioData = portfolioData as unknown as PortfolioData;

export default typedPortfolioData;

// Export individual sections for convenience
export const metadata = typedPortfolioData.metadata;
export const heroData = typedPortfolioData.hero;
export const aboutData = typedPortfolioData.about;
export const skillsData = typedPortfolioData.skills;
export const timelineData = typedPortfolioData.timeline;
export const projectsData = typedPortfolioData.projects;
export const certificatesData = typedPortfolioData.certificates;
export const contactData = typedPortfolioData.contact;

