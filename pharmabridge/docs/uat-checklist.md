# PharmaBridge UAT Checklist

Last updated: 2026-04-24

## Readiness

- [ ] Demo environment variables are loaded correctly
- [ ] Demo banner is visible in demo/preview builds
- [ ] Offline banner and sync queue are visible when the browser goes offline
- [ ] English (`/en`) and Arabic (`/ar`) landing pages render correctly
- [ ] Light and dark mode both pass a visual check

## Core flows

- [ ] Login succeeds and lands on the correct portal dashboard
- [ ] Marketplace search returns results online
- [ ] Marketplace search returns cached results offline after an online search
- [ ] Offline mutations queue correctly and sync when connectivity returns
- [ ] Conflict center shows replay conflicts and allows manual resolution
- [ ] Inventory dashboard loads metrics and alerts
- [ ] Distributor dashboard loads orders and analytics

## Quality gates

- [ ] `npm run test:unit`
- [ ] `npm run test:e2e`
- [ ] `npm run test:a11y`
- [ ] `npm run test:perf`
- [ ] `npm run test:bundle`

## Sign-off

- [ ] Product owner sign-off
- [ ] Pharmacy operations sign-off
- [ ] Release approval
