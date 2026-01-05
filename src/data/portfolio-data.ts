import portfolioData from './portfolio-data.json';

// Export all data types
export interface PortfolioData {
    metadata: {
        title: string;
        description: string;
    };
    hero: {
        title: string;
        subtitle: string;
        scrollIndicator: string;
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

export default portfolioData as PortfolioData;

// Export individual sections for convenience
export const metadata = portfolioData.metadata;
export const heroData = portfolioData.hero;
export const aboutData = portfolioData.about;
export const skillsData = portfolioData.skills;
export const timelineData = portfolioData.timeline;
export const projectsData = portfolioData.projects;
export const contactData = portfolioData.contact;

