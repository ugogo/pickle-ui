import type { BadgeProps } from '@/components/Badge';

type Deployment = {
  branch: string;
  duration: string;
  environment: string;
  id: string;
  startedAt: string;
  status: BadgeProps['variant'];
  statusLabel: string;
};

type NavItem = {
  active?: boolean;
  href: string;
  icon: 'chart' | 'folder' | 'settings' | 'team' | 'view';
  label: string;
};

type Project = {
  id: string;
  name: string;
  owner: string;
  ownerAvatar?: string;
  ownerInitials: string;
  progress: number;
  status: BadgeProps['variant'];
  statusLabel: string;
  updatedAt: string;
};

type RevenuePoint = {
  label: string;
  value: number;
};

type Stat = {
  change: string;
  changeTone: 'destructive' | 'muted' | 'primary';
  id: string;
  label: string;
  value: string;
};

const navItems: NavItem[] = [
  { active: true, href: '#', icon: 'view', label: 'Dashboard' },
  { href: '#', icon: 'folder', label: 'Projects' },
  { href: '#', icon: 'chart', label: 'Analytics' },
  { href: '#', icon: 'team', label: 'Team' },
  { href: '#', icon: 'settings', label: 'Settings' },
];

const stats: Stat[] = [
  {
    change: '+12.5% from last month',
    changeTone: 'primary',
    id: 'revenue',
    label: 'Monthly revenue',
    value: '$48,574',
  },
  {
    change: '+8.2% from last month',
    changeTone: 'primary',
    id: 'users',
    label: 'Active users',
    value: '2,847',
  },
  {
    change: '-0.4% from last month',
    changeTone: 'destructive',
    id: 'conversion',
    label: 'Conversion rate',
    value: '3.24%',
  },
  {
    change: '+18s from last month',
    changeTone: 'primary',
    id: 'session',
    label: 'Avg. session',
    value: '4m 32s',
  },
];

const revenueSeries: RevenuePoint[] = [
  { label: 'Jan', value: 62 },
  { label: 'Feb', value: 74 },
  { label: 'Mar', value: 58 },
  { label: 'Apr', value: 81 },
  { label: 'May', value: 76 },
  { label: 'Jun', value: 92 },
  { label: 'Jul', value: 88 },
];

const projects: Project[] = [
  {
    id: 'atlas',
    name: 'Atlas redesign',
    owner: 'Maya Chen',
    ownerAvatar: 'https://i.pravatar.cc/128?u=maya-chen',
    ownerInitials: 'MC',
    progress: 72,
    status: 'inProgress',
    statusLabel: 'In progress',
    updatedAt: '2h ago',
  },
  {
    id: 'billing',
    name: 'Billing migration',
    owner: 'Alex Rivera',
    ownerAvatar: 'https://i.pravatar.cc/128?u=alex-rivera',
    ownerInitials: 'AR',
    progress: 41,
    status: 'inReview',
    statusLabel: 'In review',
    updatedAt: '5h ago',
  },
  {
    id: 'mobile',
    name: 'Mobile onboarding',
    owner: 'Sam Okonkwo',
    ownerAvatar: 'https://i.pravatar.cc/128?u=sam-okonkwo',
    ownerInitials: 'SO',
    progress: 100,
    status: 'success',
    statusLabel: 'Shipped',
    updatedAt: 'Yesterday',
  },
  {
    id: 'search',
    name: 'Search indexing',
    owner: 'Jordan Lee',
    ownerInitials: 'JL',
    progress: 18,
    status: 'pending',
    statusLabel: 'Queued',
    updatedAt: 'Yesterday',
  },
  {
    id: 'infra',
    name: 'Infra hardening',
    owner: 'Priya Patel',
    ownerAvatar: 'https://i.pravatar.cc/128?u=priya-patel',
    ownerInitials: 'PP',
    progress: 63,
    status: 'failed',
    statusLabel: 'Blocked',
    updatedAt: '2 days ago',
  },
];

const deployments: Deployment[] = [
  {
    branch: 'main',
    duration: '4m 12s',
    environment: 'Production',
    id: 'dep-1042',
    startedAt: 'Today, 09:14',
    status: 'success',
    statusLabel: 'Success',
  },
  {
    branch: 'release/2.4',
    duration: '3m 48s',
    environment: 'Staging',
    id: 'dep-1041',
    startedAt: 'Today, 08:02',
    status: 'inProgress',
    statusLabel: 'Running',
  },
  {
    branch: 'feat/billing',
    duration: '2m 06s',
    environment: 'Preview',
    id: 'dep-1040',
    startedAt: 'Yesterday, 17:41',
    status: 'failed',
    statusLabel: 'Failed',
  },
  {
    branch: 'main',
    duration: '4m 01s',
    environment: 'Production',
    id: 'dep-1039',
    startedAt: 'Yesterday, 11:20',
    status: 'success',
    statusLabel: 'Success',
  },
  {
    branch: 'fix/search',
    duration: '1m 54s',
    environment: 'Preview',
    id: 'dep-1038',
    startedAt: 'Yesterday, 09:05',
    status: 'success',
    statusLabel: 'Success',
  },
];

const notifications = [
  {
    description: 'Atlas redesign passed QA and is ready to ship.',
    id: 'n1',
    time: '12m ago',
    title: 'Deployment approved',
  },
  {
    description: 'Conversion rate dipped below the 3.5% threshold.',
    id: 'n2',
    time: '1h ago',
    title: 'Metric alert',
  },
  {
    description: 'Alex Rivera invited you to Billing migration.',
    id: 'n3',
    time: '3h ago',
    title: 'Project invite',
  },
];

export { deployments, navItems, notifications, projects, revenueSeries, stats };
export type { Deployment, NavItem, Project, RevenuePoint, Stat };
