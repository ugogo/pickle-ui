import type { Meta, StoryObj } from '@storybook/react-vite';

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
  { key: 'code', label: 'Code' },
];

const TONE_COLUMNS: { key: TextTone; label: string }[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'muted', label: 'Muted' },
  { key: 'destructive', label: 'Destructive' },
];

const WEIGHT_ROWS: { key: NonNullable<TextProps['weight']>; label: string }[] =
  [
    { key: 'normal', label: 'Normal' },
    { key: 'bold', label: 'Bold' },
  ];

function ToneCell({ column, row }: ComponentMatrixCellProps) {
  return (
    <Text tone={column.key as TextTone} variant={row.key as TextVariant}>
      Sample text
    </Text>
  );
}

function WeightCell({ column, row }: ComponentMatrixCellProps) {
  return (
    <Text variant="body" weight={row.key as NonNullable<TextProps['weight']>}>
      {column.label} weight
    </Text>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="Text">
      <Story.Section title="Variant scale">
        <div className="flex flex-col gap-4">
          {VARIANT_ROWS.map(({ key, label }) => (
            <div className="flex items-baseline gap-4" key={key}>
              <span className="text-muted-foreground w-12 shrink-0 text-xs">
                {label}
              </span>
              <Text variant={key}>
                {key === 'code'
                  ? 'npm install pickle-ui'
                  : 'The quick brown fox jumps over the lazy dog.'}
              </Text>
            </div>
          ))}
        </div>
      </Story.Section>

      <Story.Section title="Tone (color axis)">
        <Story.Matrix
          Cell={ToneCell}
          cellWidth="14rem"
          columns={TONE_COLUMNS}
          rows={VARIANT_ROWS.slice(0, 4)}
        />
      </Story.Section>

      <Story.Section title="Weight">
        <Story.Matrix
          Cell={WeightCell}
          cellWidth="14rem"
          columns={[{ key: 'body', label: 'Body' }]}
          rows={WEIGHT_ROWS}
        />
      </Story.Section>

      <Story.Section title="Truncation">
        <div className="max-w-xs">
          <Text className="border border-dashed" truncate variant="body">
            This is a very long line of text that will be truncated because
            there is not enough horizontal space to display it all.
          </Text>
        </div>
      </Story.Section>

      <Story.Section title="Polymorphism (as prop)">
        <div className="flex flex-col gap-3">
          <Text as="h1" variant="h2">
            h2 styles on an &lt;h1&gt; element
          </Text>
          <Text as="div" variant="body">
            Body copy rendered as a &lt;div&gt;
          </Text>
          <Text as="label" tone="muted" variant="small">
            Small muted text rendered as a &lt;label&gt;
          </Text>
        </div>
      </Story.Section>
    </Story.Layout>
  ),
};
