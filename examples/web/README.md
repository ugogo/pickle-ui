# Web example

A Vite app built with `@pickle-ui/react`: a project table, a validated form,
a delete confirmation, toasts, a dark mode toggle and a live brand color.

```bash
pnpm example:web   # from the repository root
```

## Files

| File                                | Shows                                                                 |
| ----------------------------------- | --------------------------------------------------------------------- |
| `src/main.tsx`                      | Loading the fonts and the stylesheet                                  |
| `src/app.css`                       | Setup, token overrides, `data-slot` rules                             |
| `src/App.tsx`                       | Subpath imports, `Toast.Provider`, `buttonVariants` on a link         |
| `src/components/ThemeControls.tsx`  | `dark` class toggle, `ColorPicker`, `createTheme` and `themeToCss`    |
| `src/components/ProjectTable.tsx`   | `Card`, `Table`, `Badge` variants, `AlertDialog`, `Toast.useToast`    |
| `src/components/NewProjectForm.tsx` | `Form` with React Hook Form and Zod, `Form.Select`, `className` merge |

## Setup in your own app

```bash
pnpm add @pickle-ui/react@beta tailwindcss react-hook-form
pnpm add -D @tailwindcss/vite
```

Then copy `vite.config.ts`, `src/main.tsx` and the top of `src/app.css`. The
full theming guide is in [`packages/react/README.md`](../../packages/react/README.md#theming).
