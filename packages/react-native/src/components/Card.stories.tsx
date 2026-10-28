import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconArrowUpRight, IconDots } from '@tabler/icons-react-native';
import { View } from 'react-native';

import { Story } from './_internal/Story';
import { Button } from './Button';
import { Card } from './Card';
import { Text } from './Text';

const meta = {
  component: Card,
  parameters: { layout: 'fullscreen' },
  title: 'components/Card',
} satisfies Meta<typeof Card>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="Card">
      <Story.Section title="Composition">
        <View className="max-w-lg gap-6">
          <Card>
            <Card.Header>
              <Card.Title>Project activity</Card.Title>
              <Card.Description>
                Changes made in the last week.
              </Card.Description>
              <Card.Action>
                <Button
                  accessibilityLabel="More options"
                  size="icon"
                  variant="ghost"
                >
                  <Story.Icon icon={IconDots} />
                </Button>
              </Card.Action>
            </Card.Header>
            <Card.Content className="gap-2">
              <Text variant="h1">1,284</Text>
              <Text tone="muted">Events across 8 active projects</Text>
            </Card.Content>
            <Card.Footer>
              <Button className="ml-auto" size="sm" variant="ghost">
                View report
                <Story.Icon icon={IconArrowUpRight} />
              </Button>
            </Card.Footer>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Simple card</Card.Title>
              <Card.Description>
                Parts can be omitted when the content needs less structure.
              </Card.Description>
            </Card.Header>
            <Card.Footer>
              <Button>Continue</Button>
            </Card.Footer>
          </Card>
        </View>
      </Story.Section>
    </Story.Layout>
  ),
};
