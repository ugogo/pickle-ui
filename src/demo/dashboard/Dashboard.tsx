import {
  IconBell,
  IconChartBar,
  IconChevronRight,
  IconFolder,
  IconLayoutDashboard,
  IconPlus,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';
import { useState } from 'react';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Select } from '@/components/form/Select';
import { Switch } from '@/components/form/Switch';
import { Grid } from '@/components/Grid';
import { Input } from '@/components/Input';
import { Popover } from '@/components/Popover';
import { ScrollArea } from '@/components/ScrollArea';
import { Slider } from '@/components/Slider';
import { Text } from '@/components/Text';
import { XStack } from '@/components/XStack';
import { YStack } from '@/components/YStack';

import {
  deployments,
  type NavItem,
  navItems,
  notifications,
  projects,
  revenueSeries,
  stats,
} from './data';

const navIcons = {
  chart: IconChartBar,
  folder: IconFolder,
  settings: IconSettings,
  team: IconUsers,
  view: IconLayoutDashboard,
} as const;

function Dashboard() {
  return (
    <div className="bg-background text-foreground flex min-h-screen">
      <DashboardSidebar />

      <YStack className="min-w-0 flex-1">
        <DashboardHeader />

        <YStack className="px-6 py-6" gap={6}>
          <StatCards />

          <Grid className="grid-cols-1 xl:grid-cols-3" gap={4}>
            <Card className="xl:col-span-2">
              <Card.Header>
                <Card.Title>Revenue trend</Card.Title>
                <Card.Description>
                  Monthly recurring revenue for the current fiscal year.
                </Card.Description>
                <Card.Action>
                  <Select defaultValue="mrr">
                    <Select.Trigger
                      aria-label="Metric"
                      className="w-32"
                      size="sm"
                    >
                      <Select.Value placeholder="Metric" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="mrr">MRR</Select.Item>
                      <Select.Item value="arr">ARR</Select.Item>
                      <Select.Item value="net">Net new</Select.Item>
                    </Select.Content>
                  </Select>
                </Card.Action>
              </Card.Header>
              <Card.Content>
                <RevenueChart />
              </Card.Content>
            </Card>

            <WorkspaceSettingsPanel />
          </Grid>

          <Grid className="grid-cols-1 xl:grid-cols-2" gap={4}>
            <ProjectsPanel />
            <Card>
              <Card.Header>
                <Card.Title>Team capacity</Card.Title>
                <Card.Description>
                  Allocation across active workstreams this week.
                </Card.Description>
              </Card.Header>
              <Card.Content className="space-y-4">
                {[
                  { label: 'Design', value: 78 },
                  { label: 'Engineering', value: 92 },
                  { label: 'Support', value: 54 },
                ].map((team) => (
                  <YStack gap={2} key={team.label}>
                    <XStack justify="between">
                      <Text weight="bold">{team.label}</Text>
                      <Text tone="muted" variant="small">
                        {team.value}%
                      </Text>
                    </XStack>
                    <div className="bg-muted h-2 overflow-hidden rounded-full">
                      <div
                        className="bg-chart-2 h-full rounded-full"
                        style={{ width: `${team.value}%` }}
                      />
                    </div>
                  </YStack>
                ))}
                <Text tone="muted" variant="small">
                  Progress bars are hand-rolled — a Progress component would
                  standardize this pattern.
                </Text>
              </Card.Content>
            </Card>
          </Grid>

          <DeploymentsTable />
        </YStack>
      </YStack>
    </div>
  );
}

function DashboardHeader() {
  const [period, setPeriod] = useState('30d');

  return (
    <XStack
      align="center"
      className="border-border border-b px-6 py-4"
      gap={4}
      justify="between"
      wrap="wrap"
    >
      <YStack gap={1}>
        <Text variant="h2">Dashboard</Text>
        <Text tone="muted">
          Overview of product health, delivery, and team activity.
        </Text>
      </YStack>

      <XStack
        align="center"
        className="min-w-0 flex-1 justify-end"
        gap={2}
        wrap="wrap"
      >
        <div className="relative w-full max-w-xs">
          <IconSearch
            aria-hidden
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
            stroke={1.75}
          />
          <Input
            aria-label="Search projects, people, or deployments"
            className="pl-8"
            placeholder="Search…"
          />
        </div>

        <Select
          onValueChange={(value) => setPeriod(String(value))}
          value={period}
        >
          <Select.Trigger aria-label="Reporting period" className="w-36">
            <Select.Value placeholder="Period" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="7d">Last 7 days</Select.Item>
            <Select.Item value="30d">Last 30 days</Select.Item>
            <Select.Item value="90d">Last 90 days</Select.Item>
            <Select.Item value="ytd">Year to date</Select.Item>
          </Select.Content>
        </Select>

        <Popover>
          <Popover.Trigger asChild>
            <Button
              aria-label="Notifications"
              className="relative"
              variant="outline"
            >
              <IconBell stroke={1.75} />
              <Badge
                className="absolute -top-1 -right-1 px-1.5 py-0"
                variant="destructive"
              >
                3
              </Badge>
            </Button>
          </Popover.Trigger>
          <Popover.Content align="end" className="w-80">
            <Popover.Header>
              <Popover.Title>Notifications</Popover.Title>
              <Popover.Description>
                Recent activity across your workspace.
              </Popover.Description>
            </Popover.Header>
            <YStack className="max-h-64" gap={3}>
              {notifications.map((notification) => (
                <YStack
                  className="border-border border-b pb-3 last:border-0 last:pb-0"
                  gap={1}
                  key={notification.id}
                >
                  <XStack align="center" justify="between">
                    <Text weight="bold">{notification.title}</Text>
                    <Text tone="muted" variant="small">
                      {notification.time}
                    </Text>
                  </XStack>
                  <Text tone="muted" variant="small">
                    {notification.description}
                  </Text>
                </YStack>
              ))}
            </YStack>
          </Popover.Content>
        </Popover>

        <Popover>
          <Popover.Trigger asChild>
            <Button variant="outline">Maya Chen</Button>
          </Popover.Trigger>
          <Popover.Content align="end">
            <Popover.Header>
              <Popover.Title>Maya Chen</Popover.Title>
              <Popover.Description>maya@pickle.dev</Popover.Description>
            </Popover.Header>
            <YStack gap={2}>
              <Button className="justify-start" variant="ghost">
                Profile
              </Button>
              <Button className="justify-start" variant="ghost">
                Preferences
              </Button>
              <Button className="justify-start" variant="ghost">
                Sign out
              </Button>
            </YStack>
          </Popover.Content>
        </Popover>

        <Button>
          <IconPlus stroke={1.75} />
          New project
        </Button>
      </XStack>
    </XStack>
  );
}

function DashboardSidebar() {
  return (
    <aside className="border-sidebar-border bg-sidebar text-sidebar-foreground flex w-64 shrink-0 flex-col border-r">
      <XStack
        align="center"
        className="border-sidebar-border border-b px-5 py-4"
        gap={3}
      >
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-md text-sm font-semibold">
          P
        </div>
        <YStack gap={0.5}>
          <Text variant="h4" weight="bold">
            Pickle
          </Text>
          <Text tone="muted" variant="small">
            Workspace
          </Text>
        </YStack>
      </XStack>

      <ScrollArea className="flex-1 px-3 py-4">
        <YStack gap={1}>
          {navItems.map((item) => (
            <SidebarNavItem key={item.label} {...item} />
          ))}
        </YStack>
      </ScrollArea>

      <div className="border-sidebar-border border-t p-4">
        <Card className="bg-sidebar-accent/40 border-sidebar-border gap-3 py-4 shadow-none">
          <Card.Header className="px-4">
            <Card.Title>Upgrade plan</Card.Title>
            <Card.Description>
              Unlock advanced analytics and team seats.
            </Card.Description>
          </Card.Header>
          <Card.Footer className="px-4">
            <Button className="w-full" size="sm">
              View plans
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </aside>
  );
}

function DeploymentsTable() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Recent deployments</Card.Title>
        <Card.Description>
          Build and release history for the selected period.
        </Card.Description>
        <Card.Action>
          <Button size="sm" variant="outline">
            Export
          </Button>
        </Card.Action>
      </Card.Header>
      <Card.Content className="px-0">
        <ScrollArea className="max-h-72" orientation="both">
          <div className="min-w-[720px]">
            <Grid
              className="border-border text-muted-foreground border-b px-6 py-2 text-xs font-medium tracking-wide uppercase"
              columns={6}
              gap={4}
            >
              <Text tone="muted" variant="small" weight="bold">
                Deployment
              </Text>
              <Text tone="muted" variant="small" weight="bold">
                Environment
              </Text>
              <Text tone="muted" variant="small" weight="bold">
                Branch
              </Text>
              <Text tone="muted" variant="small" weight="bold">
                Status
              </Text>
              <Text tone="muted" variant="small" weight="bold">
                Started
              </Text>
              <Text tone="muted" variant="small" weight="bold">
                Duration
              </Text>
            </Grid>

            {deployments.map((deployment) => (
              <Grid
                align="center"
                className="border-border hover:bg-muted/30 border-b px-6 py-3 last:border-0"
                columns={6}
                gap={4}
                key={deployment.id}
              >
                <Text variant="code">{deployment.id}</Text>
                <Text>{deployment.environment}</Text>
                <Text variant="code">{deployment.branch}</Text>
                <Badge variant={deployment.status}>
                  {deployment.statusLabel}
                </Badge>
                <Text tone="muted" variant="small">
                  {deployment.startedAt}
                </Text>
                <Text variant="small">{deployment.duration}</Text>
              </Grid>
            ))}
          </div>
        </ScrollArea>
        <div className="px-6 pt-3">
          <Text tone="muted" variant="small">
            Built with Grid rows — a dedicated Table component would improve
            sorting, selection, and responsive behavior.
          </Text>
        </div>
      </Card.Content>
    </Card>
  );
}

function ProjectsPanel() {
  return (
    <Card className="h-full">
      <Card.Header>
        <Card.Title>Active projects</Card.Title>
        <Card.Description>
          Delivery status across the current sprint.
        </Card.Description>
        <Card.Action>
          <Button size="sm" variant="ghost">
            View all
            <IconChevronRight stroke={1.75} />
          </Button>
        </Card.Action>
      </Card.Header>
      <Card.Content className="px-0">
        <ScrollArea className="max-h-80">
          <YStack gap={0}>
            {projects.map((project) => (
              <XStack
                align="center"
                className="border-border hover:bg-muted/40 border-b px-6 py-3 last:border-0"
                gap={4}
                justify="between"
                key={project.id}
              >
                <YStack className="min-w-0 flex-1" gap={1}>
                  <XStack align="center" gap={2}>
                    <Text truncate weight="bold">
                      {project.name}
                    </Text>
                    <Badge variant={project.status}>
                      {project.statusLabel}
                    </Badge>
                  </XStack>
                  <Text tone="muted" variant="small">
                    {project.owner} · Updated {project.updatedAt}
                  </Text>
                </YStack>
                <YStack align="end" className="w-28 shrink-0" gap={1}>
                  <Text variant="small" weight="bold">
                    {project.progress}%
                  </Text>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </YStack>
              </XStack>
            ))}
          </YStack>
        </ScrollArea>
      </Card.Content>
    </Card>
  );
}

function RevenueChart() {
  const maxValue = Math.max(...revenueSeries.map((point) => point.value));

  return (
    <YStack className="h-56" gap={3} justify="end">
      <XStack align="end" className="h-full" gap={2} justify="between">
        {revenueSeries.map((point, index) => (
          <YStack
            align="center"
            className="h-full flex-1"
            gap={2}
            justify="end"
            key={point.label}
          >
            <div
              className="bg-chart-1 w-full max-w-10 rounded-t-md transition-[height] duration-300"
              style={{
                height: `${(point.value / maxValue) * 100}%`,
                opacity: 0.45 + index * 0.08,
              }}
            />
            <Text tone="muted" variant="small">
              {point.label}
            </Text>
          </YStack>
        ))}
      </XStack>
      <Text tone="muted" variant="small">
        Placeholder bars using chart tokens — a Chart component would slot in
        here.
      </Text>
    </YStack>
  );
}

function SidebarNavItem({ active, icon, label }: NavItem) {
  const Icon = navIcons[icon];

  return (
    <Button
      aria-current={active ? 'page' : undefined}
      className="w-full justify-start"
      variant={active ? 'secondary' : 'ghost'}
    >
      <Icon stroke={1.75} />
      {label}
    </Button>
  );
}

function StatCards() {
  return (
    <Grid className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" gap={4}>
      {stats.map((stat) => (
        <Card key={stat.id}>
          <Card.Header>
            <Card.Description>{stat.label}</Card.Description>
            <Card.Title>{stat.value}</Card.Title>
          </Card.Header>
          <Card.Content>
            <Text tone={stat.changeTone} variant="small">
              {stat.change}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </Grid>
  );
}

function WorkspaceSettingsPanel() {
  const [liveUpdates, setLiveUpdates] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState([35]);

  return (
    <Card className="h-full">
      <Card.Header>
        <Card.Title>Workspace settings</Card.Title>
        <Card.Description>
          Quick toggles for alerts and reporting preferences.
        </Card.Description>
      </Card.Header>
      <Card.Content className="space-y-6">
        <YStack gap={4}>
          <Switch
            checked={liveUpdates}
            label="Live deployment updates"
            onCheckedChange={setLiveUpdates}
          />
          <Switch
            checked={emailDigest}
            label="Weekly email digest"
            onCheckedChange={setEmailDigest}
          />
        </YStack>

        <YStack gap={3}>
          <XStack align="center" justify="between">
            <Text weight="bold">Alert threshold</Text>
            <Text tone="muted" variant="small">
              {alertThreshold[0]}%
            </Text>
          </XStack>
          <Slider
            aria-label="Alert threshold"
            max={100}
            min={0}
            onValueChange={(value) =>
              setAlertThreshold(Array.isArray(value) ? [...value] : [value])
            }
            step={5}
            value={alertThreshold}
          />
          <Text tone="muted" variant="small">
            Notify the team when conversion drops below this level.
          </Text>
        </YStack>
      </Card.Content>
    </Card>
  );
}

export { Dashboard };
