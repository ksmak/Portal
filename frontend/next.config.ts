import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
        search: "",
      },
      {
        protocol: "http", 
        hostname: "10.145.104.32",
        port: "8000",
        pathname: "/media/**",
        search: "",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
