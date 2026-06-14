## 2026-06-13 - Unused Next.js Font Import
**Learning:** Next.js font instantiations (like `Inter()`) trigger build-time processing (downloading, generating CSS) even if the generated CSS class is never applied in the DOM.
**Action:** Always check if instantiated fonts are actually used in the render tree; removing unused ones saves build time and potential bundle bloat.
- core-app/src/app/page.tsx: Fixed React key anti-pattern by replacing array index with unique item title.
