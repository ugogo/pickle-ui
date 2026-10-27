# Mobile example

An Expo app (iOS and Android) styled with Pickle's tokens through
[Uniwind](https://uniwind.dev): the same project list and form as the web
example, a light / dark / system switch and runtime brand colors.

```bash
pnpm example:mobile   # from the repository root, then press i or a
```

You need the iOS Simulator (Xcode) or an Android emulator, or a phone with
[Expo Go](https://expo.dev/go) to scan the QR code. If another Metro server
holds port 8081, Expo offers the next port.

There is no `@pickle-ui/react-native` package yet, so `src/components` holds
small local components (`Button`, `Badge`, `Card`, `Text`) built on React
Native primitives. They reuse the web API's names (`variant`, `size`, `tone`,
`Card.Header`, …) with native sizes, and style only with token utilities
(`bg-primary`, `text-muted-foreground`, `border-border`, `rounded-xl`). See
[What carries over to native](../README.md#what-carries-over-to-native).

## Files

| File                                | Shows                                                          |
| ----------------------------------- | -------------------------------------------------------------- |
| `metro.config.js`                   | `withUniwindConfig` pointing at the CSS entry                  |
| `src/global.css`                    | Setup and token overrides as Uniwind themes                    |
| `src/app/_layout.tsx`               | Loading the CSS, token colors for the navigation header        |
| `src/app/index.tsx`                 | `ScopedVariables` applying a brand to part of the screen       |
| `src/brands.ts`                     | Brand colors, each with a readable foreground                  |
| `src/components/ThemeControls.tsx`  | `Uniwind.setTheme`, brand swatches                             |
| `src/components/NewProjectForm.tsx` | Tokens on `TextInput` and a native `Switch`, `className` merge |
| `src/lib/useColorToken.ts`          | Reading a token as a color string                              |

## Setup in your own app

1. Create an Expo Router app and clear its demo screens. They don't
   typecheck on their own, and copied screens would sit next to them.

   ```bash
   npx create-expo-app@latest my-app
   cd my-app
   npm run reset-project   # answer n: don't keep the demo in /example
   ```

2. Add Uniwind and the tokens:

   ```bash
   npx expo install uniwind tailwindcss @pickle-ui/tokens@beta
   npx expo install class-variance-authority tailwind-merge   # only for the copied components
   ```

3. Copy `metro.config.js`. It points Uniwind at `src/global.css` and writes
   `src/uniwind-types.d.ts`.

4. Replace the contents of `src/global.css` (the template already has one)
   with these imports, in this order:

   ```css
   @import 'tailwindcss';
   @import 'uniwind';
   @import '@pickle-ui/tokens/native.css';
   ```

5. Import it once from the root layout: `import '../global.css';` at the top
   of `src/app/_layout.tsx`.

6. In `tsconfig.json`, add `"types": ["expo/types"]` to `compilerOptions`.
   It declares CSS imports for TypeScript. Without it, `tsc` only passes
   after `expo start` has written the gitignored `expo-env.d.ts`, so CI
   fails on the `global.css` import.

7. Run `npx expo start` once. Metro writes `src/uniwind-types.d.ts`, which
   adds `className` to React Native's types. Commit it as Metro writes it,
   and add it to `.prettierignore`: Uniwind rewrites the file whenever its
   content differs, so a formatter would dirty it on every start.

8. Copy `src/brands.ts`, `src/projects.ts`, `src/lib`, `src/components` and
   `src/app` for the full screen.

## Things that differ from the web

- **Token overrides** go inside `@variant light` and `@variant dark` blocks,
  not `:root` and `.dark`: Uniwind ignores the `.dark` selector, and each
  theme must declare the same variables. See `src/global.css`.
- **Runtime brands** have no `createTheme` on native yet, so `src/brands.ts`
  sets `--primary-foreground` by hand next to `--primary`.
  `ScopedVariables` applies them to a subtree; wrap the root layout to
  rebrand the whole app, or call `Uniwind.updateCSSVariables(theme, vars)` to
  change a theme globally.
- **Props that take a color**, not a className, read the token with
  `useColorToken('primary')`, which returns `undefined` instead of the string
  `"undefined"` when a token doesn't exist.
