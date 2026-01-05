import { projectsData } from './portfolio-data';

export interface Project {
    id: number;
    title: string;
    subtitle: string;
    desc: string;
    image: string;
    tech: string[];
    features: string[];
}

export const projects: Project[] = projectsData as Project[];
