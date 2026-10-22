import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ColorPicker } from './ColorPicker';

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
});
