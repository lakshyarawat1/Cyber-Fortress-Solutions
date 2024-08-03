/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bing.com",
        port: "",
      },
    ],
    },
    reactStrictMode : false,
};

export default nextConfig;
