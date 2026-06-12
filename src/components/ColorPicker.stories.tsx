import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { Button } from './Button';
import { ColorPicker } from './ColorPicker';
import { ComponentMatrix, Section, StoryLayout } from './story-utils';

const meta = {
  component: ColorPicker,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/ColorPicker',
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const FORMAT_COLUMNS = [
  { key: 'hex', label: 'HEX' },
  { key: 'rgb', label: 'RGB' },
  { key: 'hsl', label: 'HSL' },
  { key: 'hsb', label: 'HSB' },
];

const MODE_ROWS = [
  { key: 'popover', label: 'Popover' },
  { key: 'inline', label: 'Inline' },
  { key: 'disabled', label: 'Disabled' },
];

type ColorFormat = 'hex' | 'hsb' | 'hsl' | 'rgb';

function formatColor(hex: string, format: ColorFormat) {
  const [r, g, b] =
    hex
      .replace('#', '')
      .match(/.{2}/g)
      ?.map((channel) => Number.parseInt(channel, 16)) ?? [];

  if (r === undefined || g === undefined || b === undefined) {
    return hex;
  }

  if (format === 'rgb') {
    return `rgb(${r}, ${g}, ${b})`;
  }

  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const diff = max - min;
  const lightness = (max + min) / 2;
  const saturation =
    diff === 0
      ? 0
      : diff / (format === 'hsl' ? 1 - Math.abs(2 * lightness - 1) : max);
  const hue =
    diff === 0
      ? 0
      : max === r / 255
        ? ((g / 255 - b / 255) / diff) % 6
        : max === g / 255
          ? (b / 255 - r / 255) / diff + 2
          : (r / 255 - g / 255) / diff + 4;
  const degrees = Math.round((hue < 0 ? hue + 6 : hue) * 60);

  if (format === 'hsl') {
    return `hsl(${degrees}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%)`;
  }

  if (format === 'hsb') {
    return `hsb(${degrees}, ${Math.round(saturation * 100)}%, ${Math.round(max * 100)}%)`;
  }

  return hex;
}

function PickerControls() {
  return (
    <>
      <ColorPicker.Area />
      <div className="flex items-center gap-2">
        <ColorPicker.EyeDropper />
        <div className="flex flex-1 flex-col gap-3">
          <ColorPicker.HueSlider />
          <ColorPicker.AlphaSlider />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ColorPicker.FormatSelect />
        <ColorPicker.Input />
      </div>
    </>
  );
}

function PickerPreview({ format, mode }: { format: string; mode: string }) {
  const initialColor = mode === 'disabled' ? '#94a3b8' : '#3b82f6';
  const colorFormat = format as ColorFormat;
  const [color, setColor] = useState(() =>
    formatColor(initialColor, colorFormat),
  );

  if (mode === 'inline') {
    return (
      <div className="flex flex-col gap-3">
        <ColorPicker
          defaultFormat={colorFormat}
          defaultValue={initialColor}
          inline
          onValueChange={setColor}
        >
          <ColorPicker.Content className="border-border rounded-md border">
            <PickerControls />
          </ColorPicker.Content>
        </ColorPicker>
      </div>
    );
  }

  return (
    <ColorPicker
      defaultFormat={colorFormat}
      defaultValue={initialColor}
      disabled={mode === 'disabled'}
      onValueChange={setColor}
    >
      <ColorPicker.Trigger asChild>
        <Button className="w-52 justify-start gap-2" variant="outline">
          <ColorPicker.Swatch className="size-5" />
          <span className="font-mono">{color}</span>
        </Button>
      </ColorPicker.Trigger>
      <ColorPicker.Content>
        <PickerControls />
      </ColorPicker.Content>
    </ColorPicker>
  );
}

export const All: Story = {
  render: () => (
    <StoryLayout className="max-w-7xl" title="ColorPicker">
      <Section title="Presentation and formats">
        <ComponentMatrix
          cellClassName="min-h-32"
          cellWidth="minmax(14rem, 1fr)"
          columns={FORMAT_COLUMNS}
          renderCell={(row, column) => (
            <PickerPreview format={column.key} mode={row.key} />
          )}
          rows={MODE_ROWS}
        />
      </Section>
    </StoryLayout>
  ),
};
