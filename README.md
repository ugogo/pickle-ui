# Pickle UI

A design system for React apps, built with Base UI and Tailwind CSS v4.

Browse every component in the [Storybook](https://ugogo.github.io/pickle-ui/).

## Packages

| Package                                  | Description                                       |
| ---------------------------------------- | ------------------------------------------------- |
| [`@pickle-ui/react`](./packages/react)   | React components for the web, built on Base UI.   |
| [`@pickle-ui/tokens`](./packages/tokens) | Design tokens as Tailwind CSS v4 theme variables. |

See each package's README for installation and usage.

## Examples

[`examples`](./examples) holds two mini apps that show how to use and customize
Pickle UI: [`web`](./examples/web) (Vite + `@pickle-ui/react`) and
[`mobile`](./examples/mobile) (Expo + Uniwind + `@pickle-ui/tokens`).

```bash
pnpm example:web      # http://localhost:5173
pnpm example:mobile   # Expo: press i for iOS, a for Android
```

## Development

```bash
pnpm install
pnpm run dev        # Storybook for @pickle-ui/react on http://localhost:6006
pnpm run build      # every package
pnpm run typecheck
pnpm run test
pnpm run lint
```

## License

MIT
