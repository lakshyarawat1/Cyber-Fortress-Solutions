## Performance Optimization: Next.js Image LCP

* **Issue**: Unoptimized images mapped via `Array.map` missing priority attribute in `next/image`.
* **Impact**: Delayed Largest Contentful Paint (LCP) during initial page load due to deferred image fetching of above-the-fold content.
* **Resolution**: Added `priority={idx <= 2}` to images expected to render above-the-fold.
* **Learnings**: Headless lighthouse tests running locally often underreport LCP improvements on high-speed simulated networks, but `priority` flags on LCP elements are a proven web-vital critical optimization standard in Next.js applications and remain essential despite local measurement noise.

## 2024-08-01 - [Client-Side Routing using Next.js Link]
**Learning:** Found an anti-pattern in `Navbar.tsx` where internal navigation used standard `<a>` tags instead of Next.js's `<Link>` component. This triggered full page reloads, negating the benefits of Next.js client-side routing.
**Action:** Always verify that internal navigation components, especially custom wrappers like `ListItem` integrating with Radix UI, are utilizing `next/link`. When combining Radix UI's `asChild` with `<Link>`, update `ref` and `ComponentPropsWithoutRef` typings to `typeof Link` to avoid TS errors. For placeholder links, ensure `href="#"` is provided as `Link` requires an `href`.

## 2026-06-27 - [Next.js Static Image Imports for Data Arrays]
**Learning:** Found a performance anti-pattern where local images mapped via an array (e.g., `homeConstants.ts`) used string paths instead of static imports. In Next.js, using string paths for local images bypasses automatic optimization features, forcing manual `width`/`height` declarations and disabling automatic blur placeholders, which hurts perceived Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).
**Action:** When mapping over local images, use static imports (`import img from '...'`) directly in the constants file. This allows Next.js to automatically determine dimensions and enables `placeholder="blur"` for zero-CLS instant visual feedback. Additionally, always include the `sizes` attribute when using responsive layouts to prevent devices from downloading unnecessarily large image resolutions.

## 2024-09-12 - [Next.js Dynamic Imports for Non-Critical Components]
**Learning:** Found a performance bottleneck where a heavy UI component (`ModeToggle`, which relies on `@radix-ui/react-dropdown-menu`) was included in the initial JS payload, slowing down First Load JS. Since this toggle isn't strictly necessary for the initial render (it just switches themes), including it blocking delays Time to Interactive (TTI).
**Action:** Use `next/dynamic` with `ssr: false` to lazy-load non-critical, heavy components like theme toggles. Always provide a `loading` fallback that matches the dimensions of the component to prevent Cumulative Layout Shift (CLS). Additionally, when writing tests for dynamically imported components, wrap renders in `act(...)` to handle state updates properly.

## 2025-01-20 - [Next.js AVIF Image Optimization]
**Learning:** Next.js uses WebP as the default format for automatic Image Optimization. While WebP is great, AVIF provides ~20% better compression than WebP, leading to significantly smaller image payloads for browsers that support it. This translates directly to faster image load times and improved Largest Contentful Paint (LCP), which is especially noticeable for image-heavy pages like the landing page.
**Action:** Always enable `formats: ['image/avif', 'image/webp']` in `next.config.js` or `next.config.mjs` under the `images` key. Next.js handles content negotiation automatically, serving AVIF to supported browsers and falling back to WebP for unsupported ones, providing the best of both worlds with a single line of config.
