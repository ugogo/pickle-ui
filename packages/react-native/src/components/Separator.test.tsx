import { render, screen } from '@testing-library/react-native';

import { Separator } from './Separator';

describe('Separator', () => {
  it('renders a horizontal separator by default', async () => {
    await render(<Separator testID="separator" />);

    const separator = screen.getByTestId('separator');
    expect(separator).toHaveProp('role', 'separator');
    expect(separator).toHaveProp(
      'className',
      expect.stringContaining('h-px w-full'),
    );
  });

  it('renders a vertical separator', async () => {
    await render(<Separator orientation="vertical" testID="separator" />);

    expect(screen.getByTestId('separator')).toHaveProp(
      'className',
      expect.stringContaining('w-px self-stretch'),
    );
  });
});
