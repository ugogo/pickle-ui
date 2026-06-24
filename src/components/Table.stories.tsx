import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { Badge } from './Badge';
import { Table } from './Table';
import { Text } from './Text';

const meta = {
  component: Table,
  parameters: { layout: 'fullscreen' },
  title: 'components/Table',
} satisfies Meta<typeof Table>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const deployments = [
  {
    branch: 'main',
    environment: 'Production',
    id: 'dep-1042',
    status: 'Success',
    statusVariant: 'success' as const,
  },
  {
    branch: 'release/2.4',
    environment: 'Staging',
    id: 'dep-1041',
    status: 'Running',
    statusVariant: 'inProgress' as const,
  },
  {
    branch: 'feat/billing',
    environment: 'Preview',
    id: 'dep-1040',
    status: 'Failed',
    statusVariant: 'failed' as const,
  },
];

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-4xl" title="Table">
      <Story.Section title="Deployments">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Deployment</Table.Head>
              <Table.Head>Environment</Table.Head>
              <Table.Head>Branch</Table.Head>
              <Table.Head>Status</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {deployments.map((deployment) => (
              <Table.Row key={deployment.id}>
                <Table.Cell>
                  <Text variant="code">{deployment.id}</Text>
                </Table.Cell>
                <Table.Cell>{deployment.environment}</Table.Cell>
                <Table.Cell>
                  <Text variant="code">{deployment.branch}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={deployment.statusVariant}>
                    {deployment.status}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Story.Section>
    </Story.Layout>
  ),
};
