/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ⚡ Bolt: Enable AVIF image formatting in Next.js Image Optimization.
    // Next.js serves WebP by default, but AVIF provides ~20% better compression than WebP.
    // This reduces image payloads significantly for supported browsers, improving LCP and saving bandwidth.
    // Browsers without AVIF support will automatically fallback to WebP.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bing.com",
        port: "",
      },
    ],
    },
    reactStrictMode: true,
};

export default nextConfig;
