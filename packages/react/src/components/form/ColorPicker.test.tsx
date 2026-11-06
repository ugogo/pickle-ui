import type { ComponentProps } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { ColorPicker } from './ColorPicker';

// The hidden form input sizes itself to the root, which jsdom can't measure.
beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      disconnect() {}
      observe() {}
    },
  );
});

// jsdom can't measure the track, so Base UI keeps the thumb hidden and out of
// the accessibility tree: find its range input by label instead.
function getHueSlider() {
  return screen.getByLabelText('Hue');
}

function renderInline(props: ComponentProps<typeof ColorPicker> = {}) {
  return render(
    <form>
      <ColorPicker inline name="color" {...props}>
        <ColorPicker.Content>
          <ColorPicker.HueSlider aria-label="Hue" />
          <ColorPicker.Input withoutAlpha />
        </ColorPicker.Content>
      </ColorPicker>
    </form>,
  );
}

describe('ColorPicker', () => {
  it('renders the trigger as a styled button that opens the content', async () => {
    render(
      <ColorPicker defaultValue="#ff0000">
        <ColorPicker.Trigger variant="outline">
          <ColorPicker.Swatch />
          Pick a color
        </ColorPicker.Trigger>
        <ColorPicker.Content>
          <ColorPicker.Area />
        </ColorPicker.Content>
      </ColorPicker>,
    );

    const trigger = screen.getByRole('button', { name: /Pick a color/ });
    expect(trigger).toHaveAttribute('data-slot', 'color-picker-trigger');
    expect(
      screen.getByRole('img', { name: /Current color/ }),
    ).toBeInTheDocument();

    fireEvent.click(trigger);

    expect(
      await screen.findByText((_, element) =>
        Boolean(element?.matches('[data-slot="color-picker-area"]')),
      ),
    ).toBeInTheDocument();
  });

  it('renders inline parts on the element passed to render', () => {
    render(
      <ColorPicker defaultValue="#00ff00" inline>
        <ColorPicker.Swatch render={<span />} />
      </ColorPicker>,
    );

    const swatch = screen.getByRole('img', { name: /Current color/ });
    expect(swatch.tagName).toBe('SPAN');
  });

  it('renders data-slot on the root', () => {
    const { container } = renderInline();

    expect(
      container.querySelector('[data-slot="color-picker"]'),
    ).toBeInTheDocument();
  });

  it('submits its initial value with the form', () => {
    const { container } = renderInline({ defaultValue: '#ff0000' });
    const form = container.querySelector('form') as HTMLFormElement;

    expect(new FormData(form).get('color')).toBe('#ff0000');
  });

  it('keeps a partial hex while typing and normalizes it on blur', () => {
    renderInline({ defaultValue: '#000000' });
    const input = screen.getByRole('textbox', { name: 'Hex color value' });

    fireEvent.change(input, { target: { value: '#00000' } });
    expect(input).toHaveValue('#00000');

    fireEvent.change(input, { target: { value: '#abc' } });
    expect(input).toHaveValue('#abc');

    fireEvent.blur(input);
    expect(input).toHaveValue('#aabbcc');
  });

  it('keeps an HSB saturation typed at zero brightness', () => {
    renderInline({ defaultFormat: 'hsb', defaultValue: '#000000' });
    const saturation = screen.getByRole('textbox', {
      name: 'Saturation percentage (0-100)',
    });

    fireEvent.change(saturation, { target: { value: '80' } });

    expect(saturation).toHaveValue('80');
  });

  it('makes its inputs read-only and ignores slider changes when readOnly', () => {
    const onValueChange = vi.fn();
    renderInline({ defaultValue: '#ff0000', onValueChange, readOnly: true });

    expect(
      screen.getByRole('textbox', { name: 'Hex color value' }),
    ).toHaveAttribute('readonly');

    fireEvent.keyDown(getHueSlider(), {
      key: 'ArrowRight',
    });
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('disables a single part through its own prop', () => {
    render(
      <ColorPicker inline>
        <ColorPicker.Content>
          <ColorPicker.HueSlider aria-label="Hue" disabled />
          <ColorPicker.Input disabled withoutAlpha />
        </ColorPicker.Content>
      </ColorPicker>,
    );

    expect(getHueSlider()).toBeDisabled();
    expect(
      screen.getByRole('textbox', { name: 'Hex color value' }),
    ).toBeDisabled();
  });
});
