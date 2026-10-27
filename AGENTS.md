# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## Project

**pickle-ui** — a design system published as a pnpm monorepo. Each package lives in `packages/<name>`; the workspace root only holds shared tooling (ESLint, Prettier, Husky, lint-staged) and CI.

| Folder                  | npm package               | Contents                                                                                                                                                                                             |
| ----------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/react`        | `@pickle-ui/react`        | React components for the web, built with [Base UI](https://base-ui.com), [shadcn/ui](https://ui.shadcn.com), [Tailwind CSS](https://tailwindcss.com) (v4), and [reui](https://github.com/reui/reui). |
| `packages/react-native` | `@pickle-ui/react-native` | React Native components for Expo apps, styled with the tokens through [Uniwind](https://uniwind.dev).                                                                                                |
| `packages/tokens`       | `@pickle-ui/tokens`       | Design tokens (colors, radii) as Tailwind CSS v4 theme variables: `native.css` for Uniwind, `theme.css` for the web. `@pickle-ui/react` imports `theme.css`.                                         |

`examples/` holds private workspace apps that consume the packages like a user would: `examples/web` (Vite, `@pickle-ui/react`) and `examples/mobile` (Expo, Uniwind, `@pickle-ui/react-native`). They depend on `workspace:*`, never ship, and need no changeset. Start them with `pnpm example:web` and `pnpm example:mobile`. The examples read `@pickle-ui/react` and `@pickle-ui/react-native` through their `@pickle-ui/source` export condition (`resolve.conditions` in Vite, `resolver.unstable_conditionNames` in Metro, `customConditions` in each tsconfig), so they run and type-check against `src` with no build. When a change renames or removes something the examples use, update them in the same PR; when it adds a customization technique worth copying, show it there with a `Customization N` comment.

In `@pickle-ui/react`, exported components live in `src/components`, internal building blocks in `src/components/_internal`, shared helpers in `src/lib`, and each exported component ships a `*.stories.tsx` for Storybook. Paths in the sections below are relative to `packages/react`.

`@pickle-ui/react-native` follows the same layout (`src/components`, `src/entries`, `src/index.ts`, a `*.test.tsx` per component) and the Public API and Component API rules below where React Native allows: no Base UI, no `render` prop, no `data-*` attributes and no stories. Components are Expo-only, built on React Native primitives, and style with token utilities through Uniwind's `className`. Reuse the web component's name, part names and `variant` / `size` / `tone` values; sizes follow native touch targets. Tests run on Jest with `jest-expo` and React Native Testing Library. Apps import only `src/styles.css`, which imports `tailwindcss`, `uniwind`, `@pickle-ui/tokens/native.css` and `./base.css` (the components' `@source`), in that order. Keep Tailwind and Uniwind in that file: Uniwind compiles each imported stylesheet on its own to find themes, so a stylesheet that imports the tokens must import both before them, or the `@variant light` / `@variant dark` blocks and Uniwind's `--spacing` utilities fail to compile. `base.css` imports nothing, so it also works after an app's own token set. Platform split: no `.web.tsx` bridges to `@pickle-ui/react`; each package exports its own components.

`@pickle-ui/tokens` is the source of truth for color and radius values: edit `packages/tokens/native.css`. Its values are Uniwind themes (`@variant light` / `@variant dark`), and every theme must declare the same variables. `packages/tokens/theme.css` imports it and defines the `light` and `dark` variants for the web; never define those variants in `native.css`, since Uniwind owns them. `packages/react/src/theme.css` only imports `@pickle-ui/tokens/theme.css`, so `@pickle-ui/react/theme.css` keeps working for consumers.

## Tooling

- **Package manager:** pnpm workspaces (use `pnpm`, not `npm`/`yarn`). Run scripts from the repository root; they fan out to every package (`pnpm -r`). Target one package with `pnpm --filter @pickle-ui/react <script>`.
- **Dependencies:** shared lint and format tooling goes in the root `package.json`; anything a package builds, tests or ships with goes in that package's `package.json`.
- **Dev / Storybook:** `pnpm run dev` (Storybook for `@pickle-ui/react` on port 6006).
- **Typecheck:** `pnpm run typecheck`.
- **Build packages:** `pnpm run build`.

## Releases

Releases use [Changesets](https://changesets.dev) and the `Release` workflow (`.github/workflows/release.yml`), which runs on every push to `main`.

- **Every PR that changes a published package adds a changeset**: run `pnpm changeset`, pick the bump and write one changelog line, then commit the generated `.changeset/*.md`. Docs, CI or tooling-only PRs don't need one.
- **Each package has its own version.** A change to `@pickle-ui/tokens` also releases `@pickle-ui/react` and `@pickle-ui/react-native` with a patch bump, because they pin the exact tokens version they were published with (`updateInternalDependencies` in `.changeset/config.json`). A change to `@pickle-ui/react` or `@pickle-ui/react-native` alone leaves the other packages untouched. Add the changeset to the package you changed; Changesets bumps the dependents.
- **The repo is in `beta` pre-release mode** (`.changeset/pre.json`), so every release is `x.y.z-beta.n` on the `beta` dist-tag. Leave it with `pnpm changeset pre exit` only when the user asks for a stable release.
- **On `main`, the workflow opens or updates a "Version Packages" PR** while changesets are pending. When a user asks for a release, merge that PR (`gh pr merge <n>`) and monitor the run with `gh run watch --exit-status`. Merging it publishes the packages, pushes the tags (`@pickle-ui/react@<version>`) and creates the GitHub Releases.
- **Never publish or version locally**: no `changeset publish`, `changeset version`, `npm publish` or `pnpm publish`.
- **npm Trusted Publishing** must be configured once per published package (`@pickle-ui/tokens`, `@pickle-ui/react`, `@pickle-ui/react-native`) for the `ugogo/pickle-ui` repository and `.github/workflows/release.yml`. npm only accepts that configuration for a package that already exists, so a new package is published once by hand first. Do not add an npm token to repository secrets.
- **Permissions**: keep `id-token: write` on the `publish` job only. The `version` job needs `contents: write` and `pull-requests: write`, and the repository setting "Allow GitHub Actions to create and approve pull requests" must stay on.
- **Pre-releases don't move `latest`**: after each beta, the user moves it by hand with `npm dist-tag add`, until the first stable release.

## Component layout

- **Exported components** — one top-level file per component in `src/components` (e.g. `Button.tsx`, `Card.tsx`), each with a co-located `*.stories.tsx` for Storybook and a `*.test.tsx`.
- **Form components** — form controls (e.g. `Input.tsx`, `Select.tsx`, `Checkbox.tsx`) and the React Hook Form bindings (`Form.tsx`, `FormInput.tsx`, …) live in `src/components/form`, with stories titled `components/form/<Name>`.
- **Subpath entries** — each exported component gets a `src/entries/<kebab-name>.ts` exporting it and its types, so consumers can import `@pickle-ui/react/<kebab-name>`. `src/index.ts` only re-exports every entry (`export * from './entries/<kebab-name>'`).
- **Internal components** — helpers and Storybook-only utilities that are not part of the public API belong in `src/components/_internal` (e.g. `Story.tsx`, `VisuallyHiddenInput.tsx`). Do not export these from `src/index.ts`.
- **Implementation modules** — a large component may keep its implementation in a separate file next to its facade (e.g. `form/ColorPickerPrimitive.tsx` behind `form/ColorPicker.tsx`). Only the facade is public; the implementation module is never exported from `src/index.ts` or an entry.
- Stories import internal utilities from `./_internal/…` (`../_internal/…` from `src/components/form`); exported components import internal modules the same way (e.g. `../_internal/VisuallyHiddenInput`).
- Imports inside `src` are relative, never the `@/` alias: the examples compile `src` directly, where the alias doesn't resolve. ESLint rejects `@/` imports there; convert the ones the `shadcn` CLI writes (its `components.json` aliases still read `paths` in `tsconfig.json`).

## Public API

`src/index.ts` and `src/entries/*.ts` are the public API. Everything they export is a promise kept until the next major, so they stay small and uniform.

- **One value per component**: the compound itself (`Popover`, `Card`, `InputGroup`). Parts are reached through it (`Popover.Trigger`) and never exported under parallel names (`PopoverTrigger`, `GroupRoot`). Component modules may export parts for reuse inside the library; the public files do not re-export them.
- **Variants**: export `<name>Variants` only where consumers need the look on an element the component does not render — today `buttonVariants`, `badgeVariants` and `textVariants`. Other cva definitions stay private.
- **Types**: export `<Name>Props` for the root and `<Name><Part>Props` for each part (`PopoverTriggerProps`), nothing else. The root type is always `<Name>Props`, never `<Name>RootProps`; `<Name>RootProps` is reserved for an explicit `.Root` part (`ScrollArea.Root`).
- **No primitive re-exports**: do not re-export Base UI primitives or a lower-level copy of a component (no `SliderPrimitive`, no `ColorPickerPrimitive`). Consumers who need the headless layer import Base UI directly.
- **Entries are the source of truth**: a component's public names are written once, in its entry; `src/index.ts` re-exports each entry and nothing else. Keep exports sorted alphabetically.
- `src/public-api.test.ts` checks these rules; extend its allowlist only for a new `<name>Variants` or library helper.

## Component API

- Use [Base UI](https://base-ui.com) for headless component primitives. Do not introduce new `radix-ui` imports or dependencies; if generated code uses Radix primitives, convert it to Base UI before committing.
- **Compound components**: build each part as a plain function (`PopoverTrigger`), then attach them with `const Popover = Object.assign(PopoverRoot, { Trigger: PopoverTrigger, … })`, parts sorted alphabetically. The root is callable (`<Popover>`), never `Popover.Root`, unless the root is a facade that renders several parts itself (`ScrollArea`), in which case `.Root` exposes the bare root. An imperative component with nothing to render in place (`Toast`) is a plain object grouping its `Provider` and the ways to reach it (`manager`, `useToast`).
- **Part vocabulary**: reuse these names before inventing new ones — `Trigger`, `Content` (the popup, including its portal and positioner), `Header`, `Title`, `Description`, `Footer`, `Close`, `Action`, `Item`, `Group`, `GroupLabel`, `Separator`, `Label`, `Value`, `Icon`, `Indicator`. Follow Base UI's part names when a part wraps a Base UI part of the same role.
- **Composition**: change the rendered element with Base UI's `render` prop (`<Button render={<a href="/docs" />}>`). Do not add `asChild`. The layout and typography primitives (`Text`, `Flex`, `Grid`, `XStack`, `YStack`) keep their `as` prop, which only swaps the tag name. Parts built on Base UI get `render` for free; plain parts that need it use `useRender` with `mergeProps` from `@base-ui/react`.
- **Props**: each part takes the props of the element or Base UI part it renders (`React.ComponentProps<'div'>`, `React.ComponentProps<typeof PopoverPrimitive.Trigger>`) plus its own, and spreads the rest onto it. `ref` is a regular prop; never use `forwardRef`. State props follow Base UI's names: `open` / `defaultOpen` / `onOpenChange`, `value` / `defaultValue` / `onValueChange`, `disabled`.
- **Styling**: every part renders `data-slot="<component>-<part>"` in kebab case (`popover-trigger`; the root is just `popover`) and merges `className` last with `cn`. Style states through Base UI's data attributes (`data-open`, `data-disabled`, `data-side`) rather than props. Visual variants use `cva` with `variant` and `size` props, and the part renders each one's resolved value, default included, as `data-<prop>` (`data-variant="default"`, `data-size="md"`, `data-truncate=""` for a boolean) so consumers can target it in CSS. Set the default in the destructured props (`size = 'md'`) so an explicit `null` skips both the classes and the attribute. `data-size` only ever holds a name from the size scale, never a number: a prop that also accepts a number (`Input`'s native `size`) writes the scale size it renders; sizes use the scale `xs`, `sm`, `md`, `lg`, `xl` with `md` as the default. `classNames` (`SlotClassNames`) is only for a facade that renders several parts from one set of props.
- **Overlays** (Popover, Dialog, Menu, Tooltip…): `Content` owns the portal, the positioner or backdrop, and the popup, so consumers write `<X.Content>` and nothing else. It accepts the positioner's `side`, `align`, `sideOffset` and `alignOffset` with the library's defaults.
- **`'use client'`**: add it only to modules that call hooks, create context, or attach event handlers themselves. Base UI parts carry their own directive, so thin wrappers stay server-safe and their compound parts work from React Server Components.
- **Accessibility**: icon-only controls require an accessible name (`aria-label`); text visible only to screen readers is part of the component, not left to the consumer. Built-in strings are English defaults that a prop can replace (a `closeLabel` prop, the `aria-label` of a status), so apps in other languages never fork a component.
- Use the shared `Text` component for headings and text content in exported components and Storybook stories instead of raw typography elements such as `h1`–`h6`, `p`, and `span`.
- Storybook stories should demonstrate the compound API consumers are expected to use.

## Adding a component

1. `src/components/<Name>.tsx` (or `src/components/form/<Name>.tsx` for a form control) following the Component API above.
2. `<Name>.stories.tsx` built with `Story.Layout` / `Story.Section`, and `<Name>.test.tsx` covering roles, the compound parts and any behavior the wrapper adds.
3. Export the compound and its prop types from `src/entries/<kebab-name>.ts`, and add `export * from './entries/<kebab-name>'` to `src/index.ts`.
4. A form control that React Hook Form should drive also gets a `Form<Name>.tsx` binding attached to `Form`.
5. Add the subpath to the README table.
6. `pnpm run typecheck`, `pnpm run lint`, `pnpm run test` and `pnpm run build` pass.

## Stability

- Adding a component, a part, a prop or a variant is a minor release. Renaming or removing any of them, changing a default, or changing a `data-slot` value is breaking.
- Before removing something, deprecate it in a minor release with a JSDoc `@deprecated` tag that names the replacement, and remove it in the next major.
- Consumers style through `className`, `data-slot` and the variant data attributes (`data-variant`, `data-size`, …), so treat their values as public API.

## Commit convention

This repo follows [Conventional Commits](https://www.conventionalcommits.org/). Every commit subject must be:

```
<type>(<optional scope>): <description>
```

**Types:**

| Type       | Use for                                                 |
| ---------- | ------------------------------------------------------- |
| `feat`     | A new feature (e.g. a new component)                    |
| `fix`      | A bug fix                                               |
| `docs`     | Documentation only                                      |
| `style`    | Formatting / whitespace, no code-meaning change         |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf`     | Performance improvement                                 |
| `test`     | Adding or updating tests / stories                      |
| `build`    | Build system or dependency changes                      |
| `ci`       | CI configuration                                        |
| `chore`    | Maintenance, scaffolding, tooling                       |

**Rules:**

- Subject in the imperative mood, lowercase, no trailing period (e.g. `feat: add Button component`, not `Added Button.`).
- Keep the subject ≤ ~72 characters; put detail in the body.
- Use a scope when it adds clarity: `feat(button): add ghost variant`.
- Breaking changes: add `!` after the type/scope (`feat!:`) and/or a `BREAKING CHANGE:` footer.

**Examples:**

```
feat(button): add ghost and link variants
fix: resolve @/ alias in Storybook vite config
docs: document commit convention in AGENTS.md
chore: add README and project config
build: bump React, Vite, and TypeScript to latest
```
