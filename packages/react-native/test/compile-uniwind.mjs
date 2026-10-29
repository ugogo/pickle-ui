// Compiles a stylesheet the way Uniwind's Metro transformer does for a native
// platform, and prints the module it would bundle. Jest can't load Tailwind's
// compiler, so tests run this script in a child process.
//
// Usage: node test/compile-uniwind.mjs <css file> [platform]
import { createRequire } from 'node:module';
import { dirname, join, relative } from 'node:path';

const [cssFile, platform = 'ios'] = process.argv.slice(2);
const uniwindRequire = createRequire(
  createRequire(import.meta.url).resolve('uniwind/package.json'),
);

// Metro would compile the module with Babel next; keep Uniwind's output as is.
uniwindRequire.cache[uniwindRequire.resolve('metro-transform-worker')] = {
  exports: {
    transform: async (_config, _root, _file, data) => ({
      output: [{ data: { code: data.toString() } }],
    }),
  },
  loaded: true,
};

const { transform } = uniwindRequire('./dist/metro/transformer.cjs');
const cssEntryFile = relative(process.cwd(), cssFile);
// Uniwind also writes its type declarations: keep them next to the stylesheet.
const dtsFile = join(dirname(cssFile), 'uniwind-types.d.ts');
const result = await transform(
  { uniwind: { cssEntryFile, dtsFile, isExpoProject: false } },
  process.cwd(),
  cssEntryFile,
  Buffer.from(''),
  { customTransformOptions: {}, dev: false, platform, type: 'module' },
);

process.stdout.write(result.output[0].data.code);
