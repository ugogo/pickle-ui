import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { Grid } from './Grid';

const meta = {
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Grid',
} satisfies Meta<typeof Grid>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

function Item({ children }: { children: string }) {
  return <Story.Box className="min-h-20">{children}</Story.Box>;
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="Grid">
      <Story.Section title="Columns and gaps">
        <Grid columns={3} gap={4}>
          {['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map((label) => (
            <Item key={label}>{label}</Item>
          ))}
        </Grid>
      </Story.Section>

      <Story.Section title="Rows and column flow">
        <Grid columns={3} flow="column" gapX={4} gapY={2} rows={2}>
          {['A', 'B', 'C', 'D', 'E', 'F'].map((label) => (
            <Item key={label}>{label}</Item>
          ))}
        </Grid>
      </Story.Section>

      <Story.Section title="Placement">
        <Grid
          className="border-border min-h-72 rounded-md border border-dashed p-4"
          columns={2}
          gap={4}
          placeContent="center"
          placeItems="stretch"
        >
          <Item>Centered track</Item>
          <Item>Stretched item</Item>
        </Grid>
      </Story.Section>

      <Story.Section title="Responsive override">
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" gap={3}>
          {['One', 'Two', 'Three', 'Four'].map((label) => (
            <Item key={label}>{label}</Item>
          ))}
        </Grid>
      </Story.Section>
    </Story.Layout>
  ),
};
