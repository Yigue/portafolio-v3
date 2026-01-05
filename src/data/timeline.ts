import { timelineData } from './portfolio-data';

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

export const mainTimeline: TimelineEvent[] = timelineData.mainTimeline as TimelineEvent[];
export const branchEvents: BranchEvent[] = timelineData.branchEvents as BranchEvent[];
export const futureGoals = timelineData.futureGoals;
