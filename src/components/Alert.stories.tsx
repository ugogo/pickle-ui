import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
  IconTerminal2,
} from '@tabler/icons-react';

import { Story } from './_internal/Story';
import { Alert, type AlertProps } from './Alert';
import { Button } from './Button';
import { Text } from './Text';

const meta = {
  component: Alert,
  parameters: { layout: 'fullscreen' },
  title: 'components/Alert',
} satisfies Meta<typeof Alert>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const VARIANTS: {
  description: string;
  icon: typeof IconInfoCircle;
  title: string;
  variant: NonNullable<AlertProps['variant']>;
}[] = [
  {
    description: 'You can add components to your app using the CLI.',
    icon: IconTerminal2,
    title: 'Heads up!',
    variant: 'default',
  },
  {
    description: 'A new version is available. Reload to get the latest.',
    icon: IconInfoCircle,
    title: 'Update available',
    variant: 'info',
  },
  {
    description: 'Your changes have been saved and published.',
    icon: IconCircleCheck,
    title: 'Saved',
    variant: 'success',
  },
  {
    description: 'Your trial ends in 3 days. Add a payment method to continue.',
    icon: IconAlertTriangle,
    title: 'Trial ending soon',
    variant: 'warning',
  },
  {
    description: 'We could not reach the server. Check your connection.',
    icon: IconAlertCircle,
    title: 'Something went wrong',
    variant: 'destructive',
  },
];

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-3xl" title="Alert">
      <Story.Section title="Variants">
        <div className="space-y-4">
          {VARIANTS.map(({ description, icon: Icon, title, variant }) => (
            <Alert key={variant} variant={variant}>
              <Alert.Icon>
                <Icon />
              </Alert.Icon>
              <Alert.Title>{title}</Alert.Title>
              <Alert.Description>{description}</Alert.Description>
            </Alert>
          ))}
        </div>
      </Story.Section>

      <Story.Section title="With action">
        <div className="space-y-4">
          <Alert role="alert" variant="destructive">
            <Alert.Icon>
              <IconAlertCircle />
            </Alert.Icon>
            <Alert.Title>Payment failed</Alert.Title>
            <Alert.Description>
              Your card was declined. Update your billing details to retry.
            </Alert.Description>
            <Alert.Action>
              <Button size="sm" variant="outline">
                Retry
              </Button>
            </Alert.Action>
          </Alert>
          <Alert variant="info">
            <Alert.Title>Without an icon</Alert.Title>
            <Alert.Description>
              The icon column collapses when{' '}
              <Text as="code" variant="code">
                Alert.Icon
              </Text>{' '}
              is omitted.
            </Alert.Description>
            <Alert.Action>
              <Button size="sm" variant="ghost">
                Dismiss
              </Button>
            </Alert.Action>
          </Alert>
        </div>
      </Story.Section>

      <Story.Section title="Title only">
        <Alert role="status" variant="success">
          <Alert.Icon>
            <IconCircleCheck />
          </Alert.Icon>
          <Alert.Title>Invitation sent to 3 people.</Alert.Title>
        </Alert>
      </Story.Section>
    </Story.Layout>
  ),
};
