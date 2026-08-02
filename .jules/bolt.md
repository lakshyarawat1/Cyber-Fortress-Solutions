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

## 2024-02-12 - [Hydration Mismatch Penalty with next-themes]
**Learning:** Found a critical performance anti-pattern involving `next-themes`. In Next.js App Router, `next-themes` injects attributes (like `class` or `data-theme`) into the `<html>` tag at runtime to apply the correct theme. If `suppressHydrationWarning` is not present on the `<html>` tag, React throws a hydration mismatch warning because the server-rendered HTML doesn't match the client-modified HTML. Crucially, this mismatch forces React to discard the server-rendered markup and perform a full client-side re-render of the document tree, severely degrading initial load performance and Time to Interactive (TTI).
**Action:** Always add `suppressHydrationWarning` to the `<html>` tag in the root layout (`app/layout.tsx`) when using `next-themes` (or similar providers that mutate the root HTML at runtime). This tells React to ignore the specific attribute mismatch, preserving the server-rendered tree and avoiding the costly client-side re-render penalty.
## $(date +%Y-%m-%d) - [Hydration Mismatch with next-themes]
**Learning:** Found a performance penalty in `layout.tsx` when using `next-themes` without `suppressHydrationWarning` on the `<html>` tag. `next-themes` mutates the `class` or `style` attributes on the client to avoid FOUC. This mismatch with the server-rendered HTML causes React to trigger a full client-side re-render of the root tree, delaying Time to Interactive (TTI) and increasing Total Blocking Time (TBT).
**Action:** Always add `suppressHydrationWarning` to the root `<html>` tag when integrating `next-themes` in a Next.js App Router project to safely bypass the hydration mismatch check and avoid unnecessary root re-renders.
