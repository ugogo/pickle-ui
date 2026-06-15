import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ColorPicker } from './ColorPickerPrimitive';

describe('ColorPicker hook stability', () => {
  it('does not change hook count when the dir prop is added or removed', () => {
    const { rerender } = render(<ColorPicker dir="ltr" />);
    // Re-rendering the same instance without `dir` must not throw
    // "Rendered more/fewer hooks than during the previous render".
    expect(() => rerender(<ColorPicker />)).not.toThrow();
    expect(() => rerender(<ColorPicker dir="rtl" />)).not.toThrow();
  });
});
