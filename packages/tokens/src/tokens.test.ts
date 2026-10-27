import { compile } from '@tailwindcss/node';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { createTheme } from './theme';

// Guards the contract between `createTheme` and the stylesheets: every
// variable it writes must be one the tokens declare and one a utility reads,
// or a theme silently changes nothing.

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const nativeCss = readFileSync(join(root, 'native.css'), 'utf8');

const fullTheme = createTheme({
  fonts: { heading: 'Heading', mono: 'Mono', sans: 'Sans' },
  primary: '#16a34a',
  radius: '1rem',
});
const writtenVariables = Object.keys(fullTheme.light);

/** Compiles `theme.css` with a utility for every key of the theme mapping. */
async function compiledUtilities() {
  const keys = [...nativeCss.matchAll(/^\s*--(color|radius|font)-([\w-]+):/gm)];
  const prefix = { color: 'bg', font: 'font', radius: 'rounded' } as const;
  const candidates = keys.map(
    ([, kind, name]) => `${prefix[kind as keyof typeof prefix]}-${name}`,
  );
  const compiler = await compile(
    "@import 'tailwindcss/theme';\n@import 'tailwindcss/utilities';\n@import './theme.css';",
    { base: root, onDependency: () => {} },
  );
  return compiler.build(candidates);
}

/** Variables declared directly inside the first `@variant <name> { … }` block. */
function themeVariables(name: string) {
  const start = nativeCss.indexOf(`@variant ${name} {`);
  let depth = 0;
  let end = start;
  for (let i = nativeCss.indexOf('{', start); i < nativeCss.length; i++) {
    if (nativeCss[i] === '{') depth++;
    if (nativeCss[i] === '}' && --depth === 0) {
      end = i;
      break;
    }
  }
  const block = nativeCss.slice(start, end);
  return new Set([...block.matchAll(/^\s*(--[\w-]+):/gm)].map(([, v]) => v));
}

describe('tokens', () => {
  it('declares the same variables in the light and dark themes', () => {
    const light = themeVariables('light');

    expect(light.size).toBeGreaterThan(0);
    expect([...themeVariables('dark')].sort()).toEqual([...light].sort());
  });

  it('declares every color createTheme writes in both themes', () => {
    const colors = writtenVariables.filter((name) =>
      fullTheme.light[name as `--${string}`].startsWith('oklch('),
    );

    expect(colors.length).toBeGreaterThan(0);
    for (const theme of ['light', 'dark']) {
      expect(colors.filter((name) => !themeVariables(theme).has(name))).toEqual(
        [],
      );
    }
  });

  it('reads every variable createTheme writes from a utility', async () => {
    const css = await compiledUtilities();
    const utilityRules = [...css.matchAll(/\n\s*\.[\w-]+ \{[^}]*\}/g)].join('');

    expect(
      writtenVariables.filter(
        (name) => !new RegExp(`var\\(${name}[,)]`).test(utilityRules),
      ),
    ).toEqual([]);
  });
});
