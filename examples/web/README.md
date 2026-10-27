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

Start from a Vite React app and add Pickle with its peers:

```bash
pnpm create vite my-app --template react-ts
cd my-app
pnpm add @pickle-ui/react@beta react-hook-form
pnpm add -D tailwindcss @tailwindcss/vite
```

Then add what the copied files import:

```bash
pnpm add @fontsource-variable/geist @fontsource/jetbrains-mono   # fonts, optional
pnpm add @tabler/icons-react                                     # icons, any library works
pnpm add zod @hookform/resolvers                                 # form validation
```

Copy `src/app.css`, the top of `src/main.tsx` and the `plugins` line of
`vite.config.ts`. Leave out the `resolve.conditions` block in
`vite.config.ts` and `customConditions` in `tsconfig.json`: they only make
this monorepo read Pickle's sources instead of its build. Without the font
packages, also drop the font imports from `main.tsx` and the `@theme` block
from `app.css`.

The full theming guide is in
[`packages/react/README.md`](../../packages/react/README.md#theming).
