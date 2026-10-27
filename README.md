# Pickle UI

A design system for React apps, built with Base UI and Tailwind CSS v4, with
React Native components for Expo.

Browse every component in the Storybooks: [web](https://ugogo.github.io/pickle-ui/)
and [React Native](https://ugogo.github.io/pickle-ui/react-native/).

## Packages

| Package                                              | Description                                        |
| ---------------------------------------------------- | -------------------------------------------------- |
| [`@pickle-ui/react`](./packages/react)               | React components for the web, built on Base UI.    |
| [`@pickle-ui/react-native`](./packages/react-native) | React Native components for Expo, through Uniwind. |
| [`@pickle-ui/tokens`](./packages/tokens)             | Design tokens as Tailwind CSS v4 theme variables.  |

See each package's README for installation and usage.

## Examples

[`examples`](./examples) holds two mini apps that show how to use and customize
Pickle UI: [`web`](./examples/web) (Vite + `@pickle-ui/react`) and
[`mobile`](./examples/mobile) (Expo + Uniwind + `@pickle-ui/react-native`).

```bash
pnpm example:web      # http://localhost:5173
pnpm example:mobile   # Expo: press i for iOS, a for Android
```

## Development

```bash
pnpm install
pnpm run dev        # Storybook for @pickle-ui/react on http://localhost:6006
pnpm run dev:native # Storybook for @pickle-ui/react-native on http://localhost:6007
pnpm run build      # every package
pnpm run typecheck
pnpm run test
pnpm run lint
```

## License

MIT
