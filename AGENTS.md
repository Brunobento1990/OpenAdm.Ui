# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 application using React 19 and TypeScript. Route entry points live in `src/pages/`; reusable product features, API hooks, domain types, and screens live under `src/@open-adm/`. Shared theme and UI infrastructure are in `src/@core/`, while `src/layouts/`, `src/context/`, `src/hooks/`, and `src/navigation/` contain application-wide concerns. Static files belong in `public/images/`, and global CSS is in `styles/`. The custom Iconify build is isolated in `src/iconify-bundle/`.

## Build, Test, and Development Commands

- `npm install` installs the exact dependency versions from `package-lock.json`.
- `npm run dev` starts the development server on port 7154.
- `npm run build` creates a production Next.js build and performs type/build validation. Do not run it unless the user explicitly requests it.
- `npm start` serves the production build on port 7154.
- `npm run lint` runs ESLint over JavaScript and TypeScript sources and applies fixes.
- `npm run format` formats source files with Prettier.
- `npm run build:icons` compiles and regenerates the local Iconify bundle.

## Coding Style & Naming Conventions

Use two-space indentation, UTF-8, and LF line endings. Prettier enforces single quotes, no semicolons, a 120-character line width, and no trailing commas. Keep TypeScript strict and prefer typed props and domain models over new `any` usage. Use PascalCase for React components and types, `useXxx` for hooks, and kebab-case for feature filenames and folders, following nearby code. Keep page-specific code in its feature directory and shared primitives in the appropriate shared module.

Avoid hardcoded domain values such as unexplained strings and numbers. Prefer named constants for isolated values and enums for finite sets of related values, reusing existing definitions whenever available.

Lay out form and filter inputs with `FormRow` and `FormItemRow`. Set responsive grid sizes explicitly so fields share a row on wider screens and occupy the full width on mobile; avoid ad hoc flex containers for input layouts.

Implement all UI and responsive layouts mobile-first. Define the mobile behavior as the default or `xs` layout, then progressively adapt it for larger breakpoints such as `sm`, `md`, and `lg`. Always verify that controls, tables, modals, cards, and action groups remain usable without horizontal or parent-container overflow on small screens.

## Testing Guidelines

No automated test framework or coverage threshold is currently configured. Do not run `npm run build` unless the user explicitly requests it. Exercise the affected route in `npm run dev` and run `npm run lint` before submitting when appropriate. If introducing tests, colocate them as `*.test.ts` or `*.test.tsx`, add the runner to `package.json`, and document the command in this guide.

## Commit & Pull Request Guidelines

Recent commits use short, lowercase Portuguese summaries such as `ajuste na paginação...` and `adicionado novo relatório`. Prefer a concise imperative summary that names the affected feature; avoid vague messages like `fix`. Pull requests should explain the problem and solution, identify affected routes, link the relevant issue, and list manual verification. Include before/after screenshots for visible UI changes and call out configuration or environment changes.

## Security & Configuration

Use `.env.development` for local values such as `NEXT_PUBLIC_URL_API`, but never commit credentials or private keys. Remember that `NEXT_PUBLIC_*` values are exposed to the browser.
