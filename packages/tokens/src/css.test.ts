import { fileURLToPath } from 'node:url';
import { format, resolveConfig } from 'prettier';
import { expect, it } from 'vitest';

import { themeCss } from './css';

const REACT_THEME = fileURLToPath(
  new URL('../../react/src/theme.css', import.meta.url),
);

// `@pickle-ui/react` ships the generated file: this fails when it drifts from
// the tokens, and `pnpm --filter @pickle-ui/tokens generate` rewrites it.
it('matches the theme.css @pickle-ui/react ships', async () => {
  const config = await resolveConfig(REACT_THEME);
  const css = await format(themeCss(), { ...config, filepath: REACT_THEME });

  await expect(css).toMatchFileSnapshot(REACT_THEME);
});
