export type Brand = {
  dark: BrandVariables;
  label: string;
  light: BrandVariables;
  swatch: { dark: string; light: string };
};

type BrandVariables = { '--primary': string; '--primary-foreground': string };

const WHITE = 'oklch(1 0 0)';
const INK = 'oklch(0.21 0.006 285.9)';

/**
 * Runtime brands. Each one sets `--primary-foreground` with `--primary`, so
 * text on the brand color stays readable. On the web, `createTheme` from
 * `@pickle-ui/react/theme` derives it for you; native has no equivalent yet.
 * Pickle's own green is not listed: it lives in global.css.
 */
export const BRANDS: Brand[] = [
  {
    dark: { '--primary': '#60a5fa', '--primary-foreground': INK },
    label: 'Blue',
    light: { '--primary': '#2563eb', '--primary-foreground': WHITE },
    swatch: { dark: '#60a5fa', light: '#2563eb' },
  },
  {
    dark: { '--primary': '#f472b6', '--primary-foreground': INK },
    label: 'Pink',
    light: { '--primary': '#db2777', '--primary-foreground': WHITE },
    swatch: { dark: '#f472b6', light: '#db2777' },
  },
  {
    dark: { '--primary': '#facc15', '--primary-foreground': INK },
    label: 'Yellow',
    light: { '--primary': '#facc15', '--primary-foreground': INK },
    swatch: { dark: '#facc15', light: '#facc15' },
  },
];
