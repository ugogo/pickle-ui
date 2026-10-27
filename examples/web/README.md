# Web example

A Vite app built with `@pickle-ui/react`: a project table, a validated form,
a delete confirmation, toasts, a light / dark / system switch and a live brand
color.

```bash
pnpm example:web   # from the repository root, then open http://localhost:5173
```

## Files

| File                                | Shows                                                                 |
| ----------------------------------- | --------------------------------------------------------------------- |
| `index.html`                        | Setting the `dark` class before the first paint                       |
| `vite.config.ts`                    | The Tailwind Vite plugin                                              |
| `src/main.tsx`                      | Loading the fonts and the stylesheet                                  |
| `src/app.css`                       | Setup, token overrides, `data-slot` rules                             |
| `src/App.tsx`                       | Subpath imports, `Toast.Provider`, `buttonVariants` on a link         |
| `src/components/ThemeControls.tsx`  | Color scheme `Menu`, `ColorPicker`, `createTheme` and `themeToCss`    |
| `src/components/ProjectTable.tsx`   | `Card`, `Table`, `Badge` variants, `AlertDialog`, `Toast.useToast`    |
| `src/components/NewProjectForm.tsx` | `Form` with React Hook Form and Zod, `Form.Select`, `className` merge |

## Setup in your own app

1. Create a Vite React app and add Pickle with its peers:

   ```bash
   pnpm create vite my-app --template react-ts --no-immediate
   cd my-app
   pnpm add @pickle-ui/react@beta react-hook-form
   pnpm add -D tailwindcss @tailwindcss/vite
   ```

2. Add what the example's files import. The fonts are optional; any icon
   library works.

   ```bash
   pnpm add @fontsource-variable/geist @fontsource/jetbrains-mono
   pnpm add @tabler/icons-react zod @hookform/resolvers
   ```

3. Remove the template's styles: delete `src/index.css` and `src/App.css`.
   They set unlayered `:root` variables (`--accent`, `--border`) and heading
   sizes that override Pickle's tokens and `Text` sizes without any error.

4. Copy from this folder:
   - `src/app.css`.
   - `src/main.tsx`, replacing the template's file. The example exports a
     named `App`, not a default one.
   - In `vite.config.ts`, the `@tailwindcss/vite` import and `tailwindcss()`
     in `plugins`. Leave out the `resolve` block and `customConditions` in
     `tsconfig.json`: they only make this monorepo read Pickle's sources.
   - The `<script>` in `index.html`, if you offer dark mode. It sets the
     `dark` class before the first paint. Pickle only reacts to that class;
     see [dark mode](../../packages/react/README.md#use-pickle-ui) for the
     rules.
   - `src/App.tsx`, `src/projects.ts` and `src/components` for the full
     screen.

5. Check it: `pnpm run build`. In a Vite template, `tsc --noEmit` checks
   nothing because the root `tsconfig.json` only holds references; the build
   runs `tsc -b`.

Without the font packages, drop the font imports from `main.tsx` and the
`@theme` block from `app.css`. The full theming guide is in
[`packages/react/README.md`](../../packages/react/README.md#theming).
