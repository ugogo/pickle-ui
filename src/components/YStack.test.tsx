import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { YStack } from './YStack';

describe('YStack', () => {
  it('renders a column stack with shared Flex props', () => {
    render(
      <YStack align="stretch" gap={3} justify="center">
        Content
      </YStack>,
    );

    expect(screen.getByText('Content')).toHaveClass(
      'flex',
      'flex-col',
      'items-stretch',
      'justify-center',
      'gap-3',
    );
    expect(screen.getByText('Content')).toHaveAttribute('data-slot', 'y-stack');
  });

  it('merges consumer classes after the fixed direction', () => {
    render(<YStack className="custom-class flex-row">Content</YStack>);

    const element = screen.getByText('Content');
    expect(element).toHaveClass('flex-row', 'custom-class');
    expect(element).not.toHaveClass('flex-col');
  });
});
