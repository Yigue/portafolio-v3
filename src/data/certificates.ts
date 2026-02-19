
import { certificatesData } from './portfolio-data';

export interface Certificate {
    id: number;
    title: string;
    subtitle: string;
    desc: string;
    image: string;
    tech: string[];
    features: string[];
    pdfUrl?: string;
    status?: 'completed' | 'coming_soon';
}

export const certificates: Certificate[] = certificatesData as Certificate[];
