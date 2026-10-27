import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Text, type TextProps } from './Text';

const meta = {
  component: Text,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Text',
} satisfies Meta<typeof Text>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

type TextTone = NonNullable<TextProps['tone']>;
type TextVariant = NonNullable<TextProps['variant']>;

const VARIANT_ROWS: { key: TextVariant; label: string }[] = [
  { key: 'h1', label: 'H1' },
  { key: 'h2', label: 'H2' },
  { key: 'h3', label: 'H3' },
  { key: 'h4', label: 'H4' },
  { key: 'lead', label: 'Lead' },
  { key: 'body', label: 'Body' },
  { key: 'small', label: 'Small' },
];

const TONE_COLUMNS: { key: 'default' | TextTone; label: string }[] = [
  { key: 'default', label: 'Default' },
  { key: 'primary', label: 'Primary' },
  { key: 'muted', label: 'Muted' },
  { key: 'destructive', label: 'Destructive' },
];

function ToneCell({ column, row }: ComponentMatrixCellProps) {
  return (
    <Text
      tone={column.key === 'default' ? undefined : (column.key as TextTone)}
      variant={row.key as TextVariant}
    >
      Sample text
    </Text>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="Text">
      <Story.Section title="Variants and tones">
        <Story.Matrix
          Cell={ToneCell}
          columns={TONE_COLUMNS}
          rows={VARIANT_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};
