# Examples

Two mini apps that show how to install, use and customize Pickle UI. They are
the reference for users and agents: copy their setup, then their patterns.

| Folder               | Stack                           | Uses                                             |
| -------------------- | ------------------------------- | ------------------------------------------------ |
| [`web`](./web)       | Vite, React, Tailwind CSS v4    | `@pickle-ui/react` components and theming        |
| [`mobile`](./mobile) | Expo (iOS and Android), Uniwind | `@pickle-ui/react-native` components and theming |

Both build the same "Pickle projects" screen: a project list with status
badges, a form that adds a project, and controls for the color scheme and the
brand color.

## Run them

From the repository root, after `pnpm install`:

```bash
pnpm example:web      # http://localhost:5173
pnpm example:mobile   # Expo: press i for iOS, a for Android
```

Or run `pnpm dev` in `web`, or `pnpm start` in `mobile`. No build step is
needed: the examples read `@pickle-ui/react` and `@pickle-ui/react-native`
from their TypeScript sources through the `@pickle-ui/source` export
condition, so library edits hot-reload.

The mobile example opens in [Expo Go](https://expo.dev/go), which needs the
iOS Simulator (Xcode) or an Android emulator, or a phone that scans the QR
code. Expo installs the matching Expo Go on a simulator for you.

The examples depend on the packages in this repository (`workspace:*`), so
they always run the current code. Each README has a "Setup in your own app"
section with the commands for a standalone app.

## Customizations

Each technique is marked with a `Customization N` comment in the code. The
numbers follow the [theming guide](../packages/react/README.md#theming).

| N   | Technique                   | Web                                                    | Mobile                                                    |
| --- | --------------------------- | ------------------------------------------------------ | --------------------------------------------------------- |
| 1   | Override tokens in CSS      | `web/src/app.css`                                      | `mobile/src/global.css`                                   |
| 1b  | Change the brand at runtime | `web/src/components/ThemeControls.tsx` (`createTheme`) | `mobile/src/brands.ts` (`createTheme`, `ScopedVariables`) |
| 2   | Pass `className`            | `web/src/components/NewProjectForm.tsx`                | `mobile/src/components/NewProjectForm.tsx`                |
| 3   | Reuse a variant function    | `web/src/App.tsx` (`buttonVariants` on a link)         | none: `@pickle-ui/react-native` exports no variants yet   |
| 4   | Target `data-slot` in CSS   | `web/src/app.css`                                      | none: React Native has no CSS selectors                   |

Two more patterns have no number:

- **Color scheme.** Web: a `dark` class on `<html>`, set before the first paint
  by `web/index.html` and kept in sync by `ThemeControls.tsx`, with light, dark
  and system options. Mobile: `Uniwind.setTheme('light' | 'dark' | 'system')`.
- **A token as a color value**, for props that don't take a className
  (navigation header, `Switch`): `useColorToken` from
  `@pickle-ui/react-native`, used in `mobile/src/app/_layout.tsx`. The web
  never needs it.

## What carries over to native

`@pickle-ui/tokens` carries the colors, the radius scale and the `Text` type
scale (`--text-h1` … `--text-code`), so `bg-primary`, `text-muted-foreground`,
`border-border`, `rounded-xl` and `text-h1` mean the same on both platforms.
`@pickle-ui/react-native` has `Badge`, `Button`, `Card` and `Text`, with the
web's variants, sizes, tones, parts and dimensions, and `createTheme`
derives the same runtime brand on both. The rest is
web-only for now:

- the fonts, which live in `@pickle-ui/react`'s CSS;
- every other component.
