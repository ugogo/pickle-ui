import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconArrowUpRight, IconDots } from '@tabler/icons-react';

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
        <div className="max-w-lg space-y-6">
          <Card>
            <Card.Header>
              <Card.Title>Project activity</Card.Title>
              <Card.Description>
                Changes made in the last week.
              </Card.Description>
              <Card.Action>
                <Button aria-label="More options" variant="ghost">
                  <IconDots />
                </Button>
              </Card.Action>
            </Card.Header>
            <Card.Content className="space-y-2">
              <Text variant="h1">1,284</Text>
              <Text tone="muted">Events across 8 active projects</Text>
            </Card.Content>
            <Card.Footer>
              <Button className="ml-auto" variant="ghost">
                View report <IconArrowUpRight />
              </Button>
            </Card.Footer>
          </Card>

          <Card className="justify-between">
            <Card.Header>
              <Card.Title>Simple card</Card.Title>
              <Card.Description>
                Slots can be omitted when the content needs less structure.
              </Card.Description>
            </Card.Header>
            <Card.Footer>
              <Button>Continue</Button>
            </Card.Footer>
          </Card>
        </div>
      </Story.Section>
    </Story.Layout>
  ),
};
