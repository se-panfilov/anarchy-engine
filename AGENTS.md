# AGENTS.md – Anarchy Engine Monorepo

## Architecture Overview

TypeScript npm-workspaces monorepo for a 3D game engine built on [three.js](https://threejs.org/) + [@dimforge/rapier3d](https://rapier.rs/).

Main tech stack: Typescript, Threejs, Vite, Vitest, Playwright, Electron, Node.js, vue 3.

**Core packages** (`packages/`):

Consider all packages which starts with `@hellpig/anarchy-` (or just anarchy-*) as part of the engine.

- `@hellpig/anarchy-engine` – main engine library (Three.js scene, physics, actors, FSM, audio, etc.)
- `@hellpig/anarchy-shared` – utilities, CLI tools, shared scripts
- `@hellpig/anarchy-i18n` – internationalization support (i18n)
- `@hellpig/anarchy-legal` – tool to generate legal texts (licenses, notices, SBOM, etc.) for all packages
- `@hellpig/anarchy-tracking` – telemetry (based on Sentry)

**Showcase apps** (`apps/`):

Consider all apps and packages which starts with `showcases-*` as a demo game, existed for real-world testing of the engine.

- `showcases-core` – The test game based on the engine. Initially a web-app (multi-platform Vite app (web / desktop / mobile build targets)).
- `showcases-desktop` – Electron wrapper for showcases-core (desktop build, win, linux, macOS, different architectures)
- `showcases-e2e` – Playwright end-to-end tests

**Showcase packages** (`packages/`):

- `showcases-gui`- GUI components for showcases-core (Vue 3, Pinia, i18n)
- `showcases-i18n`– i18n support for showcases-core (Vue 3, Pinia, i18n). Using `@hellpig/anarchy-i18n` as a dependency.
- `showcases-menu` – same as `showcases-gui` but for the main menu of `showcases-core`
- `showcases-shared`– shared code and utilities for showcases-core

**Shared configs** (`configs/`):

- `configs/TsMorph` – custom AST linting rules (ts-morph)
- `configs/AnarchyLegal` – configs for `@hellpig/anarchy-legal` to generate legal files.
- `configs/Security` – security configs (e.g. CSP policies)
- `configs/EsLint` – shared ESLint configs for all packages/

## Path Aliases

All cross-package imports use aliases defined in `vite.alias.ts` and mirrored in `tsconfig.json`:

NOTE:Due to technical limitations of TypeScript, the aliases are duplicated in local `tsconfig.json` of each package.

```ts
import { Something } from '@Anarchy/Engine'; // → packages/anarchy-engine/src
import { Util } from '@Anarchy/Shared'; // → packages/anarchy-shared/src
import { Menu } from '@Showcases/Menu'; // → packages/showcases-menu/src
// npm package names also resolve to src (for in-repo development):
import { x } from '@hellpig/anarchy-engine'; // same as @Anarchy/Engine
```

`lodash` is aliased to `lodash-es` everywhere.

## Essential Developer Commands

Run from a **package directory** (e.g. `packages/anarchy-engine`):

| Task                     | Command                 |
| ------------------------ | ----------------------- |
| Build library            | `npm run build`         |
| Type-check only          | `npm run ts:check`      |
| Unit tests               | `npm run unit`          |
| Unit tests with coverage | `npm run unit:coverage` |
| Lint                     | `npm run lint`          |
| Full PR gate             | `npm run pr:guard:ci`   |

`pr:guard:ci` runs: `ts:check → check:ts-morph → check:circular-dependencies → lint → unit:coverage`.

Run from **repo root**:

```sh
npm run prettier           # format all files
npm run lint:fix:all       # lint-fix across all workspaces
npm run ts:check:all       # type-check all workspaces
npm run generate:legal:all # regenerate legal files (required before release)
```

## TypeScript Conventions

Strict mode is fully enabled: `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters`, `strictNullChecks`, `verbatimModuleSyntax`.

- **Always use `import type`** for type-only imports (enforced by `verbatimModuleSyntax`).
- **No object spreading on branded types** – `__noSpreadBrand` is a sentinel field used to prevent spread of opaque types. Violations are caught by `npm run check:no-spread-brand` (ts-morph). Use
  `check:ts-morph:fix` to auto-fix.
- **No circular dependencies** – checked via `dpdm` against `src/index.ts`.
- Source modules in `anarchy-engine/src` are organized by domain (e.g. `Actor`, `Physics`, `Fsm`, `Renderer`). Each domain folder exports via its own `index.ts`; `src/index.ts` re-exports them all.
- Prefer functional and immutable programming style (while it costs reasonable efforts, so sometimes it's ok to do it in a different way, especially for performance reasons).
- Avoid classes at all costs, use functions instead.
- For inheritance, use composition instead of class inheritance (mixins, HOC, etc.). If possible, instead of any kind of inheritance put code aside (utils, helpers, etc.)

## Testing

Unit tests use **Vitest** with `.spec.ts` suffix, co-located in `src/`:

```
packages/anarchy-engine/src/Utils/ObjectUtils.spec.ts
packages/anarchy-engine/src/Math/Utils/DistanceUtils.spec.ts
```

WebGL, Three.js renderer, DRACOLoader, and AudioContext are mocked globally in `packages/anarchy-engine/vitest.setup.js`. Tests should not rely on real GPU/audio APIs.

E2E tests live in `apps/showcases-e2e/src` and use **Playwright**.

## Pre-commit Hooks (Lefthook)

Two checks run in parallel on staged files:

1. **Prettier** (`pretty-quick --staged`) – formats `.ts`, `.js`, `.json`, `.css`, `.md`, etc.
2. **Gitleaks** – scans for secrets (`gitleaks protect --staged`).

Formatting config: 2-space indent, 200-char line width, single quotes, no trailing commas (see `.prettierrc`).

## Legal & Compliance

Every package manages its own legal artifacts (`legal/`, `compliance/sbom/`). Before any release:

```sh
npm run before:release  # generate:legal:all + prettier:changed
```

Do **not** manually edit files in `legal/` – they are auto-generated by `@hellpig/anarchy-legal`.

## Key Files

| File                                               | Purpose                                             |
| -------------------------------------------------- | --------------------------------------------------- |
| `vite.alias.ts`                                    | Single source of truth for all path aliases         |
| `tsconfig.json`                                    | Root TS config (paths, strict options)              |
| `lefthook.yml`                                     | Git hooks definition                                |
| `packages/anarchy-engine/src/index.ts`             | Full engine public API surface                      |
| `packages/anarchy-engine/vitest.setup.js`          | Global test mocks for Three.js / WebGL              |
| `configs/TsMorph/check-no-spread-brand.js`         | Custom AST lint for branded-type safety             |
| `apps/showcases-core/BEFORE_COMMERCIAL_RELEASE.md` | Pre-release checklist (code signing, stores, legal) |
