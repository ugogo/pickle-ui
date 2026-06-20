import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ScrollArea } from './ScrollArea';

describe('ScrollArea', () => {
  it('composes its viewport and content automatically', async () => {
    const { container } = render(<ScrollArea>Scrollable content</ScrollArea>);

    await waitFor(() =>
      expect(
        container.querySelector('[data-slot="scroll-area-viewport"]'),
      ).toContainElement(screen.getByText('Scrollable content')),
    );
  });

  it('keeps low-level parts available for custom composition', async () => {
    render(
      <ScrollArea.Root>
        <ScrollArea.Viewport data-testid="custom-viewport">
          <ScrollArea.Content>Custom content</ScrollArea.Content>
        </ScrollArea.Viewport>
      </ScrollArea.Root>,
    );

    await waitFor(() =>
      expect(screen.getByTestId('custom-viewport')).toHaveTextContent(
        'Custom content',
      ),
    );
  });
});
