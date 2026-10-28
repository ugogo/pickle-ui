import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Story } from './_internal/Story';
import { StoryItem as Item } from './_internal/StoryItem';
import { Grid } from './Grid';

const meta = {
  component: Grid,
  parameters: { layout: 'fullscreen' },
  title: 'components/Grid',
} satisfies Meta<typeof Grid>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="Grid">
      <Story.Section title="Columns and gaps">
        <Grid columns={3} gap={4}>
          {['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'].map(
            (label) => (
              <Item className="min-h-20" key={label}>
                {label}
              </Item>
            ),
          )}
        </Grid>
      </Story.Section>

      <Story.Section title="Rows and column flow">
        <Grid flow="column" gapX={4} gapY={2} rows={2}>
          {['A', 'B', 'C', 'D', 'E', 'F'].map((label) => (
            <Item className="min-h-20" key={label}>
              {label}
            </Item>
          ))}
        </Grid>
      </Story.Section>

      <Story.Section title="Placement">
        <Grid
          className="border-border rounded-md border border-dashed p-4"
          columns={3}
          gap={4}
          placeItems="center"
        >
          <Item className="min-h-40">Tall item</Item>
          <Item>Centered</Item>
          <Item className="flex-1">Full height</Item>
        </Grid>
      </Story.Section>
    </Story.Layout>
  ),
};
