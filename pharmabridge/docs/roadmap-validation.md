# PharmaBridge Frontend Reality Check

Last audited: 2026-04-23

## Executive Summary

`docs/roadmap.html` does not reflect the real state of the codebase. The project is no longer "not started" in several major areas, but many items marked or implied as complete are only implemented as mocked frontend UI and are not production-complete product features.

The current project is best described as:

- A substantial frontend prototype with multi-portal screens, mock data, and mocked flows.
- Buildable and smoke-testable after the fixes in this audit.
- Not yet a backend-integrated, QA-complete, accessibility-verified, or offline-capable product.

## What Is Actually Developed

### Implemented and working as frontend/demo functionality

- Project scaffold with Next.js App Router, TypeScript, Tailwind, and reusable UI components.
- Locale-prefixed routing for `ar` and `en`.
- Theme toggle and overall theming structure.
- Responsive layouts and navigation shells for pharmacy, distributor, admin, auth, and public experiences.
- Authentication screens: login, register, reset password.
- Pharmacy inventory UI: dashboard, catalog, barcode scanner UI, alerts.
- Distributor UI: distributor search, live inventory, order list, credit/payment views.
- Marketplace UI: medicine search, pharmacy storefront, order placement, prescription upload, patient dashboard.
- Analytics UI: pharmacy and distributor dashboards with charts.
- MSW-backed mock API layer for frontend-first flows.

### Newly validated in this audit

- Production build now succeeds with `npm run build`.
- Smoke E2E tests now pass with Playwright.
- GitHub CI workflow now exists and runs lint, build, and E2E smoke tests.

## What Is Only Partial

### Present in UI, but still prototype-level

- Authentication uses mocked state, not real backend authentication.
- Inventory flows render mock data; CRUD persistence is not real.
- Distributor ordering and marketplace ordering are mock-backed.
- Analytics charts render mock data; export is mock/demo behavior.
- Barcode scanning UI exists, but it is still client-side/demo-oriented.

### Claimed complete in roadmap, but not truly complete

- FE-3 Internationalization:
  Arabic support exists structurally, but Arabic content is visibly mojibake/corrupted in multiple files, so this is not truly complete.
- FE-4 Responsive QA:
  Responsive layouts exist, but there is no broad automated breakpoint QA proving full completion.
- FE-5 MSW integration:
  Mocking exists and now works for demo stability, but this is still a demo-mode backend substitute.
- FE-9 / FE-10 / FE-11 modules:
  These modules have meaningful UI coverage, but they are not fully productized or backend-connected.

## What Is Still Pending

- FE-1.5: Prettier, Husky, and lint-staged are still missing.
- FE-1.6 / FE-14.4: GitHub Actions CI was missing before this audit and has only now been added.
- FE-8.5: Real inventory CRUD persistence is not implemented.
- FE-8.6 / FE-12.*: Offline mode, IndexedDB, sync queue, conflict resolution, and offline indicators are not implemented.
- FE-13.1 / FE-13.2 / FE-13.3: Vitest, React Testing Library, and Storybook are not present.
- FE-15.*: Accessibility, performance budgets, ARIA audit, CLS/LCP validation, and final acceptance testing are not complete.

## Roadmap Corrections

The roadmap should be read as follows:

- FE-1 to FE-7: mostly partially implemented, not "not started".
- FE-8 to FE-11: substantial mocked frontend exists.
- FE-12 to FE-15: largely still pending.

## Stability Result

Validated after fixes:

- `npm run build`: passes
- `npm run lint`: passes with warnings only
- `npm run test:e2e`: passes

Smoke scenarios covered:

- `/` redirects to `/ar`
- English login flow reaches `/en/pharmacy/dashboard`
- Marketplace search loads and returns mocked pharmacy data
