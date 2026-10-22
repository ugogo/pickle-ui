import { describe, expect, it } from 'vitest';

import { createTheme, themeToCss } from './theme';

describe('createTheme', () => {
  it('derives primary tokens for both schemes', () => {
    const theme = createTheme({ primary: '#16a34a' });

    expect(theme.light['--primary']).toMatch(/^oklch\(/);
    expect(theme.dark['--primary']).toMatch(/^oklch\(/);
    expect(theme.light['--primary']).not.toBe(theme.dark['--primary']);
    expect(theme.light['--sidebar-primary']).toBe(theme.light['--primary']);
  });

  it('picks a readable foreground for light and dark fills', () => {
    const onDarkFill = createTheme({ primary: '#1e3a8a' });
    const onLightFill = createTheme({ primary: '#fde047' });

    expect(onDarkFill.light['--primary-foreground']).toBe('oklch(1 0 0)');
    expect(onLightFill.light['--primary-foreground']).not.toBe('oklch(1 0 0)');
  });

  it('uses primaryDark as given and passes radius and fonts through', () => {
    const theme = createTheme({
      fonts: { mono: 'Menlo', sans: 'Inter' },
      primary: 'rebeccapurple',
      primaryDark: 'oklch(0.8 0.1 300)',
      radius: '1rem',
    });

    expect(theme.dark['--primary']).toBe('oklch(0.8 0.1 300)');
    expect(theme.light['--radius']).toBe('1rem');
    expect(theme.dark['--radius']).toBe('1rem');
    expect(theme.light['--font-sans']).toBe('Inter');
    expect(theme.light['--font-mono']).toBe('Menlo');
    expect(theme.light['--font-heading']).toBeUndefined();
  });

  it('rejects colors it cannot parse', () => {
    expect(() => createTheme({ primary: 'not-a-color' })).toThrow(
      /not a valid CSS color/,
    );
  });
});

describe('themeToCss', () => {
  it('serializes both schemes under their selectors', () => {
    const css = themeToCss(createTheme({ primary: '#000', radius: '4px' }));

    expect(css).toMatch(/^:root \{\n {2}--radius: 4px;\n/);
    expect(css).toContain('\n.dark {\n');
    expect(css).toContain('--primary-foreground: oklch(1 0 0);');
  });

  it('accepts custom selectors', () => {
    const css = themeToCss(createTheme({ primary: '#000' }), {
      darkSelector: '[data-theme="dark"]',
      lightSelector: 'html',
    });

    expect(css.startsWith('html {')).toBe(true);
    expect(css).toContain('[data-theme="dark"] {');
  });
});
