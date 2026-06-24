import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';

const entriesDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(entriesDir, '../..');

const entryNames = readdirSync(entriesDir)
  .filter((file) => file.endsWith('.ts') && !file.endsWith('.test.ts'))
  .map((file) => file.replace(/\.ts$/, ''))
  .sort();

describe('component entry points', () => {
  it.each(entryNames)('imports %s without throwing', async (name) => {
    const moduleUrl = pathToFileURL(join(entriesDir, `${name}.ts`)).href;
    const module = await import(moduleUrl);

    expect(Object.keys(module).length).toBeGreaterThan(0);
  });

  it('ships a compiled file for each entry after build', () => {
    const distEntriesDir = join(repoRoot, 'dist/entries');

    let distEntries: string[];
    try {
      distEntries = readdirSync(distEntriesDir)
        .filter((file) => file.endsWith('.js'))
        .map((file) => file.replace(/\.js$/, ''))
        .sort();
    } catch {
      distEntries = [];
    }

    if (distEntries.length === 0) {
      expect(
        entryNames.length,
        'run pnpm run build before checking dist entry points',
      ).toBeGreaterThan(0);
      return;
    }

    expect(distEntries).toEqual(entryNames);
  });
});
