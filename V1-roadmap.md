# V1 Roadmap

This document tracks the planned improvement work that builds on the Beta1 baseline release.

## Baseline (Beta1)
- Cut and preserve the Beta1 branch/tag so demos and hotfixes remain reproducible.
- Document current limitations (mock data, mixed-language strings, lint warnings) so testers know the edges of the build.

## Plan for V1
- **Data layer**: replace the in-memory mocks with a real API client or repository abstraction to keep UI components clean.
- **Internationalization**: move all user-facing strings into translation dictionaries, wire up `next-intl` (or equivalent), and verify both PT/EN flows.
- **Auth polish**: keep the `jose` middleware but tighten logging, error handling, and cookie settings; add end-to-end coverage for login/logout.
- **Lint/Type hygiene**: resolve the current unused-variable warnings, harden TypeScript interfaces, and fail builds on lint errors.
- **Accessibility & UI**: audit components for missing `alt` text, labels, keyboard traps and add targeted Jest/Playwright smoke tests.
- **Content & assets**: replace placeholder copy and imagery with final assets or load them from CMS/CDN sources so nothing ships as a stub.

