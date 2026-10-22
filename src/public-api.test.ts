import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';

import * as publicApi from './index';

// Guards the rules of "Public API" in AGENTS.md: one value per component,
// parts reached through the compound, and entries that mirror the index.

const NON_COMPONENT_EXPORTS = [
  'badgeVariants',
  'buttonVariants',
  'cn',
  'createTheme',
  'textVariants',
  'themeToCss',
];

const entriesDir = join(dirname(fileURLToPath(import.meta.url)), 'entries');
const entryNames = readdirSync(entriesDir)
  .filter((file) => file.endsWith('.ts') && !file.endsWith('.test.ts'))
  .map((file) => file.replace(/\.ts$/, ''));

const exportNames = Object.keys(publicApi).sort();

describe('public API', () => {
  it('only exports components and the allowed helpers', () => {
    const unexpected = exportNames.filter(
      (name) =>
        !NON_COMPONENT_EXPORTS.includes(name) && !/^[A-Z][A-Za-z]*$/.test(name),
    );

    expect(unexpected).toEqual([]);
  });

  it('does not export primitives or roots under their own names', () => {
    expect(
      exportNames.filter((name) => /(Primitive|Root)$/.test(name)),
    ).toEqual([]);
  });

  it('does not export compound parts under parallel names', () => {
    const parallel = exportNames.flatMap((name) => {
      const value = publicApi[name as keyof typeof publicApi];

      if (typeof value !== 'function') {
        return [];
      }

      return Object.keys(value)
        .map((part) => `${name}${part}`)
        .filter((partName) => exportNames.includes(partName));
    });

    expect(parallel).toEqual([]);
  });

  it('exports from the entries exactly what the index exports', async () => {
    const entryExports = new Set<string>();

    for (const name of entryNames) {
      const module = (await import(
        pathToFileURL(join(entriesDir, `${name}.ts`)).href
      )) as Record<string, unknown>;

      for (const key of Object.keys(module)) {
        entryExports.add(key);
      }
    }

    expect([...entryExports].sort()).toEqual(exportNames);
  });
});
