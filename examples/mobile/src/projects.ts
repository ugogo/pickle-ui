export type Project = {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
};

export type ProjectStatus = 'inProgress' | 'inReview' | 'success';

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  inProgress: 'In progress',
  inReview: 'In review',
  success: 'Shipped',
};

export const INITIAL_PROJECTS: Project[] = [
  { id: '1', name: 'Brine dashboard', owner: 'Ada', status: 'success' },
  { id: '2', name: 'Cucumber API', owner: 'Linus', status: 'inReview' },
  { id: '3', name: 'Dill onboarding', owner: 'Grace', status: 'inProgress' },
];
