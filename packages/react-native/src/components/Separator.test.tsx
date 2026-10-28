import { render, screen } from '@testing-library/react-native';

import { Separator } from './Separator';

// The separator is hidden from screen readers, so queries must opt in.
function getSeparator() {
  return screen.getByTestId('separator', { includeHiddenElements: true });
}

describe('Separator', () => {
  it('renders a horizontal rule by default', async () => {
    await render(<Separator testID="separator" />);

    expect(getSeparator()).toHaveProp(
      'className',
      expect.stringContaining('h-px w-full'),
    );
  });

  it('renders a vertical rule', async () => {
    await render(<Separator orientation="vertical" testID="separator" />);

    expect(getSeparator()).toHaveProp(
      'className',
      expect.stringContaining('w-px self-stretch'),
    );
  });

  it('is hidden from screen readers', async () => {
    await render(<Separator testID="separator" />);

    expect(screen.queryByTestId('separator')).toBeNull();
    expect(getSeparator()).not.toBeVisible();
  });
});
