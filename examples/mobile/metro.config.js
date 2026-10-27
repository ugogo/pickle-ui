const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

// Monorepo only: read @pickle-ui/react-native from its TypeScript sources, so
// library edits reload without a build. Drop this in your own app.
config.resolver.unstable_conditionNames = [
  '@pickle-ui/source',
  ...config.resolver.unstable_conditionNames,
];

module.exports = withUniwindConfig(config, {
  cssEntryFile: './src/global.css',
  dtsFile: './src/uniwind-types.d.ts',
});
