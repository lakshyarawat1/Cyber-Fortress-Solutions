## Performance Optimization: Next.js Image LCP

* **Issue**: Unoptimized images mapped via `Array.map` missing priority attribute in `next/image`.
* **Impact**: Delayed Largest Contentful Paint (LCP) during initial page load due to deferred image fetching of above-the-fold content.
* **Resolution**: Added `priority={idx <= 2}` to images expected to render above-the-fold.
* **Learnings**: Headless lighthouse tests running locally often underreport LCP improvements on high-speed simulated networks, but `priority` flags on LCP elements are a proven web-vital critical optimization standard in Next.js applications and remain essential despite local measurement noise.
