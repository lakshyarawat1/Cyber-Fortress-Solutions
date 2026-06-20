## Performance Optimization: Next.js Image LCP

* **Issue**: Unoptimized images mapped via `Array.map` missing priority attribute in `next/image`.
* **Impact**: Delayed Largest Contentful Paint (LCP) during initial page load due to deferred image fetching of above-the-fold content.
* **Resolution**: Added `priority={idx <= 2}` to images expected to render above-the-fold.
* **Learnings**: Headless lighthouse tests running locally often underreport LCP improvements on high-speed simulated networks, but `priority` flags on LCP elements are a proven web-vital critical optimization standard in Next.js applications and remain essential despite local measurement noise.

## 2024-08-01 - [Client-Side Routing using Next.js Link]
**Learning:** Found an anti-pattern in `Navbar.tsx` where internal navigation used standard `<a>` tags instead of Next.js's `<Link>` component. This triggered full page reloads, negating the benefits of Next.js client-side routing.
**Action:** Always verify that internal navigation components, especially custom wrappers like `ListItem` integrating with Radix UI, are utilizing `next/link`. When combining Radix UI's `asChild` with `<Link>`, update `ref` and `ComponentPropsWithoutRef` typings to `typeof Link` to avoid TS errors. For placeholder links, ensure `href="#"` is provided as `Link` requires an `href`.
