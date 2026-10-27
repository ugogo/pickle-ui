# Examples

Two mini apps that show how to install, use and customize Pickle UI. They are
the reference for users and agents: copy their setup, then their patterns.

| Folder               | Stack                           | Uses                                                    |
| -------------------- | ------------------------------- | ------------------------------------------------------- |
| [`web`](./web)       | Vite, React, Tailwind CSS v4    | `@pickle-ui/react` components and theming               |
| [`mobile`](./mobile) | Expo (iOS and Android), Uniwind | `@pickle-ui/tokens` themes with React Native components |

Both build the same "Pickle projects" screen: a project list with status
badges, a form that adds a project, and controls for the color scheme and the
brand color.

## Run them

From the repository root, after `pnpm install`:

```bash
pnpm example:web      # builds @pickle-ui/react, then serves http://localhost:5173
pnpm example:mobile   # starts Expo: press i for iOS, a for Android
```

Each example is its own workspace package, so you can also run it from its
folder (`pnpm dev` in `web` once `pnpm build` has run, `pnpm ios` in `mobile`).

The examples depend on the packages in this repository (`workspace:*`), so
they always show the current code. In your own app, install the published
packages instead (`pnpm add @pickle-ui/react@beta`).

## Where each customization lives

Look for the `Customization N` comments in the code.

| Technique                             | Web                                     | Mobile                                              |
| ------------------------------------- | --------------------------------------- | --------------------------------------------------- |
| Override tokens in CSS                | `web/src/app.css`                       | `mobile/src/global.css`                             |
| Generate or swap the brand at runtime | `createTheme` in `ThemeControls.tsx`    | `Uniwind.updateCSSVariables` in `ThemeControls.tsx` |
| `className`, merged last              | `NewProjectForm.tsx`                    | `src/app/index.tsx`                                 |
| Reuse a variant function              | `buttonVariants` on a link in `App.tsx` | local `cva` variants in `src/components`            |
| Target `data-slot` in CSS             | `web/src/app.css`                       | not available on native                             |
| Dark mode                             | `dark` class on `<html>`                | `Uniwind.setTheme('light' \| 'dark' \| 'system')`   |
| Read a token in JS                    | not needed                              | `useCSSVariable` for the header and `Switch`        |
