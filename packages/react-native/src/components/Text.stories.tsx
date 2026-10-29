import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';
import { ScopedVariables } from 'uniwind';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';
import { Input } from './form/Input';
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
type TextWeight = NonNullable<TextProps['weight']>;

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

const TONE_COLUMNS: { key: 'default' | TextTone; label: string }[] = [
  { key: 'default', label: 'Default' },
  { key: 'primary', label: 'Primary' },
  { key: 'muted', label: 'Muted' },
  { key: 'destructive', label: 'Destructive' },
];

// An app sets `--font-sans` in its stylesheet; `ScopedVariables` sets it here
// so both fonts sit side by side. On the web, `--font-heading` resolves
// where it's declared, so the scope sets it too; native resolves it in place.
const FONT_COLUMNS = [
  { description: 'No --font-sans', key: '', label: 'System font' },
  {
    description: "--font-sans: 'Georgia'",
    key: 'Georgia',
    label: 'App font',
  },
];

const WEIGHT_ROWS: { key: TextWeight; label: string }[] = [
  { key: 'normal', label: 'Normal' },
  { key: 'bold', label: 'Bold' },
];

function FontCell({ column }: ComponentMatrixCellProps) {
  return (
    <ScopedVariables
      variables={
        column.key
          ? { '--font-heading': column.key, '--font-sans': column.key }
          : {}
      }
    >
      <Card className="w-80">
        <Card.Header>
          <Card.Title>Weekly report</Card.Title>
          <Card.Description>Every project, every Monday.</Card.Description>
        </Card.Header>
        <Card.Content className="items-start gap-3">
          <Badge variant="success">Shipped</Badge>
          <Input accessibilityLabel="Email" placeholder="ada@example.com" />
          <Button>Subscribe</Button>
        </Card.Content>
      </Card>
    </ScopedVariables>
  );
}

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

function WeightCell({ row }: ComponentMatrixCellProps) {
  return (
    <Text variant="body" weight={row.key as TextWeight}>
      {row.label} weight
    </Text>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="Text">
      <Story.Section title="Variant scale">
        <View className="gap-4">
          {VARIANT_ROWS.map(({ key, label }) => (
            <View className="flex-row items-baseline gap-4" key={key}>
              <Text className="w-12" tone="muted" variant="small">
                {label}
              </Text>
              <Text className="flex-1" variant={key}>
                {key === 'code'
                  ? 'npx expo install @pickle-ui/react-native'
                  : 'The quick brown fox jumps over the lazy dog.'}
              </Text>
            </View>
          ))}
        </View>
      </Story.Section>

      <Story.Section title="Tone (color axis)">
        <Story.Matrix
          Cell={ToneCell}
          columns={TONE_COLUMNS}
          rows={VARIANT_ROWS.slice(0, 4)}
        />
      </Story.Section>

      <Story.Section title="Weight">
        <Story.Matrix
          Cell={WeightCell}
          columns={[{ key: 'body', label: 'Body' }]}
          rows={WEIGHT_ROWS}
        />
      </Story.Section>

      <Story.Section title="App font">
        <Story.Matrix
          Cell={FontCell}
          columns={FONT_COLUMNS}
          rows={[{ key: 'card', label: 'Components' }]}
        />
      </Story.Section>

      <Story.Section title="Truncate">
        <View className="border-border w-64 rounded-md border p-3">
          <Text truncate>
            A project name long enough to run past the edge of its container
          </Text>
        </View>
      </Story.Section>
    </Story.Layout>
  ),
};
