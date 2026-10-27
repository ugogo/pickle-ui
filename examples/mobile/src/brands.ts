import { createTheme, type Theme } from '@pickle-ui/react-native/theme';

export type Brand = { label: string; theme: Theme };

/**
 * Runtime brands. `createTheme` derives each brand's tokens for both schemes
 * from one color, with a readable `--primary-foreground` and a lighter dark
 * variant, the same function the web example uses. Pickle's own green is not
 * listed: it lives in global.css.
 */
export const BRANDS: Brand[] = [
  { label: 'Blue', theme: createTheme({ primary: '#2563eb' }) },
  { label: 'Pink', theme: createTheme({ primary: '#db2777' }) },
  { label: 'Yellow', theme: createTheme({ primary: '#facc15' }) },
];
