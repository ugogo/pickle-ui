import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { ScrollArea } from './ScrollArea';
import { Text } from './Text';

const meta = {
  component: ScrollArea,
  parameters: { layout: 'fullscreen' },
  title: 'components/ScrollArea',
} satisfies Meta<typeof ScrollArea>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const releases = Array.from({ length: 18 }, (_, index) => ({
  date: `Jun ${20 - index}`,
  version: `0.${18 - index}.0`,
}));

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-4xl" title="ScrollArea">
      <Story.Section title="Vertical">
        <ScrollArea
          className="border-border h-72 w-80 overflow-hidden rounded-md border"
          contentClassName="p-4 pr-6 pb-0"
        >
          <Text as="h3" className="mb-3" weight="bold">
            Releases
          </Text>
          {releases.map((release) => (
            <div
              className="border-border flex justify-between border-t py-3 text-sm"
              key={release.version}
            >
              <Text as="span">{release.version}</Text>
              <Text as="span" tone="muted">
                {release.date}
              </Text>
            </div>
          ))}
        </ScrollArea>
      </Story.Section>

      <Story.Section title="Both axes">
        <ScrollArea
          className="border-border h-44 w-full overflow-hidden rounded-md border"
          contentClassName="w-max p-4"
          orientation="both"
        >
          <div className="grid grid-cols-8 gap-3">
            {Array.from({ length: 24 }, (_, index) => (
              <div
                className="bg-muted flex h-20 w-32 items-center justify-center rounded-md text-sm"
                key={index}
              >
                <Text as="span">Item {index + 1}</Text>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Story.Section>
    </Story.Layout>
  ),
};
